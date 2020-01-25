/**
 * @namespace constants
 */
/**
 * @namespace constants.keyboard
 */
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_A = 'KeyA'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_B = 'KeyB'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_C = 'KeyC'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_D = 'KeyD'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_E = 'KeyE'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_F = 'KeyF'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_G = 'KeyG'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_H = 'KeyH'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_I = 'KeyI'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_J = 'KeyJ'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_K = 'KeyK'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_L = 'KeyL'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_M = 'KeyM'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_N = 'KeyN'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_O = 'KeyO'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_P = 'KeyP'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_Q = 'KeyQ'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_R = 'KeyR'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_S = 'KeyS'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_T = 'KeyT'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_U = 'KeyU'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_V = 'KeyV'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_W = 'KeyW'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_X = 'KeyX'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_Y = 'KeyY'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_Z = 'KeyZ'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_UP = 'ArrowUp'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_DOWN = 'ArrowDown'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_LEFT = 'ArrowLeft'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_RIGHT = 'ArrowRight'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_SPACE = 'Space'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_SHIFT_LEFT = 'ShiftLeft'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_SHIFT_RIGHT = 'ShiftRight'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_ENTER = 'Enter'
/**
 * @memberof constants.keyboard
 * @instance
 */
const KEY_ESC = 'Escape'

// Direction Vectors
/**
 * @namespace constants.directions
 */
/**
 * @memberof constants.directions
 * @instance
 * @type {Vector}
 */
const STOPPED = new Vector(0, 0)
/**
 * @memberof constants.directions
 * @instance
 * @type {Vector}
 */
const UP = new Vector(0, -1)
/**
 * @memberof constants.directions
 * @instance
 * @type {Vector}
 */
const DOWN = new Vector(0, 1)
/**
 * @memberof constants.directions
 * @instance
 * @type {Vector}
 */
const RIGHT = new Vector(1, 0)
/**
 * @memberof constants.directions
 * @instance
 * @type {Vector}
 */
const LEFT = new Vector(-1, 0)
/**
 * @memberof constants.directions
 * @instance
 * @type {Vector}
 */
const NORTH = UP
/**
 * @memberof constants.directions
 * @instance
 * @type {Vector}
 */
const SOUTH = DOWN
/**
 * @memberof constants.directions
 * @instance
 * @type {Vector}
 */
const EAST = RIGHT
/**
 * @memberof constants.directions
 * @instance
 * @type {Vector}
 */
const WEST = LEFT
/**
 * @memberof constants.directions
 * @instance
 * @type {Vector}
 */
const UP_RIGHT = new Vector(1, -1)
/**
 * @memberof constants.directions
 * @instance
 * @type {Vector}
 */
const UP_LEFT = new Vector(-1, -1)
/**
 * @memberof constants.directions
 * @instance
 * @type {Vector}
 */
const DOWN_RIGHT = new Vector(1, 1)
/**
 * @memberof constants.directions
 * @instance
 * @type {Vector}
 */
const DOWN_LEFT = new Vector(-1, 1)
/**
 * @memberof constants.directions
 * @instance
 * @type {Vector}
 */
const NORTH_EAST = UP_RIGHT
/**
 * @memberof constants.directions
 * @instance
 * @type {Vector}
 */
const NORTH_WEST = UP_LEFT
/**
 * @memberof constants.directions
 * @instance
 * @type {Vector}
 */
const SOUTH_EAST = DOWN_RIGHT
/**
 * @memberof constants.directions
 * @instance
 * @type {Vector}
 */
const SOUTH_WEST = DOWN_LEFT

// Position Vectors - mainly for positioning text
// Bad, but hard coding for WIDTH = 640 and HEIGHT = 480
/**
 * @namespace constants.locations
 */
/**
 * @memberof constants.locations
 * @instance
 * @type {Vector}
 */
const TOP_LEFT = new Vector(0, 0)
/**
 * @memberof constants.locations
 * @instance
 * @type {Vector}
 */
const TOP_CENTER = new Vector(320, 0)
/**
 * @memberof constants.locations
 * @instance
 * @type {Vector}
 */
const TOP_RIGHT = new Vector(640, 0)
/**
 * @memberof constants.locations
 * @instance
 * @type {Vector}
 */
const MIDDLE_LEFT = new Vector(0, 240)
/**
 * @memberof constants.locations
 * @instance
 * @type {Vector}
 */
const MIDDLE_CENTER = new Vector(320, 240)
/**
 * @memberof constants.locations
 * @instance
 * @type {Vector}
 */
const MIDDLE_RIGHT = new Vector(640, 240)
/**
 * @memberof constants.locations
 * @instance
 * @type {Vector}
 */
const BOTTOM_LEFT = new Vector(0, 480)
/**
 * @memberof constants.locations
 * @instance
 * @type {Vector}
 */
const BOTTOM_CENTER = new Vector(320, 480)
/**
 * @memberof constants.locations
 * @instance
 * @type {Vector}
 */
const BOTTOM_RIGHT = new Vector(640, 480)

// Text alignment constants
/**
 * @namespace constants.text
 */
/**
 * @namespace constants.text.alignment
 */
/**
 * @memberof constants.text.alignment
 * @instance
 */
const ALIGN_LEFT = 'left'
/**
 * @memberof constants.text.alignment
 * @instance
 */
const ALIGN_CENTER = 'center'
/**
 * @memberof constants.text.alignment
 * @instance
 */
const ALIGN_RIGHT = 'right'
/**
 * @memberof constants.text.alignment
 * @instance
 */
const VALIGN_TOP = 'top'
/**
 * @memberof constants.text.alignment
 * @instance
 */
const VALIGN_MIDDLE = 'middle'
/**
 * @memberof constants.text.alignment
 * @instance
 */
const VALIGN_BOTTOM = 'bottom'

/**
 * @namespace constants.shapes
 */
/**
 * @memberof constants.shapes
 * @instance
 */
const CIRCLE = 'circle'
/**
 * @memberof constants.shapes
 * @instance
 */
const RECT = 'rect'

// Sprite Ids
const PLAYER_ID = 'player'
const POWER_UP_ID = 'power up'
const ENEMY_ID = 'enemy'
const PLATFORM_ID = 'platform'
const BULLET_ID = 'bullet'
const TEXT_ID = 'ui component'
const UI_ID = TEXT_ID

// Edges
/**
 * @namespace constants.edgeHandlers
 */

/** 
 * warps the sprite to the opposite edge of the canvas 
 * @memberof constants.edgeHandlers 
 * @type {simplegameengine.handlers.edgeHandler}
 * @instance
 */
const WARP = wrapEdges //'wrap edges'
/** 
 * reverses the sprites direction 
 * @memberof constants.edgeHandlers 
 * @type {simplegameengine.handlers.edgeHandler}
 * @instance
 */
const BOUNCE = bounceOffEdges //'bounce off edges'
/** 
 * stops the sprite from bouncing or going off the canvas 
 * @memberof constants.edgeHandlers 
 * @type {simplegameengine.handlers.edgeHandler}
 * @instance
 */
const CLAMP = stopAtEdges //'stop at edges'
/** 
 * when the sprite goes off the canvas, it is removed from the game 
 * @memberof constants.edgeHandlers 
 * @type {simplegameengine.handlers.edgeHandler}
 * @instance
 */
const BLACKHOLE = blackholeEdges //'remove from game'

// ========== TYPE DEFS ===============
/**
 * @namespace simplegameengine.handlers
 */

/**
 * Called when the Sprite collides with an edge of the canvas
 * @memberof simplegameengine.handlers
 * @callback edgeHandler
 * @param {Sprite} sprite the sprite that has collided with the edge of the canvas
 */

/**
 * Called when one Sprite collides with another Sprite
 * @memberof simplegameengine.handlers
 * @callback collisionHandler
 * @param {Sprite} self the sprite that is testing for collisions
 * @param {Sprite} target the sprite that has been collided with
 * 
 * @example
 * // when the player collides with a PowerUpSprite, 
 * // increase the score and respawn the PowerUpSprite.
 * //
 * // NOTE: you can name the function whatever you want, 
 * //       it just has to maintain the function signature.
 * function eatSnack(self, target) {
 *   if (target instanceof PowerUpSprite) {
 *     game.score += target.value
 *     target.respawn()
 *   }
 * }
 
 * @example
 * // when the player shoots an EnemySprite, 
 * // increase the score and remove the EnemySprite and the BulletSprite.
 * //
 * // NOTE: you can name the function whatever you want, 
 * //       it just has to maintain the function signature.
 * function shootEnemy(self, target) {
 *   if (target instanceof EnemySprite) {
 *     game.score += target.value
 *     game.remove(self)
 *     game.remove(target)
 *   }
 * }

* @example 
* // when the player collides with an EnemySprite, 
* // decrease the score, and respawn the player and the enemy.
* //
* // NOTE: you can name the function whatever you want, 
* //       it just has to maintain the function signature.
* function damagePlayer(self, target) {
*   if (target instanceof EnemySprite) {
*     game.score -= target.value
*     self.respawn()
*     target.respawn()
*   }
* }
*/

/**
 * @namespace simplegameengine.config
 */

/**
 * @private
 * A SimpleSpriteConfig
 * @memberof simplegameengine.config
 * @typedef {simplegameengine.config.Config} SimpleSpriteConfig
 * @property {collections.List | string} image An image or a List of images that will be displayed for this sprite. If a list is provided, one image will be randomly chosen.
 * @property {Vector | function} location A Vector or function that returns a Vector. The (x,y) of the center of the sprite. Defaults to the center of the canvas. see {@link constants.locations}
 * @property {number} width The width of the sprite. Defaults to the width of the image.
 * @property {number} height The height of the sprite. Defaults to the height of the image.
 * @property {boolean} display Whether or not to display the sprite.
 * @property {Vector | function} direction A Vector or function that returns a Vector. The direction the sprite is facing. see {@link constants.directions }
 * @property {simplegameengine.handlers.edgeHandler} edges The behavior of the sprite when it collides with the edge of the canvas. see {@link constants.edgeHandlers}
 * @property {simplegameengine.handlers.collisionHandler} collision The function to be called when this sprite collides with another sprite.
 */

/**
 * A BulletSpriteConfig.  
 * Usually used within the context of a PlayerSpriteConfig or EnemySpriteConfig.  
 * For example usage, see the {@link simplegameengine.config.PlayerSpriteConfig PlayerSpriteConfig} example.
 * @see {@link simplegameengine.config.PlayerSpriteConfig PlayerSpriteConfig}
 * @memberof simplegameengine.config
 * @typedef {Object} BulletSpriteConfig
 * @property {string} image An image that will be displayed for this sprite.
 * @property {Vector | function} [location=MIDDLE_CENTER] A Vector or function that returns a Vector. The (x,y) of the center of the sprite. Defaults to the center of the parent sprite. see {@link constants.locations}
 * @property {number} [width=image width] The width of the sprite.
 * @property {number} [height=image height] The height of the sprite.
 * @property {Vector | function} [direction=RIGHT] A Vector or function that returns a Vector. The direction the sprite is facing. see {@link constants.directions }
 * @property {simplegameengine.handlers.collisionHandler} [collision=(self, target) => {}] The function to be called when this sprite collides with another sprite.
 
 * @example 
 * 
 *   image: "spaceship.png",
 *   edges: CLAMP, // see {@link constants.edgeHandlers}
 *   collision: crash, // The name of my custom function to handle the player colliding with the enemies. see {@link simplegameengine.handlers.collisionHandler}
 *   bullet: {
 *     image: "missile.png",
 *     direction: UP,
 *     collision: shot, // The name of my custom function to handle the bullet colliding with the enemies
 *   }
 * })
 */

/**
 * A PlayerSpriteConfig.  Used to configure a new {@link simplegameengine.sprites.PlayerSprite PlayerSprite}.
 * @see {@link simplegameengine.sprites.PlayerSprite PlayerSprite}
 * @memberof simplegameengine.config
 * @typedef {Object} PlayerSpriteConfig
 
 * @extends simplegameengine.config.SimpleSpriteConfig
 * @property {string} image An image that will be displayed for this sprite.
 * @property {Vector | function} [location=MIDDLE_CENTER] A Vector or function that returns a Vector. The (x,y) of the center of the sprite. Defaults to the center of the canvas. see {@link constants.locations}
 * @property {number} [width=image width] The width of the sprite.
 * @property {number} [height=image height] The height of the sprite.
 * @property {boolean} [display=true] Whether or not to display the sprite.
 * @property {Vector | function} [direction=RIGHT] A Vector or function that returns a Vector. The direction the sprite is facing. see {@link constants.directions }
 * @property {simplegameengine.handlers.edgeHandler} [edges=BLACKHOLE] The behavior of the sprite when it collides with the edge of the canvas. see {@link constants.edgeHandlers}
 * @property {simplegameengine.handlers.collisionHandler} [collision=(self, target) => {}] The function to be called when this sprite collides with another sprite.

 * @extends simplegameengine.config.BulletSpriteConfig
 * @property {simplegameengine.config.BulletSpriteConfig} [bullet={}] A configuration for the bullet to shoot
 
 * @example 
 * var player = new PlayerSprite({
 *   image: "spaceship.png",
 *   edges: CLAMP, // see {@link constants.edgeHandlers}
 *   collision: hit, // The name of my custom function to handle the player colliding with the enemies. see {@link simplegameengine.handlers.collisionHandler}
 *   bullet: {
 *     image: "missile.png",
 *     direction: UP,
 *     collision: shot, // The name of my custom function to handle the bullet colliding with the enemies
 *   }
 * })
 */

/**
 * An EnemySpriteConfig
 * @memberof simplegameengine.config
 * @typedef {Object} EnemySpriteConfig
  
 * @extends simplegameengine.config.SimpleSpriteConfig
 * @property {collections.List | string} image An image or a List of images that will be displayed for this sprite. If a list is provided, one image will be randomly chosen.
 * @property {Vector | function} [location=createRandomCanvasVector] A Vector or function that returns a Vector. The (x,y) of the center of the sprite. Defaults to the center of the canvas. see {@link constants.locations}
 * @property {number} [width=image width] The width of the sprite.
 * @property {number} [height=image height] The height of the sprite.
 * @property {boolean} [display=true] Whether or not to display the sprite.
 * @property {Vector | function} [direction=RIGHT] A Vector or function that returns a Vector. The direction the sprite is facing. see {@link constants.directions }
 * @property {simplegameengine.handlers.edgeHandler} [edges=BOUNCE] The behavior of the sprite when it collides with the edge of the canvas. see {@link constants.edgeHandlers}
 * @property {simplegameengine.handlers.collisionHandler} [collision=(self, target) => {}] The function to be called when this sprite collides with another sprite.

 * @property {simplegameengine.config.BulletSpriteConfig} [bullet={}] A configuration for the bullet to shoot
 
 * @example 
 * var enemy = new EnemySprite({
 *   image: ["meteor1.png","meteor2.png","meteor3.png"],
 *   location: myLocationFuncName,
 *   edges: WARP,
 * })
 */

function wrapEdges(sprite) {
  if (!sprite) return
  let rect = getBoundingRect(sprite.shape, sprite)
  // check top and bottom
  if (rect.bottom <= 0) {
    sprite.location.y = canvas.height + rect.height / 2
  } else if (rect.top >= canvas.height) {
    sprite.location.y = 0 - rect.height / 2
  }
  // check right and left
  if (rect.right <= 0) {
    sprite.location.x = canvas.width + rect.width / 2
  } else if (rect.left >= canvas.width) {
    sprite.location.x = 0 - rect.width / 2
  }
}

function stopAtEdges(sprite) {
  if (!sprite) return
  let rect = getBoundingRect(sprite.shape, sprite)
  // check top and bottom
  if (rect.top <= 0) {
    sprite.location.y = 0 + rect.height / 2
    sprite.stop()
  } else if (rect.bottom >= canvas.height) {
    sprite.location.y = canvas.height - rect.height / 2
    sprite.stop()
  }
  // check left and right
  if (rect.left <= 0) {
    sprite.location.x = 0 + rect.width / 2
    sprite.stop()
  } else if (rect.right >= canvas.width) {
    sprite.location.x = canvas.width - rect.width / 2
    sprite.stop()
  }
}

function bounceOffEdges(sprite) {
  if (!sprite) return
  let rect = getBoundingRect(sprite.shape, sprite)
  // check top and bottom
  if (rect.top <= 0) {
    sprite.location.y = 0 + rect.height / 2
    sprite.velocity.y *= -1
  } else if (rect.bottom >= canvas.height) {
    sprite.location.y = canvas.height - rect.height / 2
    sprite.velocity.y *= -1
  }
  // check left and right
  if (rect.left <= 0) {
    sprite.location.x = 0 + rect.width / 2
    sprite.velocity.x *= -1
  } else if (rect.right >= canvas.width) {
    sprite.location.x = canvas.width - rect.width / 2
    sprite.velocity.x *= -1
  }
}

function blackholeEdges(sprite) {
  if (!sprite) return
  if (sprite.game) {
    let rect = getBoundingRect(sprite.shape, sprite)
    if (
      rect.bottom <= 0 ||
      rect.top >= canvas.height ||
      rect.right <= 0 ||
      rect.left >= canvas.width
    ) {
      this.game.remove(sprite)
    }
  }
}

const noop = () => {}
