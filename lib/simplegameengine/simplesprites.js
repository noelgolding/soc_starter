/**
* @virtual
*/
class Sprite {
  constructor(config) {
    let default_cfg = {
      width: () => random(10, canvas.width-10),
      height: () => random(10, canvas.height-10),
      location: createRandomVector,
      direction: () => randomChoice([LEFT, RIGHT]),
      edges: BLACKHOLE,
      velocity: STOPPED,
      outline: 'green',
      fill: 'green',
      display: true,
      collisionHandler: (src, target) => {},
      flipX: true,
      flipY: false,
      maxSpeed: 20,
      rotateSpeed: 0,
      imageChoices: [],
      image: null,
      move: false,
      bullet: {},
    }

    config = config || {}
    this.cfg = {...default_cfg, ...config}
    this.img = null
    this.imgs = []
    this.setImage(this.getConfigValue('image'))
    this.setImages(...this.getConfigValue('imageChoices'))

    this.o = this.getConfigValue('outline')
    this.f = this.getConfigValue('fill')

    this.flipX = this.getConfigValue('flipX')
    this.edges = this.getConfigValue('edges')
    this.maxSpeed = this.getConfigValue('maxSpeed')
    this.collisionHandler = this.cfg.collisionHandler

    this.game = null

    this.spawn()
    this.previousLocation = this.location.clone()
  }

  getConfigValue(name) {
    if (typeof this.cfg[name] === 'function') {
      return this.cfg[name]()
    } else {
      return this.cfg[name]
    }
  }

  respawn() {
    if (this.imgs.length > 1) {
      this.setImage(randomChoice(this.imgs))
    }
    if (this instanceof CircleSprite) {
      this.r = this.getConfigValue('radius')
    }
    this.width = this.getConfigValue('width')
    this.height = this.getConfigValue('height')
    this.display = this.getConfigValue('display')
    this.rotateSpeed = this.getConfigValue('rotateSpeed')
    this.angle = 0
    this.value = this.getConfigValue('value')
    this.location = this.getConfigValue('location')
    this.velocity = this.getConfigValue('velocity')
    if (this.getConfigValue('move')) {
      this.direction = STOPPED
      this.changeDirection(this.getConfigValue('direction'))
    } else {
      this.direction = this.getConfigValue('direction')
    }
  }
  spawn = this.respawn // alias

  setImage(image) {
    if (!image) {
      return
    }
    if (image instanceof Image) {
      this.img = image
    } else {
      this.img = this._loadImage(image)
    }
  }

  setImages(...images) {
    if (images.length < 1) {
      return
    }
    this.imgs = []
    for (let image of images) {
      this.imgs.push(this._loadImage(image))
    }
    this.setImage(randomChoice(this.imgs))
  }

  _loadImage(image) {
    let img = new Image()
    img.onload = () => {
      img.ready = true
    }
    img.src = "../../assets/images/" + image
    return img
  }
  
  changeDirection(direction) {
    if(this.direction != direction) {
      this.move(direction)
    }
  }

  move(direction) {
    // if (direction === LEFT || direction === RIGHT)
    this.direction = direction
    this.velocity = direction.clone()
    this.velocity.mult(this.maxSpeed)
  }

  stop() {
    this.velocity.mult(0)
  }

  update(delta){
    this.previousLocation = this.location.clone()
    let v = this.velocity.clone()
    v.mult(delta)
    this.location.add(v)
    this.angle += this.rotateSpeed * delta

    this.checkEdges()
  }

  checkEdges() {
    switch(this.edges){
      case WARP:
        return this.wrapEdges()
      case CLAMP:
        return this.stopAtEdges()
      case BOUNCE:
        return this.bounceOffEdges()
      case BLACKHOLE:
        return this.blackholeEdges()
    }
  }

  wrapEdges(){
    let rect = this.getBoundingRect()
    // check top and bottom
    if(rect.bottom <= 0) {
      this.location.y = canvas.height + rect.height/2
    } else if (rect.top >= canvas.height){
      this.location.y = 0 - rect.height/2
    }
    // check right and left
    if(rect.right <= 0) {
      this.location.x = canvas.width + rect.width/2
    } else if (rect.left >= canvas.width){
      this.location.x = 0 - rect.width/2
    }
  }

  stopAtEdges() {
    let rect = this.getBoundingRect()
    // check top and bottom
    if(rect.top <= 0) {
      this.location.y = 0 + rect.height/2
      this.stop()
    } else if (rect.bottom >= canvas.height){
      this.location.y = canvas.height - rect.height/2
      this.stop()
    }
    // check left and right
    if(rect.left <= 0) {
      this.location.x = 0 + rect.width/2
      this.stop()
    } else if (rect.right >= canvas.width){
      this.location.x = canvas.width - rect.width/2
      this.stop()
    }
  }

  bounceOffEdges() {
    let rect = this.getBoundingRect()
    // check top and bottom
    if(rect.top <= 0) {
      this.location.y = 0 + rect.height/2
      this.velocity.y *= -1
    } else if (rect.bottom >= canvas.height){
      this.location.y = canvas.height - rect.height/2
      this.velocity.y *= -1
    }
    // check left and right
    if(rect.left <= 0) {
      this.location.x = 0 + rect.width/2
      this.velocity.x *= -1
    } else if (rect.right >= canvas.width){
      this.location.x = canvas.width - rect.width/2
      this.velocity.x *= -1
    }
  }

  blackholeEdges(){
    if (this.game) {
      let rect = this.getBoundingRect()
      if(
          rect.bottom <= 0 ||
          rect.top >= canvas.height ||
          rect.right <= 0 ||
          rect.left >= canvas.width
        ) {
        this.game.remove(this)
      }
    }
  }

  draw(){
    if (!this.display) {
      return
    }

    if (this.o) {
      setStrokeColor(this.o)
    } else {
      noStroke()
    }
    if (this.f) {
      setFillColor(this.f)
    } else {
      noFill()
    }

    if (this.img && this.img.ready) {
      ctx.save()
      let rect = this.getBoundingRect()
      ctx.translate(rect.centerX, rect.centerY)
      ctx.rotate(this.angle * Math.PI / 180)
      if (this.flipX && this.direction.x !== 0) {
        let xscale = (this.direction.x < 0) ? -1 : 1
        ctx.scale(xscale, 1)
      }

      if (this.flipY && this.direction.y !== 0) {
        let yscale = (this.direction.x < 0) ? 1 : -1
        ctx.scale(1, yscale)
      }

      ctx.drawImage(this.img, 0-rect.width/2, 0-rect.height/2, rect.width, rect.height)
      ctx.restore()
    } else {
      this.drawInternal()
    }

    this.drawDebug()
  }

  drawInternal(){
    // TODO
    // draw a rect
    // with a circle
    // and a point
  }

  drawDebug(){
    if (this.game && this.game.debug) {
      ctx.save()
      let rect = this.getBoundingRect()
      ctx.translate(rect.centerX, rect.centerY)

      ctx.lineWidth = 1
      ctx.strokeStyle = 'black'
      ctx.strokeRect(0-rect.width/2, 0-rect.height/2, rect.width, rect.height)

      let ga = ctx.globalAlpha
      ctx.globalAlpha = .3
      ctx.fillStyle = 'yellow'
      ctx.globalAlpha = ga

      let radians = this.direction.getAngleInRadians()
      ctx.rotate(radians)
      ctx.line(0, 0, rect.width/2 + 5, 0)
      ctx.triangle(rect.width/2 + 5, 0, rect.width/2, 5, rect.width/2, -5)
      ctx.restore()
    }
  }

  collidesWith(otherSprite) {
    if (this instanceof RectSprite) {
      if(otherSprite instanceof RectSprite) {
        return rectCollision(this, otherSprite)
      } else {
        return rectCircleCollision(this, otherSprite)
      }
    } else {
      if(otherSprite instanceof CircleSprite) {
        return circleCollision(this, otherSprite)
      } else {
        return rectCircleCollision(otherSprite, this)
      }
    }
  }

  clone(){
    return Object.create(this)
  }
}

class RectSprite extends Sprite{
  constructor(config) {
    super(config)
  }

  drawInternal() {
    ctx.save()
    let rect = this.getBoundingRect()
    ctx.translate(rect.left, rect.top)
    ctx.rotate(this.angle * Math.PI / 180)
    ctx.rectangle(0,0,rect.width,rect.height)
    ctx.restore()
  }

  getBoundingRect(){
    let rect = {}
    if (this.img && this.img.ready) {
      let width, height
      if (this.width >= this.height) {
        width = this.width
        height = this.height * this.width/this.img.width
      } else {
        width = this.width * this.height/this.img.height
        height = this.height
      }

      let left = this.location.x - this.width/2
      let top = this.location.y - height/2
      let right = left + this.width
      let bottom = top + height
      let centerX = left + this.width/2
      let centerY = top + height/2
      rect = {
        width: this.width,
        height,
        left,
        top,
        right,
        bottom,
        centerX,
        centerY
      }
    } else {
      rect = {
        width: this.width,
        height: this.height,
        left: this.location.x,
        top: this.location.y,
        right: this.location.x + this.width,
        bottom: this.location.y + this.height,
        centerX: this.location.x + this.width/2,
        centerY: this.location.y + this.height/2
      }
    }
    return rect
  }
}

class CircleSprite extends Sprite {
  constructor(config){
    config = config || {}
    super(config)
    if (!config.radius) {
      this.cfg.radius = () => random(10, Math.min(canvas.width, canvas.height)/2)
    }
    if(!config.width) {
      this.cfg.width =  () => this.r*2
    }
    if(!config.height) {
      this.cfg.height = () => this.r*2
    }
    this.spawn()
  }

  drawInternal() {
    ctx.save()
    ctx.translate(this.location.x, this.location.y)
    ctx.rotate(this.angle * Math.PI / 180)
    ctx.circle(0,0,this.r)
    ctx.restore()
  }

  getBoundingRect(){
    let rect = {}
    if (this.img && this.img.ready) {
      let width = this.r * 2
      let s = width/this.img.width
      let height = this.img.height * s
      let left = this.location.x - width/2
      let top = this.location.y - height/2
      let right = left + width
      let bottom = top + height
      let centerX = left + width/2
      let centerY = top + height/2
      rect = {
        width,
        height,
        left,
        top,
        right,
        bottom,
        centerX,
        centerY
      }
    } else {
      rect = {
        width: this.r * 2,
        height: this.r * 2,
        left: this.location.x - this.r,
        top: this.location.y - this.r,
        right: this.location.x + this.r,
        bottom: this.location.y + this.r,
        centerX: this.location.x,
        centerY: this.location.y
      }
    }
    return rect
  }
}

class PlayerSprite extends CircleSprite {
  constructor(config) {
    let default_cfg = {
      radius: 24,
      location: new Vector(canvas.width/2, canvas.height/2),
      outline: 'blue',
      fill: 'green',
    }
    config = config || {} 
    super({...default_cfg, ...config})
    this.id = PLAYER_ID
    this.readyToShoot = true

    this.controls = {
      up: [KEY_W, KEY_UP],
      down: [KEY_S, KEY_DOWN],
      left: [KEY_A, KEY_LEFT],
      right: [KEY_D, KEY_RIGHT],
      fire: [KEY_SPACE],
      jump: [KEY_SPACE],
    }

  }

  setControls(config) {
    this.controls = {...{
      up: [],
      down: [],
      left: [],
      right: [],
      fire: [],
      jump:[]}, ...config}
  }

  update(delta) {
    this.stop()
    if (this.controls.up.reduce((a, c) => this.game.keysPressed[c] || a, false)) {
      this.move(UP)
    } else if (this.controls.down.reduce((a, c) => this.game.keysPressed[c] || a, false)) {
      this.move(DOWN)
    }
    
    if (this.controls.left.reduce((a, c) => this.game.keysPressed[c] || a, false)) {
      this.move(LEFT)
    } else if (this.controls.right.reduce((a, c) => this.game.keysPressed[c] || a, false)) {
      this.move(RIGHT)
    }
    
    if (this.controls.fire.reduce((a, c) => this.game.keysPressed[c] || a, false)) {
      if (this.readyToShoot) {
        if (this.getConfigValue('projectile')) {
          this.readyToShoot = false
          let cfg = this.getConfigValue('projectile')
          cfg.gun = this;
          game.add(new BulletSprite(cfg))
          setTimeout(() => this.readyToShoot = true, cfg.resetTime || 300)
        }
      }
    }
    super.update(delta)
  }

}

class PowerUpSprite extends CircleSprite {
  constructor(config) {
    let default_r = random(8, 16)
    let default_cfg = {
      radius: default_r,
      outline: 'darkgoldenrod',
      fill: 'goldenrod',
      edges: BOUNCE,
    }
    config = config || {}
    super({...default_cfg, ...config})
    this.id = POWER_UP_ID
    this.cfg.value = () => Math.floor(this.getConfigValue('radius') / 2)
    this.value = this.getConfigValue('value')
  }
}

class EnemySprite extends CircleSprite {
  constructor(config) {
    let default_cfg = {
      radius: () => random(8, 24),
      outline: 'darkred',
      fill: 'pink',
      edges: BOUNCE,
    }
    config = config || {}
    super({...default_cfg, ...config})
    this.id = ENEMY_ID
    this.cfg.value = () => Math.floor(this.getConfigValue('radius') * 2)
    this.value = this.getConfigValue('value')
  }
}

class BulletSprite extends RectSprite{
  constructor(config) {
    let default_cfg = {
      outline: 'orange',
      fill: 'purple',
      edges: BLACKHOLE,
      move: true,
    }
    config = config || {}
    if (!config.gun) {
      throw new Error('Missing config option ["gun:"]\nYou must supply a sprite to act as the gun')
    }
    if (config.width && !config.height || config.height && !config.width) {
      throw new Error('Missing config options ["width:"] ["height:"]\nIf you set either the width or the height, you need to set both')
    }
    if (!config.maxSpeed){
      config.maxSpeed = config.gun.maxSpeed + 10
    }
    super({...default_cfg, ...config})
    this.id = BULLET_ID
    // adjust the bullet to match the appropriate aspect ratio if necessary
    if (!config.width && !config.height) {
      if ([LEFT, RIGHT].includes(this.direction)) {
        // horizontal
        this.cfg.width = 24
        this.cfg.height = 12
      } else {
        // vertical
        this.cfg.width = 12
        this.cfg.height = 24
      }
      this.width = this.getConfigValue('width')
      this.height = this.getConfigValue('height')
    }
    this.location = this.cfg.gun.location.clone()
  }
}

class TextSprite {
  constructor(config){
    this.id = TEXT_ID
    this.cfg = config || {}
    if (this.cfg.text) {
      this.text = "`" + this.cfg.text + "`"
    }
  }

  draw() {
    let txt = eval(this.text)
    drawText(txt, this.cfg)
  }
}
