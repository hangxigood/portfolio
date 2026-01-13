---
title: The "Sticky" Spreadsheet State
date: 2026-01-03
tags:
  - EBR
  - AG-Grid
  - JavaScript
---

### **Context**

I am building a web-based Excel interface using **Angular**, **AG-Grid**, and **HyperFormula** (a headless spreadsheet engine). The application allows users to edit tabular data, automatically recalculates complex formulas in real-time, and provides a "Cancel" button to discard unsaved changes and revert to the last saved state.

### **The Issue**

I encountered a bug where clicking "Cancel" wouldn't fully revert the grid.

1. After the first edit, the "Cancel" button would revert formula results, but the **original edited cell** remained "stuck" on the new value.
2. Subsequent edits would treat the previously "cancelled" value as the new baseline.
3. Initially, I suspected a mismatch in data structures (formula strings vs. calculated values), but the behavior persisted even after aligning the types.

### **How it was Fixed**

The root cause was **Internal Object Reference Sharing (Shallow Copying)**.

- **Original Code:** Used the spread operator `[...data]` to "save" the state. In JavaScript, this only copies the array reference; the individual row objects inside the array still point to the same memory addresses.
- **The Bug:** When a user edited a cell in the grid, the row object in `currentRowData` was mutated. Because `savedRowData` shared those same objects, the "saved" state was being silently corrupted the moment the user typed.
- **The Solution:**
    1. **Deep Cloning:** Switched to `JSON.parse(JSON.stringify(data))` for all state transitions. This creates a completely isolated snapshot of the data in memory.
    2. **Formula Preservation:** Modified the state service to store both plain values and original formula strings (e.g., `"=A1*B1"`) in the data model.
    3. **Engine Synchronization:** Forced a rebuild of the HyperFormula engine instance on "Cancel" using the deep-cloned saved data, ensuring the calculation engine and the UI remained in perfect sync.

### **Take-away**

**"Saved" state must be immutable.** When building complex stateful UIs—especially when integrating third-party engines like AG-Grid or HyperFormula—a shallow copy is often a trap. Always use **Deep Cloning** (or immutable data libraries) for your "Undo/Cancel" buffers to prevent user edits from leaking into your recovery snapshots.

_If your "Saved" data and your "Current" data share a single object reference, you haven't actually saved anything._