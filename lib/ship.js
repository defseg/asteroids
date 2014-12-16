(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(pos, game) {
    shipParams = {
      pos: pos,
      vel: [0, 0],
      radius: 20,
      color: "#000000"
    }
    Asteroids.MovingObject.call(this, shipParams, game);
  }

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function() {
    this.pos = [320, 240]; // unmagic these later
    this.vel = [0, 0];
  }

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0]
    this.vel[1] += impulse[1]
  };

})();
