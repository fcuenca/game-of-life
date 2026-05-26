/**
 * Conway's Game of Life - Basic Console Implementation
 * TASK-004
 */

const ROWS = 20;
const COLS = 20;
const MAX_GENERATIONS = 50;
const TICK_MS = 200;

const PATTERNS = {
  glider: [
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1]
  ],
  blinker: [
    [1, 1, 1]
  ],
  block: [
    [1, 1],
    [1, 1]
  ]
};

/**
 * Creates an empty 2D grid filled with 0 (dead cells).
 */
function createGrid() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

/**
 * Stams a pattern matrix onto the grid at the specified coordinates.
 */
function applyPattern(grid, pattern, startRow, startCol) {
  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[i].length; j++) {
      const r = startRow + i;
      const c = startCol + j;
      if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
        grid[r][c] = pattern[i][j];
      }
    }
  }
}

/**
 * Counts live neighbors for a cell at (r, c).
 * Out of bounds is treated as dead.
 */
function countNeighbors(grid, r, c) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const row = r + i;
      const col = c + j;
      if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
        count += grid[row][col];
      }
    }
  }
  return count;
}

/**
 * Calculates the next generation based on Game of Life rules.
 */
function getNextGeneration(grid) {
  const nextGrid = createGrid();
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const neighbors = countNeighbors(grid, r, c);
      const isAlive = grid[r][c] === 1;

      if (isAlive && (neighbors === 2 || neighbors === 3)) {
        nextGrid[r][c] = 1; // Survival
      } else if (!isAlive && neighbors === 3) {
        nextGrid[r][c] = 1; // Reproduction
      } else {
        nextGrid[r][c] = 0; // Underpopulation / Overpopulation
      }
    }
  }
  return nextGrid;
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Renders the current state of the game to the console.
 */
function render(grid, generation, maxGenerations) {
  console.clear();
  console.log(`Generation: ${generation} / ${maxGenerations}`);
  const output = grid.map(row => row.map(cell => (cell ? 'X' : '.')).join(' ')).join('\n');
  console.log(output);
}

/**
 * Parses and validates a coordinate string in "row,col" format.
 *
 * @param {string|undefined} coordInput - The raw string from process.argv (e.g., "5,10")
 * @returns {object} An object containing { isValid: true, row: number, col: number } on success,
 *                   or { isValid: false, error: string } on failure.
 */
function parseCoordinates(coordInput) {
  // If no coordinate input is provided, return the default 0,0
  if (coordInput === undefined) {
    return { isValid: true, row: 0, col: 0 };
  }

  const parts = coordInput.split(',');

  // Validate format: must have exactly two parts separated by a comma
  if (parts.length !== 2) {
    return { isValid: false, error: "Coordinates must be in 'row,col' format (e.g., 5,10)." };
  }

  const rowStr = parts[0].trim();
  const colStr = parts[1].trim();

  // Validate type: ensure both parts are non-negative integers
  // The regex /^\d+$/ checks for one or more digits from start to end of the string.
  if (!/^\d+$/.test(rowStr) || !/^\d+$/.test(colStr)) {
    return { isValid: false, error: "Coordinates must be non-negative integers." };
  }

  const row = parseInt(rowStr, 10);
  const col = parseInt(colStr, 10);

  // Validate grid bounds: ensure coordinates are within the defined ROWS and COLS
  if (row >= ROWS || col >= COLS) {
    return { isValid: false, error: `Coordinates (${row},${col}) are outside the grid bounds (${ROWS}x${COLS}).` };
  }

  // Success: return the parsed row and column
  return { isValid: true, row, col };
}

async function main() {
  const patternArg = (process.argv[2] || 'glider').toLowerCase();
  const pattern = PATTERNS[patternArg];

  // Parse the coordinate argument, which is expected at process.argv[3]
  const coordInput = process.argv[3];
  const coordResult = parseCoordinates(coordInput);

  if (!pattern) {
    console.error(`Error: Unknown pattern '${patternArg}'`);
    console.log(`Available patterns are: ${Object.keys(PATTERNS).join(', ')}`);
    process.exit(1);
  }

  let grid = createGrid();

  // Handle coordinate parsing errors
  if (!coordResult.isValid) {
    console.error(`Error: ${coordResult.error}`);
    process.exit(1);
  }

  applyPattern(grid, pattern, coordResult.row, coordResult.col);

  for (let gen = 0; gen <= MAX_GENERATIONS; gen++) {
    render(grid, gen, MAX_GENERATIONS);
    grid = getNextGeneration(grid);
    await sleep(TICK_MS);
  }
}

main();