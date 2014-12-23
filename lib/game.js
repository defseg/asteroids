(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var Game = Asteroids.Game = function() {
    this.DIM_X = 800;
    this.DIM_Y = 600;

    this.ship = new Asteroids.Ship([this.DIM_X/2, this.DIM_Y/2], this);
    this.asteroids = [];
    this.ASTEROID_RADIUS = 30; // make this visible to Asteroid
    this.wave = 1;
    this.addAsteroids();
    this.bullets = [];

    this.img = new Image();
    this.img.src = "vendor/space-4.jpg"

    this.upArrowPressed = false;
    this.downArrowPressed = false;
    this.leftArrowPressed = false;
    this.rightArrowPressed = false;
    this.spaceKeyPressed = false;
    this.qKeyPressed = false;
    this.eKeyPressed = false;
  };

  Game.prototype.randomPosition = function() {
    x = Math.round(Math.random() * (this.DIM_X - this.ASTEROID_RADIUS * 2) + this.ASTEROID_RADIUS);
    y = Math.round(Math.random() * (this.DIM_Y - this.ASTEROID_RADIUS * 2) + this.ASTEROID_RADIUS);
    return [x, y];
  };

  Game.prototype.addAsteroids = function() {
    console.log(this.wave);
    for (var i = 0; i < (this.wave + 3); i++) {
      this.asteroids.push(new Asteroids.Asteroid(this.randomPosition(), this));
    }
  };

  Game.prototype.addAsteroid = function(asteroid) {
    this.asteroids.push(asteroid);
  }

  Game.prototype.addBullet = function() {

  }

  Game.prototype.draw = function(ctx) {
    ctx.drawImage(this.img, 0, 0);

    ctx.beginPath();

    ctx.fill();

    this.allObjects().forEach(function (asteroid) {
      asteroid.draw(ctx);
    })
    // TODO remove magic numbers
    ctx.rect(0, 600, 800, 640);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.fillStyle = "red";
    ctx.font = "20px Menlo";
    ctx.fillText("Wave " + this.wave, 55, 640);

    // to show the collision-detection circle,
    // uncomment this and rename ship.draw to ship.drawThing
    // this.ship.drawThing(ctx);
  };

  Game.prototype.moveObjects = function() {
    this.allObjects().forEach(function (asteroid) {
      asteroid.eachTick(); // may as well put this here so we don't loop twice
      asteroid.move();
    })
  };

  Game.prototype.wrap = function(pos) {
    if (pos[0] < -this.ASTEROID_RADIUS) {
      pos[0] = this.DIM_X + this.ASTEROID_RADIUS;
    } else if (pos[0] > this.DIM_X + this.ASTEROID_RADIUS) {
      pos[0] = -this.ASTEROID_RADIUS;
    }
    if (pos[1] < -this.ASTEROID_RADIUS) {
      pos[1] = this.DIM_Y + this.ASTEROID_RADIUS;
    } else if (pos[1] > this.DIM_Y + this.ASTEROID_RADIUS) {
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
    } else if (obj instanceof Asteroids.Bullet || obj instanceof Asteroids.BigBullet) {
      var objIndex = this.bullets.indexOf(obj);
      this.bullets.splice(objIndex, 1);
    }

    if (this.asteroids.length === 0) {
      this.wave++;
      console.log("Wave " + this.wave);
      this.addAsteroids();
    }
  };

  Game.prototype.lose = function () {

    this.ship.relocate();
    this.wave = 0; // this way we can use the wave starter in remove()
    this.allObjects().forEach(function (object) {
      this.remove(object);
    }.bind(this));
  }

  Game.prototype.step = function () {
    this.checkKeys();
    this.moveObjects();
    this.ship.eachTick(); // other moving objects' eachTick()s get called in moveObjects()
    this.checkCollisions();
  };

  Game.prototype.checkKeys = function () {
    if (this.leftArrowPressed) {
      this.ship.rotate(10);
    }
    if (this.qKeyPressed) {
      this.ship.rotate(1);
    }
    if (this.rightArrowPressed) {
      this.ship.rotate(-10);
    }
    if (this.eKeyPressed) {
      this.ship.rotate(-1);
    }
    if (this.upArrowPressed) {
      this.ship.power();
    }
    if (this.spaceKeyPressed) {
      this.ship.fireBullet();
    }
    if (this.zKeyPressed) {
      this.ship.fireBigBullet();
    }
  }

  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.bullets).concat([this.ship]);
  };

})();
