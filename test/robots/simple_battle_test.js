var inherits = require('util').inherits,
  fs = require('fs'),
  Robot = require("../../lib/robot").Robot,
  Battle = require("../../lib/battle").Battle,
  Specification = require("../../lib/specification").Specification;

// Just get all events
var listener = function(eventName) {
  return function(data) {
    console.log("================================================= received " + eventName);
    console.dir(data);
  }
}

exports.setUp = function(callback) {
  callback();
}

exports.tearDown = function(callback) {
  callback();
}

// Test the error reporting functionality
exports["Should correctly test the position of two tanks"] = function(test) {
  // Var create robot specifications
  var crazyBot = fs.readFileSync("./test/robots/test_robots/crazy.js", "ascii");
  var targetBot = fs.readFileSync("./test/robots/test_robots/target.js", "ascii");
  // The two robots taking part
  var Robot1 = new Robot(crazyBot, "crazy", "christian kvalheim", "1.0", "1.0", "Crazy", "crazy robot");
  var Robot2 = new Robot(targetBot, "target", "christian kvalheim", "1.0", "1.0", "Target", "target robot");
  // Rules and specifications on the battlefield
  var specification = new Specification({
    // Battlefield specification
    width: 800,
    height: 600,
    // Battle specification
    gunCoolingRate: 0.1,
    inactivityTime: 450,
    hideEnemyNames: false
  });

  // Set up a battle, with robots and
  var battle = new Battle([Robot1, Robot2], specification);

  // Set up listeners
  battle.on("battleStart", new listener("battleStart"));
  battle.on("battleFinished", new listener("battleFinished"));
  battle.on("battleComplete", new listener("battleComplete"));
  battle.on("battlePaused", new listener("battlePaused"));
  battle.on("battleResumed", new listener("battleResumed"));

  battle.on("roundStarted", new listener("roundStarted"));
  battle.on("roundEnded", new listener("roundEnded"));

  battle.on("turnStarted", new listener("turnStarted"));
  battle.on("turnEnded", new listener("turnEnded"));

  battle.on("battleMessage", new listener("battleMessage"));
  battle.on("battleError", new listener("battleError"));

  // Start the battle with a tick resolution (FPS)
  // this case it's 1 FPS
  battle.start(1);

  // // Finsh test
  // test.done();
}










