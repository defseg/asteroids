(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function(params, game) {
    this.pos    = params.pos;
    this.vel    = params.vel;
    this.radius = (params.hasOwnProperty("radius")) ? params.radius : this.img.height / 2;
    this.rotation = 0;

    this.alpha = 1;

    this.game = game;
  }

  MovingObject.prototype.isWrappable = true;

  // TODO add alpha
  MovingObject.prototype.draw = function(obj, ctx) {
    if (obj.alpha !== 1) {
      ctx.save();
      ctx.globalAlpha = obj.alpha;
    }
    Asteroids.Util.drawRotatedImage(obj.img, obj.pos[0], obj.pos[1], -obj.rotation + 180, ctx);
    if (obj.alpha !== 1) ctx.restore();
  };

  MovingObject.prototype.isOutOfBounds = function() {
    return ((this.pos[0] < -this.radius) ||
           (this.pos[0] > this.game.DIM_X + this.radius) ||
           (this.pos[1] < -this.radius) ||
           (this.pos[1] > this.game.DIM_Y + this.radius))
  }

  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.pos = this.wrap(this.pos)
    if (this.isOutOfBounds()) {
      this.isWrappable ? this.pos = this.wrap(this.pos) : this.game.remove(this);
    }
  };

  MovingObject.prototype.wrap = function(pos) {
    if (pos[0] < -this.radius) {                          // left
      pos[0] += this.game.DIM_X + 2 * this.radius;
    } else if (pos[0] > this.game.DIM_X + this.radius) {  // right
      pos[0] -= this.game.DIM_X + 2 * this.radius;
    }
    if (pos[1] < -this.radius) {                          // top
      pos[1] += this.game.DIM_Y + 2 * this.radius;
    } else if (pos[1] > this.game.DIM_Y + this.radius) {  // bottom
      pos[1] -= this.game.DIM_Y + 2 * this.radius;
    }
    return pos;
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

    this.moveUntilNotCollidedWith(otherObject);
  }

  MovingObject.prototype.moveUntilNotCollidedWith = function(otherObject) {
    var i = 0; // to protect against infinite loops
    while(this.isCollidedWith(otherObject)) {
      i++;
      if (i > 20) {
        this.game.remove(otherObject);
        return;
      }
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

  MovingObject.prototype.eachTick = function () {}

})();
