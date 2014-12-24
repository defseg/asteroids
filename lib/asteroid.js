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
    } else if(otherObject instanceof Asteroids.Asteroid) {
      this.bounce(otherObject);
    } else if(otherObject.isBullet()){
      if (this.level < 3) {
        for (var i = 0; i < 2; i++) {
          var newVec = Asteroids.Util.randomVector(this.radius);
          var newPos = [(this.pos[0] + newVec[0] + 800) % 800, (this.pos[1] + newVec[1] + 600) % 600];
          var imgSrc = "vendor/img/asteroid" + (this.level + 1) + "." + Math.floor(Math.random() * 2 + 1) + ".png"
          this.game.addAsteroid(new Asteroid(newPos, game, this.radius / 2, imgSrc, this.level + 1));
        }
      }

      this.drop();
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };

  Asteroid.prototype.eachTick = function() {
    this.rotation += this.rotationIncrement;
  }

  Asteroid.prototype.drop = function() {
    var rapidFireItem = new Asteroids.RapidFireItem(this.pos, this.vel, game);
    this.game.addItem(rapidFireItem);
  }

})();
