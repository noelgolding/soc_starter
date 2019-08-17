// Keyboard
const KEY_A = 'KeyA'
const KEY_B = 'KeyB'
const KEY_C = 'KeyC'
const KEY_D = 'KeyD'
const KEY_E = 'KeyE'
const KEY_F = 'KeyF'
const KEY_G = 'KeyG'
const KEY_H = 'KeyH'
const KEY_I = 'KeyI'
const KEY_J = 'KeyJ'
const KEY_K = 'KeyK'
const KEY_L = 'KeyL'
const KEY_M = 'KeyM'
const KEY_N = 'KeyN'
const KEY_O = 'KeyO'
const KEY_P = 'KeyP'
const KEY_Q = 'KeyQ'
const KEY_R = 'KeyR'
const KEY_S = 'KeyS'
const KEY_T = 'KeyT'
const KEY_U = 'KeyU'
const KEY_V = 'KeyV'
const KEY_W = 'KeyW'
const KEY_X = 'KeyX'
const KEY_Y = 'KeyY'
const KEY_Z = 'KeyZ'
const KEY_UP = 'ArrowUp'
const KEY_DOWN = 'ArrowDown'
const KEY_LEFT = 'ArrowLeft'
const KEY_RIGHT = 'ArrowRight'
const KEY_SPACE = 'Space'
const KEY_SHIFT_LEFT = 'ShiftLeft'
const KEY_SHIFT_RIGHT = 'ShiftRight'
const KEY_ENTER = 'Enter'
const KEY_ESC = 'Escape'

// Direction Vectors
const STOPPED = new Vector(0, 0)
const UP = new Vector(0, -1)
const DOWN = new Vector(0, 1)
const RIGHT = new Vector(1, 0)
const LEFT = new Vector(-1, 0)
const NORTH = UP
const SOUTH = DOWN
const EAST = RIGHT
const WEST = LEFT
const UP_RIGHT = new Vector(1, -1)
const UP_LEFT = new Vector(-1, -1)
const DOWN_RIGHT = new Vector(1, 1)
const DOWN_LEFT = new Vector(-1, 1)
const NORTH_EAST = UP_RIGHT
const NORTH_WEST = UP_LEFT
const SOUTH_EAST = DOWN_RIGHT
const SOUTH_WEST = DOWN_LEFT

// Position Vectors - mainly for positioning text
// Bad, but hard coding for WIDTH = 640 and HEIGHT = 480
const TOP_LEFT = new Vector(0, 0)
const TOP_CENTER = new Vector(320, 0)
const TOP_RIGHT = new Vector(640, 0)
const MIDDLE_LEFT = new Vector(0, 240)
const MIDDLE_CENTER = new Vector(320, 240)
const MIDDLE_RIGHT = new Vector(640, 240)
const BOTTOM_LEFT = new Vector(0, 480)
const BOTTOM_CENTER = new Vector(320, 480)
const BOTTOM_RIGHT = new Vector(640, 480)

// Text alignment constants
const ALIGN_LEFT = 'left'
const ALIGN_CENTER = 'center'
const ALIGN_RIGHT = 'right'
const VALIGN_TOP = 'top'
const VALIGN_MIDDLE = 'middle'
const VALIGN_BOTTOM = 'bottom'

// Sprite Ids
const PLAYER_ID = 'player'
const POWER_UP_ID = 'power up'
const ENEMY_ID = 'enemy'
const PLATFORM_ID = 'platform'
const BULLET_ID = 'bullet'
const TEXT_ID = 'ui component'
const UI_ID = TEXT_ID

// Edges
const WARP = 'wrap edges'
const CLAMP = 'stop at edges'
const BOUNCE = 'bounce off edges'
const BLACKHOLE = 'remove from game'