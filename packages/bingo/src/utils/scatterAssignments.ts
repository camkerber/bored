import {BOARD_SIZE, FREE_SPACE_INDEX} from "./constants";

// Returns a permutation of board cell indices keyed by input-row index.
// `hasFreeSpace` reserves index 12 (which isn't returned in the permutation;
// callers render the free-space label there separately).
export function buildScatterMap(
  inputCount: number,
  hasFreeSpace: boolean,
  seed: number,
): number[] {
  const available: number[] = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    if (hasFreeSpace && i === FREE_SPACE_INDEX) continue;
    available.push(i);
  }
  // Deterministic Fisher–Yates using a tiny LCG so re-renders don't reshuffle.
  let state = seed >>> 0 || 1;
  for (let i = available.length - 1; i > 0; i--) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const j = state % (i + 1);
    [available[i], available[j]] = [available[j], available[i]];
  }
  return available.slice(0, inputCount);
}
