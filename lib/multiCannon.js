(function () {

  var MultiCannonItem = Asteroids.MultiCannonItem = function(pos, vel, game) {
    this.img = new Image();
    this.img.src = "vendor/img/multiCannon.png";
    Asteroids.MovingObject.call(this, {pos: pos, vel: vel}, game);

    this.lifespan = 500;
    this.timeAlive = 0;
  }

  Asteroids.Util.inherits(MultiCannonItem, Asteroids.Item);

  MultiCannonItem.prototype.runEffect = function() {
    this.game.ship.multiCannon = true;
    setTimeout(function() {
      this.game.ship.multiCannon = false
    }.bind(this), 10000);
  }

  MultiCannonItem.prototype.handleCollision = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship ) {
      this.runEffect(this.ship);
      this.game.remove(this);
    } else if (otherObject instanceof Asteroids.Asteroid) {
      this.bounce(otherObject);
    }
  }

})();
