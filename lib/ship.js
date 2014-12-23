(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(pos, game) {
    shipParams = {
      pos: pos,
      vel: [0, 0],
      radius: 20,
    }
    this.rotation = 180; // 270 = up, 0 = right, 90 = down, 180 = left
    this.spd = 0;
    this.DIM_X = game.DIM_X;
    this.DIM_Y = game.DIM_Y;
    this.MAX_SPEED = 8;
    this.timeSinceBulletFired = 100;
    this.img = new Image();
    this.img.src = "vendor/img/ship.png"

    // powerup stuff
    this.timeBetweenBullets = 20;

    Asteroids.MovingObject.call(this, shipParams, game);
  }

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  // Ship.prototype.draw = function(ctx) {
  //   Asteroids.Util.drawRotatedImage(this.img, this.pos[0], this.pos[1], -this.rot + 180, ctx);
  // };

  Ship.prototype.relocate = function() {
    this.pos = [this.DIM_X / 2, this.DIM_Y / 2]; // unmagic these later
    this.vel = [0, 0];
    this.rotation = 180;
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
    return [Math.sin(this.degToRad(this.rotation)),
            Math.cos(this.degToRad(this.rotation))];
  }

  // helper function for moving -- radians are messy
  Ship.prototype.degToRad = function(deg) {
    return (deg * (Math.PI / 180));
  }

  Ship.prototype.rotate = function(inc) {
    this.rotation = (this.rotation + inc) % 360;
  }

  Ship.prototype.fireBullet = function () {
    // var velocity = this.vel.map( function(el) {return el*10;});
    if (this.timeSinceBulletFired < this.timeBetweenBullets) {
      return;
    }
    var bullet = new Asteroids.Bullet(this.pos.slice(),
      this.getBulletVelocity(20),
      3,
      this.game);
    this.game.bullets.push(bullet);
    this.timeSinceBulletFired = 10;
  };

  Ship.prototype.fireBigBullet = function() {
    if (this.timeSinceBulletFired < this.timeBetweenBullets) {
      return;
    }
    var bigBullet = new Asteroids.BigBullet(this.pos.slice(),
      this.getBulletVelocity(10),
      this.game);
    this.game.bullets.push(bigBullet);
    this.timeSinceBulletFired = -30;
    console.log(this.game.bullets);
  }

  Ship.prototype.getBulletVelocity = function(multiplier) {
    return [Math.sin(this.degToRad(this.rotation)) * multiplier,
            Math.cos(this.degToRad(this.rotation)) * multiplier];
  }

  Ship.prototype.eachTick = function() {
    this.timeSinceBulletFired++;
    this.vel[0] /= 1.01;
    this.vel[1] /= 1.01;
  }
})();
