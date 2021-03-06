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
      radius: this.img.width / 2, // bad image, should get one more circle-like
      color: "rgba(255, 0, 0, 1)",
    }
    Asteroids.MovingObject.call(this, bigBulletParams, game);

    // inherits this.alpha from MovingObject init func
    this.rotation = game.ship.rotation;
    this.ticksAlive = 0;
    this.maxTicksAlive = 20;
  }

  BigBullet.delayOffset = 30;
  BigBullet.spd = 10;

  Asteroids.Util.inherits(BigBullet, Asteroids.Bullet);
})();
