var Crazy = function Crazy() {
  AdvancedRobot.call(this);
  this.movingForward = false;
}

inherits(Crazy, AdvancedRobot);

Crazy.prototype.run = function run() {
  this.setBodyColor(0, 200, 0);
  this.setGunColor(0, 150, 50);
  this.setRadarColor(0, 100, 100);
  this.setBulletColor(255, 255, 100);
  this.setScanColor(255, 200, 200);

  while(true) {
    // Tell the game we will want to move ahead 40000 -- some large number
    this.setAhead(40000);
    this.movingForward = true;
    // Tell the game we will want to turn right 90
    this.setTurnRight(90);
    // At this point, we have indicated to the game that *when we do something*,
    // we will want to move ahead and turn right.  That's what "set" means.
    // It is important to realize we have not done anything yet!
    // In order to actually move, we'll want to call a method that
    // takes real time, such as waitFor.
    // waitFor actually starts the action -- we start moving and turning.
    // It will not return until we have finished turning.
    this.waitFor(new TurnCompleteCondition(this));
    // Note:  We are still moving ahead now, but the turn is complete.
    // Now we'll turn the other way...
    this.setTurnLeft(180);
    // ... and wait for the turn to finish ...
    this.waitFor(new TurnCompleteCondition(this));
    // ... then the other way ...
    this.setTurnRight(180);
    // .. and wait for that turn to finish.
    this.waitFor(new TurnCompleteCondition(this));
    // then back to the top to do it all again
  }
}

/**
 * onHitWall:  Handle collision with wall.
 */
Crazy.prototype.onHitWall = function onHitWall(event) {
  // Bounce off!
  this.reverseDirection();
}

/**
 * reverseDirection:  Switch from ahead to back & vice versa
 */
Crazy.prototype.reverseDirection = function reverseDirection() {
  if(this.movingForward) {
    this.setBack(40000);
    movingForward = false;
  } else {
    this.setAhead(40000);
    movingForward = true;
  }
}

/**
 * onScannedRobot:  Fire!
 */
Crazy.prototype.onScannedRobot = function(event) {
  this.fire(1);
}

/**
 * onHitRobot:  Back up!
 */
Crazy.prototype.onHitRobot = function(event) {
  // If we're moving the other robot, reverse!
  if (event.isMyFault()) {
    this.reverseDirection();
  }
}