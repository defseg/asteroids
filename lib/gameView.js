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
      "vendor/img/fireball.png",
      "vendor/img/shield.png"
    ]

    that = this;
    this.loadImages(imgSources, function () {
      window.setInterval((function() {
        that.game.step();
        that.game.draw(that.ctx);
      }), 20);
    });
  };

  GameView.prototype.bindKeyHandlers = function() {
    window.onkeyup = function(e) {
      if (e.keyCode == 83) {
        this.game.ship.unshield();
      }
    }
  }

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

})();
