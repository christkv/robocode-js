var inherits = require('util').inherits,
  EventEmitter = require('events').EventEmitter;

var Battle = function Battle(robots, specification) {
  this.robots = robots;
  this.specification = specification;
}

inherits(Battle, EventEmitter);

Battle.prototype.start = function start(fps) {
  this.fps = fps || 30;
  this.millisPrFrame = Math.floor(1000/this.fps);

  // Set up the initial battle field and then let the battle commence
  _setupBattleField(this);
  // Emit on battle start event
  this.emit("battleStart");
  // Kick off the game
  setTimeout(runGameLoop(this), this.millisPrFrame);
}

var runGameLoop = function runGameLoop(self) {
  return function() {
    self.emit("roundStarted");
  }
}

var _setupBattleField = function _setupBattleField(self) {
  // Distribute the robots randomly across the battle field
  _distributeRobotsRandomly(self);
  // Initialize the robots
  _initalizeRobots(self);
}

var _distributeRobotsRandomly = function _distributeRobotsRandomly(self) {
  // Locate a random spot on the map
  var x = Math.floor(self.specification.width * Math.random());
  var y = Math.floor(self.specification.height * Math.random());
  console.log("----------------------------------- _distributeRobotsRandomly")
  console.log("x = " + x + ": y = " + y)

}

var _initalizeRobots = function _initalizeRobots(self) {
}

exports.Battle = Battle;