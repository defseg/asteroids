(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Snowball = Asteroids.Snowball = function(pos, vel, game, level) {
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
    this.rotation = game.ship.rotation;
    this.ticksAlive = 0;
    this.maxTicksAlive = 30;
  }

  Asteroids.Util.inherits(Snowball, Asteroids.Bullet);

  Snowball.prototype.eachTick = function() {
    this.ticksAlive++;

    // if (this.ticksAlive > (this.maxTicksAlive - 10)) {
    //   this.alpha = (this.maxTicksAlive - (this.ticksAlive)) / 10;
    // }
    console.log(this.alpha);
    if (this.ticksAlive > this.maxTicksAlive) {
      if (this.level < 3) {
        firstSnowball = new Asteroids.Snowball(this.pos, this.vel, this.game, this.level + 1);
        this.game.addBullet(firstSnowball);
      }
      this.game.remove(this);
    }
  }

})();
