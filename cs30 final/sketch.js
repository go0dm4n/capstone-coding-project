// awesome dungeon crawler
// Uday Sandhu
// November 21st, 2022+

//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// PEE FIVE DOT PLAY

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
    fill("black");
    rect(this.x, this.y, this.w, this.h);
  }

  collision(wall){
    // for(let i = 0; i < theWalls.length; i++) {
    //   if ()
    // }
  }
}

let theBullets = [];
let theEnemies = [];
let yourBullets = [];
let theWalls = [];

playerspeed = 5

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Sprite();
}

function draw() {
  background(220);
  moveCharacter()
}

function moveCharacter(){
  if (kb.pressing('ArrowLeft')) {
    player.vel.x = -playerspeed;
  }
  if (kb.pressing('ArrowRight')) {
    player.vel.x = playerspeed;
  }
  if (kb.pressing('ArrowUp')) {
    player.vel.y = -playerspeed;
  }
  if (kb.pressing('ArrowDown')) {
    player.vel.y = playerspeed;
  }
  else player.vel.x = 0;
}

// fire(targetX, targetY) {
//   this.x = width/2;
//   this.y = height/2;
//   this.angle = atan2(targetY-height/2, targetX-width/2);
// }

// update() {
//   this.x += cos(this.angle) * this.speed;
//   this.y += sin(this.angle) * this.speed;
// }