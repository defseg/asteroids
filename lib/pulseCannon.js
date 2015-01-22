(function () {

  var PulseCannonItem = Asteroids.PulseCannonItem = function(pos, vel, game) {
    this.img = new Image();
    this.img.src = "vendor/img/pulseCannon.png";
    Asteroids.MovingObject.call(this, {pos: pos, vel: vel}, game);

    this.lifespan = 500;
    this.timeAlive = 0;
  }

  Asteroids.Util.inherits(PulseCannonItem, Asteroids.Item);

  PulseCannonItem.prototype.runEffect = function() {
    this.game.ship.pulseCannon += 1;

    this.game.ship.timeouts.push(setTimeout(function() {
      this.game.ship.pulseCannon -= 1;
    }.bind(this), 10000));

    console.log(this.game.ship.timeouts)
  }

})();
