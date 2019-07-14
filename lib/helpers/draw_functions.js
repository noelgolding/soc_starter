// requires ctx_helper.js
// requires random.js
// expects canvas and ctx to be defined

function setBgColor(c) {
  canvas.style.backgroundColor = c
}

function setColor(c){
  ctx.setColor(c)
}

function setStrokeColor(c){
  ctx.setStrokeColor(c)
}

function setFillColor(c){
  ctx.setFillColor(c)
}

function drawLine(x1, y1, x2, y2) {
  x1 = x1 || (x1 === 0) ? x1 : random(0, canvas.width)
  y1 = y1 || (y1 === 0) ? y1 : random(0, canvas.height)
  x2 = x2 || (x2 === 0) ? x2 : random(0, canvas.width)
  y2 = y2 || (y2 === 0) ? y2 : random(0, canvas.height)
  ctx.strokeLine(x1, y1, x2, y2)
}

function drawTriangle(x1, y1, x2, y2, x3, y3) {
  x1 = x1 || (x1 === 0) ? x1 : random(0, canvas.width)
  y1 = y1 || (y1 === 0) ? y1 : random(0, canvas.height)
  x2 = x2 || (x2 === 0) ? x2 : random(0, canvas.width)
  y2 = y2 || (y2 === 0) ? y2 : random(0, canvas.height)
  x3 = x3 || (x3 === 0) ? x3 : random(0, canvas.width)
  y3 = y3 || (y3 === 0) ? y3 : random(0, canvas.height)
  ctx.triangle(x1, y1, x2, y2, x3, y3)
}

function drawCircle(x, y, r) {
  r = r || (r === 0) ? r : random(10, Math.min(canvas.width, canvas.height)/2)
  x = x || (x === 0) ? x : random(r, canvas.width-r)
  y = y || (y === 0) ? y : random(r, canvas.height-r)
  ctx.circle(x, y, r)
}

function drawPoint(x, y, r){
  r = r || (r === 0) ? x : .5
  x = x || (x === 0) ? x : random(r, canvas.width-r)
  y = y || (y === 0) ? y : random(r, canvas.height-r)
  ctx.circle(x, y, r)
}

function drawSquare(x, y, l) {
  l = l || (l === 0) ? l: random(10, Math.min(canvas.width, canvas.height)/2)
  x = x || (x === 0) ? x : random(0, canvas.width-l)
  y = y || (y === 0) ? y : random(0, canvas.height-l)
  ctx.rectangle(x, y, l, l)
}

function drawRect(x, y, w, h) {
  w = w || (w === 0) ? w : random(10, canvas.width)
  h = h || (h === 0) ? h : random(10, canvas.height)
  x = x || (x === 0) ? x : random(0, canvas.width-w)
  y = y || (y === 0) ? y : random(0, canvas.height-h)
  ctx.rectangle(x, y, w, h)
}

function drawText(txt, config) {
  let default_cfg = {
    location: new Vector(0,0),
    font: 'monospace',
    size: 16,
    color: ctx.fillStyle,
    italic: false,
    bold: false,
  }

  config = config || {}
  let cfg = {...default_cfg, ...config}

  if (!cfg.valign) {
    if ([TOP_LEFT, TOP_CENTER, TOP_RIGHT].includes(cfg.location)) {
      cfg.valign = VALIGN_TOP
    } else if ([MIDDLE_LEFT, MIDDLE_CENTER, MIDDLE_RIGHT].includes(cfg.location)) {
      cfg.valign = VALIGN_MIDDLE
    } else if ([BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT].includes(cfg.location)) {
      cfg.valign = VALIGN_BOTTOM
    }
  }

  if (!cfg.align) {
    if ([TOP_LEFT, MIDDLE_LEFT, BOTTOM_LEFT].includes(cfg.location)) {
      cfg.align = ALIGN_LEFT
    } else if ([TOP_CENTER, MIDDLE_CENTER, BOTTOM_CENTER].includes(cfg.location)) {
      cfg.align = ALIGN_CENTER
    } else if ([TOP_RIGHT, MIDDLE_RIGHT, BOTTOM_RIGHT].includes(cfg.location)) {
      cfg.align = ALIGN_RIGHT
    }
  }

  ctx.save()
  ctx.translate(cfg.location.x, cfg.location.y)
  ctx.font = `${(cfg.italic) ? 'italic' : ''} ${(cfg.bold) ? 'bold' : ''} ${cfg.size}px ${cfg.font}`.trim()
  ctx.fillStyle = cfg.color
  ctx.textBaseline = cfg.valign
  ctx.textAlign = cfg.align
  ctx.fillText(txt, 0, 0)
  ctx.restore()
}
