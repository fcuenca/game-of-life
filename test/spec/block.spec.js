const {
  createGrid,
  applyPattern,
  getNextGeneration
} = require('../../src/gol');
const { CANONICAL_BLOCK } = require('./canonical-shapes');

describe('Block Pattern Behavioural Specification', () => {
  test('Given an empty grid, when the block pattern is applied at a valid position, then exactly those 4 cells in a 2x2 arrangement are alive and all others are dead', () => {
    const grid = createGrid();
    applyPattern(grid, CANONICAL_BLOCK, 2, 2);
    
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        if (r >= 2 && r <= 3 && c >= 2 && c <= 3) {
          expect(grid[r][c]).toBe(1);
        } else {
          expect(grid[r][c]).toBe(0);
        }
      }
    }
  });

  test('Given a grid with the block pattern applied, when the next generation is computed, then the grid is unchanged', () => {
    const grid = createGrid();
    applyPattern(grid, CANONICAL_BLOCK, 2, 2);
    const nextGen = getNextGeneration(grid);
    
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        expect(nextGen[r][c]).toBe(grid[r][c]);
      }
    }
  });
});
