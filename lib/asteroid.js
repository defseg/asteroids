(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(pos, game, radius, imgSrc, level) {
    this.img = new Image();
    this.img.src = imgSrc ? imgSrc : "vendor/img/asteroid1.png";

    this.level = level ? level : 1; // bigger level means smaller asteroid

    this.rotation = 0;
    this.rotationIncrement = Math.random() * 20 - 10; // TODO remove magic numbers

    var asteroidParams = {
      pos: pos,
      vel: Asteroids.Util.randomVector(3),
      radius: (this.img.height === 0) ? 46 : this.img.height / 2, // kludge, TODO
    }
    Asteroids.MovingObject.call(this, asteroidParams, game);
  }
  // have to load Util before MovingObject before Asteroid
  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.handleCollision = function(otherObject) {
    if(otherObject instanceof Asteroids.Ship) {
      // you lose
      if (otherObject.shielded) {
        this.bounce(otherObject);
      } else {
        this.game.lose();
      }
    } else if(otherObject.isBullet()){
        if (this.level < 3) {
          for (var i = 0; i < 2; i++) {
            var newVec = Asteroids.Util.randomVector(this.radius);
            var newPos = [(this.pos[0] + newVec[0] + this.game.DIM_X) % this.game.DIM_X, (this.pos[1] + newVec[1] + this.game.DIM_Y) % this.game.DIM_Y];
            var imgSrc = "vendor/img/asteroid" + (this.level + 1) + "." + Math.floor(Math.random() * 2 + 1) + ".png"
            this.game.addAsteroid(new Asteroid(newPos, game, this.radius / 2, imgSrc, this.level + 1));
          }
        }

      otherObject.handleRemoval();
      this.handleRemoval();
    } else if(otherObject.willKillYou() || otherObject instanceof Asteroids.Item) {
      this.bounce(otherObject);
    }
  };

  Asteroid.prototype.eachTick = function() {
    this.rotation += this.rotationIncrement;
  }

  Asteroid.prototype.handleRemoval = function() {
    this.drop();
    this.game.remove(this);
  }


  Asteroid.prototype.drop = function() {
    var waveVal = Math.log(this.game.wave);
    if (this.game.addedItems > (this.game.wave / waveVal)) {
      return; // don't want to spawn too many powerups
    }

    var dropChance = 1/(10 + waveVal * 2);
    var dropGrain = dropChance / 9;  // magic number for specifying granularity
    var dropRand = Math.random();

    if (dropRand < dropGrain) {
      var rapidFireItem = new Asteroids.RapidFireItem(this.pos, this.vel, game);
      this.game.addItem(rapidFireItem);
    } else if (dropRand < 4 * dropGrain) {
      var multiCannonItem = new Asteroids.MultiCannonItem(this.pos, this.vel, game);
      this.game.addItem(multiCannonItem);
    } else if (dropRand < 6 * dropGrain) {
      var snowCannonItem = new Asteroids.SnowCannonItem(this.pos, this.vel, game);
      this.game.addItem(snowCannonItem);
    } else if (dropRand < dropChance) {
      var pulseCannonItem = new Asteroids.PulseCannonItem(this.pos, this.vel, game);
      this.game.addItem(pulseCannonItem);
    }

  }

  Asteroid.prototype.willKillYou = function() { return true }

})();
