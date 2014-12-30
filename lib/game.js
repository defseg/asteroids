(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var Game = Asteroids.Game = function() {
    this.DIM_X = 1200;
    this.DIM_Y = 700;

    this.ship = new Asteroids.Ship([this.DIM_X/2, this.DIM_Y/2], this);
    this.asteroids = [];
    this.ASTEROID_RADIUS = 30; // make this visible to Asteroid
    this.wave = 1;
    this.addAsteroids();
    this.bullets = [];
    this.items = [];

    this.addedItems = 0;

    this.img = new Image();
    this.img.src = "vendor/space-4.jpg"

  };

  // Game.prototype.randomPosition = function() {
  //   x = Math.round(Math.random() * (this.DIM_X - this.ASTEROID_RADIUS * 2) + this.ASTEROID_RADIUS);
  //   y = Math.round(Math.random() * (this.DIM_Y - this.ASTEROID_RADIUS * 2) + this.ASTEROID_RADIUS);
  //   return [x, y];
  // };

  Game.prototype.draw = function(ctx) {
    ctx.drawImage(this.img, 0, 0);

    ctx.beginPath();

    ctx.fill();

    this.allObjects().forEach(function (obj) {
      obj.draw(obj, ctx);
    })

    ctx.rect(0, this.DIM_Y, 1200, this.DIM_Y + 40);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.fillStyle = "red";
    ctx.font = "20px Menlo";
    ctx.fillText("Wave " + this.wave, 55, this.DIM_Y + 40);

    ctx.fillStyle = "red";
    ctx.font = "20px Menlo";
    ctx.fillText("Shield: " + this.ship.shieldEnergy, 200, this.DIM_Y + 40);
  };

  Game.prototype.initialAsteroidPosition = function() {
    var doX = (Math.random() > 0.5);
    if (doX) {
      x = (Math.random() * (this.DIM_X - this.ASTEROID_RADIUS * 2) + this.ASTEROID_RADIUS);
      y = (Math.random() > 0.5) ? -10 : this.DIM_Y + 10;
    } else {
      x = (Math.random() > 0.5) ? -10 : this.DIM_X + 10;
      y = (Math.random() * (this.DIM_Y - this.ASTEROID_RADIUS * 2) + this.ASTEROID_RADIUS);
    }
    return [x, y];
  }

  Game.prototype.addAsteroids = function() {
    for (var i = 0; i < (this.wave + 3); i++) {
      this.asteroids.push(new Asteroids.Asteroid(this.initialAsteroidPosition(), this));
    }
  };

  Game.prototype.addAsteroid = function(asteroid) {
    this.asteroids.push(asteroid);
  }

  Game.prototype.addBullet = function(bullet) {
    this.bullets.push(bullet);
  }

  Game.prototype.addItem = function(item) {
    this.items.push(item);
    this.addedItems++;
    console.log(this.addedItems);
  }


  Game.prototype.moveObjects = function() {
    this.allObjects().forEach(function (obj) {
      obj.eachTick(); // may as well put this here so we don't loop twice
      obj.move();
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
    for (var i = 0; i < this.asteroids.length; i++) {
      for (var j = i+1; j < this.allObjects().length; j++) {
        if (this.asteroids[i].isCollidedWith(this.allObjects()[j])) {
          this.asteroids[i].handleCollision(this.allObjects()[j]);
        }
      }
    }

    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].isCollidedWith(this.ship)) {
        this.items[i].handleCollision(this.ship);
      }
    }
  };

  Game.prototype.remove = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
      // console.log("Removing asteroid at position " + obj.pos[0] + ", " + obj.pos[1])
      var objIndex = this.asteroids.indexOf(obj);
      this.asteroids.splice(objIndex, 1);
    } else if (obj.isBullet()) {
      var objIndex = this.bullets.indexOf(obj);
      this.bullets.splice(objIndex, 1);
    } else if (obj.isItem()) {
      var objIndex = this.items.indexOf(obj);
      this.items.splice(objIndex, 1);
    }

    if (this.asteroids.length === 0) {
      this.wave++;
      this.addedItems = 0; // reset added items count
      this.addAsteroids();
    }
  };

  Game.prototype.lose = function () {
    this.ship = new Asteroids.Ship([this.DIM_X/2, this.DIM_Y/2], this);
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
    if (key.isPressed("left"))  this.ship.rotate(8);
    if (key.isPressed("q"))     this.ship.rotate(1);
    if (key.isPressed("right")) this.ship.rotate(-8);
    if (key.isPressed("e"))     this.ship.rotate(-1);
    if (key.isPressed("up"))    this.ship.power();
    if (key.isPressed("space")) this.ship.fire();
    if (key.isPressed("w"))     this.ship.fireBigBullet();
    if (key.isPressed("s"))     this.ship.shield();
  }



  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.items).concat(this.bullets).concat([this.ship]);
  };

})();
