(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(pos, game, radius) {
    var asteroidParams = {
      pos: pos,
      vel: Asteroids.Util.randomVector(3),
      radius: radius ? radius : game.ASTEROID_RADIUS,
      color: "#004F00"
    }
    Asteroids.MovingObject.call(this, asteroidParams, game);
  }
  // have to load Util before MovingObject before Asteroid
  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.handleCollision = function(otherObject) {
    if(otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    } else if(otherObject instanceof Asteroids.Asteroid) {
      this.bounce(otherObject);
    } else {
      if (this.radius > 10) {
        for (var i = 0; i < 2; i++) {
          newVec = Asteroids.Util.randomVector(this.radius * 2);
          newPos = [this.pos[0] + newVec[0], this.pos[1] + newVec[1]];
          this.game.addAsteroid(new Asteroid(newPos, game, this.radius / 2));
          if(otherObject instanceof Asteroids.Asteroid) {
            this.game.addAsteroid(new Asteroid(newPos, game, this.radius / 2));
          }
        }
      }

      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };



})();
