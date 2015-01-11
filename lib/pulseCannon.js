(function () {

  var PulseCannonItem = Asteroids.PulseCannonItem = function(pos, vel, game) {
    this.img = new Image();
    this.img.src = "vendor/img/PulseCannon.png";
    Asteroids.MovingObject.call(this, {pos: pos, vel: vel}, game);

    this.lifespan = 500;
    this.timeAlive = 0;
  }

  Asteroids.Util.inherits(PulseCannonItem, Asteroids.Item);

  PulseCannonItem.prototype.runEffect = function() {
    this.game.ship.pulseCannon = true;
    this.game.ship.pulseCannonTimeout && clearTimeout(this.game.ship.PulseCannonTimeout);

    this.game.ship.pulseCannonTimeout = setTimeout(function() {
      this.game.ship.pulseCannon = false
    }.bind(this), 10000);
  }

})();
