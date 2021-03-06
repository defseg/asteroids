(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var RapidFireItem = Asteroids.RapidFireItem = function(pos, vel, game) {
    this.img = new Image();
    this.img.src = "vendor/img/rapidFire.png";
    Asteroids.MovingObject.call(this, {pos: pos, vel: vel}, game);

    this.lifespan = 500;
    this.timeAlive = 0;
  }

  Asteroids.Util.inherits(RapidFireItem, Asteroids.Item);

  RapidFireItem.prototype.runEffect = function() {
    this.game.ship.timeBetweenBullets = -10;
    this.game.ship.snowCannon = false;
    this.game.ship.rapidFireTimeout && clearTimeout(this.game.ship.rapidFireTimeout);
    this.game.ship.rapidFireTimeout = setTimeout(function() {
      this.game.ship.timeBetweenBullets = 20
    }.bind(this), 3000);
  }

})();
