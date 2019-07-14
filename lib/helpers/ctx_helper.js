const __spreadPoints = function() {
  const arr = []
  for (a of arguments) {
    if (Array.isArray(a)) {
      arr.push(...a)
    } else {
      arr.push(a)
    }
  }
  return arr
}

let __ctx_fill = false
let __ctx_stroke = true

function stroke() {
  __ctx_stroke = true
}
function noStroke() {
  __ctx_stroke = false
}
function fill() {
  __ctx_fill = true
}
function noFill() {
  __ctx_fill = false
}

CanvasRenderingContext2D.prototype.clearCanvas = function() {
  this.clearRect(0,0,this.canvas.width, this.canvas.height)
}

CanvasRenderingContext2D.prototype.setFillColor = function(color) {
  __ctx_fill = true
  this.fillStyle = color
}

CanvasRenderingContext2D.prototype.setStrokeColor = function(color) {
  __ctx_stroke = true
  this.strokeStyle = color
}

CanvasRenderingContext2D.prototype.setColor = function(color) {
  this.setFillColor(color)
  this.setStrokeColor(color)
}

CanvasRenderingContext2D.prototype.__circle = function(strokeFillFn, x, y, r) {
  this.beginPath()
  this.arc(x, y, r, 0, 2 * Math.PI)
  strokeFillFn()
}

CanvasRenderingContext2D.prototype.__triangle = function(strokeFillFn, ...points) {
  // TODO if points.length != 6 raise exception
  this.__polygon(strokeFillFn, true, __spreadPoints(...points).slice(0, 6))
}

CanvasRenderingContext2D.prototype.__polygon = function(strokeFillFn, shouldClosePath, ...points) {
  // TODO if points.length is not even raise exception
  points = __spreadPoints(...points)
  this.beginPath()
  this.moveTo(points[0], points[1])
  for (let i = 2; i < points.length; i++) {
    this.lineTo(points[i++], points[i])
  }
  if (shouldClosePath) {
    this.closePath()
  }
  strokeFillFn()
}

CanvasRenderingContext2D.prototype.strokeCircle = function(center_x, center_y, radius) {
  this.__circle(() => this.stroke(), center_x, center_y, radius)
}

CanvasRenderingContext2D.prototype.fillCircle = function(center_x, center_y, radius) {
  this.__circle(() => this.fill(), center_x, center_y, radius)
}

CanvasRenderingContext2D.prototype.circle = function(center_x, center_y, radius) {
  if (__ctx_fill)
    this.fillCircle(center_x, center_y, radius)
  if (__ctx_stroke)
    this.strokeCircle(center_x, center_y, radius)
}

CanvasRenderingContext2D.prototype.strokeTriangle = function(...points) {
  this.__triangle(() => this.stroke(), ...points)
}

CanvasRenderingContext2D.prototype.fillTriangle = function(...points) {
  this.__triangle(() => this.fill(), ...points)
}

CanvasRenderingContext2D.prototype.triangle = function(...points) {
  if (__ctx_fill)
    this.fillTriangle(...points)
  if (__ctx_stroke)
    this.strokeTriangle(...points)
}

CanvasRenderingContext2D.prototype.strokePolygon = function(...points) {
  this.__polygon(() => this.stroke(), true, ...points)
}

CanvasRenderingContext2D.prototype.fillPolygon = function(...points) {
  this.__polygon(() => this.fill(), true, ...points)
}

CanvasRenderingContext2D.prototype.polygon = function(...points) {
  if (__ctx_fill)
    this.fillPolygon(...points)
  if (__ctx_stroke)
    this.strokePolygon(...points)
}

CanvasRenderingContext2D.prototype.strokeLine = function(...points) {
  this.__polygon(() => this.stroke(), false, ...points)
}

CanvasRenderingContext2D.prototype.rectangle = function(x, y, w, h) {
  if (__ctx_fill)
    this.fillRectangle(x, y, w, h)
  if (__ctx_stroke)
    this.strokeRectangle(x, y, w, h)
}

// aliases
CanvasRenderingContext2D.prototype.line = CanvasRenderingContext2D.prototype.strokeLine
CanvasRenderingContext2D.prototype.strokeRectangle = CanvasRenderingContext2D.prototype.strokeRect
CanvasRenderingContext2D.prototype.fillRectangle = CanvasRenderingContext2D.prototype.fillRect
