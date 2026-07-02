const {
  createGrid,
  applyPattern,
  getNextGeneration
} = require('../../src/gol');
const { CANONICAL_BLINKER } = require('./canonical-shapes');

describe('Blinker Pattern Behavioural Specification', () => {
  test('Given an empty grid, when the blinker pattern is applied at a valid position, then exactly those 3 cells in a horizontal row are alive and all others are dead', () => {
    const grid = createGrid();
    applyPattern(grid, CANONICAL_BLINKER, 2, 2);

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        if (r === 2 && c >= 2 && c <= 4) {
          expect(grid[r][c]).toBe(1);
        } else {
          expect(grid[r][c]).toBe(0);
        }
      }
    }
  });

  test('Given a grid with the blinker pattern applied, when two generations are computed, then the grid returns to its initial state', () => {
    const grid = createGrid();
    applyPattern(grid, CANONICAL_BLINKER, 2, 2);
    
    const gen1 = getNextGeneration(grid);
    const gen2 = getNextGeneration(gen1);

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        expect(gen2[r][c]).toBe(grid[r][c]);
      }
    }
  });
});
