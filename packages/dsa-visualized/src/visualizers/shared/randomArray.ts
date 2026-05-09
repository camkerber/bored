export const randomArray = (n = 10, lo = 5, hi = 95): number[] =>
  Array.from({length: n}, () => Math.floor(Math.random() * (hi - lo)) + lo);

export const randomSortedArray = (n = 10, lo = 5, hi = 95): number[] =>
  randomArray(n, lo, hi).sort((a, b) => a - b);
