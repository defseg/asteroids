(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = {}

  Util.inherits = function (InheritorClass, BaseClass) {
    function Surrogate () {};
    Surrogate.prototype = BaseClass.prototype;
    InheritorClass.prototype = new Surrogate();
  }

  Util.randomVector(maxSpeed) {
    var x = Math.round(Math.random() * maxSpeed * 2 - maxSpeed);
    var y = Math.round(Math.random() * maxSpeed * 2 - maxSpeed);
    return [x, y];
  }

})();
