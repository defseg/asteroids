(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = {}

  Util.inherits = function(InheritorClass, BaseClass) {
    function Surrogate () {};
    Surrogate.prototype = BaseClass.prototype;
    InheritorClass.prototype = new Surrogate();
  }

  Util.randomVector = function(maxSpeed) {
    var x = Math.round(Math.random() * maxSpeed * 2 - maxSpeed);
    var y = Math.round(Math.random() * maxSpeed * 2 - maxSpeed);
    return [x, y];
  }

  // can we do this without passing in the context? probably not
  Util.drawRotatedImage = function(img, x, y, angle, ctx) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle * Math.PI / 180);
    ctx.drawImage(img, -(img.width/2), -(img.height/2));
    ctx.restore();
  }

})();
