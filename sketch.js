// awesome dungeon crawler
// Uday Sandhu
// November 21st, 2022+

//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// PEE FIVE DOT PLAY

let room = []
let oldroom = []
let theBullets = [];
let pistol, shotgun, machinegun;
let guns;
let theEnemies = [];
let yourBullets = [];
let theCoins = [];

let tileF1, tileF2

let theTiles = [tileF1, tileF2]

let player;

let map = [[0,0,0,0], 
           [0,0,0,0],
           [0,0,0,0]]

let l0, l1, l2, l3, l4;

let time;

let font;

let newr = false;
let reloading = false;

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
  l0 = loadJSON("level grids/1-0.json"); // different rooms
  l1 = loadJSON("level grids/1-1.json");
  l2 = loadJSON("level grids/1-2.json");
  l3 = loadJSON("level grids/1-3.json");
  l4 = loadJSON("level grids/1-4.json");

  theLevels1 = [l0, l1, l2, l3, l4];

  tileTL = loadImage("assets/tiles/tileTL.png"); // floor and wall tiles
  tileTR = loadImage("assets/tiles/tileTR.png");
  tileT = loadImage("assets/tiles/tileTB.png");
  tileB = loadImage("assets/tiles/tileTB.png");
  tileL = loadImage("assets/tiles/tileL.png");
  tileR = loadImage("assets/tiles/tileR.png");
  tileBL = loadImage("assets/tiles/tileBL.png");
  tileBR = loadImage("assets/tiles/tileBR.png");
  tileTM = loadImage("assets/tiles/tileTM.png");
  tileTT = loadImage("assets/tiles/tileTT.png");

  tileF = loadImage("assets/tiles/floor0.png");
  tileF1 = loadImage("assets/tiles/floor1.png");
  tileF2 = loadImage("assets/tiles/floor2.png");

  coinimg = loadImage("assets/misc/coin.png"); // miscellaneous images
  healthimg = loadImage("assets/misc/healthbar.png");
  healthemptyimg = loadImage("assets/misc/healthbarempty.png");

  pistolimage = loadImage("assets/misc/pistol.png")
  shotgunimage = loadImage("assets/misc/shotgun.png")

  pistolbulletimage = loadImage("assets/misc/pistol bullet.png")
  shotgunbulletimage = loadImage("assets/misc/shotgun bullet.png")

  playerimg = loadImage('assets/player/basic_idle_01.png')

  font = loadFont('assets/8bitfont.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  cellWidth = width / COLS;
  cellHeight = height / ROWS;

  player = new Sprite(width/2, height/2);
  player.collider = "k"
  player.health = 6;
  player.healthtotal = 6;

  player.addAni('idle', 'assets/player/basic_idle_01.png', 3)
  player.addAni('run', 'assets/player/basic_running_01.png', 2)

  player.width = playerimg.width/2
  player.height = playerimg.height/2
  player.ani.frameDelay = 15

  coinimg.width = coinimg.width/4
  coinimg.height = coinimg.height/4
  healthimg.width = healthimg.width/2
  healthimg.height = healthimg.height/2
  healthemptyimg.width = healthemptyimg.width/2
  healthemptyimg.height = healthemptyimg.height/2

  pistolimage.width = pistolimage.width/4
  pistolimage.height = pistolimage.height/4
  shotgunimage.width = shotgunimage.width/2
  shotgunimage.height = shotgunimage.height/2

  // makeRoom();

  room = l0;

  pistol = new Sprite(player.x + player.width, player.y, 20, 10, "n")
  pistol.color = (86, 86, 86)
  pistol.image = pistolimage

  pistol.magazine = 12
  pistol.ammo = 12

  pistol.reloadtime = 500
  pistol.reload = 500

  pistol.firerate = 300
  pistol.fired = 301

  shotgun = new Sprite(player.x + player.width, player.y, 17, 13, "n")
  shotgun.color = (102, 57, 19)
  shotgun.image = shotgunimage

  shotgun.magazine = 4
  shotgun.ammo = 4

  shotgun.reloadtime = 1300
  shotgun.reload = 1300

  shotgun.firerate = 1000
  shotgun.fired = 1001

  machinegun = new Sprite(player.x + player.width, player.y, 30, 6, "n")
  machinegun.color = (255, 114, 236)

  machinegun.magazine = 25
  machinegun.ammo = 25

  machinegun.reloadtime = 3000
  machinegun.reload = 3000

  guns = [pistol, shotgun, machinegun]
  gun = guns[0];

  makeMap(theLevels1)
  l0.complete = true
}

function makeMap(array) {
  let n;
  for(let i = map.length - 1; i >= 0; i--) {
    for(let k = map[i].length - 1; k >= 0; k--) {
     n = Math.floor(random(0, array.length - 1))
      if(random(0, 100) < 80 && array.length > 0) {
        map[i][k] = array[n] // replace 0 in map with level
        array[n].complete = "false"
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
  pickupItems();
  drawRoom();
  drawStuff()

  moveEnemies()
  trackBullet();

  newRoom()
  roomComplete()

  reload()
}

function moveCharacter(){
  player.rotation = 0;
  playerxPos = Math.floor((player.x - player.width/2)/cellWidth);
  playeryPos = Math.floor((player.y - player.height/2)/cellHeight);
  playerxPos2 = Math.floor((player.x + player.width/2)/cellWidth);
  playeryPos2 = Math.floor((player.y + player.height/2)/cellHeight);

  if(player.y + player.height/2 < height && player.y - player.height/2 > 0) {
    if(room[playeryPos][playerxPos] === 1 || room[playeryPos2][playerxPos] === 1 || room[playeryPos][playerxPos2] === 1 || room[playeryPos2][playerxPos2] === 1) { // if touching wall
      player.x -= player.vel.x // repels you from wall
      player.y -= player.vel.y
    }
  }

  if (kb.pressing('W')) { //up
    player.vel.y = -speed;
    player.ani = 'run'
    player.ani.frameDelay = 15
  }

  if (kb.pressing('A')) { //left
    player.vel.x = -speed;
    player.mirror.x = true
    for(i = 0; i < guns.length; i ++) {
      guns[i].mirror.x = true
    }
    player.ani = 'run'
    player.ani.frameDelay = 15
  }

  if (kb.pressing('S')) { //down
    player.vel.y = speed;
    player.ani = 'run'
    player.ani.frameDelay = 15
  }

  if (kb.pressing('D')) { //right
    player.vel.x = speed;
    player.mirror.x = false
    for(i = 0; i < guns.length; i ++) { // turns gun with player
      guns[i].mirror.x = false
    }
    player.ani = 'run'
    player.ani.frameDelay = 15
  }

  if (!keyIsPressed) { // dont move if nothing is pressed
    player.vel.x = 0;
    player.vel.y = 0;
    player.ani = 'idle'
    player.ani.frameDelay = 15
  }

  if(player.x >= width || player.x <= 0 || player.y >= height || player.y <= 0) {
    changeRoom()
  }

}

function mousePressed() {
  shootBullet();
  // changeTile();
}

function mouseWheel() {
  index = guns.indexOf(gun)
  if (index >= guns.length - 1) {
    index = -1
  }
  gun = guns[index + 1]
}

function keyPressed() {
  if(keyCode === 82 && gun.ammo < gun.magazine && reloading === false) {
    gun.reload = millis()
    reloading = true
  }
}

function spawnEnemies() {

  for(let i = Math.floor(random(minEn, maxEn)); i >= 0 ; i--) {
    enemy = new Sprite(random(enemyWidth, width - enemyWidth), random(enemyWidth, height - enemyWidth),"d");

    enemy.xPos = Math.floor((enemy.x - enemy.width/2)/cellWidth);

    enemy.yPos = Math.floor((enemy.y - enemy.height/2)/cellHeight);

    enemy.xPos2 = Math.floor((enemy.x + enemy.width/2)/cellWidth);

    enemy.yPos2 = Math.floor((enemy.y + enemy.height/2)/cellHeight);

    while (!(enemy.xPos > 0 && enemy.yPos > 0 && enemy.yPos2 < ROWS - 1 && enemy.xPos2 < COLS - 1) || room[enemy.yPos][enemy.xPos] === 1 || room[enemy.yPos2][enemy.xPos] === 1 || room[enemy.yPos][enemy.xPos2] === 1 || room[enemy.yPos2][enemy.xPos2] === 1) {
      enemy.x = random(0 + enemyWidth, width - enemyWidth)
      enemy.y = random(0 + enemyWidth, height - enemyWidth)

      enemy.xPos = Math.floor((enemy.x - enemy.width/2)/cellWidth);

      enemy.yPos = Math.floor((enemy.y - enemy.height/2)/cellHeight);
  
      enemy.xPos2 = Math.floor((enemy.x + enemy.width/2)/cellWidth);
  
      enemy.yPos2 = Math.floor((enemy.y + enemy.height/2)/cellHeight);
    }

    // while (room[enemy.yPos][enemy.xPos] === 1 || room[enemy.yPos2][enemy.xPos] === 1 || room[enemy.yPos][enemy.xPos2] === 1 || room[enemy.yPos2][enemy.xPos2] === 1) {

    //   enemy.x = random(enemyWidth, width - enemyWidth)
    //   enemy.y = random(enemyWidth, height - enemyWidth)

    //   enemy.xPos = Math.floor((enemy.x - enemy.width)/cellWidth);
  
    //   enemy.yPos = Math.floor((enemy.y - enemy.height)/cellHeight);
    
    //   enemy.xPos2 = Math.floor((enemy.x + enemy.width)/cellWidth);
    
    //   enemy.yPos2 = Math.floor((enemy.y + enemy.height)/cellHeight);

    //   // console.log("wall", i, room[enemy.yPos][enemy.xPos], room[enemy.yPos2][enemy.xPos], room[enemy.yPos][enemy.xPos2], room[enemy.yPos2][enemy.xPos2])
    // }


    enemy.speed = 1;
    enemy.health = (Math.floor(random(1, 3)));

    if(enemy.health = 1) {
      enemy.oldcolor = "red";
      enemy.color = "red";
    }
    if(enemy.health = 2) {
      enemy.oldcolor = "blue";
      enemy.color = "blue";
    }

    enemy.vel.x = 0;
    enemy.vel.y = 0;

    enemy.inv = 81 // invincibility frames for enemies

    theEnemies.push(enemy);
  }
}

function enemyKilled() { // enemy bullet collision check
  for(let i = theEnemies.length - 1; i >= 0; i--) {
    theEnemies[i].color = theEnemies[i].oldcolor 
    for(let k = theBullets.length - 1; k >= 0; k--) {
      console.log(theEnemies[i])
      if (theBullets[k].overlaps(theEnemies[i]) && millis() - enemy.inv > 80) {
        bulletstrength = theBullets[k].strength
        theBullets[k].remove();
        theBullets.splice(k, 1);
        theEnemies[i].health -= bulletstrength;
        theEnemies[i].color = ("orange")
        enemy.inv = millis()    
      }

      if (theEnemies[i].health <= 0) {
        coin = new Sprite(theEnemies[i].x, theEnemies[i].y);
        coin.image = coinimg
        theEnemies[i].remove();
        theEnemies.splice(i, 1);
        coin.color = 'yellow';
        theCoins.push(coin);
      }
    }
  }
}

function checkCollide() { // player collides with enemy
  for(let i = theEnemies.length - 1; i >= 0; i--) {
  if (player.collides(theEnemies[i])){
        player.health -= 1
      }
    }
  }


function shootBullet() { // spawns and moves bullets to cursor

  if(reloading === false) {
    if(gun === pistol && millis() - gun.fired > gun.firerate && gun.ammo > 0) {
      stroke("black")
      gun.ammo-- 
      bullet = new Sprite(gun.x + gun.width/2, gun.y, 10);
      bullet.image = pistolbulletimage
      bullet.collider = "k"
      bullet.strength = 1;
      bullet.speed = 10
      bullet.color = (80, 80, 80)
      bullet.moveTowards(mouse, bullet.speed / dist(bullet.x, bullet.y, mouseX, mouseY)); // dividing by distance from mouse to keep speed constant
      theBullets.push(bullet);
      gun.fired = millis()
    }
    if(gun === shotgun && millis() - gun.fired > gun.firerate && gun.ammo > 0) {
      stroke("black")
      gun.ammo--
        for(let i = -2; i < 3; i++) {
          if (i !== 0) {
            bullet = new Sprite(gun.x + gun.width/2, player.y, 10);
            bullet.image = shotgunbulletimage
            bullet.collider = "k"
            bullet.strength = 1;
            bullet.speed = 7
            bullet.color = (80, 80, 80)
            bullet.moveTowards(mouseX + (abs(player.y - mouseY) * tan(15 * i)), mouseY + (abs(player.x - mouseX) * tan(15 * i)), bullet.speed / dist(bullet.x, bullet.y, mouseX + (abs(player.y - mouseY) * tan(15 * i)), mouseY + (abs(player.x - mouseX) * tan(15 * i)))); 
            theBullets.push(bullet);
            gun.fired = millis()
        }
      }
    }
  }
}

function trackBullet() { // bullet deletion
  for(let i = theBullets.length - 1; i >= 0; i--) {

    bullet.xPos = Math.floor(theBullets[i].x/cellWidth); // bullet position
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
  for (let i = theCoins.length - 1; i >= 0; i--){
    theCoins[i].vel.x = 0 // prevent coins from moving off screen due to colliders malfunctioning
    theCoins[i].vel.y = 0
    if(theCoins[i].overlaps(player)) { // if player touches a coin
      theCoins[i].remove(); // delete sprite & remove from array
      theCoins.splice(i,1);
      money += 1;
    }
  }
  if(newr === true) {
    for(i = theCoins.length - 1; i >= 0; i--) { // if you enter a new room but there are still coins on the floor, auto collect the coins
      theCoins[i].remove();
      theCoins.splice(i,1);
      money += 1;
    }
  }
}

function makeRoom() { // creates blank room if needed
  for (let i = 0; i < ROWS; i++) {
    room.push([]);
    for (let k = 0; k < COLS; k++) {
      room[i].push(0);
    }
  }
}

function drawRoom() { // draws room based on tiles
  let cellWidth = width / COLS;
  let cellHeight = height / ROWS;

  for (let i = 0; i < ROWS; i++) {
    for (let k = 0; k < COLS; k++) {
      if (room[i][k] === 0) { // if tile = 0, color it white
        noStroke()
        if (i === 0 || i === ROWS - 1 || k === 0 || k === COLS - 1){
          image(tileF, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }
        else if (room[i + 1][k] === 0 && room[i - 1][k] === 0 && room[i][k - 1] === 0 && room[i][k + 1] === 0 && room[i - 1][k - 1] === 0 && room[i - 1][k + 1] === 0 && room[i + 1][k - 1] === 0 && room[i + 1][k + 1] === 0) { // floor 1
          image(tileF1, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }
        else {
          image(tileF, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }
      }

      if (room[i][k] === 1) { // if tile = 1, draw a wall
        stroke(1)

        if (i === 0) {
          image(tileT, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }

        else if (i === ROWS - 1) {
          image(tileB, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }

        else if (k === 0) {
          image(tileR, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }

        else if (k === COLS - 1) {
          image(tileL, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }

        else if (room[i - 1][k] === 1 && room[i][k - 1] === 1 && room[i][k + 1] === 0 && room[i + 1][k] === 0) { // bottom right
          image(tileBR, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }
        else if (room[i + 1][k] === 1 && room[i][k - 1] === 1 && room[i][k + 1] === 0 && room[i - 1][k] === 0) { // top right
          image(tileTR, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }

        else if (room[i + 1][k] === 1 && room[i][k + 1] === 1 && room[i][k - 1] === 0 && room[i - 1][k] === 0) { // top left
          image(tileTL, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }

        else if (room[i - 1][k] === 1 && room[i][k + 1] === 1 && room[i][k - 1] === 0 && room[i + 1][k] === 0) { // bottom left
          image(tileBL, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }

        else if (room[i - 1][k] === 1 && room[i][k + 1] === 1 && room[i][k - 1] === 1 && room[i + 1][k] === 0) { // bottom surrounded
          image(tileB, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }

        else if (room[i + 1][k] === 1 && room[i][k + 1] === 1 && room[i][k - 1] === 1 && room[i - 1][k] === 0) { // top surrounded
          image(tileT, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }

        else if (room[i + 1][k] === 1 && room[i - 1][k] === 1 && room[i][k + 1] === 1 && room[i][k - 1] === 0) { // left 
          image(tileL, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }

        else if (room[i + 1][k] === 1 && room[i - 1][k] === 1 && room[i][k - 1] === 1 && room[i][k + 1] === 0) { // right 
          image(tileR, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }

        else if (room[i + 1][k] === 0 && room[i - 1][k] === 0) { // no left and right
          image(tileT, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }

        else if (room[i - 1][k] === 0 && room[i + 1][k] === 1 && room[i][k + 1] === 0 && room[i][k - 1] === 0) { // no left and right
          image(tileTT, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }

        else if (room[i - 1][k] === 1 && room[i + 1][k] === 0 && room[i][k + 1] === 0 && room[i][k - 1] === 0) { // no left and right
          image(tileT, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }

        else { // alone
          image(tileTM, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }

      }   
    }
  }

}

function changeTile(){ // room editing tool
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

        // if(wallAbove(theEnemies[i].xPos, theEnemies[i].yPos, theEnemies[i].xPos2, theEnemies[i].yPos2)) { // wall below or above
        //   if (player.x / theEnemies[i].x > 1 ) { // enemy is left of player
        //     theEnemies[i].vel.x = 1 // move right
        //   }
        //   else if (player.x / theEnemies[i].x < 1) { // enemy is right of player
        //     theEnemies[i].vel.x = -1; // move left
        //   }
        //   if (player.y === theEnemies[i].y) { // enemy is same y as player
        //     theEnemies[i].vel.y = 1; // move right
        //   }
        // }

        // else if(wallSides(theEnemies[i].xPos, theEnemies[i].yPos, theEnemies[i].xPos2, theEnemies[i].yPos2)) { // wall below or above
        //   if (player.y / theEnemies[i].y > 1) { // enemy is above player
        //     theEnemies[i].vel.y = 1 // move down
        //     }
        //   else if (player.y / theEnemies[i].y < 1) { // enemy is below player
        //     theEnemies[i].vel.y = -1; // move up
        //     }
        //   if (player.x === theEnemies[i].x) { // enemy is same x as player
        //     theEnemies[i].vel.x = 1; // move right
        //   }
        // }

        // else { //no walls nearby, free movement
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
      else { // touching a wall
        theEnemies[i].vel.x = -theEnemies[i].vel.x
        theEnemies[i].vel.y = -theEnemies[i].vel.y
      }
    }
  }

function wallAbove(left, top, right, bottom) {
  return room[top - 1][right] === 1 || room[bottom + 1][right] === 1 || room[bottom + 1][left] === 1 || room[top - 1][left] === 1;
}

function wallSides(left, top, right, bottom) {
  return room[top][right + 1] === 1 || room[bottom][right + 1] === 1 || room[bottom][left - 1] === 1 || room[top][left - 1] === 1;
}

function touchingWall(left, top, right, bottom) {
  return room[top][left] !== 1 && room[bottom][left] !== 1 && room[top][right] !== 1 && room[bottom][right] !== 1;
}

function mapPosition() { // finds where you are on the map
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

function changeRoom() { // if you go through a door, change the room
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

function newRoom() { // closes door behind you and spawns enemies
  if (newr === true) { // start timer
    theBullets = []
    time = millis()
    newr = false
  }

  if (millis() - time > 2000 && room.complete === "false") { // once it's been 2 seconds block the doors and spawn the enemies
    room.complete = "in progress"
    blockade(room)
    spawnEnemies()
  }
}

function blockade(room) { // blocks the doors
  oldroom = [] // copy of room so it can be reset after
  for (let i = 0; i < 20; i++) {
    oldroom.push([])
    for (let k = 0; k < room[i].length; k++) {
      if(room[i][k] === 1){
        oldroom[i].push(1)
      }
      else if(room[i][k] === 0){
        oldroom[i].push(0)
      }
    }
  }

  for (let i = 19; i >= 0; i--){
    for (let k = room[i].length - 1; k >= 0; k--){
      if (i === 0){
        room[i][k] = 1
      }
      if (k === 0){
        room[i][k] = 1
      }
      if (i === ROWS - 1){
        room[i][k] = 1
      }
      if (k === COLS - 1){
        room[i][k] = 1
      }
    }
  }
}

function roomComplete(){ // if all the enemies are dead
  for (let i = map.length - 1; i >= 0; i--) {
    for (let k = map[i].length - 1; k >= 0; k--) {
      if (map[i][k] !== 0 && theEnemies.length === 0 && map[i][k].complete === "in progress") {
        room.complete = "true"
          for (let i = 0; i < 20; i++) {
            for (let k = 0; k < room[i].length; k++) {
              room[i][k] = oldroom[i][k]
          }
        }
     }
    }
  }
}

function drawStuff() {
  for (let i = 0; i < player.healthtotal; i++) { // total health
    image(healthemptyimg, cellWidth/1.7  + i * cellWidth/1.5, cellHeight/2)
  }

  for(let k = 0; k < player.health; k++) { // current health
    image(healthimg, cellWidth/1.7  + k * cellWidth/1.5, cellHeight/2)
  }

  fill("yellow") // money
  image(coinimg, cellWidth/1.7, cellHeight * 2, cellWidth * 1.2, cellHeight * 1.2)
  strokeWeight(2)
  textSize(cellWidth)
  textFont(font)
  text(money, cellWidth*2, cellHeight * 3)

  stroke("white") // gun display
  strokeWeight(1)
  fill(80, 80, 80, 80)
  rect(width - cellWidth * 5, height - cellHeight * 4.5, cellWidth * 4, cellHeight * 3)

  stroke("black") // ammo count
  strokeWeight(4)
  fill(255, 255, 255)
  text(gun.ammo + "/" + gun.magazine, width - cellWidth * 5, height - 15)

  if(gun === pistol) {
    image(pistolimage, width - cellWidth * 4.5, height - cellHeight * 4, pistolimage.width * 3, pistolimage.height * 3)
    23162
  }

  if(gun === shotgun) {
    image(shotgunimage, width - cellWidth * 4.5, height - cellHeight * 4, shotgunimage.width * 3, shotgunimage.height * 3)
    23162
  }

  strokeWeight(1)

  for (let i = 0; i < guns.length; i++) { // draw gun next to player
    if(player.vel.x > 0) {
      guns[i].x = player.x + player.width/2
    }
    else if (player.vel.x < 0) {
      guns[i].x = player.x - player.width/2
    }
    guns[i].y = player.y + player.width/5
    if (guns[i] !== gun) {
      guns[i].visible = false
    }
    else {
      guns[i].visible = true
    }
  }
}

function reload() { // if R is pressed, after a certain amount of time refill magazine

  if(reloading === true) {

    if (millis() - gun.reload < gun.reloadtime) { // reload wait time
      fill("white")
      rect(player.x - player.width * 1.1, player.y - player.height * 1.1, player.width * 2.2, player.height / 5)
      fill("green");
      noStroke()
      rect(player.x - player.width * 1.1, player.y - player.height * 1.1, ((millis() - gun.reload) * (gun.magazine)) / (player.width * 1.1), player.height / 5)
    }

    if (millis() - gun.reload > gun.reloadtime) { // fills gun with bullets
        gun.ammo = gun.magazine
        gun.reload = millis()
        reloading = false
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
