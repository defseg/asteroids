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
  }

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.handleCollision = function(otherObject) {
    if(otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };

  Bullet.prototype.draw = function(ctx) {
    Asteroids.Util.drawRotatedImage(this.img, this.pos[0], this.pos[1], this.rotation, ctx);
  }

  Bullet.prototype.eachTick = function () {
    this.ticksAlive++;

    // if (this.ticksAlive > 40) {
    //   TODO TODO TODO
    // }
    if (this.ticksAlive > 50) {
      this.game.remove(this);
    }
  }
})();
