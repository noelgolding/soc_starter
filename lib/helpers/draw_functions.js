// requires ctx_helper.js
// requires random.js
// expects canvas and ctx to be defined

draw_debugger = false

function print_debug(...args){
  if (draw_debugger)
    print(...args)
}

function setBgColor(c) {
  canvas.style.backgroundColor = c
  print_debug(`set background color to ${c}`)
}
const set_bg_color = setBgColor

function setColor(c) {
  ctx.setColor(c)
  print_debug(`set foreground color to ${c}`)

}
const set_txt_color = setColor
const set_text_color = setColor

function setStrokeColor(c) {
  ctx.setStrokeColor(c)
  print_debug(`set stroke color to ${c}`)
}
const set_outline_color = setStrokeColor

function setFillColor(c) {
  ctx.setFillColor(c)
  print_debug(`set fill color to ${c}`)
}
const set_fill_color = setFillColor

function drawLine(x1, y1, x2, y2) {
  x1 = x1 || (x1 === 0) ? x1 : random(0, canvas.width)
  y1 = y1 || (y1 === 0) ? y1 : random(0, canvas.height)
  x2 = x2 || (x2 === 0) ? x2 : random(0, canvas.width)
  y2 = y2 || (y2 === 0) ? y2 : random(0, canvas.height)
  ctx.strokeLine(x1, y1, x2, y2)
  print_debug(`draw line from (${x1}, ${y1}) to (${x2}, ${y2})`)
}
const line = drawLine
const draw_line = drawLine

function drawTriangle(x1, y1, x2, y2, x3, y3) {
  x1 = x1 || (x1 === 0) ? x1 : random(0, canvas.width)
  y1 = y1 || (y1 === 0) ? y1 : random(0, canvas.height)
  x2 = x2 || (x2 === 0) ? x2 : random(0, canvas.width)
  y2 = y2 || (y2 === 0) ? y2 : random(0, canvas.height)
  x3 = x3 || (x3 === 0) ? x3 : random(0, canvas.width)
  y3 = y3 || (y3 === 0) ? y3 : random(0, canvas.height)
  ctx.triangle(x1, y1, x2, y2, x3, y3)
  print_debug(`draw a triangle with the points (${x1}, ${y1}), (${x2}, ${y2}), (${x3}, ${y3})`)
}
const tri = drawTriangle
const triangle = drawTriangle
const draw_triangle = drawTriangle

function drawCircle(x, y, r, c) {
  r = r || (r === 0) ? r : random(10, Math.min(canvas.width, canvas.height) / 2)
  x = x || (x === 0) ? x : random(r, canvas.width - r)
  y = y || (y === 0) ? y : random(r, canvas.height - r)
  ctx.save()
  if (c) {
    ctx.setColor(c)
  }
  ctx.circle(x, y, r)
  ctx.restore()
  print_debug(`draw a circle where the center is located at (${x}, ${y}) with a radius of ${r}`)
}
const circle = drawCircle
const draw_circle = drawCircle

function drawPoint(x, y, r) {
  r = r || (r === 0) ? r : .5
  x = x || (x === 0) ? x : random(r, canvas.width - r)
  y = y || (y === 0) ? y : random(r, canvas.height - r)
  ctx.save()
  ctx.fillCircle(x, y, r)
  ctx.restore()
  print_debug(`draw a point at (${x}, ${y})`)
}
const point = drawPoint
const draw_point = drawPoint

function drawSquare(x, y, l) {
  l = l || (l === 0) ? l : random(10, Math.min(canvas.width, canvas.height) / 2)
  x = x || (x === 0) ? x : random(0, canvas.width - l)
  y = y || (y === 0) ? y : random(0, canvas.height - l)
  ctx.rectangle(x, y, l, l)
  print_debug(`draw a square where the top left corner is at (${x}, ${y}) with a size of ${l} and height of ${l}`)
}
const square = drawSquare
const draw_square = drawSquare

function drawRect(x, y, w, h) {
  w = w || (w === 0) ? w : random(10, canvas.width)
  h = h || (h === 0) ? h : random(10, canvas.height)
  x = x || (x === 0) ? x : random(0, canvas.width - w)
  y = y || (y === 0) ? y : random(0, canvas.height - h)
  ctx.rectangle(x, y, w, h)
   print_debug(`draw a rectangle where the top left corner is at (${x}, ${y}) with a width of ${w} and height of ${h}`)
}
const rect = drawRect
const draw_rect = drawRect

function drawText(txt, config) {
  let default_cfg = {
    location: TOP_CENTER,
    font: 'monospace',
    size: 16,
    color: ctx.fillStyle,
    italic: false,
    bold: false,
  }

  config = config || {}
  let cfg = new SimpleGameConfig(default_cfg, config)
  let location = cfg.get('location')
  let color = cfg.get('color')
  let italic = `${cfg.get('italic') ? 'italic' : ''}`
  let bold = `${cfg.get('bold') ? 'bold' : ''}`
  let font_size = `${cfg.get('size')}px`
  let font_face = `${cfg.get('font')}`
  let align = cfg.get('align')
  let valign = cfg.get('valign')

  if (!valign) {
    if ([TOP_LEFT, TOP_CENTER, TOP_RIGHT].includes(location)) {
      valign = VALIGN_TOP
    } else if ([MIDDLE_LEFT, MIDDLE_CENTER, MIDDLE_RIGHT].includes(location)) {
      valign = VALIGN_MIDDLE
    } else if ([BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT].includes(location)) {
      valign = VALIGN_BOTTOM
    }
  }

  if (!align) {
    if ([TOP_LEFT, MIDDLE_LEFT, BOTTOM_LEFT].includes(location)) {
      align = ALIGN_LEFT
    } else if ([TOP_CENTER, MIDDLE_CENTER, BOTTOM_CENTER].includes(location)) {
      align = ALIGN_CENTER
    } else if ([TOP_RIGHT, MIDDLE_RIGHT, BOTTOM_RIGHT].includes(location)) {
      align = ALIGN_RIGHT
    }
  }

  ctx.save()
  ctx.translate(location.x, location.y)
  ctx.font = `${italic} ${bold} ${font_size} ${font_face}`.trim()
  ctx.fillStyle = color
  ctx.textBaseline = valign
  ctx.textAlign = align
  ctx.fillText(`${txt}`, 0, 0)
  ctx.restore()
}

function drawImage(name, ...coords) {
  let img = loadImage(name)
  if (coords.length < 2) {
    coords[0] = 0
    coords[1] = 0
  }
  if (img.ready === true) {
    ctx.drawImage(img, ...coords)
  } else {
    img.onload = () => {
      ctx.drawImage(img, ...coords)
    }
  }
}

function drawGrid(){
    const WIDTH = canvas.width
    const HEIGHT = canvas.height
    ctx.lineWidth=.15
    for (x = 0; x <= WIDTH; x+=10) {
        line(x, 0, x, HEIGHT)
    }
    for (y = 0; y <= HEIGHT; y+= 10) {
        line(0, y, WIDTH, y)
    }
    line(0,HEIGHT/2, WIDTH, HEIGHT/2)
    line(WIDTH/2,0, WIDTH/2,HEIGHT)

    ctx.lineWidth=1
}

function createGrid(w, h) {
    w = w || 400
    h = h || 300
    createCanvas(400,300)
    drawGrid()
}

const say = console.log
const print = console.log
