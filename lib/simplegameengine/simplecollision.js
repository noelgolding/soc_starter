function squaredDistance(v1, v2) {
  let a = (v1.x - v2.x)
  let b = (v1.y - v2.y)
  let c = a * a + b * b
  return c
}

function distance(v1, v2) {
  return Math.sqrt(squaredDistance(v1, v2))
}

function circleCollision(c1, c2) {
  let d = squaredDistance(c1.loc, c2.loc)
  return (d < c1.r * c1.r + c2.r * c2.r)
}

function rectCircleCollision(r, c) {
  let r1 = getRectSpriteBoundingRect(r)
  let c2 = { r: 0 }
  c2.loc = c.loc.clone()
  if (c2.loc.x < r1.left) {
    c2.loc.x = r1.left
  } else if (c2.loc.x > r1.right) {
    c2.loc.x = r1.right
  }
  if (c2.loc.y < r1.top) {
    c2.loc.y = r1.top
  } else if (c2.loc.y > r1.bottom) {
    c2.loc.y = r1.bottom
  }
  return circleCollision(c, c2)
}

function rectCollision(obj1, obj2) {
  let r1 = getRectSpriteBoundingRect(obj1)
  let r2 = getRectSpriteBoundingRect(obj2)

  return (r1.left < r2.right &&
    r1.right > r2.left &&
    r1.top < r2.bottom &&
    r1.bottom > r2.top)
}
