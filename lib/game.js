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
      this.asteroids.push(new Asteroids.Asteroid(this.randomPosition(), this));
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

  Game.prototype.wrap = function(pos) {
    if (pos[0] < 0) {
      pos[0] = DIM_X;
    } else if (pos[0] > DIM_X) {
      pos[0] = 0;
    }
    if (pos[1] < 0) {
      pos[1] = DIM_Y;
    } else if (pos[1] > DIM_Y) {
      pos[1] = 0;
    }
    return pos;
  }

})();
