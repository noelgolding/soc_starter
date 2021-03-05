outline: image_map = {}

/**
 * @namespace simplegameengine.sprites
 */

/**
 * An abstract base class for Sprites
 * @virtual
 * @memberof simplegameengine.sprites
 */
class Sprite {
    /**
     * @param {simplegameengine.config.SimpleSpriteConfig} config configuration object for the sprite
     */
    constructor(config) {
        let default_cfg = {
            label: "SpriteConfig",
            width: () => random(10, canvas.width - 10),
            height: () => random(10, canvas.height - 10),
            loc: randomLoc,
            dir: () => randomChoice(LEFT, RIGHT),
            edges: BLACKHOLE,
            velocity: STOPPED,
            outline: 'green',
            fill: 'green',
            display: true,
            collision: (target, self) => {},
            moveBehavior: 'static', // static, facing, flip, flipX, flipY, flip_x, flip_y
            speed: 20,
            rotateSpeed: 0,
            imageChoices: [],
            image: null,
            move: false,
            bullet: undefined,
            update: (self, delta) => {}
        }
        this.cfg = new SimpleGameConfig(default_cfg, config)
        this.img = null
        this.imgs = []

        let img_prop = this.cfg.get('image') || this.cfg.get('images')
        if (img_prop) {
            if (Array.isArray(img_prop)) {
                this.setImages(...img_prop)
            } else {
                this.setImages(...img_prop.split(/,\s*/))
            }
        }
        this.setImages(...this.cfg.get('imageChoices'))

        this.o = this.cfg.get('outline')
        this.f = this.cfg.get('fill')

        this.moveBehavior = this.cfg.get('moveBehavior').toLowerCase()
        if (this.moveBehavior.startsWith('flip')) {
            if (this.moveBehavior == 'flip') {
                this.flipX = true
                this.flipY = true
            } else if (this.moveBehavior.endsWith('x')) {
                this.flipX = true
            } else if (this.moveBehavior.endsWith('y')) {
                this.flipY = true
            }
        }
        this.speed = this.cfg.get('speed')
        this.edges = this.cfg.getRawValue('edges')
        this.collisionHandler = this.cfg.getRawValue('collision')
        this.customUpdate = this.cfg.getRawValue('update')

        if (this.cfg.get('id')) {
            this.id = this.cfg.get('id')
        }

        this.shape = this.cfg.get('shape')
        if (this.shape && this.shape == CIRCLE) {
            if (!this.cfg.getRawValue('radius')) {
                if (!this.cfg.getRawValue('width')) {
                    this.cfg.add('radius', () => random(10, Math.min(canvas.width, canvas.height) / 2))
                } else {
                    this.cfg.add('radius', () => this.cfg.get('width') / 2)
                }
            }
            this.r = this.cfg.get('radius')

            this.cfg.add('width', () => this.r * 2)
            this.cfg.add('height', () => this.r * 2)
        }

        this.spawn()
        this.previousLocation = this.loc.clone()

        this.game = game || null
        if (this.id && this.game) {
            this.game.add(this)
        }
        this.type = this.constructor
        this.changeDirection(this.cfg.get('dir'))
    }

    // this is a readonly property
    get value() {
        let v = this.cfg.get('value')
        if (isNaN(v)) {
            v = 0
        }
        return v
    }

    /**
     * resets the Sprite to its original starting configuration.
     */
    respawn() {
        clearTimeout(this.respawnTimer)
        if (this.imgs.length > 1) {
            this.setImage(randomChoice(...this.imgs))
        }
        if (this.shape == CIRCLE) {
            this.r = this.cfg.get('radius')
        }
        this.width = this.cfg.get('width')
        this.height = this.cfg.get('height')
        this.display = this.cfg.get('display')
        this.rotateSpeed = this.cfg.get('rotateSpeed')
        this.angle = 0
        this.loc = this.cfg.get('loc').clone()
        if (this.shape && this.shape == RECT) {
            let loc = this.cfg.get('loc')
            if ([TOP_CENTER, BOTTOM_CENTER].includes(loc)) {
                this.loc.x = this.loc.x - this.width / 2
                this.loc.y = (TOP_CENTER == loc) ? 0 : this.loc.y - this.height
            } else if ([MIDDLE_LEFT, MIDDLE_RIGHT].includes(loc)) {
                this.loc.y = this.loc.y - this.height / 2
            } else if (MIDDLE_CENTER == loc) {
                this.loc.x = this.loc.x - this.width / 2
                this.loc.y = this.loc.y - this.height / 2
            }
        }
        this.dir = STOPPED
        this.velocity = this.cfg.get('velocity')
        if (this.cfg.get('move')) {
            this.dir = STOPPED
            this.changeDirection(this.cfg.get('dir'))
        }
        this.previousDirection = this.dir.clone()
        if (this.cfg.get('respawnTime')) {
            this.respawnTimer = setTimeout(this.respawn.bind(this), this.cfg.get('respawnTime') * 1000)
        }
        this.edges(this)
    }
    spawn = this.respawn // alias

    setImage(image) {
        if (!image) {
            return
        }
        if (image instanceof Image) {
            this.img = image
        } else {
            this.img = loadImage(image)
        }
    }

    setImages(...images) {
        if (images.length < 1) {
            return
        }
        this.imgs = []
        for (let image of images) {
            this.imgs.push(loadImage(image))
        }
        this.setImage(randomChoice(...this.imgs))
    }

    changeDirection(dir) {
        if (this.dir != dir) {
            // hacky but for now, only set previousDirection if it was left or right
            if (this.dir.x !== 0) {
                this.previousDirection = this.dir.clone()
            }
            this.move(dir)
        }
    }

    move(dir) {
        if (this.cfg.get('move')) {
            // if (dir === LEFT || dir === RIGHT)
            this.dir = dir
            this.velocity = dir.clone()
            this.velocity.mult(this.speed)
        }
    }

    stop() {
        this.velocity.mult(0)
    }

    update(delta) {
        this.previousLocation = this.loc.clone()
        let v = this.velocity.clone()
        v.mult(delta)
        this.loc.add(v)
        if (this.moveBehavior == 'facing') {
            if (this.dir == UP) {
                this.angle = 0
            } else if (this.dir == DOWN) {
                this.angle = 180
            } else if (this.dir == LEFT) {
                this.angle = -90
            } else if (this.dir == RIGHT) {
                this.angle = 90
            }
        } else {
            this.angle += this.rotateSpeed * delta
        }

        this.customUpdate(this, delta)
        this.edges(this)
    }

    draw() {
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
            let rect = getBoundingRect(this.shape, this)
            ctx.translate(rect.centerX, rect.centerY)
            ctx.rotate(this.angle * Math.PI / 180)
            if (this.flipX && this.dir.x !== 0) {
                let xscale = (this.dir.x < 0) ? -1 : 1
                ctx.scale(xscale, 1)
            } else if (this.flipX && this.previousDirection.x !== 0) {
                let xscale = (this.previousDirection.x < 0) ? -1 : 1
                ctx.scale(xscale, 1)
            }

            if (this.flipY && this.dir.y !== 0) {
                let yscale = (this.dir.y < 0) ? 1 : -1
                ctx.scale(1, yscale)
            }

            ctx.drawImage(this.img, 0 - rect.width / 2, 0 - rect.height / 2, rect.width, rect.height)
            ctx.restore()
        } else {
            this.drawInternal()
        }

        this.drawDebug()
    }

    drawInternal() {
        if (this.shape) {
            drawShape(this.shape, this)
        }
    }

    drawDebug() {
        if (this.game && this.game.debug) {
            ctx.save()
            let rect = getBoundingRect(this.shape, this)
            ctx.translate(rect.centerX, rect.centerY)

            ctx.lineWidth = 1
            ctx.strokeStyle = 'black'

            if (this.shape == CIRCLE) {
                ctx.strokeCircle(0, 0, rect.width / 2.0)
            } else {
                ctx.strokeRect(0 - rect.width / 2, 0 - rect.height / 2, rect.width, rect.height)
            }

            let ga = ctx.globalAlpha
            ctx.globalAlpha = .3
            ctx.fillStyle = 'yellow'
            ctx.globalAlpha = ga

            let radians = this.dir.getAngleInRadians()
            ctx.rotate(radians)
            ctx.line(0, 0, rect.width / 2 + 5, 0)
            ctx.triangle(rect.width / 2 + 5, 0, rect.width / 2, 5, rect.width / 2, -5)
            ctx.restore()
        }
    }

    collidesWith(otherSprite) {
        if (this.shape == RECT) {
            if (otherSprite.shape == RECT) {
                return rectCollision(this, otherSprite)
            } else {
                return rectCircleCollision(this, otherSprite)
            }
        } else {
            if (otherSprite.shape == CIRCLE) {
                return circleCollision(this, otherSprite)
            } else {
                return rectCircleCollision(otherSprite, this)
            }
        }
    }
    intersects = this.collidesWith

    clone() {
        return Object.create(this)
    }
}

/**
 * A PlayerSprite
 * @memberof simplegameengine.sprites
 * @extends simplegameengine.sprites.Sprite
 */
class PlayerSprite extends Sprite {
    /**
     * @param {simplegameengine.config.PlayerSpriteConfig} config configuration object for the sprite
     */
    constructor(config) {
        let default_cfg = {
            shape: CIRCLE,
            radius: 24,
            loc: new Vector(canvas.width / 2, canvas.height / 2),
            outline: 'blue',
            fill: 'green',
            edges: CLAMP,
            id: PLAYER_ID,
            dir: UP,
            moveBehavior: 'facing'
        }
        super(new SimpleGameConfig(default_cfg, config))
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

    update(delta) {
        this.stop()
        if (this.controls) {
            this.cfg['move'] = true
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
                    if (this.cfg.getRawValue('bullet')) {
                        this.readyToShoot = false
                        let cfg = new SimpleGameConfig(this.cfg.get('bullet'))
                        game.add(new BulletSprite(this, cfg))
                        setTimeout(() => this.readyToShoot = true, cfg.get('resetTime') || 300)
                    }
                }
            }
        }
        super.update(delta)
    }
}

class PowerUpSprite extends Sprite {
    constructor(config) {
        let default_r = random(16, 32)
        let default_cfg = {
            shape: CIRCLE,
            width: default_r,
            outline: 'darkgoldenrod',
            fill: 'goldenrod',
            edges: BOUNCE,
            id: POWER_UP_ID,
            moveBehavior: 'flipX',
        }
        super(new SimpleGameConfig(default_cfg, config))
        if (isNaN(this.cfg.get('value'))) {
            this.cfg.add('value', () => Math.floor(this.cfg.get('width') / 4))
        }
    }
}

class EnemySprite extends Sprite {
    constructor(config) {
        let default_cfg = {
            shape: CIRCLE,
            width: () => random(16, 48),
            outline: 'darkred',
            fill: 'pink',
            edges: BOUNCE,
            id: ENEMY_ID,
            bullet: undefined,
        }
        config = config || {}
        super(new SimpleGameConfig(default_cfg, config))
        if (isNaN(this.cfg.get('value'))) {
            this.cfg.add('value', () => this.cfg.get('width'))
        }
        this.readyToShoot = false
        if (this.cfg.get('bullet')) {
            this.bullet = this.cfg.get('bullet')
            this.readyToShoot = true
        }
    }

    shoot() {
        if (this.readyToShoot) {
            this.readyToShoot = false
            let cfg = new SimpleGameConfig(this.cfg.get('bullet'))
            game.add(new BulletSprite(this, cfg))
            setTimeout(() => this.readyToShoot = true, cfg.get('resetTime') || 300)
        }
    }
}

class BulletSprite extends Sprite {
    constructor(gun, config) {
        let default_cfg = {
            shape: RECT,
            label: "bullet config",
            outline: 'orange',
            fill: 'purple',
            edges: BLACKHOLE,
            move: true,
            speed: gun.speed + 10,
            loc: gun.loc.clone(),
            dir: gun.dir,
            angle: gun.angle,
        }
        if (!config.shape || config.shape === RECT) {
            if ((config.width && !config.height) || (config.height && !config.width)) {
                throw new Error('Missing config options ["width:"] ["height:"]\nIf you set either the width or the height, you need to set both')
            }
        }
        super(new SimpleGameConfig(default_cfg, config))
        this.id = BULLET_ID
        this.gun = gun
            // adjust the bullet to match the appropriate aspect ratio if necessary
        if (!config.width && !config.height) {
            if ([LEFT, RIGHT].includes(this.dir)) {
                // horizontal
                this.cfg.add('width', 24)
                this.cfg.add('height', 12)
            } else {
                // vertical
                this.cfg.add('width', 12)
                this.cfg.add('height', 24)
            }
            this.width = this.cfg.get('width')
            this.height = this.cfg.get('height')
        }
    }
}

class TextLabel {
    constructor(config) {
        this.id = TEXT_ID
        this.cfg = config || {}
        if (this.cfg.text) {
            this.text = "`" + this.cfg.text + "`"
        }
        if (game) {
            this.cfg = new SimpleGameConfig(game.cfg, this.cfg)
            game.add(this)
        }
    }

    respawn() {}
    update() {}

    draw() {
        let txt = eval(this.text)
        drawText(txt, this.cfg)
    }
}
// for backward compatibility
const TextSprite = TextLabel

class ScoreLabel extends TextSprite {
    constructor(config) {
        let default_cfg = {
            text: "Score: ${game.score}",
            bold: true,
        }
        super(new SimpleGameConfig(default_cfg, config))
    }
}

class StatusBarSprite extends Sprite {
    constructor(config) {
        let default_cfg = {
            shape: RECT,
            completedValue: 100,
            fill: "black",
            outline: "black",
            statuscolor: "green",
            width: () => Math.floor(canvas.width / 4),
            height: () => Math.floor(canvas.height / 20),
            opacity: .75,
            id: TEXT_ID,
        }
        default_cfg['value'] = (config && config['completedValue']) ? config['completedValue'] : default_cfg['completedValue']
        super(new SimpleGameConfig(default_cfg, config))
        this.value = this.cfg.get('value')
        this.completedValue = this.cfg.get('completedValue')
        this.innerBar = new RectSprite(this.cfg)
    }

    get percentage() {
        return this.value / this.completedValue
    }

    update() {
        let p = this.percentage
        let r = (p > .5) ? map(p, 1, .5, 0, 255) : 255
        let g = (p < .5) ? map(p, .5, 0, 255, 0) : 255
        let b = 0
        this.statuscolor = `rgba(${r}, ${g}, ${b}, 1)`
        this.innerBar.cfg.fill = this.statuscolor
        this.innerBar.width = this.percentage * this.width
    }

    draw() {
        if (this.display) {
            ctx.save()
            ctx.globalAlpha = this.cfg.get('opacity')
            this.drawInternal()
            this.innerBar.drawInternal()
            ctx.restore()
        }
    }
}

class SpriteList extends Array {
    constructor(cfg) {
        super()
        let count = (cfg.count >= 0) ? cfg.count : 1
        let sprite = cfg.sprite
        delete(cfg.count)
        delete(cfg.sprite)
        for (let i = 0; i < count; i++) {
            let s = new sprite(cfg)
            if (!(s instanceof Sprite)) {
                throw ("A SpriteList may only contain sprite instances")
            }
            this.push(s)
        }
    }
}

class SpriteGrid extends Sprite {
    constructor(config) {
        let default_cfg = {
            shape: RECT,
            loc: TOP_LEFT,
            num_columns: 1,
            num_rows: 1,
            margin_top: 0,
            margin_left: 0,
            margin_bottom: 0,
            margin_right: 0,
            width: 'auto',
            height: 'auto',
            gap: 0,
            fill: 'rgba(0,0,0,0)',
            outline: 'rgba(0,0,0,0)',
            sprites: [],
            // fill: 'red',
            id: LAYOUT_ID,
        }
        super(new SimpleGameConfig(default_cfg, config))
        this.gap = parseInt(this.cfg.get('gap'), 10) || 0
        this.margin_top = parseInt(this.cfg.get('margin_top'), 10) || 0
        this.margin_bottom = parseInt(this.cfg.get('margin_bottom'), 10) || 0
        this.margin_left = parseInt(this.cfg.get('margin_left'), 10) || 0
        this.margin_right = parseInt(this.cfg.get('margin_right'), 10) || 0
        this.loc.y += this.margin_top
        this.loc.x += this.margin_left
        this.max_width = canvas.width - this.margin_left - this.margin_right
        this.max_height = canvas.height - this.margin_top - this.margin_bottom

        this.width = Math.min(parseInt(this.cfg.get('width'), 10) || 0, this.max_width)
        this.height = Math.min(parseInt(this.cfg.get('height'), 10) || 0, this.max_height)

        this.num_cols = parseInt(this.cfg.get('num_cols'), 10) || 1
        this.num_rows = parseInt(this.cfg.get('num_rows'), 10) || 1
        this.num_cells = this.num_cols * this.num_rows
        this.sprites = []

        this.add(...this.cfg.get('sprites'))
    }

    update() {
        if (this.cfg.get('width') == 'auto') {
            let max_sprite_width = this.sprites.reduce((w, s) => Math.max(w, s.width), 0)
            let num_cols = (this.sprites.length >= this.num_cols) ? this.num_cols : Math.floor(this.sprites.length % this.num_cols)
            let grid_padding = (num_cols - 1) * this.gap
            let calc_w = max_sprite_width * num_cols + grid_padding
            this.width = Math.min(calc_w, this.max_width)
                // console.log(`cell width: ${max_sprite_width}, num cols: ${num_cols}, total padding: ${grid_padding}, width: ${this.width}`)
        }

        if (this.cfg.get('height') == 'auto') {
            let sprite_heights = 0
            for (let i = 0; i < this.sprites.length; i += num_cols) {
                sprite_heights += Math.max(0, ...this.sprites.slice(i, i + num_cols).map(s => s.height))
            }
            let num_rows = Math.floor(this.sprites.length / this.num_cols)
            let grid_padding = num_rows - 1 * this.gap
            let calc_h = sprite_heights + grid_padding
            this.height = Math.min(calc_h, this.max_height)
                // console.log(`cell height: ${sprite_heights}, num rows: ${num_rows}, total padding: ${grid_padding}, height: ${this.height}`)
        }
    }

    add(...sprites) {
        for (let sprite of sprites) {
            if (this.sprites.length >= this.num_cells) {
                try {
                    sprite.game.remove(sprite)
                } finally {
                    throw ('This grid is full')
                }
            }
            let idx = this.sprites.length
            let row_index = Math.floor(idx / this.num_cols)
            let col_index = idx % this.num_cols
            let x_offset = sprite.width * col_index + grid_gap * col_index
            let y_offset = sprite.height * row_index + grid_gap * row_index
            sprite.loc = this.loc.clone().add(new Vector(x_offset, y_offset));
            // console.log(`row idx: ${row_index}, col idx: ${col_index}, x_offset: ${x_offset}, y_offset: ${y_offset}, loc: ${sprite.loc}`)
            this.sprites.push(sprite)
        }
    }
}

/**
 * helper global functions
 * @private 
 */
function drawShape(shape, sprite) {
    if (shape == CIRCLE) {
        drawCircleSprite(sprite)
    } else if (shape == RECT) {
        drawRectSprite(sprite)
    }
}

function getBoundingRect(shape, sprite) {
    if (shape == CIRCLE) {
        return getCircleSpriteBoundingRect(sprite)
    } else if (shape == RECT) {
        return getRectSpriteBoundingRect(sprite)
    }
}

function drawCircleSprite(sprite) {
    ctx.save()
    ctx.translate(sprite.loc.x, sprite.loc.y)
    ctx.rotate(sprite.angle * Math.PI / 180)
    ctx.circle(0, 0, sprite.r)
    ctx.restore()
}

function drawRectSprite(sprite) {
    ctx.save()
    let rect = getRectSpriteBoundingRect(sprite)
    ctx.translate(rect.left, rect.top)
    ctx.rotate(this.angle * Math.PI / 180)
    ctx.setStrokeColor(sprite.cfg.get('outline'))
    ctx.setFillColor(sprite.cfg.get('fill'))
    ctx.rectangle(0, 0, rect.width, rect.height)
    ctx.restore()
}

function getCircleSpriteBoundingRect(sprite) {
    let rect = {}
    if (sprite.img && sprite.img.ready) {
        let width = sprite.r * 2
        let s = width / sprite.img.width
        let height = sprite.img.height * s
        let left = sprite.loc.x - width / 2
        let top = sprite.loc.y - height / 2
        let right = left + width
        let bottom = top + height
        let centerX = left + width / 2
        let centerY = top + height / 2
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
            width: sprite.r * 2,
            height: sprite.r * 2,
            left: sprite.loc.x - sprite.r,
            top: sprite.loc.y - sprite.r,
            right: sprite.loc.x + sprite.r,
            bottom: sprite.loc.y + sprite.r,
            centerX: sprite.loc.x,
            centerY: sprite.loc.y
        }
    }
    return rect
}

function getRectSpriteBoundingRect(sprite) {
    let rect = {}
    let width = sprite.width
    let height = sprite.height
    if (sprite.img && sprite.img.ready) {
        if (sprite.width >= sprite.height) {
            width = sprite.width
            height = sprite.height * sprite.width / sprite.img.width
        } else {
            width = sprite.width * sprite.height / sprite.img.height
            height = sprite.height
        }
    }

    // let left = sprite.loc.x - width / 2
    // let top = sprite.loc.y - height / 2
    let left = sprite.loc.x
    let top = sprite.loc.y
    let right = left + width
    let bottom = top + height
    let centerX = left + width / 2
    let centerY = top + height / 2
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
    return rect
}