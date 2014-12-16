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

    key('up', function() { this.game.ship.power(1) }.bind(this));
    key('down', function() { this.game.ship.power(-1) }.bind(this));
    key('left', function() { this.game.ship.rotate(10) }.bind(this));
    key('right', function() { this.game.ship.rotate(-10) }.bind(this));
    key('space', function() { this.game.ship.fireBullet() }.bind(this));
  };

})();
