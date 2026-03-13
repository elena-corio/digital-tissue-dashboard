// Utility to normalize a value between min and max, handling directionality
// Returns a value between 0 and 1
// Normalize a value between left and right, handling directionality
// Returns a value between 0 and 1
export function normalize(value, left, right) {
  if (left === undefined || right === undefined || value === undefined) return 0;
  // If left < right, normal case
  if (left < right) {
    return (value - left) / (right - left);
  } else {
    // If left > right, invert
    return (left - value) / (left - right);
  }
}
