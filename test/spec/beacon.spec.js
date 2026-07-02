
const {
  createGrid,
  applyPattern,
  getNextGeneration
} = require('../../src/gol');
const { CANONICAL_BEACON } = require('./canonical-shapes');

describe('Beacon pattern', () => {
  test('Given an empty grid, when the beacon pattern is applied at a valid position, then exactly those 8 cells in two diagonal 2x2 blocks are alive and all others are dead', () => {
    const grid = createGrid();
    applyPattern(grid, CANONICAL_BEACON, 2, 2);

    const expectedAlive = [
      { r: 2, c: 2 }, { r: 2, c: 3 },
      { r: 3, c: 2 }, { r: 3, c: 3 },
      { r: 4, c: 4 }, { r: 4, c: 5 },
      { r: 5, c: 4 }, { r: 5, c: 5 }
    ];

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        const isAlive = expectedAlive.some(cell => cell.r === r && cell.c === c);
        expect(grid[r][c]).toBe(isAlive ? 1 : 0);
      }
    }
  });

  test('Given a grid with the beacon pattern applied, when one generation is computed, then the two innermost corner cells die and the remaining six cells survive', () => {
    const grid = createGrid();
    applyPattern(grid, CANONICAL_BEACON, 2, 2);
    const gen1 = getNextGeneration(grid);

    const expectedAliveGen1 = [
      { r: 2, c: 2 }, { r: 2, c: 3 },
      { r: 3, c: 2 },
      { r: 4, c: 5 },
      { r: 5, c: 4 }, { r: 5, c: 5 }
    ];

    for (let r = 0; r < gen1.length; r++) {
      for (let c = 0; c < gen1[r].length; c++) {
        const isAlive = expectedAliveGen1.some(cell => cell.r === r && cell.c === c);
        expect(gen1[r][c]).toBe(isAlive ? 1 : 0);
      }
    }
  });

  test('Given a grid with the beacon pattern applied, when two generations are computed, then the grid returns to its initial state', () => {
    const grid = createGrid();
    applyPattern(grid, CANONICAL_BEACON, 2, 2);
    
    const gen1 = getNextGeneration(grid);
    const gen2 = getNextGeneration(gen1);

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        expect(gen2[r][c]).toBe(grid[r][c]);
      }
    }
  });
});
