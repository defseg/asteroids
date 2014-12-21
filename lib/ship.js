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
    this.DIM_X = game.DIM_X;
    this.DIM_Y = game.DIM_Y;
    this.MAX_SPEED = 10;
    this.img = new Image();
    this.img.src = "vendor/img/ship.png"
    Asteroids.MovingObject.call(this, shipParams, game);
  }

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function(ctx) {
    // inertia -- call this here so it happens every frame
    this.vel[0] /= 1.01;
    this.vel[1] /= 1.01;
    Asteroids.Util.drawRotatedImage(this.img, this.pos[0], this.pos[1], -this.rot + 180, ctx);
  };

  Ship.prototype.relocate = function() {
    this.pos = [this.DIM_X / 2, this.DIM_Y / 2]; // unmagic these later
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
      [Math.sin(this.degToRad(this.rot)) * 10,
      Math.cos(this.degToRad(this.rot)) * 10],
      3,
      this.game);
    this.game.bullets.push(bullet);
  };
})();
