// awesome dungeon crawler
// Uday Sandhu
// November 21st, 2022+

const { Camera } = require("../../../.vscode/extensions/wmcicompsci.cs30-p5-1.5.0/p5types");

//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// PEE FIVE DOT PLAY

let room = []
let theBullets = [];
let theEnemies = [];
let yourBullets = [];
let theCoins = [];


let minEn = 1
let maxEn = 6
let money = 0;

let speed = 3;
let bulletspeed = 5

const COLS = 20
const ROWS = 10

let cellHeight;
let cellWidth;

let xPos;
let ypos;

let enemyxPos;
let enemyyPos;
let enemyxPos2;
let enemyyPos2;

function preload() {
  l1 = loadJSON("level grids/1-1.json")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellWidth = width / COLS;
  cellHeight = height / ROWS;

  player = new Sprite();
  player.health = 6;
  // makeRoom();
  room = l1
  spawnEnemies();
}


function draw() {
  background(220);
  moveCharacter();
  enemyKilled();
  checkCollide();
  pickupItems();
  drawRoom();
}

function moveCharacter(){
  player.rotation = 0;
  playerxPos = Math.floor((player.x - player.width/2)/cellWidth);
  playeryPos = Math.floor((player.y - player.height/2)/cellHeight);
  playerxPos2 = Math.floor((player.x + player.width/2)/cellWidth);
  playeryPos2 = Math.floor((player.y + player.height/2)/cellHeight);

  if(room[playeryPos][playerxPos] === 1 || room[playeryPos2][playerxPos] === 1 || room[playeryPos][playerxPos2] === 1 || room[playeryPos2][playerxPos2] === 1) {
    player.x -= player.vel.x
    player.y -= player.vel.y
  }

  if (kb.pressing('W')) { //up
    player.vel.y = -speed;
  }
  if (kb.pressing('A')) { //left
    player.vel.x = -speed;
  }
  if (kb.pressing('S')) { //down
    player.vel.y = speed;
  }
  if (kb.pressing('D')) { //right
    player.vel.x = speed;
  }
  if (!keyIsPressed) {
    player.vel.x = 0;
    player.vel.y = 0;
  }


}

function mousePressed() {
  shootBullet();
  trackBullet();
  changeTile();
}

function spawnEnemies() {
  for(let i = 0; i < random(minEn, maxEn); i ++) {
    enemy = new Sprite(random(0, width), random(0, height));
    enemyxPos = Math.floor((enemy.x - enemy.width/2)/cellWidth);
    enemyyPos = Math.floor((enemy.y - enemy.height/2)/cellHeight);
    enemyxPos2 = Math.floor((enemy.x + enemy.width/2)/cellWidth);
    enemyyPos2 = Math.floor((enemy.y + enemy.height/2)/cellHeight);
    console.log(enemyyPos, enemyxPos)
    if (room[enemyyPos][enemyxPos] === 1 || room[enemyyPos2][enemyxPos2] === 1 || room[enemyyPos][enemyxPos2] === 1 || room[enemyyPos2][enemyxPos] === 1) {
      enemy.remove()
    }
    enemy.health = (random(0, 2));
    enemy.collider = "kinematic";
    if(enemy.health < 1) {
      enemy.color = "red";
    }
    if(enemy.health > 1) {
      enemy.color = "blue";
    }
    theEnemies.push(enemy);
  }
}

function enemyKilled() {
  for(let i = theEnemies.length - 1; i >= 0; i--) {
    for(let k = theBullets.length - 1; k >= 0; k--) {
      if (theEnemies[i].collides(theBullets[k])) {
        theEnemies[i].health -= theBullets[k].strength;
        theBullets[k].remove();

        if(theEnemies[i].health <= 0) {
          theEnemies[i].remove();
          coin = new Sprite(theEnemies[i].x, theEnemies[i].y, 30);
          coin.collider = "none";
          coin.color = 'yellow';
          theCoins.push(coin);
        }
        
      }
    }
  }
}

function checkCollide() {
  for(let i = theEnemies.length - 1; i >= 0; i--) {
    for(let k = theBullets.length - 1; k >= 0; k--) {
      if(theBullets[k].collides(player)) {
        player.collider = "none";
      }
      else if (player.overlaps(theEnemies[i])){
        player.collider = "dynamic"
        console.log("ouch")
        }
    }
  }
}

function shootBullet() {
  bullet = new Sprite(player.x + player.width, player.y);
  bullet.collider = "dynamic"
  bullet.diameter = 10;
  bullet.strength = 1;

  bullet.moveTowards(mouse, 10 / dist(bullet.x, bullet.y, mouseX, mouseY));
  theBullets.push(bullet);
}

function trackBullet() {
  for(let i = theBullets.length; i >= 0; i--) {
    bulletxPos = Math.floor(theBullets[i].x/cellWidth)
    bulletyPos = Math.floor(theBullets[i].y/cellHeight)
    if(room[bulletyPos][bulletxPos] === 1) {
      theBullets[i].remove()
    }
  }
}

function pickupItems() {
  for (let i = theCoins.length - 1; i >= 0; i --){
    if(player.overlaps(theCoins[i])) {
      theCoins[i].remove;
      money += 1;
    }
  }
}

function drawRoom() {
  let cellWidth = width / COLS;
  let cellHeight = height / ROWS;
  for (let i = 0; i < ROWS; i++) {
    for (let k = 0; k < COLS; k++) {
      if (room[i][k] === 0) {
        fill("white");
      }
      if (room[i][k] === 1) {
        fill("black");
      }   
      rect(k * cellWidth, i * cellHeight, cellWidth, cellHeight); 
    }
  }
}

function makeRoom() {
  for (let i = 0; i < ROWS; i++) {
    room.push([]);
    for (let k = 0; k < COLS; k++) {
      room[i].push(0);
    }
  }
}

function changeTile(){
  xPos = Math.floor(mouseX/cellWidth);
  yPos = Math.floor(mouseY/cellHeight);
  if (room[yPos][xPos] === 0) {
    room[yPos][xPos] = 1;
  }
  else if (room[yPos][xPos] === 1) {
    room[yPos][xPos] = 0;
  }   
}

function moveEnemies() {

}

// function drawRoom() {
//   for(let i = 0; i < room.length) {
//     for(let )
//   }
// }

// fire(targetX, targetY) {
//   this.x = width/2;
//   this.y = height/2;
//   this.angle = atan2(targetY-height/2, targetX-width/2);
// }

// update() {
//   this.x += cos(this.angle) * this.speed;
//   this.y += sin(this.angle) * this.speed;
// }