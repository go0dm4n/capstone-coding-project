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
let map = [[0,0,0,0], 
           [0,0,0,0],
           [0,0,0,0]]

let l0, l1, l2, l3, l4;

let time;

let newr = false;

let minEn = 1
let maxEn = 6
let money = 0;

let speed = 3;

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

let mapX = 0;
let mapY = 0;

function preload() {
  l0 = loadJSON("level grids/1-0.json")
  l1 = loadJSON("level grids/1-1.json")
  l2 = loadJSON("level grids/1-2.json")
  l3 = loadJSON("level grids/1-3.json")
  l4 = loadJSON("level grids/1-4.json")
  theLevels1 = [l0, l1, l2, l3, l4]
}

let theLevels1;

function setup() {
  createCanvas(windowWidth, windowHeight);

  cellWidth = width / COLS;
  cellHeight = height / ROWS;

  player = new Sprite();
  player.health = 6;
  player.collider = "k";

  // makeRoom();
  room = l0;
  // spawnEnemies();
  makeMap(theLevels1)
}

function makeMap(array) {
  let n;
  for(let i = map.length - 1; i >= 0; i--) {
    for(let k = map[i].length - 1; k >= 0; k--) {
     n = Math.floor(random(0, array.length - 1))
      if(random(0, 100) < 80 && array.length > 0) {
        map[i][k] = array[n] // replace 0 in map with level
        array[n].complete = false
        array.splice(n, 1) // removes level from list of addable levels
        }
    }
  }

  for(let i = map.length - 1; i >= 0; i--) {
    for(let k = map[i].length - 1; k >= 0; k--) {
      if(map[i][k] !== 0) { // if it's a room
          if(i > 0 && map[i-1][k] ){ // open top door if theres a room above
            map[i][k][0][map[i][k][0].length/2 - 3] = 0
            map[i][k][0][map[i][k][0].length/2 - 2] = 0
            map[i][k][0][map[i][k][0].length/2 - 1] = 0
            map[i][k][0][map[i][k][0].length/2] = 0
            map[i][k][0][map[i][k][0].length/2 + 1] = 0
            map[i][k][0][map[i][k][0].length/2 + 2] = 0
          } 

          if(i < map.length - 1 && map[i+1][k]){ // room below
            map[i][k][ROWS - 1][map[i][k][0].length/2 - 3] = 0
            map[i][k][ROWS - 1][map[i][k][0].length/2 - 2] = 0
            map[i][k][ROWS - 1][map[i][k][0].length/2 - 1] = 0
            map[i][k][ROWS - 1][map[i][k][0].length/2] = 0
            map[i][k][ROWS - 1][map[i][k][0].length/2 + 1] = 0
            map[i][k][ROWS - 1][map[i][k][0].length/2 + 2] = 0
          }

          if(i > 0 && map[i][k-1]){ // room left
            map[i][k][map[i][k][0].length/4 - 3][0] = 0
            map[i][k][map[i][k][0].length/4 - 2][0] = 0
            map[i][k][map[i][k][0].length/4 - 1][0] = 0
            map[i][k][map[i][k][0].length/4][0] = 0
            map[i][k][map[i][k][0].length/4 + 1][0] = 0
            map[i][k][map[i][k][0].length/4 + 2][0] = 0
          } 

          if(i < map[i].length - 1 && map[i][k+1]){ // room right
            map[i][k][map[i][k][0].length/4 - 3][COLS - 1] = 0
            map[i][k][map[i][k][0].length/4 - 2][COLS - 1] = 0
            map[i][k][map[i][k][0].length/4 - 1][COLS - 1] = 0
            map[i][k][map[i][k][0].length/4][COLS - 1] = 0
            map[i][k][map[i][k][0].length/4 + 1][COLS - 1] = 0
            map[i][k][map[i][k][0].length/4 + 2][COLS - 1] = 0
          } 
        }
    }
  }
}

function draw() {
  background(220);

  moveCharacter();

  mapX, mapY = mapPosition()
  enemyKilled();

  checkCollide();
  // pickupItems();
  drawRoom();

  moveEnemies()
  trackBullet();

  newRoom()
}

function moveCharacter(){
  player.rotation = 0;
  playerxPos = Math.floor((player.x - player.width/2)/cellWidth);
  playeryPos = Math.floor((player.y - player.height/2)/cellHeight);
  playerxPos2 = Math.floor((player.x + player.width/2)/cellWidth);
  playeryPos2 = Math.floor((player.y + player.height/2)/cellHeight);

  if(player.y + player.height/2 < height && player.y - player.height/2 > 0) {
    if(room[playeryPos][playerxPos] === 1 || room[playeryPos2][playerxPos] === 1 || room[playeryPos][playerxPos2] === 1 || room[playeryPos2][playerxPos2] === 1) { // if touching wall
      player.x -= player.vel.x
      player.y -= player.vel.y
    }
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

  if (!keyIsPressed) { // dont move if nothing is pressed
    player.vel.x = 0;
    player.vel.y = 0;
  }

  if(player.x >= width || player.x <= 0 || player.y >= height || player.y <= 0) {
    changeRoom()
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
  bullet.speed = 10
  bullet.moveTowards(mouse, bullet.speed / dist(bullet.x, bullet.y, mouseX, mouseY)); // dividing by distance from mouse to keep speed constant
  theBullets.push(bullet);
}

function trackBullet() { // bullet deletion
  for(let i = theBullets.length - 1; i >= 0; i--) {

    bullet.xPos = Math.floor(theBullets[i].x/cellWidth);
    bullet.yPos = Math.floor(theBullets[i].y/cellHeight);

    if(theBullets[i].x >= width || theBullets[i].x <= 0 || theBullets[i].y >= height || theBullets[i].y <= 0) { // if bullet goes out of bounds
      theBullets[i].remove();
      theBullets.splice(i, 1);
    }

    else if(room[bullet.yPos][bullet.xPos] === 1) { // if bullet hits wall
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

function makeRoom() {
  for (let i = 0; i < ROWS; i++) {
    room.push([]);
    for (let k = 0; k < COLS; k++) {
      room[i].push(0);
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

function mapPosition() {
  mapY = -1
  for (let i = 0; i <= map.length; i++) {
    mapY++
    mapX = -1
    for (let k = 0; k <= map[i].length; k++) {
      mapX++
      if(map[i][k] === room) {
        return mapX, mapY;
      }
    }
  }
}

function changeRoom() {
  if (player.x >= width) { // right
    room = map[mapY][mapX + 1]
    player.x = player.width/2
  }

  if (player.x <= 0) { // left
    room = map[mapY][mapX - 1]
    player.x = width - player.width/2
  }

  if (player.y >= height) { // down
    room = map[mapY + 1][mapX]
    player.y = player.height/2
  }

  if (player.y <= 0) { // up
    room = map[mapY - 1][mapX]
    player.y = height - player.height/2
  }
  newr = true
}

function newRoom() {
  if (newr === true) { // start timer
    time = millis()
    newr = false
  }
  if (millis() - time > 2000 && theEnemies.length === 0) {
    blockade(room)
    spawnEnemies()
  }
}

function blockade(room) {
  for (let i = 19; i >= 0; i--){
    for (let k = room[i].length - 1; k >= 0; k--){
      if (i === 0){
        room[i][k] = 1
      }
      if (k === 0){
        room[i][k] = 1
      }
    }
  }
}

// if (newr === true) { this does things every 2 seconds, probably good to keep for later
//   time = millis()
//   newr = false
// }
// if (millis() - time > 2000) {
//   console.log("augh")
//   spawnEnemies()
//   time = millis()
// }
