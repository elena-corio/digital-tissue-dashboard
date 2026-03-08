// Utility to normalize a value between min and max, handling directionality
// Returns a value between 0 and 1
export function normalize(value, min, max, type = 'higher-is-better') {
  if (min === undefined || max === undefined || value === undefined) return 0;
  if (type === 'higher-is-better') {
    return (value - min) / (max - min);
  } else {
    // lower-is-better: invert
    return (max - value) / (max - min);
  }
}
