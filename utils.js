/**
 * @param {import('./index').Options['mappings']} mappings
 * @returns
 */
const normalizeMappings = (mappings = {}) => {
  /** @type {import('./index').Options['mappings']} */
  const newMappings = {};
  Object.keys(mappings).forEach(prop => {
    const value = mappings[prop];
    if (value) {
      if (value.fontFamily) {
        newMappings[prop] = value;
      } else if (Array.isArray(value)) {
        newMappings[prop] = {
          fontFamily: value[0],
          fontWeight: value[1],
        };
      }
    }
  });
  return newMappings;
};

module.exports = {
  normalizeMappings,
};
