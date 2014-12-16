(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (pos) {
    asteroidParams = {
      pos:    pos;
      vel:    Util.randomVector(10);
      radius: 30;
      color:  "#00FF00";
    }
    return new MovingObject(asteroidParams);
  }

  // have to load Util before MovingObject before Asteroid
  Util.inherits(Asteroid, MovingObject);



})();
