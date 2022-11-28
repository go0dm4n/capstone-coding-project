// awesome dungeon crawler
// Uday Sandhu
// November 21st, 2022+

//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// PEE FIVE DOT PLAY

let theBullets = [];
let theEnemies = [];
let yourBullets = [];
let theWalls = [];
let minEn = 1
let maxEn = 6

let speed = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Sprite();
  player.collider ="dynamic"
  spawnEnemies()
}

function draw() {
  background(220);
  moveCharacter()
}

function moveCharacter(){
  player.speed = speed;
  if (keyIsDown(87)) { //up
    player.direction = 270;
  }
  if (keyIsDown(65)) { //left
    player.direction = 180;
  }
  if (keyIsDown(83)) { //down
    player.direction = 90;
  }
  if (keyIsDown(68)) { //right
    player.direction = 0;
  }
}

function mousePressed() {
  for (let i = theBullets.length; i > 0; i--) {
    bullet = new Sprite(player.x, player.y);
    bullet.collider = "dynamic"
    theBullets.push(bullet)
    console.log(theBullets)
  }
}

function spawnEnemies() {
  for(let i = 0; i < random(minEn, maxEn); i ++) {
    enemy = new Sprite(random(0, width), random(0, height))
    enemy.collider = "dynamic"
    theEnemies.push(enemy)
  }
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