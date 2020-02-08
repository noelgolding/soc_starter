// GLOBALS
let canvas, ctx
let scaleX = 1
let scaleY = 1
let aspect_ratio = 1
let mouseX = 0
let mouseY = 0

// createCanvas
function createCanvas(w, h, bg, fg) {
  w = w || 640
  h = h || 480
  aspect_ratio = w/h;
  bg = bg || '#eeeeee'
  fg = fg || '#030366'
  canvas = document.createElement('canvas')
  ctx = canvas.getContext('2d')
  document.getElementById('_soc_app_').appendChild(canvas)

  canvas.addEventListener('mousemove', function(e) {
    mouseX = e.clientX * scaleX
    mouseY = e.clientY * scaleY
  })

  canvas.width = w+1
  canvas.height = h+1
  canvas.style.backgroundColor = bg
  ctx.strokeStyle = ctx.fillStyle = fg
  _scaleCanvas()
}

function _scaleCanvas() {
  if (!canvas) {
    return
  }

  let win_width = window.innerWidth - canvas.getBoundingClientRect().x
  let win_height = window.innerHeight - canvas.getBoundingClientRect().y
  let win_ratio = win_width/win_height;

  let c_width, c_height
  if (win_ratio > aspect_ratio) {
     c_width = canvas.width * win_height/canvas.height;
     c_height = win_height;
  } else {
     c_width = win_width;
     c_height = canvas.height * win_width/canvas.width;
  }

  scaleX = canvas.width / c_width
  scaleY = canvas.height / c_height

  canvas.style.width = c_width+'px';
  canvas.style.height = c_height+'px';
  // this.canvas.style.position = 'absolute';
  // this.canvas.style.top = ((win_height - c_height)/2)+'px';
  // this.canvas.style.left = ((win_width - c_width)/2)+'px';
}

// function createDiv(id, w, bg, fg) {
//   if (!w && canvas) {
//     w = canvas.width
//   } else {
//     w = 640
//   }
//   bg = bg || 'black'
//   fg = fg || 'white'
//   div = document.createElement('div')
//   div.id = id
//   div.style.width = w + 'px'
//   div.style.backgroundColor = bg
//   div.style.color = fg
//   document.body.appendChild(div)
//   // default style textAlign to center
//   div.style.textAlign = 'center'
//   div.style.fontFamily = 'Arial, Helvetica, sans-serif'
//   return div
// }

window.addEventListener('load', () => _scaleCanvas(), false);
window.addEventListener('resize', () => _scaleCanvas(), false);
