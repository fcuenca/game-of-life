const {
  createGrid,
  applyPattern,
  getNextGeneration
} = require('../src/gol');

// Canonical shapes defined explicitly in the test to decouple from implementation constants
const CANONICAL_BLOCK = [
  [1, 1],
  [1, 1]
];

const CANONICAL_BLINKER = [
  [1, 1, 1]
];

const CANONICAL_GLIDER = [
  [0, 1, 0],
  [0, 0, 1],
  [1, 1, 1]
];

describe('Game of Life Behavioural Specification', () => {

  describe('Grid starts empty', () => {
    test('Given a new grid of any size, when I inspect any cell, then it is dead', () => {
      const grid = createGrid();
      const allDead = grid.flat().every(cell => cell === 0);
      expect(allDead).toBe(true);
    });
  });

  describe('Pattern application', () => {
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

  describe('Neighbour counting', () => {
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

  describe('Generation rules', () => {
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
});
