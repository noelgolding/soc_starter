image_map = {}

/**
 * @namespace simplegameengine
 */

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

class Game {
    constructor(config) {
        let default_cfg = {
            title: 'Untitled Game',
            bgColor: "lightgray",
            color: "black",
            bgImage: null,
            image: null,
            fps: 60,
            keyPressed: (key_code) => {},
            keyReleased: (key_code) => {},
            update: (self, delta) => {},
            paused: false,
            width: 640,
            height: 480,
        }
        this.cfg = new SimpleGameConfig(default_cfg, config)
        if (this.cfg.get('textColor')) {
            this.cfg.color = this.cfg.get('textColor')
        }
        this.score = 0
            //Set the frame rate
            // this.fps = this.cfg.get('fps')
            //Get the start time
        this.paused = this.cfg.get('paused')
            // this.timestart = Date.now()
            // this.elapsedTime = 0
            //Set the frame duration in milliseconds
            // this.frameDuration = 1000 / this.fps
            //Initialize the lag offset
            // this.lag = 0

        this.keyPressedHandler = this.cfg.getRawValue('keyPressed')
        this.keyReleasedHandler = this.cfg.getRawValue('keyReleased')
        this.customUpdate = this.cfg.getRawValue('update')

        this.title = this.cfg.get('title')
        if (window.location.href.includes("/wip")) {
            this.title += " - (WIP)"
        }
        this.setTitle()
        createCanvas(this.cfg.get('width'), this.cfg.get('height'))

        if (this.cfg.get('bgColor')) {
            this.setBgColor(this.cfg.get('bgColor'))
        }
        if (this.cfg.get('bgImage')) {
            this.setBackground(this.cfg.get('bgImage'))
        } else if (this.cfg.get('image')) {
            this.setBackground(this.cfg.get('image'))
        }

        this.gameObjects = {
            [PLAYER_ID]: [],
            [POWER_UP_ID]: [],
            [ENEMY_ID]: [],
            [BOTH_ID]: [],
            [PLATFORM_ID]: [],
            [BULLET_ID]: [],
            [TEXT_ID]: [],
            [LAYOUT_ID]: []
        }

        // attach keyboard listener
        this.keysPressed = {}
        window.addEventListener('keydown', (e) => this.keydownhandler(e))
        window.addEventListener('keyup', (e) => this.keyuphandler(e))

        this.controls = {
            pause: [KEY_P],
            restart: [KEY_R]
        }

        if (this.cfg.get('showScore')) {
            this.showScoreLabel()
        }
        this.message = ""
        this.initStateLabel()
        this.start()
    }

    initStateLabel() {
        try {
            game.add(new TextLabel({
                text: "${game.message}",
                color: this.cfg.color,
                bold: true,
                location: MIDDLE_CENTER,
            }))
        } catch {
            setTimeout(() => {
                this.initStateLabel()
            }, 10);
        }
    }

    showScoreLabel() {
        try {
            game.add(new ScoreLabel())
        } catch {
            setTimeout(() => {
                this.showScoreLabel()
            }, 10);
        }
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

    addPlayerSprite(options) {
        this.add(new PlayerSprite(options))
    }

    addEnemySprite(options) {
        this.add(new EnemySprite(options))
    }

    addPowerUpSprite(options) {
        this.add(new PowerUpSprite(options))
    }

    addTextSprite(options) {
        this.add(new TextSprite(options))
    }

    remove(gameObject) {
        let idx = this.gameObjects[gameObject.id].indexOf(gameObject)
        if (idx >= 0) {
            this.gameObjects[gameObject.id].splice(idx, 1)
        }
    }

    keydownhandler(e) {
        this.keysPressed[e.code] = true
        this.keyPressedHandler(e.code)
    }

    keyuphandler(e) {
        this.keyReleasedHandler(e.code)
        if (this.controls.pause.includes(e.code)) {
            this.togglePause()
        } else if (this.controls.restart.includes(e.code)) {
            this.restart()
        }
        this.keysPressed[e.code] = false
    }

    draw() {
        ctx.clearCanvas()
            // draw background
        if (this.backgroundImg && this.backgroundImg.ready) {
            ctx.drawImage(this.backgroundImg, 0, 0)
        }

        // TODO : MAYBE draw platforms

        // draw layout components
        for (let sprite of this.gameObjects[LAYOUT_ID]) {
            sprite.draw()
        }

        // draw powerups
        for (let sprite of this.gameObjects[POWER_UP_ID]) {
            sprite.draw()
        }
        // draw enemies
        for (let sprite of this.gameObjects[ENEMY_ID]) {
            sprite.draw()
        }
        // draw enemies
        for (let sprite of this.gameObjects[BOTH_ID]) {
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

        // update enemies
        for (let sprite of this.gameObjects[BOTH_ID]) {
            sprite.update(delta)
        }

        // update ui components
        for (let sprite of this.gameObjects[UI_ID]) {
            sprite.update(delta)
        }

        // update layout components
        for (let sprite of this.gameObjects[LAYOUT_ID]) {
            sprite.update(delta)
        }
        this.checkCollisions()
    }


    // TODO: better collision detection, possibly fire events
    checkCollisions() {
        // collect power ups
        for (let sprite of this.gameObjects[POWER_UP_ID]) {
            for (let player of this.gameObjects[PLAYER_ID]) {
                if (player.intersects(sprite)) {
                    player.collisionHandler(sprite, player)
                    sprite.collisionHandler(player, sprite)
                }
            }
        }

        // collide with enemy
        for (let sprite of this.gameObjects[ENEMY_ID]) {
            for (let player of this.gameObjects[PLAYER_ID]) {
                if (player.intersects(sprite)) {
                    player.collisionHandler(sprite, player)
                    sprite.collisionHandler(player, sprite)
                }
            }
        }

        // player bullet collide with enemy
        for (let bullet of this.gameObjects[BULLET_ID].filter(b => b.gun.id === PLAYER_ID)) {
            for (let enemy of this.gameObjects[ENEMY_ID]) {
                if (bullet.intersects(enemy)) {
                    bullet.collisionHandler(enemy, bullet)
                    enemy.collisionHandler(bullet, enemy)
                }
            }
        }

        // enemy bullet collide with player
        for (let bullet of this.gameObjects[BULLET_ID].filter(b => b.gun.id === ENEMY_ID)) {
            for (let player of this.gameObjects[PLAYER_ID]) {
                if (bullet.intersects(player)) {
                    bullet.collisionHandler(player, bullet)
                    player.collisionHandler(bullet, player)
                }
            }
        }

        // items that can collide with players and enemies
        for (let item of this.gameObjects[BOTH_ID]) {
            for (let player of this.gameObjects[PLAYER_ID]) {
                if (item.intersects(player)) {
                    item.collisionHandler(player, item)
                    player.collisionHandler(item, player)
                }
            }
            for (let enemy of this.gameObjects[ENEMY_ID]) {
                if (item.intersects(enemy)) {
                    item.collisionHandler(enemy, item)
                    enemy.collisionHandler(item, enemy)
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
        this.score = 0
        this.timestart = Date.now()
        this._gameloop()
        this.paused = this.cfg.get('paused')
            // hack to show paused state
        if (this.paused) {
            this.paused = false
            this.togglePause()
        }
    }

    togglePause() {
        this.paused = !this.paused
        let msg = (this.paused) ? 'The game is paused' : 'The game is resumed'
        console.log(msg)
        this.message = ''
        if (this.paused) {
            this.message = 'Press P to pause and unpause the game.'
        }
    }

    restart() {
        for (let id in this.gameObjects) {
            switch (id) {
                case PLAYER_ID:
                case ENEMY_ID:
                case POWER_UP_ID:
                    for (let sprite of this.gameObjects[id]) {
                        sprite.respawn()
                    }
                    break
                case BULLET_ID:
                    while (this.gameObjects[id].length > 0) {
                        let sprite = this.gameObjects[id][0]
                        this.remove(sprite)
                    }
                    break
            }
        }
        console.log('The game has restarted')
        this.start()
    }
}