function squaredDistance(v1, v2) {
  let a = (v1.x - v2.x)
  let b = (v1.y - v2.y)
  let c = a*a + b*b
  return c
}

function distance(v1, v2){
  return Math.sqrt(squaredDistance(v1, v2))
}

function circleCollision(c1, c2) {
  let d = squaredDistance(c1.location, c2.location)
  return (d < c1.r * c1.r + c2.r * c2.r)
}

function rectCircleCollision(r, c) {
  let r1 = r.getBoundingRect()
  let c2 = {r: 0}
  c2.location = c.location.clone()
  if (c2.location.x < r1.left) {
    c2.location.x = r1.left
  } else if (c2.location.x > r1.right) {
    c2.location.x = r1.right
  }
  if (c2.location.y < r1.top) {
    c2.location.y = r1.top
  } else if (c2.location.y > r1.bottom) {
    c2.location.y = r1.bottom
  }
  return circleCollision(c, c2)
}

function rectCollision(src, target) {
  let r1 = src.getBoundingRect()
  let r2 = target.getBoundingRect()
  
  return ( r1.left < r2.right
  && r1.right > r2.left
  && r1.top < r2.bottom
  && r1.bottom > r2.top)
}
