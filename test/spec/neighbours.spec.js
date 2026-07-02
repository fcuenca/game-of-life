const {
  createGrid,
  applyPattern,
  getNextGeneration
} = require('../../src/gol');

describe('Neighbour Counting Behavioural Specification', () => {
  test('Given a grid with a single live cell, when I count the neighbours of an adjacent cell, then the count is 1', () => {
    const grid = createGrid();
    
    // Target cell: (2, 3).
    // Source cell (adjacent to target): (2, 2).
    // Helper cells (adjacent to target, non-adjacent to source): (1, 4), (3, 4).
    const pattern = [
      [0, 0, 1], // row 1: contains (1, 4)
      [1, 0, 0], // row 2: contains (2, 2)
      [0, 0, 1]  // row 3: contains (3, 4)
    ];
    applyPattern(grid, pattern, 1, 2);

    const nextGen = getNextGeneration(grid);
    
    // If target cell (2, 3) has exactly 3 live neighbors, it becomes alive
    expect(nextGen[2][3]).toBe(1);
  });

  test('Given a grid with a single live cell, when I count the neighbours of a non-adjacent cell, then the count is 0', () => {
    const grid = createGrid();
    
    // Target cell: (4, 4).
    // Source cell (non-adjacent to target): (2, 2).
    // Helper cells (adjacent to target, non-adjacent to source): (4, 5), (5, 4), (5, 5).
    const pattern = [
      [1, 0, 0, 0], // row 2: contains (2, 2)
      [0, 0, 0, 0], // row 3
      [0, 0, 0, 1], // row 4: contains (4, 5)
      [0, 0, 1, 1]  // row 5: contains (5, 4) and (5, 5)
    ];
    applyPattern(grid, pattern, 2, 2);

    const nextGen = getNextGeneration(grid);
    
    // If target cell (4, 4) has exactly 3 live neighbors, it becomes alive
    expect(nextGen[4][4]).toBe(1);
  });

  test('Given a grid with a live cell at a corner, when I count its neighbours, then only the valid in-bounds neighbours are counted', () => {
    const grid = createGrid();
    
    // Target cell: (0, 0).
    // Helper cells (all valid in-bounds neighbors): (0, 1), (1, 0), (1, 1).
    const pattern = [
      [0, 1], // row 0: (0, 1) is alive
      [1, 1]  // row 1: (1, 0) and (1, 1) are alive
    ];
    applyPattern(grid, pattern, 0, 0);

    const nextGen = getNextGeneration(grid);

    // If only the 3 valid in-bounds neighbors are counted, (0, 0) becomes alive
    expect(nextGen[0][0]).toBe(1);
  });
});
