class Game{
  constructor(config){
    let default_cfg = {
      title: 'Untitled Game',
      backgroundColor: null,
      backgroundImage: null,
      fps: 60,
      keyPressedHandler: () => {},
      keyReleasedHandler: () => {},
      update: () => {},
    }
    config = config || {}
    this.cfg = {...default_cfg, ...config}

    //Set the frame rate
    this.fps = this.cfg.fps
    //Get the start time
    this.timestart = Date.now()
    //Set the frame duration in milliseconds
    // this.frameDuration = 1000 / this.fps
    //Initialize the lag offset
    // this.lag = 0

    this.keyPressedHandler = this.cfg.keyPressedHandler
    this.keyReleasedHandler = this.cfg.keyReleasedHandler
    this.customUpdate = this.cfg.update

    this.title = this.cfg.title
    if (window.location.href.includes("/wip")){
      this.title += " - (WIP)"
    }
    this.setTitle()
    createCanvas()
    if (this.cfg.backgroundColor) {
      this.setBgColor(this.cfg.backgroundColor)
    }
    if (this.cfg.backgroundImage) {
      this.setBackground(this.cfg.backgroundImage)
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
  }

  setTitle(){
    if (this.title) {
      document.title = this.title
    }
  }

  setBgColor(c) {
    canvas.style.backgroundColor = c
  }

  setBackground(image) {
    this.backgroundImg = new Image()
    this.backgroundImg.onload = () => {
      this.backgroundImgReady = true
    }
    this.backgroundImg.src = "../../assets/images/" + image
  }

  add(gameObject) {
    gameObject.game = this
    this.gameObjects[gameObject.id].push(gameObject)
  }

  remove(gameObject) {
    let idx = this.gameObjects[gameObject.id].indexOf(gameObject)
    if (idx >= 0) {
      this.gameObjects[gameObject.id].splice(idx,1)
    }
  }

  keydownhandler(e) {
    this.keysPressed[e.code] = true

    for (let player of this.gameObjects[PLAYER_ID]) {
      game.keyPressedHandler(e.code)
    }
  }

  keyuphandler(e) {
    this.keysPressed[e.code] = false

    for (let player of this.gameObjects[PLAYER_ID]) {
      game.keyReleasedHandler(e.code)
    }
  }

  draw() {
    ctx.clearCanvas()
    // draw background
    if (this.backgroundImgReady) {
      ctx.drawImage(this.backgroundImg, 0,0)
    }
    // draw platforms
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
    // draw balls
    // draw players
    for (let sprite of this.gameObjects[PLAYER_ID]) {
      sprite.draw()
    }
    // draw text
    for (let sprite of this.gameObjects[TEXT_ID]) {
      sprite.draw()
    }
  }
    
  update(delta) {
    // custom update handler
    this.customUpdate(delta)
    
    // update bullets
    for (let sprite of this.gameObjects[BULLET_ID]) {
      sprite.update(delta)
    }

    // update players
    for (let sprite of this.gameObjects[PLAYER_ID]) {
      sprite.update(delta)
    }
    // draw balls
    // draw platforms
    // draw powerups
    for (let sprite of this.gameObjects[POWER_UP_ID]) {
      sprite.update(delta)
    }
    // draw enemies
    for (let sprite of this.gameObjects[ENEMY_ID]) {
      sprite.update(delta)
    }

    this.checkCollisions()
  }

  checkCollisions(){
    // collect power ups
    for (let sprite of this.gameObjects[POWER_UP_ID]) {
      for (let player of this.gameObjects[PLAYER_ID]) {
        if (player.collidesWith(sprite)){
          sprite.collisionHandler(sprite, player)
          player.collisionHandler(player, sprite)
        }
      }
    }

    // collide with enemy
    for (let sprite of this.gameObjects[ENEMY_ID]) {
      for (let player of this.gameObjects[PLAYER_ID]) {
        if (player.collidesWith(sprite)){
          sprite.collisionHandler(sprite, player)
          player.collisionHandler(player, sprite)
        }
      }
    }

    // bullet collide with enemy
    for (let bullet of this.gameObjects[BULLET_ID]) {
      for (let enemy of this.gameObjects[ENEMY_ID]) {
        if (bullet.collidesWith(enemy)){
          enemy.collisionHandler(enemy, bullet)
          bullet.collisionHandler(bullet, enemy)
        }
      }
    }

  }

  _gameloop(){
    this.draw()
    // handleInput
    let current = Date.now()
    let delta = (current - this.timestart) / 100
    this.timestart = current
    // console.log(delta)
    this.update(delta)
    window.requestAnimationFrame(() => this._gameloop())
  }

  start() {
    this.timestart = Date.now()
    this._gameloop()
  }
}
