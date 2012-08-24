var collision = require('../../lib/collision/rectangle').collision,
  // RotRect = require('../../lib/collision/rectangle').RotRect,
  // Vector2D = require('../../lib/collision/rectangle').Vector2D;
  Rectangle = require('../../lib/collision/rectangle').Rectangle;

// console.dir(require('../../lib/collision/rectangle'))

exports.setUp = function(callback) {
  callback();
}

exports.tearDown = function(callback) {
  callback();
}

// Test the error reporting functionality
exports["Should Correctly test for rectangle collision"] = function(test) {
  // Force collision
  var rectangle1 = new Rectangle(290, 200, 30, 50, 0);
  var rectangle2 = new Rectangle(320, 200, 30, 80, 0);
  test.equal(true, collision(rectangle1, rectangle2));

  // No collision
  rectangle1.setX(200);
  test.equal(false, collision(rectangle1, rectangle2));

  // Finsh test
  test.done();
}










