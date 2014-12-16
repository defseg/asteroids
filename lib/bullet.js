(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function(pos, vel, game) {
    var bulletParams = {
      pos: pos,
      vel: vel,
      radius: 1,
      color: "#FF0000"
    }
    Asteroids.MovingObject.call(this, bulletParams, game);
  }

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.handleCollision = function(otherObject) {
    if(otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };

})();
