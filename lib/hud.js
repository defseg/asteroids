(function () {
  if (typeof Asteroids === "undefined") window.Asteroids = {};

  var Hud = Asteroids.Hud = function () {
    this.el = document.getElementById('hud')
  }

  Hud.prototype.init = function (name) {
    var content = localStorage.getItem(name) || 0;
    localStorage.setItem(name, content);
    document.getElementById(name).innerText = content;
  }

  Hud.prototype.edit = function (name, value) {
    localStorage.setItem(name, value);
    document.getElementById(name).innerText = value;
  }

  Hud.prototype.increment = function (name, isStored) {
    this._crement(name, isStored, 1);
  }

  Hud.prototype.decrement = function (name, isStored) {
    this._crement(name, isStored, -1);
  }

  Hud.prototype.incrementScore = function () {
    this.increment("score", true);
    if (+(localStorage.getItem('score')) > +(localStorage.getItem('hiscore'))) {
      this.increment("hiscore", true);
    }
  }

  Hud.prototype._crement = function (name, isStored, i) {
    if (isStored) {
      this.edit(name, +(localStorage.getItem(name)) + i);
    } else {
      var el = document.getElementById(name);
      var value = el.innerText;
      value.innerText = +value + i;
    }
  }
})();
