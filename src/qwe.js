const getRangeArray = (start, end) =>
  Array(end - start + 1)
    .fill(0)
    .map((_, idx) => start + idx)

const w = [
  [0, 3],
  [6, 9],
]

const e = w.reduce((acc, item, index) => {
  if (index === 0) {
    if (item[0] !== 0) {
      acc.push([0, item[0]])
    }

    acc.push(item)
    return acc
  }

  if (item[0] !== acc[acc.length - 1][1]) {
    acc.push([acc[acc.length - 1][1], item[0]])
  }

  acc.push(item)

  if (index === w.length - 1) {
    acc.push([item[1], 11])
  }

  return acc
}, [])

console.log('e', e)
