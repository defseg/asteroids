(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Brain = Asteroids.Brain = function(game) {
    this.img = new Image();
    this.img.src = "vendor/img/brain.png";
    var pos = [(game.DIM_X / 2), 100];

    this.hitPoints = 40;
    this.currentDamage = 0;
    this.i = 0;

    Asteroids.MovingObject.call(this, {pos: pos, vel: [0, -5], radius: 75}, game);
  }

  Asteroids.Util.inherits(Asteroids.Brain, Asteroids.MovingObject);

  Brain.prototype.handleCollision = function(otherObject) {
    if(otherObject instanceof Asteroids.Ship) {
      if (otherObject.shielded) {
        this.bounce(otherObject);
      } else {
        this.game.lose();
      }
    } else if(otherObject instanceof Asteroids.Asteroid || otherObject instanceof Asteroids.Item) {
      this.bounce(otherObject);
    } else if(otherObject.isBullet()) {
      this.currentDamage++;
      if (this.currentDamage >= this.hitPoints) {
        this.handleRemoval();
      }
      otherObject.handleRemoval();
    }
  }

  Brain.prototype.switchDirection = function() {
    this.vel[0] += Math.random() * 2 - 1;
    this.vel[1] += Math.random() * 2 - 1;
  }

  Brain.prototype.eachTick = function() {
    this.i++;
    if (this.i % 7 == 0) {
      this.switchDirection();
    }
    if (this.i % 11 == 0) {
      var bulletVelocity = Asteroids.Util.getBulletVelocity(this.i * 2, 10);
      var brainBullet = new Asteroids.BrainBullet(this.pos.slice(), bulletVelocity, this.game);
      this.game.asteroids.push(brainBullet);
    }
  }

  Brain.prototype.handleRemoval = function() {
    this.game.remove(this);
  }


  Brain.prototype.willKillYou = function() { return true; }


})();
