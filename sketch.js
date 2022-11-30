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
let bulletspeed = 5

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Sprite();
  player.collider ="dynamic"

  spawnEnemies()

  bullet = new Sprite(player.x, player.y);
  theBullets.push(bullet)
}

function draw() {
  background(220);
  moveCharacter()
  enemyKilled()
  checkCollide()
}

function moveCharacter(){
  if (keyIsDown(87)) { //up
    player.vel.y = -speed
  }
  if (keyIsDown(65)) { //left
    player.vel.x = -speed
  }
  if (keyIsDown(83)) { //down
    player.vel.y = speed
  }
  if (keyIsDown(68)) { //right
    player.vel.x = speed
  }
  if (!keyIsPressed) {
    player.vel.x = 0
    player.vel.y = 0
  }
}

function mousePressed() {
  bullet = new Sprite(player.x + player.width, player.y);
  bullet.collider = "kinematic"
  bullet.diameter = 10
  bullet.moveTowards(mouse, .06)
  theBullets.push(bullet)
}

function spawnEnemies() {
  for(let i = 0; i < random(minEn, maxEn); i ++) {
    enemy = new Sprite(random(0, width), random(0, height))
    enemy.collider = "dynamic"
    theEnemies.push(enemy)
  }
}

function enemyKilled() {
  for(let i = theEnemies.length - 1; i >= 0; i--) {
    for(let k = theBullets.length - 1; k >= 0; k--) {
      if (theEnemies[i].collides(theBullets[k])) {
        theBullets[k].remove()
        theEnemies[i].remove()
      }
    }
  }
}

function checkCollide() {
  for(let i = theEnemies.length - 1; i >= 0; i--) {
    for(let k = theBullets.length - 1; k >= 0; k--) {
    if(theBullets[k].collides(player)) {
      player.collider = "none"
    }
    else if (player.collides(theEnemies[i])){
      player.collider = "dynamic"
      }
    }
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