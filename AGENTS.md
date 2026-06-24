# Game of Life

## What this is
A console-based implementation of Conway's Game of Life in JavaScript/Node.js.
This is a learning project to explore agentic development with AI assistance.

## Tech stack
- Node.js
- Plain JavaScript, no frameworks
- Runs in the terminal, no browser needed

## Standards
- Keep the code simple and readable
- Explain what you're doing and why as you go
- Ask before making significant design decisions
- One small step at a time
- "npm run check" must pass before marking any task "Done"
- When a task is done, report decisions and discoveries made during implementation.

## Session startup
At the start of every session:
1. Read this file completely
2. Ask the user to confirm the current task by saying "check the board"
3. Confirm your understanding of the task before proposing anything


## Boundaries
- Only modify files directly related to the current task
- Do not update TASKS.md or any documentation files unless explicitly asked to do so

## Test organisation
This project maintains two distinct test files with different purposes:

- `test/gol.test.js` — unit tests tied to specific functions and implementation 
  details. These may change freely as the implementation evolves.
- `test/gol.spec.js` — behavioural specification tests. These describe observable 
  game behaviour in Given/When/Then language with no knowledge of internal function 
  names, data structures, or implementation details. This file is a fixed point — 
  only change it if Conway's rules or fundamental game behaviour changes.

When writing spec tests:
- Set up state using the public API (e.g. pattern application), never by direct 
  array manipulation
- Verify behaviour through observable outcomes, not by calling internal functions
- Test descriptions must read as plain behavioural statements, not technical assertions

## Reference material
- docs/GAME_RULES.md — rules and starting patterns for the Game of Life
- Always consult reference files before defining domain-specific 
  values. Never invent or assume values that should come from 
  reference material.

## What I'm learning
I am learning agentic development. Help me understand the decisions you're making, not just the code you're producing.


