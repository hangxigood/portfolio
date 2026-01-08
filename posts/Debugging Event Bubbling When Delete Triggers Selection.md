---
title: Debugging Event Bubbling When Delete Triggers Selection
date: 2024-12-21
tags:
  - TypeScript
  - React
---

While working on **LightShift**, a staff scheduling application, I encountered a peculiar bug: clicking the "Confirm" button to delete a staff member would unexpectedly select that same staff member right before deletion. This caused the UI to briefly highlight the deleted staff, creating a confusing user experience.

## The Investigation

The issue was in the StaffSidebar component. Here's the relevant structure:

```TypeScript
<li onClick={() => handleNameClick(staffMember)}>
  {/* Staff member content */}
  
  {deleteConfirmId === staffMember.id && (
    <div>
      <button onClick={() => handleConfirmDelete(staffMember.id)}>
        Confirm
      </button>
      <button onClick={handleCancelDelete}>
        Cancel
      </button>
    </div>
  )}
</li>
```

The problem? **Event bubbling**. When clicking the "Confirm" button, the click event would:

1. Execute `handleConfirmDelete(staffMember.id)` ✅
2. Bubble up to the parent `<li>` element
3. Execute `handleNameClick(staffMember)` ❌
4. Set `selectedStaffId` to the deleted staff member

## The Solution

The fix was simple but crucial: **stop the event propagation**.

```
<button 
  onClick={(e) => {
    e.stopPropagation();  // Prevent bubbling to parent <li>
    handleConfirmDelete(staffMember.id);
  }}
>
  Confirm
</button>
```
I applied the same fix to the "Cancel" button for consistency.

## The Takeaway

This is a classic React gotcha. When nesting interactive elements, always consider:

- **Event bubbling**: Child events propagate to parent handlers
- **`e.stopPropagation()`**: Your friend for preventing unwanted side effects
- **Consistency**: If one button needs it, similar buttons probably do too

Interestingly, the codebase already had this pattern for the "Edit" and "Delete" buttons—I just needed to extend it to the confirmation dialog buttons.

## Before & After

**Before**: Confirm → Delete staff → Select staff (bug!) → Clear selection  
**After**: Confirm → Delete staff → Clear selection ✨