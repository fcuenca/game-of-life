const { 
  createGrid, 
  ROWS, 
  COLS, 
  PATTERNS, 
  parseCoordinates, 
  applyPattern, 
  countNeighbors, 
  getNextGeneration 
} = require('../src/gol');

describe('Game of Life - Logic', () => {
  describe('createGrid', () => {
    test('should return a grid of the correct dimensions', () => {
      const grid = createGrid();
      expect(grid.length).toBe(ROWS);
      expect(grid[0].length).toBe(COLS);
    });

    test('should be initialized with 0s', () => {
      const grid = createGrid();
      grid.forEach(row => {
        row.forEach(cell => {
          expect(cell).toBe(0);
        });
      });
    });

    test('each row should be a unique array instance', () => {
      const grid = createGrid();
      grid[0][0] = 1;
      expect(grid[1][0]).toBe(0);
    });
  });

  describe('parseCoordinates', () => {
    test('should return default (0,0) for undefined input', () => {
      expect(parseCoordinates(undefined)).toEqual({ isValid: true, row: 0, col: 0 });
    });

    test('should parse valid coordinates', () => {
      expect(parseCoordinates("5,10")).toEqual({ isValid: true, row: 5, col: 10 });
      expect(parseCoordinates(" 0 , 0 ")).toEqual({ isValid: true, row: 0, col: 0 });
    });

    test('should fail for invalid format', () => {
      const result = parseCoordinates("5 10");
      expect(result.isValid).toBe(false);
      expect(result.error).toContain("format");
    });

    test('should fail for non-integers', () => {
      const result = parseCoordinates("a,b");
      expect(result.isValid).toBe(false);
      expect(result.error).toContain("non-negative integers");
    });

    test('should fail for out-of-bounds coordinates', () => {
      const result = parseCoordinates(`${ROWS},${COLS}`);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain("outside the grid bounds");
    });
  });

  describe('applyPattern', () => {
    test('should stamp a pattern onto the grid', () => {
      const grid = createGrid();
      const pattern = PATTERNS.block; // 2x2 of 1s
      applyPattern(grid, pattern, 1, 1);
      
      expect(grid[1][1]).toBe(1);
      expect(grid[1][2]).toBe(1);
      expect(grid[2][1]).toBe(1);
      expect(grid[2][2]).toBe(1);
      expect(grid[0][0]).toBe(0);
    });

    test('should handle partial out-of-bounds stamps gracefully', () => {
      const grid = createGrid();
      const pattern = [[1, 1], [1, 1]];
      // Stamp at the very edge so part is out of bounds
      applyPattern(grid, pattern, ROWS - 1, COLS - 1);
      
      expect(grid[ROWS - 1][COLS - 1]).toBe(1);
      // No errors should have been thrown for the other cells
    });
  });

  describe('countNeighbors', () => {
    test('should count 0 for an empty grid', () => {
      const grid = createGrid();
      expect(countNeighbors(grid, 5, 5)).toBe(0);
    });

    test('should count neighbors correctly in the center', () => {
      const grid = createGrid();
      // Surround (5,5) with 3 neighbors
      grid[4][4] = 1;
      grid[4][5] = 1;
      grid[4][6] = 1;
      expect(countNeighbors(grid, 5, 5)).toBe(3);
    });

    test('should treat out-of-bounds as dead cells', () => {
      const grid = createGrid();
      grid[0][1] = 1;
      grid[1][0] = 1;
      grid[1][1] = 1;
      expect(countNeighbors(grid, 0, 0)).toBe(3);
    });
  });

  describe('getNextGeneration Rules', () => {
    test('Static Pattern: Block should remain unchanged', () => {
      let grid = createGrid();
      applyPattern(grid, PATTERNS.block, 5, 5);
      
      const nextGrid = getNextGeneration(grid);
      
      expect(nextGrid[5][5]).toBe(1);
      expect(nextGrid[5][6]).toBe(1);
      expect(nextGrid[6][5]).toBe(1);
      expect(nextGrid[6][6]).toBe(1);
      // Check a surrounding cell
      expect(nextGrid[4][4]).toBe(0);
    });

    test('Oscillator: Blinker should toggle state', () => {
      let grid = createGrid();
      // Horizontal blinker
      applyPattern(grid, PATTERNS.blinker, 5, 5); // [1, 1, 1] at (5,5), (5,6), (5,7)
      
      const nextGrid = getNextGeneration(grid);
      
      // Should become vertical centered at (5,6)
      expect(nextGrid[5][6]).toBe(1);
      expect(nextGrid[4][6]).toBe(1);
      expect(nextGrid[6][6]).toBe(1);
      
      // Horizontal ends should be dead
      expect(nextGrid[5][5]).toBe(0);
      expect(nextGrid[5][7]).toBe(0);
    });

    test('Underpopulation: Cell with < 2 neighbors dies', () => {
      let grid = createGrid();
      grid[5][5] = 1;
      grid[5][6] = 1; // Only 1 neighbor
      
      const nextGrid = getNextGeneration(grid);
      expect(nextGrid[5][5]).toBe(0);
    });

    test('Overpopulation: Cell with > 3 neighbors dies', () => {
      let grid = createGrid();
      grid[5][5] = 1;
      // 4 neighbors
      grid[4][5] = 1;
      grid[6][5] = 1;
      grid[5][4] = 1;
      grid[5][6] = 1;
      
      const nextGrid = getNextGeneration(grid);
      expect(nextGrid[5][5]).toBe(0);
    });

    test('Reproduction: Dead cell with exactly 3 neighbors becomes alive', () => {
      let grid = createGrid();
      // 3 neighbors for (5,5) which is currently 0
      grid[4][5] = 1;
      grid[6][5] = 1;
      grid[5][4] = 1;
      
      const nextGrid = getNextGeneration(grid);
      expect(nextGrid[5][5]).toBe(1);
    });
  });
});
