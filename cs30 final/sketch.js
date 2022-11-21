// awesome dungeon crawler
// Uday Sandhu
// November 21st, 2022+

//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// PEE FIVE DOT PLAY

class Player {
  constructor(x,y,dx,dy) {

  }
}

class Rooms {

}

class Enemy {
  constructor(x, y, w, h, dx, dy, bulletspeed, health) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.dx = dx;
    this.dy = dy;
    this.bulletspeedv = bulletspeed;
    this.health = health;
  }

  move(){
    // if (check where enemy is in relation)
  }

  shoot(){

  }

  display(){

  }

  collision(wall){
    for(let i = 0; i < theWalls.length; i++) {
      if ()
    }
  }
}

class Guns {

}
class YourBullet {

}

class EnemyBullet {

}

let theBullets = []
let theWalls = []

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}

