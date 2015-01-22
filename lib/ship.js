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
    this.MAX_SPEED = 6;
    this.timeSinceBulletFired = 100;
    this.img = new Image();
    this.img.src = "vendor/img/ship.png";
    this.imgRad = 20;

    // shields
    this.shieldImg = new Image();
    this.shieldImg.src = "vendor/img/shield.png";
    this.shieldRad = 33;
    this.maxShieldEnergy = 300;
    this.shieldEnergy = this.maxShieldEnergy;
    this.canShield = true;
    this.shielded = false;

    // powerup stuff
    this.timeBetweenBullets = 20;
    this.multiCannon = false;
    this.pulseCannon = false;
    this.snowCannon = false;

    Asteroids.MovingObject.call(this, shipParams, game);
  }

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function(self, ctx) {
    Asteroids.Util.drawRotatedImage((this.shielded ? this.shieldImg : this.img),
                                     this.pos[0], this.pos[1],
                                     -this.rotation + 180, ctx);
  }

  //
  // movement
  //

  Ship.prototype.relocate = function() {
    this.pos = [this.DIM_X / 2, this.DIM_Y / 2];
    this.vel = [0, 0];
    this.rotation = 180;
    this.spd = 0;
  }

  Ship.prototype.power = function(inc) {
    if (this.shielded) return;
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
    return [Math.sin(Asteroids.Util.degToRad(this.rotation)),
            Math.cos(Asteroids.Util.degToRad(this.rotation))];
  }

  Ship.prototype.rotate = function(inc) {
    this.rotation = (this.rotation + inc) % 360;
  }

  //
  // bullets
  //

  Ship.prototype.fire = function() {
    if (this.timeSinceBulletFired < this.timeBetweenBullets) return;
    if (this.snowCannon) {
      this.fireSnowball();
    } else {
      this.fireBullet();
    }
  }

  Ship.prototype.addBullet = function (params) {
    if (!params) params = {};
    var type = params.type || Asteroids.Bullet;
    var pos = params.pos || this.pos;
    var spd = params.spd || 20;
    var rot = params.rot || this.rotation;
    var bullet = new type(pos.slice(),
                          Asteroids.Util.getBulletVelocity(rot, spd),
                          this.game);
    this.game.bullets.push(bullet);
  }

  Ship.prototype.fireBullet = function() {
    this.addBullet();
    this.timeSinceBulletFired = 10;

    if (this.pulseCannon) {
      this.game.bullets.pop();
      var degRot = Asteroids.Util.degToRad(this.rotation)
      var bulletPos = [this.pos[0] + Math.cos(degRot) * 15,
                       this.pos[1] - Math.sin(degRot) * 15];
      this.addBullet({pos: bulletPos});
      var bulletPos = [this.pos[0] - Math.cos(degRot) * 15,
                       this.pos[1] + Math.sin(degRot) * 15];
      this.addBullet({pos: bulletPos});
      this.timeSinceBulletFired -= 5;
    }

    if (this.multiCannon) {
      this.addBullet({rot: this.rotation - 10});
      this.addBullet({rot: this.rotation + 10});
      this.timeSinceBulletFired -= 10;
    }
  }

  Ship.prototype.fireSnowball = function() {
    this.addBullet({type: Asteroids.Snowball, spd: 10});
    this.timeSinceBulletFired = 0;
    if (this.pulseCannon) {
      this.game.bullets.pop();
      var degRot = Asteroids.Util.degToRad(this.rotation)
      var bulletPos = [this.pos[0] + Math.cos(degRot) * 15,
                       this.pos[1] - Math.sin(degRot) * 15];
      this.addBullet({type: Asteroids.Snowball, spd: 10, pos: bulletPos});
      var bulletPos = [this.pos[0] - Math.cos(degRot) * 15,
                       this.pos[1] + Math.sin(degRot) * 15];
      this.addBullet({type: Asteroids.Snowball, spd: 10, pos: bulletPos});
      this.timeSinceBulletFired -= 5;
    }

    if (this.multiCannon) {
      this.addBullet({type: Asteroids.Snowball, spd: 10, rot: this.rotation - 10});
      this.addBullet({type: Asteroids.Snowball, spd: 10, rot: this.rotation + 10});
      this.timeSinceBulletFired -= 10;
    }

  }

  Ship.prototype.fireBigBullet = function() {
    if (this.timeSinceBulletFired < this.timeBetweenBullets) return;
    this.addBullet({type: Asteroids.BigBullet, spd: 10});
    this.timeSinceBulletFired = -30;
  }

  //
  // shields
  //

  Ship.prototype.shield = function() {
    if (this.shieldEnergy > 0 && this.canShield) {
      this.shielded = true;
      this.radius = this.shieldRad;
      this.shieldEnergy -= 5;
    } else {
      this.unshield();
    }
  }

  Ship.prototype.unshield = function() {
    if (this.shieldEnergy > 20) {
      this.canShield = true;
    } else {
      this.canShield = false;
    }
    this.shielded = false;
    this.radius = this.imgRad;
  }

  //
  // misc
  //

  Ship.prototype.eachTick = function() {
    this.timeSinceBulletFired++;
    if (!this.shielded && this.shieldEnergy < this.maxShieldEnergy) this.shieldEnergy += 1;
    this.vel[0] /= 1.01;
    this.vel[1] /= 1.01;
  }
})();
