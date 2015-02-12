Asteroids
=========

You know this game already.

Controls
--------

* Left and right to rotate
* Q and E to rotate slowly
* Up to move
* Space to fire a bullet
* W to fire a big bullet
* S to activate shields

Gameplay elements
-----------------

In this game, there are *asteroids*. Were there not asteroids, the game would
not be called *Asteroids*.

The game of Asteroids is divided into numbered *waves*. In the first wave, there
are four asteroids. In the second wave, there are five asteroids. And so on.

The purpose of your *ship* is to destroy the asteroids. This purpose can never
be fulfilled. This universe is a strange one: it contains an innumerable number
of *asteroids*.

There are, however, *items* to aid you in your hopeless quest. These are
described below.

* *Rapid fire*: You are Rambo. Rambo is you.
* *Multi cannon*: You are the large man with the cigar from Boondock Saints.
  Or rather, you are what he would be if he had three arms.
* *Snowballs*: You can shoot snowballs, which are deadly to asteroids. However,
  ships are not very good at making snowballs, for the simple reason that they
  have no arms. Your snowballs disintegrate into three smaller snowballs in
  midair. The failure of this horrible dystopian future to provide spaceships
  with robot arms works to your advantage. You primitivist.

Code
----

Asteroids uses JavaScript (obviously) and the HTML5 canvas. The sprites are from [here](http://www.lostgarden.com/2007/04/free-game-graphics-tyrian-ships-and.html), in some cases (the shield) with extensive editing.

Asteroids is written to be easily extensible. All moving objects inherit (with the `inherits` method in Asteroids.Util) from MovingObject, items inherit from Item, and bullets inherit from Bullet. The `handleRemoval` hook allows objects to execute actions on removal: powerups execute their effects on the ship, asteroids break apart or disappear depending on size, and the brain boss explodes into asteroids.

New powerups will require modification to `ship`. In the future, bullet type logic (currently only normal bullet vs. snowball) will be rewritten to make this unnecessary for powerups that improve the bullet type. However, since the ship handles its own firing logic, powerups that modify the ship's firing pattern (`PulseCannon` and `MultiCannon`) will require addition of the relevant logic to `Ship#shoot`.
