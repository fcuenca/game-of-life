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

### 2. Start a task
When the user asks to "start the task" or "move the task to in progress":
- First, if the Item ID is not known, run `scripts/get-current-task.sh` to find it.
- Run `scripts/update-task-status.sh <ITEM_ID> IN_PROGRESS`.
- Confirm to the user that the task has been started.

### 3. Update task description
When the user asks to "update the task description" or "update the acceptance criteria":
- Run `scripts/update-task-body.sh <ITEM_ID> "<NEW_BODY_TEXT>"`.
- Confirm to the user that the task content has been updated.

### 4. Mark a task as complete
When the user asks to "mark the current task as done" or "complete the task":
- First, if the Item ID is not known, run `scripts/get-current-task.sh` to find it.
- Run `scripts/update-task-status.sh <ITEM_ID> DONE`.
- Confirm to the user that the task has been marked as Done.

## Bundled Resources

- `scripts/get-current-task.sh`: Fetches the "In Progress" task.
- `scripts/update-task-status.sh`: Sets a task's status (e.g., IN_PROGRESS, DONE).
- `scripts/update-task-body.sh`: Updates the task body (supports both Issues and Drafts).
- `scripts/complete-task.sh`: (Deprecated) Sets a task's status to "Done" (delegates to `update-task-status.sh`).
- `scripts/project-config.sh`: Configuration for the project (IDs and Owner).
