var inherits = require('util').inherits,
  EventEmitter = require('events').EventEmitter;

var Robot = function Robot() {
  EventEmitter.call(this);
}

inherits(Robot, EventEmitter);

exports.Robot = Robot;