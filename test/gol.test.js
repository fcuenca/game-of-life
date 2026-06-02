const { createGrid, ROWS, COLS } = require('../src/gol');

describe('Game of Life - Smoke Test', () => {
  test('createGrid should return a grid of the correct dimensions', () => {
    const grid = createGrid();
    expect(grid.length).toBe(ROWS);
    expect(grid[0].length).toBe(COLS);
    
    // Verify it's a 20x20 grid by default
    expect(ROWS).toBe(20);
    expect(COLS).toBe(20);
  });

  test('createGrid should be initialized with 0s', () => {
    const grid = createGrid();
    grid.forEach(row => {
      row.forEach(cell => {
        expect(cell).toBe(0);
      });
    });
  });
});
