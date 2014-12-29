(function () {

  var SnowCannonItem = Asteroids.SnowCannonItem = function(pos, vel, game) {
    this.img = new Image();
    this.img.src = "vendor/img/snowCannon.png";
    Asteroids.MovingObject.call(this, {pos: pos, vel: vel}, game);

    this.lifespan = 500;
    this.timeAlive = 0;
  }

  Asteroids.Util.inherits(SnowCannonItem, Asteroids.Item);

  SnowCannonItem.prototype.runEffect = function() {
    this.game.ship.multiCannon = false;
    this.game.ship.snowCannon = true;
    this.game.ship.snowCannonTimeout && clearTimeout(this.game.ship.snowCannonTimeout);

    this.game.ship.snowCannonTimeout = setTimeout(function() {
      // this.game.ship.snowCannon = false
    }.bind(this), 10000);
  }

})();
