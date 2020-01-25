/**
 * Returns a random integer between min and max inclusive
 * @param {int} min the minimum number
 * @param {int} max the maximum number
 * @returns {int} a random integer between min and max inclusive
 */
function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let n = min
  for (let i = 0; i < 17; i++) {
    n = Math.random()
  }
  return Math.floor(n * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function randomPercent() {
  return Math.random() * 100
}

function randomProbability(probability) {
  return randomPercent() <= probability
}

/**
 * Returns a random item from the provided items to chose from
 * @param {...*} items - one or more items to chose from
 * @returns {*} one randomly chosen item
 */
function randomChoice(...items) {
  let idx = random(0, items.length - 1)
  return items[idx]
}

function map(oldValue, oldMin, oldMax, newMin, newMax) {
  oldRange = oldMax - oldMin
  newRange = newMax - newMin
  newValue = (((oldValue - oldMin) * newRange) / oldRange) + newMin
  return newValue
}
