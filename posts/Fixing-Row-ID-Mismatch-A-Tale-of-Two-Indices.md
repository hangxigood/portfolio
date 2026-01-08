---
title: "Fixing Row ID Mismatch: A Tale of Two Indices"
date: 2026-01-06
tags:
  - AG-Grid
  - HyperFormula
  - C#/.NET
  - TypeScript
  - Angular
---

Building a complex data grid often involves syncing state between multiple systems. In **Xlsx-Grid-Flow**, we coordinate three:
1. **Frontend UI** (AG-Grid): Visualizing data.
2. **Formula Engine** (HyperFormula): Client-side calculations.
3. **Backend** (C#/.NET): Persistence and audit logging.

We recently encountered a bug where editing a cell in the third row resulted in the audit log reporting a change in the *second* row. Worse, formulas weren't updating correctly for the top rows. Here's what happened and how we fixed it.

## The Context

Our data model uses persistent `rowId`s to track rows, matching Excel's layout (starting at `rowId: 2` for the first data row, since row 1 is headers).
- **Backend**: Expects `rowId` to match Excel row numbers.
- **AG-Grid**: Works with 0-based array indices.
- **HyperFormula**: Works with 0-based coordinates (row 0 = headers, row 1 = first data row).

## The Issue

The bug surfaced in two places:
1. **Audit Log Mismatch**: Editing "Row 3" (rowId: 4) showed up as "Row 2" in the backend.
2. **Formula Calc Failure**: Editing the first data row (rowId: 2) failed to update formulas.

### Root Cause 1: Identity Crisis
Our `FormulaService` was treating the *array index* as the *identity* of the row.
When initializing the formula engine, we processed rows sequentially. Later, when retrieving calculated data:

```typescript
// OLD BUGGY CODE
for (let rowIdx = 1; rowIdx <= rowCount; rowIdx++) {
    const row: GridRow = { rowId: rowIdx }; // ❌ Generated new sequential IDs (1, 2, 3...)
    // ...
}
```
This threw away our persistent `rowId`s (2, 3, 4...) and replaced them with sequential ones. When sent to the backend, `rowId: 1` (from the engine) didn't match `rowId: 2` (in the DB), causing "Row 2" edits to look like they belonged to a non-existent "Row 1" or were mapped incorrectly.

### Root Cause 2: The Direct Mapping Trap
When updating a cell, we passed the `rowId` directly to the formula engine as a row index:

```typescript
// OLD BUGGY CODE
// rowId comes in as 2 (for first data row)
hfInstance.setCellContents({ row: rowId }, value); 
// ❌ HyperFormula sees 'row: 2' as the THIRD row (Header, Data 1, Data 2)
// It skips the actual first data row!
```

## The Fix

We needed a unified source of truth for row identity.

### 1. Preserve Identity
We updated `getCalculatedData` to iterate over the *original* data source, preserving the source `rowId`s instead of generating new ones.

```typescript
// ✅ FIX: Preserve original IDs
originalRowData.forEach((originalRow, index) => {
    const row: GridRow = { rowId: originalRow.rowId }; 
    // ...
});
```

### 2. Map, Don't Cast
We modified `updateCell` to perform a lookup. Instead of trusting `rowId` to be an index, we find the actual array position.

```typescript
// ✅ FIX: Map ID to Index
const arrayIndex = this.originalRowData.findIndex(r => r.rowId === rowId);
const hfRow = arrayIndex + 1; // +1 for headers
```

## Takeaway

**Indices are ephemeral; Identifiers are forever.** 
When working with third-party libraries (like grid or formula engines), never assume their internal sequential index matches your domain's unique identifier. Always maintain a clear mapping layer between your Data ID (`rowId`) and the View Index (`rowIndex`).
