(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function(params, game) {
    this.pos    = params.pos;
    this.vel    = params.vel;
    this.radius = (params.hasOwnProperty("radius")) ? params.radius : (this.img.height + this.img.width) / 4;
    this.rotation = 180;

    // Item collision detection is unforgiving, because they're oval-shaped.
    if (this.isItem()) {
      this.radius += 10;
    }

    this.alpha = 1;
    this.game = game;
  }

  MovingObject.prototype.isWrappable = true;

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
      pos[1] += this.game.DIM_Y + 2 * this.radius * 2;
    } else if (pos[1] > this.game.DIM_Y + this.radius * 2) {  // bottom
      pos[1] -= this.game.DIM_Y + 2 * this.radius * 2;
    }
    return pos;
  };

  MovingObject.prototype.bounce = function(otherObject) {
    var mass = Math.pow(this.radius, 2) * Math.PI;
    var otherMass = Math.pow(otherObject.radius, 2) * Math.PI;
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
      if (i % 20 == 0) {
        otherObject.vel = [-otherObject.vel[0], otherObject.vel[1]];
        if (i == 100) {
          this.game.remove(otherObject);
          return;
        }
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
  }

  MovingObject.prototype.handleRemoval = function() {
    this.game.remove(this);
  }

  MovingObject.prototype.eachTick = function() {}

  MovingObject.prototype.isBullet = function() { return false; }
  MovingObject.prototype.isItem = function() { return false; }
  MovingObject.prototype.willKillYou = function() { return false;}

})();
