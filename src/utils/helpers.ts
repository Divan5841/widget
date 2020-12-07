export const getRangeArray = (start: number, end: number): number[] =>
  Array(end - start + 1)
    .fill(0)
    .map((_, idx) => start + idx)
