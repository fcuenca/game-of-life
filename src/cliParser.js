const { PATTERNS } = require('./gol');
const { parseCoordinates } = require('./gol');

/**
 * Parses CLI arguments into pattern and coordinates.
 * Returns an object { patternArg, pattern, coordResult }.
 */
function parseCliArgs(argv) {
  const patternArg = (argv[2] || 'glider').toLowerCase();
  const pattern = PATTERNS[patternArg];
  const coordInput = argv[3];
  const coordResult = parseCoordinates(coordInput);
  return { patternArg, pattern, coordResult };
}

module.exports = { parseCliArgs };
