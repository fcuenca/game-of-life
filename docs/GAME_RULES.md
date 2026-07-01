# Conway's Game of Life — Rules

## The Grid
- An infinite (or bounded) two-dimensional grid of cells
- Each cell is either **alive** or **dead**

## Each Generation
Every cell's next state is determined by its eight neighbours:

1. A live cell with fewer than 2 live neighbours dies (underpopulation)
2. A live cell with 2 or 3 live neighbours survives
3. A live cell with more than 3 live neighbours dies (overpopulation)
4. A dead cell with exactly 3 live neighbours becomes alive (reproduction)

## Starting Patterns
### Glider
A small pattern that moves diagonally across the grid:

.X.
..X
XXX

### Blinker
A three-cell pattern that oscillates between horizontal and vertical:

XXX

### Still Life (Block)
A stable 2x2 pattern that never changes:

XX
XX

### Beacon
A four-cell-block oscillator that alternates between two phases every generation:

XX..
XX..
..XX
..XX



