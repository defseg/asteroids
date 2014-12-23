(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var BigBullet = Asteroids.BigBullet = function(pos, vel, game) {
    this.img = new Image();
    this.img.src = "vendor/img/fireball2.png";
    var bigBulletParams = {
      pos: pos,
      vel: vel,
      color: "rgba(255, 0, 0, 1)",
    }
    Asteroids.MovingObject.call(this, bigBulletParams, game);

    this.ticksAlive = 0;
  }

  Asteroids.Util.inherits(BigBullet, Asteroids.MovingObject);

  BigBullet.prototype.handleCollision = function(otherObject) {
    if(otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };

  BigBullet.prototype.draw = function(ctx) {
    Asteroids.Util.drawRotatedImage(this.img, this.pos[0], this.pos[1], this.rotation, ctx);
  }

  BigBullet.prototype.eachTick = function () {
    this.ticksAlive++;

    // if (this.ticksAlive > 10) {
    //   this.img.style.opacity = (1 - (this.ticksAlive - 10) / 10)
    // }
    if (this.ticksAlive > 20) {
      this.game.remove(this);
    }
  }
})();
