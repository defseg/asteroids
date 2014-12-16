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

  // var mo = new Asteroids.MovingObject(
  //   { pos: [30, 30], vel: [10, 10], radius: 5, color: "#00FF00"}
  // )

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
           (this.pos[0] > 640 + this.radius) ||
           (this.pos[1] < -this.radius) ||
           (this.pos[1] > 480 + this.radius))
  }

  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.pos = this.game.wrap(this.pos)
    if (this.isOutOfBounds()) {   // TODO move wrap to MovingObject?
      this.isWrappable ? this.pos = this.game.wrap(this.pos) : this.game.remove(this);
    }
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var radii = this.radius + otherObject.radius;
    var distance = Math.sqrt(Math.pow(this.pos[0] - otherObject.pos[0], 2) +
      Math.pow(this.pos[1] - otherObject.pos[1], 2));
    return distance < radii;
  };

  MovingObject.prototype.handleCollision = function(otherObject) {
  }

})();
