---
name: github-projects
description: This skill allows the agent to read and update a GitHub Projects v2 board using the gh CLI. Use when the user asks "what's my current task", "check the board", "mark the current task as done", "update the board", or during "session startup" to ensure the board is the source of truth for the current task.
---

# GitHub Projects Integration

This skill provides tools to interact with a GitHub Projects v2 board to manage tasks.

## Workflows

### 1. Identify the current task
When the user asks "what's my current task" or "check the board", or during session startup:
- Run `scripts/get-current-task.sh`.
- Report the task details (Title, Description, and Item ID) to the user.
- Store the returned Item ID in context for use later in the session.

### 2. Mark a task as complete
When the user asks to "mark the current task as done" or "complete the task":
- First, if the Item ID is not known, run `scripts/get-current-task.sh` to find it.
- Run `scripts/complete-task.sh <ITEM_ID>`.
- Confirm to the user that the task has been marked as Done.

## Bundled Resources

- `scripts/get-current-task.sh`: Fetches the "In Progress" task.
- `scripts/complete-task.sh`: Sets a task's status to "Done".
- `scripts/project-config.sh`: Configuration for the project (IDs and Owner).
