(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(pos) {
    asteroidParams = {
      pos: pos,
      vel: Asteroids.Util.randomVector(10),
      radius: 30,
      color: "#00FF00"
    }
    Asteroids.MovingObject.call(this, asteroidParams);
  }

  // have to load Util before MovingObject before Asteroid
  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);



})();
