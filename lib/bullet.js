(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function(pos, vel, rad, game) {
    this.img = new Image();
    this.img.src = "vendor/img/bullet.png";
    var bulletParams = {
      pos: pos,
      vel: vel,
      radius: rad,
      color: "rgba(255, 0, 0, 1)"
    }
    Asteroids.MovingObject.call(this, bulletParams, game);

    this.ticksAlive = 0;
    this.maxTicksAlive = 30;
  }

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.handleCollision = function(otherObject) {
    if(otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };

  Bullet.prototype.eachTick = function () {
    this.ticksAlive++;

    if (this.ticksAlive > (this.maxTicksAlive - 10)) {
      this.alpha = 1 - (this.ticksAlive - (this.maxTicksAlive + 1)) / 10;
    }
    if (this.ticksAlive > this.maxTicksAlive) {
      this.game.remove(this);
    }
  }
})();
