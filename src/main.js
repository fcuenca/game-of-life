/**
 * Conway's Game of Life - Entry Point
 */

const {
  MAX_GENERATIONS,
  TICK_MS,
  PATTERNS,
  createGrid,
  applyPattern,
  getNextGeneration,
  parseCoordinates
} = require('./gol');

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

async function main() {
  const patternArg = (process.argv[2] || 'glider').toLowerCase();
  const pattern = PATTERNS[patternArg];

  const coordInput = process.argv[3];
  const coordResult = parseCoordinates(coordInput);

  if (!pattern) {
    console.error(`Error: Unknown pattern '${patternArg}'`);
    console.log(`Available patterns are: ${Object.keys(PATTERNS).join(', ')}`);
    process.exit(1);
  }

  let grid = createGrid();

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
