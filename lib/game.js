(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var DIM_X = 640;
  var DIM_Y = 480;
  var NUM_ASTEROIDS = 3;

  var Game = Asteroids.Game = function() {
    this.asteroids = [];
    this.ship = new Asteroids.Ship([DIM_X/2, DIM_Y/2], this);
    this.ASTEROID_RADIUS = 30; // make this visible to Asteroid
    this.addAsteroids();
    this.bullets = [];
    this.img = new Image();
    this.img.src = "vendor/space-4.jpg"
  };

  Game.prototype.randomPosition = function() {
    x = Math.round(Math.random() * (DIM_X - this.ASTEROID_RADIUS * 2) + this.ASTEROID_RADIUS);
    y = Math.round(Math.random() * (DIM_Y - this.ASTEROID_RADIUS * 2) + this.ASTEROID_RADIUS);
    return [x, y];
  };

  Game.prototype.addAsteroids = function() {
    for (var i = 0; i < NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid(this.randomPosition(), this));
    }

  };

  Game.prototype.addBullet = function() {

  }

  Game.prototype.draw = function(ctx) {
    // ctx.clearRect(0, 0, DIM_X, DIM_Y);
    ctx.drawImage(this.img, 0, 0);

    ctx.beginPath();

    ctx.fill();

    this.allObjects().forEach(function (asteroid) {
      asteroid.draw(ctx);
    })
  };

  Game.prototype.moveObjects = function() {
    this.allObjects().forEach(function (asteroid) {
      asteroid.move();
    })
  };

  Game.prototype.wrap = function(pos) {
    if (pos[0] < -this.ASTEROID_RADIUS) {
      pos[0] = DIM_X + this.ASTEROID_RADIUS;
    } else if (pos[0] > DIM_X + this.ASTEROID_RADIUS) {
      pos[0] = -this.ASTEROID_RADIUS;
    }
    if (pos[1] < -this.ASTEROID_RADIUS) {
      pos[1] = DIM_Y + this.ASTEROID_RADIUS;
    } else if (pos[1] > DIM_Y + this.ASTEROID_RADIUS) {
      pos[1] = -this.ASTEROID_RADIUS;
    }
    return pos;
  };

  Game.prototype.checkCollisions = function () {
    for (var i = 0; i < this.allObjects().length-1; i++ ) {
      for (var j = i+1; j < this.allObjects().length; j++ ) {
        if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
          this.allObjects()[i].handleCollision(this.allObjects()[j]);
        }
      }
    }
  };

  Game.prototype.remove = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
      var objIndex = this.asteroids.indexOf(obj);
      this.asteroids.splice(objIndex, 1);
    } else if (obj instanceof Asteroids.Bullet) {
      var objIndex = this.bullets.indexOf(obj);
      this.bullets.splice(objIndex, 1);
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.bullets).concat([this.ship]);
  };

})();
