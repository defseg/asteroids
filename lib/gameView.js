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
    window.setInterval((function() {
      this.game.step();
      this.game.draw(this.ctx);
    }).bind(this), 20);
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
    }

    // key('up', function() { this.game.ship.power() }.bind(this));
    // key('down', function() { this.game.ship.power() }.bind(this));
    // key('left', function() { this.game.ship.rotate(10) }.bind(this));
    // key('right', function() { this.game.ship.rotate(-10) }.bind(this));
    // key('space', function() { this.game.ship.fireBullet() }.bind(this));
  };

})();
