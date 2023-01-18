const path = require('path');

/**
 * Returns real path to testing module depend on environment.
 * For both task development and students task soling returns path task module.
 * If env:SOLUTION returns path to solution.
 *
 * @param {string} modulePath - Relative path to module from TASK_SRC_ROOT
 * @return {string} Real relative path to testing module from test
 */
function getSolutionPath(modulePath) {
  return process.env.SOLUTION ? path.join('..', '..', 'solution', modulePath) : path.join('..', modulePath);
}

module.exports = {
  getSolutionPath,
};
