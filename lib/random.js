function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let n = min
  for (let i = 0; i < 17; i++) {
    n = Math.random()
  }
  return Math.floor(n * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function randomChoice(arr) {
  let idx = random(0, arr.length - 1)
  return arr[idx]
}

function map(oldValue, oldMin, oldMax, newMin, newMax) {
  oldRange = oldMax - oldMin
  newRange = newMax - newMin
  newValue = (((oldValue - oldMin) * newRange) / oldRange) + newMin
  return newValue
}