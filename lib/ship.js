(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(pos, game) {
    shipParams = {
      pos: pos,
      vel: [0, 0],
      radius: 20,
      color: "#FFFFFF"
    }
    this.rot = 180; // 270 = up, 0 = right, 90 = down, 180 = left
    this.spd = 0;
    this.MAX_SPEED = 10;
    Asteroids.MovingObject.call(this, shipParams, game);
  }

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();

    ctx.fillStyle = "#4444FF";
    ctx.beginPath();
    ctx.arc(
      this.pos[0] + 15 * Math.sin(this.degToRad(this.rot)),
      this.pos[1] + 15 * Math.cos(this.degToRad(this.rot)),
      5,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  Ship.prototype.relocate = function() {
    this.pos = [320, 240]; // unmagic these later
    this.vel = [0, 0];
    this.rot = 180;
    this.spd = 0;
  }

  Ship.prototype.power = function(inc) {
    this.spd += 0.01; // const to vary ship speedup

    this.vel[0] += this.impulse()[0] * this.spd;
    this.vel[1] += this.impulse()[1] * this.spd;

    for(var i = 0; i < 2; i++) {
      if (this.vel[i] > this.MAX_SPEED) {
        this.vel[i] = this.MAX_SPEED;
      } else if (this.vel[i] < -this.MAX_SPEED) {
        this.vel[i] = -this.MAX_SPEED;
      }
    }
  };

  Ship.prototype.impulse = function() {
    return [Math.sin(this.degToRad(this.rot)),
            Math.cos(this.degToRad(this.rot))];
  }

  // helper function for moving -- radians are messy
  Ship.prototype.degToRad = function(deg) {
    return (deg * (Math.PI / 180));
  }

  Ship.prototype.rotate = function(inc) {
    this.rot = (this.rot + inc) % 360;
  }

  Ship.prototype.fireBullet = function () {
    var velocity = this.vel.map( function(el) {return el*3;});
    var bullet = new Asteroids.Bullet(this.pos.slice(),
      [Math.sin(this.degToRad(this.rot)) * 10, Math.cos(this.degToRad(this.rot)) * 10],
      this.game);
    this.game.bullets.push(bullet);
  };
})();
