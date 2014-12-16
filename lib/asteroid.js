(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(pos, game) {
    asteroidParams = {
      pos: pos,
      vel: Asteroids.Util.randomVector(3),
      radius: game.ASTEROID_RADIUS,
      color: "#004F00"
    }
    Asteroids.MovingObject.call(this, asteroidParams, game);
  }
  // have to load Util before MovingObject before Asteroid
  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.handleCollision = function(otherObject) {
    if(otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    } else {
      this.game.removeAsteroid(otherObject);
      this.game.removeAsteroid(this);
    }
  };



})();
