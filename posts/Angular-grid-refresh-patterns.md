---
title: "Angular State Management Patterns: Imperative vs. Reactive"
date: 2026-01-07
tags:
  - Angular
  - Typescript
  - Architecture
---

When integrating third-party libraries like AG-Grid into an Angular application, state synchronization can often become a challenge. This post explores a common scenario where a UI component fails to reflect state changes and compares two distinct architectural patterns to solve it.

## Context
We have an Excel-like data entry application with three main parts:
1.  **State Service**: A global store (using Angular Signals) managing the data.
2.  **Grid Component**: Displays data using AG-Grid.
3.  **Toolbar Component**: Contains a "Save" button to persist changes.

The application tracks "unsaved changes" by comparing the current grid rows against a stored `savedRowData` snapshot. Visual indicators (red markers) show which cells are modified.

## The Issue
After clicking "Save":
1.  The API request succeeded.
2.  The `StateService` updated `savedRowData` to match the current data.
3.  **However, the Grid UI still showed red "unsaved" markers.**

The root cause: AG-Grid's rendering engine is detached from Angular's change detection cycle. Even though the data signal updated, the grid didn't know it needed to re-run its cell styling logic to clear the red markers.

## Fix Option 1: The Imperative (Event-Driven) Approach

This is the classic "Parent-Child" communication pattern.

**How it works:**
1.  **Toolbar**: Emits a custom `@Output() saveCompleted` event.
2.  **Main Layout (Parent)**: Listens for the event.
3.  **Main Layout**: Uses `@ViewChild` to grab the Grid instance and calls a public `refreshCells()` method on it.

**Code Snippet:**
```typescript
// Parent Component
onSaveCompleted() {
  this.gridWrapper.refreshCells(); // "Hey grid, update yourself now!"
}
```

**Pros:**
*   Easy to understand for beginners.
*   Explicit control flow (you can see exactly what triggers the refresh).

**Cons:**
*   **Coupling**: The Parent component must know about the relationship between "Saving" and "Grid Refreshing."
*   **Prop Drilling**: Keep adding events up and down the tree as complexity grows.
*   **Fragile**: If you add a "Auto-Save" feature later, you must wire up new events manually.

## Fix Option 2: The Reactive (State-Driven) Approach

This mimics patterns found in libraries like **Zustand** or **Redux**.

**How it works:**
1.  **State Service**: Updates a `version` signal when a save completes.
2.  **Grid Component**: Uses an `effect()` to watch the `version` signal.
3.  **Grid Component**: Automatically calls `refreshCells()` whenever the version changes.

**Code Snippet:**
```typescript
// Grid Component Constructor
effect(() => {
  const version = this.stateService.version(); // Dependency tracking
  this.gridApi.refreshCells({ force: true });  // React to change
});
```

**Pros:**
*   **Decoupled**: The Toolbar doesn't know the Grid exists. The Parent doesn't coordinate anything.
*   **Scalable**: Any action that updates the `version` (Auto-save, Sign, Import) will automatically fix the grid UI.
*   **Single Source of Truth**: The UI is a pure reflection of the State.

**Cons:**
*   slightly steeper learning curve (understanding Signals and Effects).
*   "Magical" behavior (nothing explicitly tells the grid to refresh in the component tree).

## Trade-off & Takeaway

| Feature | Imperative (Events) | Reactive (Signals) |
| :--- | :--- | :--- |
| **Coupling** | High (Parent orchestrates) | Low (State drives UI) |
| **Scalability** | Low (Manual wiring required) | High (Automatic reaction) |
| **Debugging** | Easy (Trace the function calls) | Moderate (Trace the state changes) |

**Takeaway:**
While the **Imperative** approach is fine for simple, one-off interactions, the **Reactive** approach is superior for complex applications. By treating your Service as the "Store" and your Components as reactive consumers, you eliminate glue code and make your application more robust against future changes. 

If you interpret "State" strictly (like in React's Zustand), your components should just "react" to store updates rather than being commanded by parents.
