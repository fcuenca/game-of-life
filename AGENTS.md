# Game of Life

## What this is
A console-based implementation of Conway's Game of Life in JavaScript/Node.js.
This is a learning project to explore agentic development with AI assistance.

## Tech stack
- Node.js
- Plain JavaScript, no frameworks
- Runs in the terminal, no browser needed

## Session startup
At the start of every session:
1. Read this file completely
2. When the user says "check the board", use the github-projects skill to look up the current task and report it back for confirmation
3. Confirm your understanding of the task before proposing anything

## Implementation Standards
- Keep the code simple and readable
- Explain what you're doing and why as you go
- Ask before making significant design decisions
- One small step at a time
- "npm run check" must pass before considering a task implementation complete
- When a task's implementation is complete, report decisions and discoveries made during implementation.

## Review gate
- Agents do not mark a task "Done" on the board or close its corresponding GitHub issue. Report completion and wait for explicit confirmation from the user before the task is considered closed.
- Agents do not bypass sandbox, permission, or tool restrictions on their own initiative (e.g. environment variable overrides, alternate binaries, workaround paths). If a restriction blocks the task, report the blocker and stop — do not route around it.

## Boundaries
- Only modify files directly related to the current task
- Do not update GAME_RULES.md or any documentation files unless explicitly asked to do so

## Test organisation
This project maintains two categories of tests with different purposes:

- test/gol.test.js — unit tests tied to specific functions and implementation details. These may change freely as the implementation evolves.
- test/spec/*.spec.js — behavioural specification tests, one file per feature/pattern (e.g. grid.spec.js, block.spec.js, blinker.spec.js), plus test/spec/canonical-shapes.js for shared shape constants used across spec files. These describe observable game behaviour in Given/When/Then language with no knowledge of internal function names, data structures, or implementation details.

test/spec/** is protected. Do not modify any file under test/spec/ unless the task card explicitly authorizes it. Most implementation tasks must treat these files as read-only. When a task does authorize a change, it is one of two kinds, and only one applies per task:

  * Red task — replace stub assertions (e.g. throw new Error('Not yet implemented')) with real Jest assertions in a spec file that already exists. Never modify src/gol.js in a Red task.
  * Green task — implement src/gol.js until an already-red spec passes. Never modify any file under test/spec/ in a Green task.

When writing spec assertions (Red tasks only):

  * Set up state using the public API (e.g. pattern application), never by direct array manipulation
  * Verify behaviour through observable outcomes, not by calling internal functions
  * Test descriptions must match the task card exactly — do not reword or reinterpret them

## Reference material
- docs/GAME_RULES.md — rules and starting patterns for the Game of Life
- Always consult reference files before defining domain-specific 
  values. Never invent or assume values that should come from 
  reference material.

## Discoveries to remember
- Direct gh project/gh issue calls fail under Antigravity's permission system regardless of grants ('unsupported resource type'). Route any new GitHub Projects interaction through a dedicated skill script under .agents/skills/github-projects/scripts/, when available. Report the missing functionality when not available.

## What I'm learning
I am learning agentic development. Help me understand the decisions you're making, not just the code you're producing.


