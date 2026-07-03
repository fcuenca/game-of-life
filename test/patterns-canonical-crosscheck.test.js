// patterns-canonical-crosscheck.test.js
/**
 * Cross‑check test: every pattern defined in src/gol.js (PATTERNS) must match the
 * corresponding canonical shape constant from test/spec/canonical-shapes.js.
 *
 * The PATTERNS keys are lower‑case (e.g., "glider"). The canonical constants are
 * exported as CANONICAL_<UPPERCASE_NAME> (e.g., CANONICAL_GLIDER).
 */

const { PATTERNS } = require('../src/gol');
const canonical = require('./spec/canonical-shapes');

/**
 * Helper to map a pattern key to its canonical constant name.
 */
function getCanonicalKey(name) {
  return `CANONICAL_${name.toUpperCase()}`;
}

test('PATTERNS match canonical shapes', () => {
  // Iterate over each pattern defined in PATTERNS
  Object.entries(PATTERNS).forEach(([name, pattern]) => {
    const canonKey = getCanonicalKey(name);
    // Ensure the canonical constant exists
    expect(canonical).toHaveProperty(canonKey);
    // Compare the pattern arrays deeply
    expect(pattern).toEqual(canonical[canonKey]);
  });
});
