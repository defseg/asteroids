(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function(params, game) {
    this.pos    = params.pos;
    this.vel    = params.vel;
    this.radius = params.radius;
    this.color  = params.color;

    this.game = game;
  }

  MovingObject.prototype.isWrappable = true;

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.isOutOfBounds = function() {
    // TODO fix magic numbers
    return ((this.pos[0] < -this.radius) ||
           (this.pos[0] > this.game.DIM_X + this.radius) ||
           (this.pos[1] < -this.radius) ||
           (this.pos[1] > this.game.DIM_Y + this.radius))
  }

  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.pos = this.game.wrap(this.pos)
    if (this.isOutOfBounds()) {
      this.isWrappable ? this.pos = this.game.wrap(this.pos) : this.game.remove(this);
    }
  };

  MovingObject.prototype.bounce = function(otherObject) {
    var mass = Math.pow(this.radius, 2) * Math.PI;
    var otherMass = Math.pow(otherObject.radius, 2) * Math.PI;
    //  (firstBall.speed.x * (firstBall.mass – secondBall.mass) +
    //  (2 * secondBall.mass * secondBall.speed.x))
    //  / (firstBall.mass + secondBall.mass);
    var velX = (this.vel[0] * (mass - otherMass) + 2 * otherMass * otherObject.vel[0] ) / (mass + otherMass);
    var velY = (this.vel[1] * (mass - otherMass) + 2 * otherMass * otherObject.vel[1] ) / (mass + otherMass);
    var otherVelX = (otherObject.vel[0] * (otherMass - mass) + 2 * mass * this.vel[0] ) / (mass + otherMass)
    var otherVelY = (otherObject.vel[1] * (otherMass - mass) + 2 * mass * this.vel[1] ) / (mass + otherMass)

    this.vel = [velX, velY];
    otherObject.vel = [otherVelX, otherVelY];

    while(this.isCollidedWith(otherObject)) {
      this.move();
      otherObject.move();
    }
  }


  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var radii = this.radius + otherObject.radius;
    var distance = Math.sqrt(Math.pow(this.pos[0] - otherObject.pos[0], 2) +
      Math.pow(this.pos[1] - otherObject.pos[1], 2));
    return distance < radii;
  };

  MovingObject.prototype.handleCollision = function(otherObject) {
  }

})();
