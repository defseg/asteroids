(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var DIM_X = 640;
  var DIM_Y = 480;
  var NUM_ASTEROIDS = 5;

  var Game = Asteroids.Game = function() {
    this.asteroids = [];
    this.addAsteroids()
  };

  Game.prototype.randomPosition = function() {
    // the magic numbers are from the default asteroid radius
    x = Math.round(Math.random() * (DIM_X - 60) + 30);
    y = Math.round(Math.random() * (DIM_Y - 60) + 30);
    return [x, y];
  }

  Game.prototype.addAsteroids = function() {
    for (var i = 0; i < NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid(this.randomPosition()));
    }

  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, DIM_X, DIM_Y);

    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.fill();

    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx)
    })
  };

  Game.prototype.moveObjects = function() {
    this.asteroids.forEach(function (asteroid) {
      asteroid.move();
    })
  }

})();
