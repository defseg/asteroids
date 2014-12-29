(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  // dummy init method; class exists for inheritance
  var Item = Asteroids.Item = function () {}

  Asteroids.Util.inherits(Item, Asteroids.MovingObject);

  // fill this in on each individual item
  Item.prototype.isItem = function() { return true; }

  Item.prototype.runEffect = function() {}

  Item.prototype.reverseEffect = function() {}

  Item.prototype.handleCollision = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship ) {
      this.runEffect(this.ship); // where is this.ship coming from?
      this.game.remove(this);
    } else if (otherObject instanceof Asteroids.Asteroid) {
      this.bounce(otherObject);
    }
  }

  Item.prototype.eachTick = function() {
    this.timeAlive++;
    if (this.timeAlive > this.lifespan) {
      this.game.remove(this);
    }
  }

})();
