const {
  createGrid,
  applyPattern,
  getNextGeneration
} = require('../../src/gol');
const { CANONICAL_GLIDER } = require('./canonical-shapes');

describe('Glider Pattern Behavioural Specification', () => {
  test('Given an empty grid, when the glider pattern is applied at a valid position, then exactly those 5 cells in the glider arrangement are alive and all others are dead', () => {
    const grid = createGrid();
    applyPattern(grid, CANONICAL_GLIDER, 2, 2);

    const gliderCells = [
      { r: 2, c: 3 },
      { r: 3, c: 4 },
      { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 }
    ];

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        const isGliderCell = gliderCells.some(cell => cell.r === r && cell.c === c);
        expect(grid[r][c]).toBe(isGliderCell ? 1 : 0);
      }
    }
  });

  test('Given a grid with the glider pattern applied, when four generations are computed, then the glider has moved one step diagonally and all other cells are dead', () => {
    const grid = createGrid();
    applyPattern(grid, CANONICAL_GLIDER, 2, 2);

    let currentGen = grid;
    for (let i = 0; i < 4; i++) {
      currentGen = getNextGeneration(currentGen);
    }

    // Check that the glider has moved exactly one step diagonally (top-left moves from 2,2 to 3,3)
    const expectedGliderCells = [
      { r: 3, c: 4 },
      { r: 4, c: 5 },
      { r: 5, c: 3 }, { r: 5, c: 4 }, { r: 5, c: 5 }
    ];

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        const isExpectedGliderCell = expectedGliderCells.some(cell => cell.r === r && cell.c === c);
        expect(currentGen[r][c]).toBe(isExpectedGliderCell ? 1 : 0);
      }
    }
  });
});
