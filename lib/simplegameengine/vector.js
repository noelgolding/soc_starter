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

function createRandomCanvasVector() {
  let x = random(0, canvas.width)
  let y = random(0, canvas.height)
  return new Vector(x, y)
}

function createNormalizedRandomVector() {
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

class Vector extends Position {
  constructor(x, y) {
    super(x, y)
  }

  normalize() {
    this.div(this.getMagnitude())
  }

  add(vector) {
    this.x += vector.x
    this.y += vector.y
  }

  sub(vector) {
    this.x -= vector.x
    this.y -= vector.y
  }

  mult(value) {
    this.x *= value
    this.y *= value
  }

  div(value) {
    this.x /= value
    this.y /= value
  }

  rotate(degrees) {
    let heading = this.getAngleInRadians() + (degrees * Math.PI / 180)
    let l = this.length
    this.x = Math.cos(heading) * l;
    this.y = Math.sin(heading) * l;
  }

  get length() {
    return this.getMagnitude()
  }

  getMagnitude() {
    // c = Math.sqrt((a ** a) + (b ** b))
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  getAngleInRadians() {
    return Math.atan2(this.y, this.x)
  }

  getAngleInDegrees() {
    return this.getAngleInRadians() * 180 / Math.PI
  }

  clone() {
    return new Vector(this.x, this.y)
  }

  // TODO :
  // calcDistance(vector)

}