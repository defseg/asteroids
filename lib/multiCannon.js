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
    this.game.ship.multiCannon += 1;

    this.game.ship.timeouts.push(setTimeout(function() {
      this.game.ship.multiCannon -= 1;
    }.bind(this), 10000));
  }

})();
