var Specification = function Specification(options) {
  this.options = options || {};
  this.width = options.width || 800;
  this.height = options.height || 600;
  this.gunCoolingRate = options.gunCoolingRate || 0.1;
  this.inactivityTime = options.inactivityTime || 450;
  this.hideEnemyNames = options.hideEnemyNames || false;

  this.tankWidth = options.tankWidth || 40;
  this.tankHeight = options.tankHeight || 40;
  this.tankHalfWidthOffset = this.tankWidth / 2 - 2;
  this.tankHalfHeightOffset = this.tankHeight / 2 - 2;
}

exports.Specification = Specification;
