(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var BrainBullet = Asteroids.BrainBullet = function(pos, vel, game) {
    this.img = new Image();
    this.img.src = "vendor/img/eye.png";

    this.ticksAlive = 0;
    this.maxTicksAlive = 50;

    var brainBulletParams = {
      pos: pos,
      vel: vel,
    }

    Asteroids.MovingObject.call(this, brainBulletParams, game);
  }

  Asteroids.Util.inherits(BrainBullet, Asteroids.MovingObject);

  BrainBullet.prototype.handleCollision = function(otherObject) {
    if(otherObject instanceof Asteroids.Ship) {
      // you lose
      if (otherObject.shielded) {
        this.handleRemoval();
      } else {
        this.game.lose();
      }
    } else if(otherObject instanceof Asteroids.Asteroid || otherObject instanceof Asteroids.Item) {
      this.bounce(otherObject);
    }
  }

  BrainBullet.prototype.switchDirection = function() {
    this.vel[0] += Math.random() * 2 - 1;
    this.vel[1] += Math.random() * 2 - 1;
  }

  // this is the same as Asteroids.Bullet, but we don't want to inherit
  BrainBullet.prototype.eachTick = function() {
    this.ticksAlive++;

    if (this.ticksAlive > (this.maxTicksAlive - 10)) {
      this.alpha = (this.maxTicksAlive - (this.ticksAlive)) / 10;
    }
    if (this.ticksAlive > this.maxTicksAlive) {
      this.game.remove(this);
    }
  }

  BrainBullet.prototype.willKillYou = function() { return true; }

})();
