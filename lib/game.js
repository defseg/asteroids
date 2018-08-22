(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var Game = Asteroids.Game = function(dim_x, dim_y) {
    this.DIM_X = dim_x;
    this.DIM_Y = dim_y;

    this.ship = new Asteroids.Ship([this.DIM_X/2, this.DIM_Y/2], this);
    this.asteroids = [];
    this.ASTEROID_RADIUS = 30; // make this visible to Asteroid
    this.wave = 1;
    this.addAsteroids();
    this.bullets = [];
    this.items = [];

    this.addedItems = 0;

    this.img = new Image();
    this.img.src = "vendor/space-5.jpg"

    this.hud = new Asteroids.Hud();
  };

  Game.prototype.draw = function(ctx) {
    ctx.drawImage(this.img, 0, 0);
    ctx.beginPath();
    ctx.fill();

    this.allObjects().forEach(function (obj) {
      obj.draw(obj, ctx);
    })

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
    if (this.wave % 5 == 0) {
      this.asteroids.push(new Asteroids.Brain(this));
      for (var i = 0; i < (this.wave / 5); i++) {
        this.asteroids.push(new Asteroids.Asteroid(this.initialAsteroidPosition(), this));
      }
    } else {
      for (var i = 0; i < (this.wave + 3); i++) {
        this.asteroids.push(new Asteroids.Asteroid(this.initialAsteroidPosition(), this));
      }
    }
  };

  Game.prototype.addAsteroid = function(asteroid) {
    this.asteroids.push(asteroid);
  };

  Game.prototype.addBullet = function(bullet) {
    this.bullets.push(bullet);
  };

  Game.prototype.addItem = function(item) {
    this.items.push(item);
    this.addedItems++;
  };

  Game.prototype.moveObjects = function() {
    this.allObjects().forEach(function (obj) {
      obj.eachTick(); // may as well put this here so we don't loop twice
      obj.move();
    })
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
    if (obj.willKillYou()) {
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
    this.ship.relocate();
    this.wave = 0; // this way we can use the wave starter in remove()
    this.allObjects().forEach(function (object) {
      this.remove(object);
    }.bind(this));
    this.hud.edit('wave', 1)
  };

  Game.prototype.replaceShip = function() {
    this.ship = new Asteroids.Ship([this.DIM_X/2, this.DIM_Y/2], this);
  }

  Game.prototype.step = function () {
    this.shipJustMaxedShields = (this.ship.shieldEnergy < this.ship.maxShieldEnergy); // HUD shenanigans
    this.checkKeys();
    this.moveObjects();
    this.ship.eachTick(); // other moving objects' eachTick()s get called in moveObjects()
    this.shipJustMaxedShields = (this.shipJustMaxedShields && this.ship.shieldEnergy == this.ship.maxShieldEnergy);
    this.checkCollisions();
    this.updateHud();
  };

  Game.prototype.updateHud = function () {
    if (this.lastWave < this.wave || !this.lastWave) {
      this.lastWave = this.wave;
      this.hud.edit("wave", this.wave);
    }
    if (this.ship.shielded || this.ship.shieldEnergy < this.ship.maxShieldEnergy || this.shipJustMaxedShields) {
      this.hud.edit("shield", this.ship.shieldEnergy);
    }
  }

  Game.prototype.checkKeys = function () {
    if (key.isPressed("left"))  this.ship.rotate(8);
    if (key.isPressed("q"))     this.ship.rotate(1);
    if (key.isPressed("right")) this.ship.rotate(-8);
    if (key.isPressed("e"))     this.ship.rotate(-1);
    if (key.isPressed("up"))    this.ship.power();
    if (key.isPressed("a"))     this.ship.fire();
    if (key.isPressed("w"))     this.ship.fireBigBullet();
    if (key.isPressed("s"))     this.ship.shield();
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.items).concat(this.bullets).concat([this.ship]);
  };

})();
