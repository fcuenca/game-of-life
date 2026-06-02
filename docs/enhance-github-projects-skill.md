During this session, I had to refine my understanding of the gh CLI for Project V2 management. Here are the key commands and nuances I figured out:

  1. Updating Project Item Fields
  Initially, I tried to use flags like --owner and the project number with item-edit, but I learned that gh project item-edit is more specific:
   * The Command: gh project item-edit --id <ITEM_ID> --project-id <PROJECT_UUID> --field-id <FIELD_ID> --single-select-option-id <OPTION_ID>
   * Key Learning: It requires the Project UUID (e.g., PVT_...), not the human-readable project number. It also doesn't accept the --owner flag; that
     context is tied to the project ID itself.

  2. Finding the Project UUID
  Because I only had the project number (3), I had to figure out how to retrieve the internal ID:
   * The Command: gh project list --owner <OWNER> --format json
   * Key Learning: This allowed me to map project number 3 to its unique identifier (PVT_kwHOAAgvO84BYgds), which is required for subsequent item-edit
     calls.

  3. Updating Task Descriptions (Issues vs. Drafts)
  I attempted to use gh project item-edit --body to update the Acceptance Criteria, but it failed with an error about ID prefixes.
   * The Discovery: gh project item-edit --body only works for Draft Issues (prefixed with DI_). 
   * The Fix: Since these tasks are tracked as GitHub Issues, I had to switch to the Issue CLI:
      gh issue edit <ISSUE_NUMBER> --body "..."

  4. Advanced Filtering with jq
  To find the current task among many, I used jq to surgically extract the "In Progress" item:
   * The Command: gh project item-list 3 --owner <OWNER> --format json | jq -r '.items[] | select(.status == "In Progress") | ...'
   * Key Learning: This is the most efficient way to turn a large JSON project dump into actionable task details (Title, Body, ID) in a single step.


-----
# Plan: Enhance `github-projects` Skill

This plan outlines the enhancements to the `github-projects` skill based on learnings from the current session. The goal is to make the skill more robust, handle the distinction between Issues and Drafts, and improve configuration management.

## Objective
Update the `github-projects` skill scripts and documentation to handle Project UUIDs, manage "In Progress" transitions, and support updating task content (Issues or Drafts).

## Key Files & Context
- `.gemini/skills/github-projects/SKILL.md`: Update workflows and documentation.
- `.gemini/skills/github-projects/scripts/project-config.sh`: Centralized configuration.
- `.gemini/skills/github-projects/scripts/get-current-task.sh`: Enhanced task fetching.
- `.gemini/skills/github-projects/scripts/update-task-status.sh` (New): Generic status updater.
- `.gemini/skills/github-projects/scripts/update-task-body.sh` (New): Update task description (handles Issues vs. Drafts).

## Proposed Changes

### 1. Script Enhancements
- **`project-config.sh`**: Ensure `PROJECT_ID` (the UUID) is present and used consistently.
- **`update-task-status.sh`**: Create a script to move items between statuses (e.g., Todo -> In Progress, In Progress -> Done). This replaces the overly specific `complete-task.sh`.
- **`update-task-body.sh`**: Create a script that:
    1. Checks if the Item ID belongs to an Issue or a Draft.
    2. Uses `gh issue edit` for Issues.
    3. Uses `gh project item-edit --body` for Drafts.

### 2. Workflow Updates in `SKILL.md`
- Add a workflow for "Start a task" (moves to In Progress).
- Add a workflow for "Update task description/ACs".
- Refine the "Mark as complete" workflow to use the new generic status script.

## Implementation Steps

### Phase 1: Foundation & Generic Status
1.  **Update `project-config.sh`**: (Already done in current session, but verify).
2.  **Create `update-task-status.sh`**:
    - Takes `ITEM_ID` and `STATUS_TYPE` (InProgress/Done) as arguments.
    - Uses the corresponding `OPTION_ID` from config.
3.  **Deprecate `complete-task.sh`**: Point it to the new script or replace it entirely.

### Phase 2: Content Management
1.  **Create `update-task-body.sh`**:
    - Logic to detect Issue vs. Draft.
    - For Issues: Extract the Issue Number from the item metadata, then `gh issue edit`.
    - For Drafts: `gh project item-edit --id ... --body ...`.

### Phase 3: Documentation
1.  **Update `SKILL.md`**: Reflect the new scripts and capabilities.

## Verification & Testing
- **Test Status Change**: Move a task from "Todo" to "In Progress" and back.
- **Test Body Update**: Update the description of an Issue-based task and verify on GitHub.
- **Test Draft Update**: (Optional if a draft is available) Verify body update for a draft item.
