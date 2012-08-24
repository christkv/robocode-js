var Target = function Target() {
  AdvancedRobot.call(this);

  this.trigger = 0
}

inherits(Target, AdvancedRobot);

Target.prototype.run = function run() {
  this.setBodyColor("white");
  this.setGunColor("white");
  this.setRadarColor("white");
  // Initially, we'll move when life hits 80
  this.trigger = 80;
  var self = this;

  // Add a new condition
  var condition = new Condition("triggerhit");
  condition.test = function() {
    return (self.getEnergy() <= self.trigger);
  }
}

/**
 * onCustomEvent handler
 */
Target.prototype.onCustomEvent = function onCustomEvent(event) {
  // If our custom event "triggerhit" went off,
  if(event.getCondition().getName() == "triggerhit") {
    // Adjust the trigger value, or
    // else the event will fire again and again and again...
    this.trigger -= 20;
    console.log("Ouch, down to " + Math.round(this.getEnergy() + .5)) + " energy.");
    // out.println("Ouch, down to " + (int) (getEnergy() + .5) + " energy.");
    // move around a bit.
    this.turnLeft(65);
    this.ahead(100);
  }
}