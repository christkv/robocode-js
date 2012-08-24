var Rectangle = function Rectangle(x1, y1, width, height, angle) {
  this.C = { x : x1, y: y1 };
  this.S = { x : width, y: height };
  this.angle = angle;
}

Rectangle.prototype.getX = function() { return this.C.x; }
Rectangle.prototype.getY = function() { return this.C.y; }
Rectangle.prototype.setX = function(value) { this.C.x = value; }
Rectangle.prototype.setY = function(value) { this.C.y = value; }
Rectangle.prototype.getWidth = function() { return this.S.x; }
Rectangle.prototype.getHeight = function() { return this.S.y; }
Rectangle.prototype.setWidth = function(value) { this.S.x = value; }
Rectangle.prototype.setHeight = function(value) { this.S.y = value; }

var collision = function collision(rectangle1, rectangle2) {
  var A = {x: 0, y: 0};                       // vertices of the rotated rr2
  var B = {x: 0, y: 0};
  var C = {x: 0, y: 0};                       // center of rr2
  var BL = {x: 0, y: 0};                      // vertices of rr2 (bottom-left, top-right)
  var TR = {x: 0, y: 0};

  var angle = rectangle1.angle - rectangle2.angle;  // orientation of rotated rr1
  var cosa = Math.cos(angle);                       // precalculated trigonometic -
  var sina = Math.sin(angle);                       // - values for repeated use

  var t = 0, x = 0, a = 0;                          // temporary variables for various uses
  var dx = 0;                                       // deltaX for linear equations
  var ext1 = 0, ext2 = 0;                           // min/max vertical values

  // move rr2 to make rr1 cannonic
  C = rectangle2.C;
  _subVectors2D(C, rectangle1.C);

  // rotate rr2 clockwise by rr2->ang to make rr2 axis-aligned
  _rotateVector2DClockwise(C, rectangle2.angle);

  // calculate vertices of (moved and axis-aligned := 'ma') rr2
  BL = TR = C;
  _subVectors2D(BL, rectangle2.S);
  _addVectors2D(TR, rectangle2.S);

  // calculate vertices of (rotated := 'r')
  A.x = (-1) * rectangle1.S.y * sina;
  B.x = A.x;
  t = rectangle1.S.x * cosa;
  A.x += t;
  B.x -= t;

  A.y = rectangle1.S.y * cosa;
  B.y = A.y;
  t = rectangle1.S.x * sina;
  A.y += t;
  B.y -= t;

  t = sina * cosa;

  // verify that A is vertical min/max, B is horizontal min/max
  if(t < 0) {
    t = A.x;
    A.x = B.x;
    B.x = t;

    t = A.y;
    A.y = B.y;
    B.y = t;
  }

  // verify that B is horizontal minimum (leftest-vertex)
  if(sina < 0) {
    B.x = (-1) * B.x;
    B.y = (-1) * B.y;
  }

  // if rr2(ma) isn't in the horizontal range of
  // colliding with rr1(r), collision is impossible
  if(B.x > TR.x || B.x > (-1) * BL.x) return false;

  // if rr1(r) is axis-aligned, vertical min/max are easy to get
  if(t == 0) {
    ext1 = A.y;
    ext2 = (-1) * ext1;
  } else {
    // else, find vertical min/max in the range [BL.x, TR.x]
    x = BL.x - A.x;
    a = TR.x - A.x;
    ext1 = A.y;

    // if the first vertical min/max isn't in (BL.x, TR.x), then
    // find the vertical min/max on BL.x or on TR.x
    if (a * x > 0) {
      dx = A.x;

      if (x < 0) {
        dx -= B.x;
        ext1 -= B.y;
        x = a;
      } else {
        dx += B.x;
        ext1 += B.y;
      }

      ext1 *= x;
      ext1 /= dx;
      ext1 += A.y;
    }

    x = BL.x + A.x;
    a = TR.x + A.x;
    ext2 = (-1) * A.y;

    // if the second vertical min/max isn't in (BL.x, TR.x), then
    // find the local vertical min/max on BL.x or on TR.x
    if(a * x > 0) {
      dx = (-1) * A.x;

      if(x < 0) {
        dx -= B.x;
        ext2 -= B.y;
        x = a;
      } else {
        dx += B.x;
        ext2 += B.y;
      }

      ext2 *= x;
      ext2 /= dx;
      ext2 -= A.y;
    }
  }

  // check whether rr2(ma) is in the vertical range of colliding with rr1(r)
  // (for the horizontal range of rr2)
  return !((ext1 < BL.y && ext2 < BL.y) || (ext1 > TR.y && ext2 > TR.y));
}

var _rotateVector2DClockwise = function _rotateVector2DClockwise(v, angle) {
  var t = 0, cosa = Math.cos(angle), sina = Math.sin(angle);
  t = v.x;
  v.x = (t * cosa) + (v.y * sina);
  v.y = ((-1 * t) * sina) + (v.y * cosa);
}

var _addVectors2D = function _addVectors2D(v1, v2) {
  v1.x += v2.x;
  v1.y += v2.y;
}

var _subVectors2D = function _subVectors2D(v1, v2) {
  v1.x -= v2.x;
  v1.y -= v2.y;
}

exports.Rectangle = Rectangle;
exports.collision = collision;