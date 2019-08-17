image_map = {}

function loadImage(image) {
  let img = image_map[image]

  if (!img) {
    img = new Image()
    img.onload = () => {
      img.ready = true
    }
    img.src = "../../assets/images/" + image
    image_map[image] = img
  }
  return img
}

class SimpleGameConfig extends Config {
  constructor(default_cfg, config) {
    default_cfg = default_cfg || {}
    config = config || {}
    config = {
      ...default_cfg,
      ...config
    }
    let label = (config.label) ? config.label : "SimpleGameConfig"
    delete config.label
    super(label, config)
  }

  get(key) {
    let value = this.getRawValue(key)
    let max_iterations = 5
    let current_iteration = 0
    while (typeof value === "function" && current_iteration++ < max_iterations) {
      value = value()
    }
    return value
  }

  getRawValue(key) {
    return this[this._getKey(key)]
  }

  keys() {
    return keys(this).sort()
  }
}

class Game {
  constructor(config) {
    let default_cfg = {
      title: 'Untitled Game',
      backgroundColor: null,
      backgroundImage: null,
      fps: 60,
      keyPressedHandler: () => {},
      keyReleasedHandler: () => {},
      update: () => {},
      paused: false,
    }
    this.cfg = new SimpleGameConfig(default_cfg, config)
    this.score = 0
    //Set the frame rate
    this.fps = this.cfg.get('fps')
    //Get the start time
    this.paused = this.cfg.get('paused')
    this.timestart = Date.now()
    this.elapsedTime = 0
    //Set the frame duration in milliseconds
    // this.frameDuration = 1000 / this.fps
    //Initialize the lag offset
    // this.lag = 0

    this.keyPressedHandler = this.cfg.getRawValue('keyPressedHandler')
    this.keyReleasedHandler = this.cfg.getRawValue('keyReleasedHandler')
    this.customUpdate = this.cfg.getRawValue('update')

    this.title = this.cfg.get('title')
    if (window.location.href.includes("/wip")) {
      this.title += " - (WIP)"
    }
    this.setTitle()
    createCanvas()
    if (this.cfg.get('backgroundColor')) {
      this.setBgColor(this.cfg.get('backgroundColor'))
    }
    if (this.cfg.get('backgroundImage')) {
      this.setBackground(this.cfg.get('backgroundImage'))
    }

    this.gameObjects = {
      [PLAYER_ID]: [],
      [POWER_UP_ID]: [],
      [ENEMY_ID]: [],
      [PLATFORM_ID]: [],
      [BULLET_ID]: [],
      [TEXT_ID]: []
    }

    // attach keyboard listener
    this.keysPressed = {}
    window.addEventListener('keydown', (e) => this.keydownhandler(e))
    window.addEventListener('keyup', (e) => this.keyuphandler(e))

    this.start()
  }

  addToScore(num) {
    this.score += num
  }

  subtractFromScore(num) {
    this.score -= num
  }

  setTitle() {
    if (this.title) {
      document.title = this.title
    }
  }

  setBgColor(c) {
    canvas.style.backgroundColor = c
  }

  setBackground(image) {
    this.backgroundImg = loadImage(image)
  }

  add(gameObject) {
    gameObject.game = this
    this.gameObjects[gameObject.id].push(gameObject)
  }

  remove(gameObject) {
    let idx = this.gameObjects[gameObject.id].indexOf(gameObject)
    if (idx >= 0) {
      this.gameObjects[gameObject.id].splice(idx, 1)
    }
  }

  keydownhandler(e) {
    this.keysPressed[e.code] = true

    for (let player of this.gameObjects[PLAYER_ID]) {
      this.keyPressedHandler(e.code)
    }
  }

  keyuphandler(e) {
    this.keysPressed[e.code] = false

    for (let player of this.gameObjects[PLAYER_ID]) {
      this.keyReleasedHandler(e.code)
    }
  }

  draw() {
    ctx.clearCanvas()
    // draw background
    if (this.backgroundImg && this.backgroundImg.ready) {
      ctx.drawImage(this.backgroundImg, 0, 0)
    }

    // TODO : MAYBE draw platforms

    // draw powerups
    for (let sprite of this.gameObjects[POWER_UP_ID]) {
      sprite.draw()
    }
    // draw enemies
    for (let sprite of this.gameObjects[ENEMY_ID]) {
      sprite.draw()
    }
    // draw bullets
    for (let sprite of this.gameObjects[BULLET_ID]) {
      sprite.draw()
    }

    // draw players
    for (let sprite of this.gameObjects[PLAYER_ID]) {
      sprite.draw()
    }

    // draw ui components
    for (let sprite of this.gameObjects[UI_ID]) {
      sprite.draw()
    }
  }

  update(delta) {
    this.elapsedTime += delta
    // custom update handler
    this.customUpdate(this, delta)

    // update bullets
    for (let sprite of this.gameObjects[BULLET_ID]) {
      sprite.update(delta)
    }

    // update players
    for (let sprite of this.gameObjects[PLAYER_ID]) {
      sprite.update(delta)
    }

    // TODO: MAYBE: update platforms

    // update powerups
    for (let sprite of this.gameObjects[POWER_UP_ID]) {
      sprite.update(delta)
    }

    // update enemies
    for (let sprite of this.gameObjects[ENEMY_ID]) {
      sprite.update(delta)
    }

    // update ui components
    for (let sprite of this.gameObjects[UI_ID]) {
      sprite.update(delta)
    }
    this.checkCollisions()
  }

  checkCollisions() {
    // collect power ups
    for (let sprite of this.gameObjects[POWER_UP_ID]) {
      for (let player of this.gameObjects[PLAYER_ID]) {
        if (player.intersects(sprite)) {
          sprite.collisionHandler(sprite, player)
          player.collisionHandler(player, sprite)
        }
      }
    }

    // collide with enemy
    for (let sprite of this.gameObjects[ENEMY_ID]) {
      for (let player of this.gameObjects[PLAYER_ID]) {
        if (player.intersects(sprite)) {
          sprite.collisionHandler(sprite, player)
          player.collisionHandler(player, sprite)
        }
      }
    }

    // player bullet collide with enemy
    for (let bullet of this.gameObjects[BULLET_ID].filter(b => b.gun.id === PLAYER_ID)) {
      for (let enemy of this.gameObjects[ENEMY_ID]) {
        if (bullet.intersects(enemy)) {
          enemy.collisionHandler(enemy, bullet)
          bullet.collisionHandler(bullet, enemy)
        }
      }
    }

    // enemy bullet collide with player
    for (let bullet of this.gameObjects[BULLET_ID].filter(b => b.gun.id === ENEMY_ID)) {
      for (let player of this.gameObjects[PLAYER_ID]) {
        if (bullet.intersects(player)) {
          player.collisionHandler(player, bullet)
          bullet.collisionHandler(bullet, player)
        }
      }
    }
  }

  _gameloop() {
    this.draw()
    // handleInput
    let current = Date.now()
    let delta = (current - this.timestart) / 100
    this.timestart = current
    // console.log(delta)
    if (!this.paused) {
      this.update(delta)
    }
    window.requestAnimationFrame(() => this._gameloop())
  }

  start() {
    this.timestart = Date.now()
    this._gameloop()
  }
}