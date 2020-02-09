// requires ctx_helper.js
// requires random.js
// expects canvas and ctx to be defined

function setBgColor(c) {
  canvas.style.backgroundColor = c
}

function setColor(c) {
  ctx.setColor(c)
}

function setStrokeColor(c) {
  ctx.setStrokeColor(c)
}

function setFillColor(c) {
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
}

function drawPoint(x, y, r) {
  r = r || (r === 0) ? x : .5
  x = x || (x === 0) ? x : random(r, canvas.width - r)
  y = y || (y === 0) ? y : random(r, canvas.height - r)
  ctx.circle(x, y, r)
}

function drawSquare(x, y, l) {
  l = l || (l === 0) ? l : random(10, Math.min(canvas.width, canvas.height) / 2)
  x = x || (x === 0) ? x : random(0, canvas.width - l)
  y = y || (y === 0) ? y : random(0, canvas.height - l)
  ctx.rectangle(x, y, l, l)
}

function drawRect(x, y, w, h) {
  w = w || (w === 0) ? w : random(10, canvas.width)
  h = h || (h === 0) ? h : random(10, canvas.height)
  x = x || (x === 0) ? x : random(0, canvas.width - w)
  y = y || (y === 0) ? y : random(0, canvas.height - h)
  ctx.rectangle(x, y, w, h)
}

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
