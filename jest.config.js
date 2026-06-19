module.exports = {
  // Only collect coverage from src/gol.js (this ignores src/main.js)
  collectCoverageFrom: [
    "src/gol.js"
  ],
  
  // Enforce 80% minimum coverage across all metrics
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
