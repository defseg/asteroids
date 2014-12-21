(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function(pos, vel, rad, game) {
    var bulletParams = {
      pos: pos,
      vel: vel,
      radius: rad,
      color: "rgba(255, 0, 0, 1)"
    }
    Asteroids.MovingObject.call(this, bulletParams, game);

    this.ticksAlive = 0;
  }

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.handleCollision = function(otherObject) {
    if(otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };

  // Bullet.prototype.isWrappable = false;

  Bullet.prototype.eachTick = function () {
    this.ticksAlive++;

    if (this.ticksAlive > 40) {
      this.color = "rgba(255, 0, 0, " + (1 - (this.ticksAlive - 41) / 10) + ")"
      console.log(this.color);
    }
    if (this.ticksAlive > 50) {
      this.game.remove(this);
    }
  }
})();
