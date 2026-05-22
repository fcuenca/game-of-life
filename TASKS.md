# Tasks

## In Progress

## Ready

## Done

### TASK-003: Choose starting pattern via command line argument  ✓
**What:** Allow the user to specify a starting pattern when running 
the app, e.g. `node gol.js glider` or `node gol.js blinker`
**Why:** Makes the app more useful and introduces command line 
argument handling in Node.js
**Acceptance criteria:**
- Running `node gol.js glider` starts with the Glider pattern
- Running `node gol.js blinker` starts with the Blinker pattern
- Running `node gol.js block` starts with the Still Life Block pattern
- Running `node gol.js` with no argument defaults to Glider
- Running `node gol.js <SOMETHING UNKNOWN>` prints a helpful error message, listing valid patterns and exits cleanly
- All three patterns are defined in GAME_RULES.md. Let me know if it's missing. Don't invent them!

**Out of scope:**
- No interactive menu
- No other input handling

### TASK-002: Refactor rendering logic out of main() ✓
**What:** Extract the rendering code from main() into a dedicated render function
**Why:** main() currently mixes game loop control with display logic. 
Separating them makes each function easier to read and test independently.
**Acceptance criteria:**
- main() contains no direct rendering code
- A dedicated render(grid, generation, maxGenerations) function handles all display output
- Behaviour is identical to TASK-001 — no visible change when running node gol.js

### TASK-001: Basic Game of Life console app ✓
**What:** A working Conway's Game of Life that runs in the terminal
**Why:** Learning project to explore agentic development
**Acceptance criteria:**
- Runs with `node gol.js`
- Displays a grid in the terminal
- Advances one generation at a time
- Includes at least one interesting starting pattern (e.g. glider)
- Stops after a defined number of generations

**Out of scope:**
- No user input yet
- No fancy terminal graphics
- No configuration files

**Reference:** See docs/GAME_RULES.md for rules and starting patterns