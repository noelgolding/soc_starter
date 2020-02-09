/**
 * Returns a random vector
 * @returns {Vector} a random vector
 */
function createRandomVector() {
  let x = random(0, canvas.width)
  let y = random(0, canvas.height)
  if (Math.random() < .5) {
    x = -x
  }
  if (Math.random() < .5) {
    y = -y
  }
  return new Vector(x, y)
}

/**
 * Returns a random vector bounded within the canvas
 * @returns {Vector} a random vector bounded within the canvas
 */
function randomLoc() {
  let x = random(0, canvas.width)
  let y = random(0, canvas.height)
  return new Vector(x, y)
}

/**
 * Returns  a random normalized vector
 * @returns {Vector} a random normalized vector
 */
function randomDir() {
  let v = createRandomVector()
  v.normalize()
  return v
}

class Position {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

/**
 * A Vector class
 */
class Vector extends Position {
  constructor(x, y) {
    super(x, y)
  }

  /**
   * @public
   */
  normalize() {
    this.div(this.getMagnitude())
  }

  /**
   * @public
   * @param {Vector} vector the Vector to add to this vector
   */
  add(vector) {
    this.x += vector.x
    this.y += vector.y
    return this
  }

  /**
   * @public
   * @param {Vector} vector the Vector to subtract from this vector
   */
  sub(vector) {
    this.x -= vector.x
    this.y -= vector.y
    return this
  }

  /**
   * @public
   * @param {number} value the amount to multiply to this vector
   */
  mult(value) {
    this.x *= value
    this.y *= value
    return this
  }

  /**
   * @public
   * @param {number} value the amount to divide by
   */
  div(value) {
    this.x /= value
    this.y /= value
    return this
  }

  /**
   * @public
   * @param {number} degrees the degrees to rotate this vector
   */
  rotate(degrees) {
    let heading = this.getAngleInRadians() + (degrees * Math.PI / 180)
    let l = this.length
    this.x = Math.cos(heading) * l;
    this.y = Math.sin(heading) * l;
    return this
  }

  /**
   * @public
   * @type {number}
   */
  get length() {
    return this.getMagnitude()
  }

  /**
   * @public
   * @returns {number} the length of this vector
   */
  getMagnitude() {
    // c = Math.sqrt((a ** a) + (b ** b))
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  /**
   * @public
   * @returns {number} the angle of the vector in radians
   */
  getAngleInRadians() {
    return Math.atan2(this.y, this.x)
  }

  /**
   * @public
   * @returns {number} the angle of the vector in degrees
   */
  getAngleInDegrees() {
    return this.getAngleInRadians() * 180 / Math.PI
  }

  /**
   * @public
   * @returns {Vector} a clone of this vector
   */
  clone() {
    return new Vector(this.x, this.y)
  }

  // TODO :
  // calcDistance(vector)

}
