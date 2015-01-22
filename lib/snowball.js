(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Snowball = Asteroids.Snowball = function(pos, vel, game, level, rotation) {
    this.img = new Image();

    this.level = level ? level : 1; // bigger level means smaller snowball

    if (this.level === 1) {
      this.img.src = "vendor/img/snowLg.png";
    } else if (this.level === 2) {
      this.img.src = "vendor/img/snowMd.png";
    } else {
      this.img.src = "vendor/img/snowSm.png"
    }

    var snowballParams = {
      pos: pos,
      vel: vel,
      radius: this.img.width / 2,
    }
    Asteroids.MovingObject.call(this, snowballParams, game);

    // inherits this.alpha from MovingObject init func
    this.rotation = rotation || game.ship.rotation;
    this.ticksAlive = 0;
    this.maxTicksAlive = 30;
  }

  Asteroids.Util.inherits(Snowball, Asteroids.Bullet);

  Snowball.prototype.eachTick = function() {
    this.ticksAlive++;

    if (this.ticksAlive > this.maxTicksAlive) {
      if (this.level < 3) {
        for (var i = 0; i < 360; i += 120) {
          var newRot = this.rotation + i;
          var newVel = Asteroids.Util.getBulletVelocity(newRot, 10);
          newPos = [this.pos[0] + newVel[0], this.pos[1] + newVel[1]];
          var newSnowball = new Asteroids.Snowball(newPos, newVel, this.game, this.level + 1, this.rotation);
          this.game.addBullet(newSnowball);
        }
      }
      this.game.remove(this);
    }
  }

  Snowball.delayOffset = 0;
  Snowball.spd = 10;

})();
