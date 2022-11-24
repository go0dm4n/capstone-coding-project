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

let playerspeed = 5

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Sprite();
  spawnEnemies()
}

function draw() {
  background(220);
  moveCharacter()
}

function moveCharacter(){
  if (kb.pressing('ArrowLeft')) {
    player.vel.x = -playerspeed;
    console.log("left")
  }
  else if (kb.pressing('ArrowRight')) {
    player.vel.x = playerspeed;
    console.log("right")
  }
  else if (kb.pressing('ArrowUp')) {
    player.vel.y = -playerspeed;
    console.log("up")
  }
  else if (kb.pressing('ArrowDown')) {
    player.vel.y = playerspeed;
    console.log("down")
  }
  else {
    player.vel.x = 0;
    player.vel.y = 0;
  }
}

function mousePressed() {
  
}

function spawnEnemies() {
  for(let i = 0; i < random(minEn, maxEn); i ++) {
    enemy = new Sprite(random(0, width), random(0, height))
    enemy.collider = "static"
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