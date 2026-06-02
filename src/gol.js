/**
 * Conway's Game of Life - Logic
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

/**
 * Parses and validates a coordinate string in "row,col" format.
 */
function parseCoordinates(coordInput) {
  if (coordInput === undefined) {
    return { isValid: true, row: 0, col: 0 };
  }

  const parts = coordInput.split(',');

  if (parts.length !== 2) {
    return { isValid: false, error: "Coordinates must be in 'row,col' format (e.g., 5,10)." };
  }

  const rowStr = parts[0].trim();
  const colStr = parts[1].trim();

  if (!/^\d+$/.test(rowStr) || !/^\d+$/.test(colStr)) {
    return { isValid: false, error: "Coordinates must be non-negative integers." };
  }

  const row = parseInt(rowStr, 10);
  const col = parseInt(colStr, 10);

  if (row >= ROWS || col >= COLS) {
    return { isValid: false, error: `Coordinates (${row},${col}) are outside the grid bounds (${ROWS}x${COLS}).` };
  }

  return { isValid: true, row, col };
}

module.exports = {
  ROWS,
  COLS,
  MAX_GENERATIONS,
  TICK_MS,
  PATTERNS,
  createGrid,
  applyPattern,
  countNeighbors,
  getNextGeneration,
  parseCoordinates
};
