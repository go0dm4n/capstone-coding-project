// awesome dungeon crawler
// Uday Sandhu
// November 21st, 2022+

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

const COLS = 40
const ROWS = 20

let cellHeight;
let cellWidth;

let enemyWidth = 50;

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
  player.collider = "k";

  // makeRoom();
  room = l1;
  spawnEnemies();
}


function draw() {
  background(220);
  moveCharacter();

  enemyKilled();
  checkCollide();
  pickupItems();
  drawRoom();

  moveEnemies()
  trackBullet();
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
  // changeTile();
}

function spawnEnemies() {
  for(let i = 0; i < random(minEn, maxEn); i ++) {
    enemy = new Sprite(random(0 + enemyWidth, width - enemyWidth), random(0 + enemyWidth, height - enemyWidth));

    enemy.xPos = Math.floor((enemy.x - enemy.width/2)/cellWidth);

    enemy.yPos = Math.floor((enemy.y - enemy.height/2)/cellHeight);

    enemy.xPos2 = Math.floor((enemy.x + enemy.width/2)/cellWidth);

    enemy.yPos2 = Math.floor((enemy.y + enemy.height/2)/cellHeight);

    enemy.speed = 1;

    if(enemy.xPos < 0 || enemy.yPos < 0 || enemy.yPos2 > height || enemy.xPos2 > width) {
      enemy.remove()
    }

    if (room[enemy.yPos][enemy.xPos] === 1 || room[enemy.yPos2][enemy.xPos] === 1 || room[enemy.yPos][enemy.xPos2] === 1 || room[enemy.yPos2][enemy.xPos2] === 1) {
      enemy.remove()
    }

    enemy.health = (random(0, 2));
    enemy.collider = "k";

    if(enemy.health < 1) {
      enemy.color = "red";
    }
    if(enemy.health > 1) {
      enemy.color = "blue";
    }

    enemy.vel.x = 0
    enemy.vel.y = 0
    theEnemies.push(enemy);
  }
}

function enemyKilled() {
  for(let i = theEnemies.length - 1; i >= 0; i--) {
    for(let k = theBullets.length - 1; k >= 0; k--) {
      console.log(theBullets[k].overlaps(theEnemies[i]))
      if (theBullets[k].overlaps(theEnemies[i])) {
        theEnemies[i].health -= theBullets[k].strength;
        theBullets[k].remove();
        theBullets.splice(k, 1);
        
        if(theEnemies[i].health <= 0) {
          theEnemies[i].remove();
          coin = new Sprite(theEnemies[i].x, theEnemies[i].y, 30);
          coin.collider = "k";
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
      if(theBullets[k].overlaps(player)) {
      }

      else if (player.overlaps(theEnemies[i])){
        player.health -= 1
        }
    }
  }
}

function shootBullet() {
  bullet = new Sprite(player.x + player.width, player.y, 10, "k");
  bullet.strength = 1;
  bullet.moveTowards(mouse, 10 / dist(bullet.x, bullet.y, mouseX, mouseY));
  theBullets.push(bullet);
}

function trackBullet() {
  for(let i = theBullets.length - 1; i >= 0; i--) {
    if(theBullets[i].x > width || theBullets[i].x < 0 || theBullets[i].y > height || theBullets[i].y < 0) {
      theBullets.splice(i, 1);
      theBullets[i].remove();
    }
    bullet.xPos = Math.floor(theBullets[i].x/cellWidth);
    bullet.yPos = Math.floor(theBullets[i].y/cellHeight);
    if(room[bullet.yPos][bullet.xPos] === 1) {
      theBullets[i].remove();
      theBullets.splice(i, 1);
    }
  }
}

function pickupItems() {
  for (let i = theCoins.length - 1; i >= 0; i --){
    if(theCoins[i].overlaps(player)) {
      theCoins[i].remove;
      theCoins.splice(i,1);
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
  for(let i = theEnemies.length - 1; i >= 0; i--) {

    theEnemies[i].xPos = Math.floor((theEnemies[i].x - theEnemies[i].width/2)/cellWidth); // left of enemy

    theEnemies[i].yPos = Math.floor((theEnemies[i].y - theEnemies[i].height/2)/cellHeight); // top of enemy

    theEnemies[i].xPos2 = Math.floor((theEnemies[i].x + theEnemies[i].width/2)/cellWidth); // right of enemy

    theEnemies[i].yPos2 = Math.floor((theEnemies[i].y + theEnemies[i].height/2)/cellHeight); // bottom of enemy

    if(touchingWall(theEnemies[i].xPos, theEnemies[i].yPos, theEnemies[i].xPos2, theEnemies[i].yPos2)) { // if not touching wall

      if (theEnemies[i].xPos >= 0 && theEnemies[i].xPos2 <= COLS && theEnemies[i].yPos >= 0 && theEnemies[i].yPos2 <= ROWS){ // in boundaries 

        if(wallAbove(theEnemies[i].xPos, theEnemies[i].yPos, theEnemies[i].xPos2, theEnemies[i].yPos2)) { // wall below or above
          if (player.x / theEnemies[i].x > 1 ) { // enemy is left of player
            theEnemies[i].vel.x = 1 // move right
          }
          else if (player.x / theEnemies[i].x < 1) { // enemy is right of player
            theEnemies[i].vel.x = -1; // move left
          }
          if (player.y === theEnemies[i].y) { // enemy is same y as player
            theEnemies[i].vel.y = 1; // move right
          }
        }

        else if(wallRight(theEnemies[i].xPos, theEnemies[i].yPos, theEnemies[i].xPos2, theEnemies[i].yPos2)) { // wall below or above
          if (player.y / theEnemies[i].y > 1) { // enemy is above player
            theEnemies[i].vel.y = 1 // move down
            }
          else if (player.y / theEnemies[i].y < 1) { // enemy is below player
            theEnemies[i].vel.y = -1; // move up
            }
          if (player.x === theEnemies[i].x) { // enemy is same x as player
            theEnemies[i].vel.x = 1; // move right
          }
        }

        else { //no walls nearby, free movement
          if (player.x / theEnemies[i].x > 1) { // enemy is left of player
            theEnemies[i].vel.x = 1 // move right
          }
          else if (player.x / theEnemies[i].x < 1) { // enemy is right of player
            theEnemies[i].vel.x = -1; // move left
          }
          if (player.y / theEnemies[i].y > 1) { // enemy is above player
            theEnemies[i].vel.y = 1 // move down
          }
          else if (player.y / theEnemies[i].y < 1) { // enemy is below player
            theEnemies[i].vel.y = -1; // move up
          }
        }
      }
    }
    else { // touching a wall
      theEnemies[i].vel.x = -theEnemies[i].vel.x
      theEnemies[i].vel.y = -theEnemies[i].vel.y
    }
  }
}

function wallAbove(left, top, right, bottom) {
  return room[top - 1][right] === 1 || room[bottom + 1][right] === 1 || room[bottom + 1][left] === 1 || room[top - 1][left] === 1;
}

function wallRight(left, top, right, bottom) {
  return room[top][right + 1] === 1 || room[bottom][right + 1] === 1 || room[bottom][left - 1] === 1 || room[top][left - 1] === 1;
}

function touchingWall(left, top, right, bottom) {
  return room[top][left] !== 1 && room[bottom][left] !== 1 && room[top][right] !== 1 && room[bottom][right] !== 1;
}