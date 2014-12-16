// probably useless
collisionPointX = (astA.pos[0] + astB.pos[0])/2
collisionPointY = (astA.pos[2] + astB.pos[1])/2


newVelX1 = (2*astB.vel[0])/(2*astB.radius);
newVelY1 = (2*astB.vel[1])/(2*astB.radius);
newVelX2 = (2*astA.vel[0])/(2*astB.radius);
newVelY2 = (2*astA.vel[1])/(2*astB.radius);


// update the postition one frame ahead, see if this is necessary
firstBall.x = firstBall.x + newVelX1;
firstBall.y = firstBall.y + newVelY1;
secondBall.x = secondBall.x + newVelX2;
secondBall.y = secondBall.y + newVelY2;
