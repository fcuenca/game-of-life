const {
  createGrid,
  applyPattern
} = require('../../src/gol');
const { CANONICAL_BLOCK } = require('./canonical-shapes');

describe('Grid Behavioural Specification', () => {
  describe('Grid starts empty', () => {
    test('Given a new grid of any size, when I inspect any cell, then it is dead', () => {
      const grid = createGrid();
      const allDead = grid.flat().every(cell => cell === 0);
      expect(allDead).toBe(true);
    });
  });

  describe('Pattern application boundary behaviour', () => {
    test('Given an empty grid, when a pattern is applied and some cells fall outside the grid boundary, then only the in-bounds cells are alive', () => {
      const grid = createGrid();
      applyPattern(grid, CANONICAL_BLOCK, grid.length - 1, grid[0].length - 1);

      for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
          if (r === grid.length - 1 && c === grid[0].length - 1) {
            expect(grid[r][c]).toBe(1);
          } else {
            expect(grid[r][c]).toBe(0);
          }
        }
      }
    });
  });
});
