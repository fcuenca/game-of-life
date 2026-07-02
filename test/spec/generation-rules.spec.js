const {
  createGrid,
  applyPattern,
  getNextGeneration
} = require('../../src/gol');

describe('Generation Rules Behavioural Specification', () => {
  test('Given a live cell with fewer than 2 live neighbours, when the next generation is computed, then that cell dies', () => {
    // 0 neighbors
    let grid = createGrid();
    const pattern0 = [
      [1]
    ];
    applyPattern(grid, pattern0, 2, 2);
    let nextGen = getNextGeneration(grid);
    expect(nextGen[2][2]).toBe(0);

    // 1 neighbor
    grid = createGrid();
    const pattern1 = [
      [1, 1]
    ];
    applyPattern(grid, pattern1, 2, 2);
    nextGen = getNextGeneration(grid);
    expect(nextGen[2][2]).toBe(0);
  });

  test('Given a live cell with 2 or 3 live neighbours, when the next generation is computed, then that cell survives', () => {
    // 2 neighbors
    let grid = createGrid();
    const pattern2 = [
      [1, 1, 1]
    ];
    applyPattern(grid, pattern2, 2, 2);
    let nextGen = getNextGeneration(grid);
    expect(nextGen[2][3]).toBe(1);

    // 3 neighbors
    grid = createGrid();
    const pattern3 = [
      [0, 1, 0],
      [1, 1, 1]
    ];
    applyPattern(grid, pattern3, 1, 2);
    nextGen = getNextGeneration(grid);
    expect(nextGen[2][3]).toBe(1);
  });

  test('Given a live cell with more than 3 live neighbours, when the next generation is computed, then that cell dies', () => {
    // 4 neighbors
    const grid = createGrid();
    const pattern = [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0]
    ];
    applyPattern(grid, pattern, 1, 1);
    const nextGen = getNextGeneration(grid);
    expect(nextGen[2][2]).toBe(0);
  });

  test('Given a dead cell with exactly 3 live neighbours, when the next generation is computed, then that cell becomes alive', () => {
    const grid = createGrid();
    const pattern = [
      [0, 1, 0],
      [1, 0, 1]
    ];
    applyPattern(grid, pattern, 1, 1);
    const nextGen = getNextGeneration(grid);
    expect(nextGen[2][2]).toBe(1);
  });
});
