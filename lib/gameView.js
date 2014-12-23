(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  GameView.prototype.start = function() {
    this.bindKeyHandlers();

    var imgSources = [
      "vendor/img/asteroid1.png",
      "vendor/img/ship.png",
      "vendor/img/asteroid2.1.png",
      "vendor/img/asteroid2.2.png",
      "vendor/img/asteroid3.1.png",
      "vendor/img/asteroid3.2.png",
      "vendor/img/fireball.png"
    ]

    that = this;
    this.loadImages(imgSources, function () {
      window.setInterval((function() {
        that.game.step();
        that.game.draw(that.ctx);
      }), 20);
    });
  };

  GameView.prototype.loadImages = function(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;

    for(var src in sources) {
      numImages++;
    }

    for(var src in sources) {
      images[src] = new Image();
      images[src].onload = function() {
        if(++loadedImages >= numImages) {
          callback();
        }
      }
      images[src].src = sources[src];
    }
  }


  GameView.prototype.bindKeyHandlers = function() {
    var pow = 0.75;

    // key('up+left', function() { this.game.ship.power([-pow, -pow])}.bind(this));
    // key('up+right', function() { this.game.ship.power([-pow, pow])}.bind(this));
    // key('down+left', function() { this.game.ship.power([pow, -pow])}.bind(this));
    // key('down+right', function() { this.game.ship.power([pow, pow])}.bind(this));

    window.onkeydown = function(e) {
      if (e.keyCode === 37) {
        this.game.leftArrowPressed = true;
      }
      if (e.keyCode === 38) {
        this.game.upArrowPressed = true;
      }
      if (e.keyCode === 39) {
        this.game.rightArrowPressed = true;
      }
      if (e.keyCode === 40) {
        this.game.downArrowPressed = true;
      }
      if (e.keyCode === 32) {
        this.game.spaceKeyPressed = true;
      }
      if (e.keyCode === 81) {
        this.game.qKeyPressed = true;
      }
      if (e.keyCode === 69) {
        this.game.eKeyPressed = true;
      }
      if (e.keyCode === 90) {
        this.game.zKeyPressed = true;
      }
    }

    window.onkeyup = function(e) {
      if (e.keyCode === 37) {
        this.game.leftArrowPressed = false;
      }
      if (e.keyCode === 38) {
        this.game.upArrowPressed = false;
      }
      if (e.keyCode === 39) {
        this.game.rightArrowPressed = false;
      }
      if (e.keyCode === 40) {
        this.game.downArrowPressed = false;
      }
      if (e.keyCode === 32) {
        this.game.spaceKeyPressed = false;
      }
      if (e.keyCode === 81) {
        this.game.qKeyPressed = false;
      }
      if (e.keyCode === 69) {
        this.game.eKeyPressed = false;
      }
      if (e.keyCode === 90) {
        this.game.zKeyPressed = false;
      }
    }

    // key('up', function() { this.game.ship.power() }.bind(this));
    // key('down', function() { this.game.ship.power() }.bind(this));
    // key('left', function() { this.game.ship.rotate(10) }.bind(this));
    // key('right', function() { this.game.ship.rotate(-10) }.bind(this));
    // key('space', function() { this.game.ship.fireBullet() }.bind(this));
  };

})();
