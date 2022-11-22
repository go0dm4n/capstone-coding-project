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
  constructor(x, y, w, h, dx, dy, bulletdx, bulletdy, health) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.dx = dx;
    this.dy = dy;
    this.bulletdx = bulletdx;
    this.bulletdy = bulletdy;
    this.health = health;
  }

  move(player){
    // if (check where enemy is in relation)
  }

  shoot(player){
    let someBullet = new EnemyBullet(this.x, this.y, this.bulletdx, this.bulletdy);
    theBullets.push(someBullet);
  }

  display(){
    fill("black")
    rect(this.x, this.y, this.w, this.h)
  }

  collision(wall){
    // for(let i = 0; i < theWalls.length; i++) {
    //   if ()
    // }
  }
}

class Guns {

}
class YourBullet {

}

class EnemyBullet {

}

let theBullets = [];
let theEnemies = []
let yourBullets = [];
let theWalls = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  new Sprite(); 
}

function draw() {
  background(220);
}

