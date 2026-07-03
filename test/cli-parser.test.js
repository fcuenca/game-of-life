// Unit tests for the CLI argument parser helper
const { parseCliArgs } = require('../src/cliParser');
const { PATTERNS } = require('../src/gol');

describe('CLI argument parser', () => {
  test('defaults to glider pattern with no args', () => {
    const result = parseCliArgs(['node', 'src/main.js']);
    expect(result.patternArg).toBe('glider');
    expect(result.pattern).toBe(PATTERNS.glider);
    expect(result.coordResult).toEqual({ isValid: true, row: 0, col: 0 });
  });

  test('recognises all supported pattern names', () => {
    const patternNames = Object.keys(PATTERNS);
    patternNames.forEach(name => {
      const result = parseCliArgs(['node', 'src/main.js', name]);
      expect(result.patternArg).toBe(name);
      expect(result.pattern).toBe(PATTERNS[name]);
    });
  });

  test('parses a valid coordinate string', () => {
    const result = parseCliArgs(['node', 'src/main.js', 'glider', '5,10']);
    expect(result.coordResult).toEqual({ isValid: true, row: 5, col: 10 });
  });

  test('returns invalid for malformed coordinate input', () => {
    const result = parseCliArgs(['node', 'src/main.js', 'glider', '5-10']);
    expect(result.coordResult.isValid).toBe(false);
    expect(result.coordResult.error).toMatch(/format/);
  });

  test('handles unknown pattern name gracefully', () => {
    const result = parseCliArgs(['node', 'src/main.js', 'unknown']);
    expect(result.pattern).toBeUndefined();
    expect(result.patternArg).toBe('unknown');
  });
});
