// awesome dungeon crawler
// Uday Sandhu
// November 21st, 2022+

//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// PEE FIVE DOT PLAY

let room = [];
let oldroom = [];
let theBullets = [];
let pistol, shotgun, machinegun;
let playerguns = [];
let guns = [];
let theEnemies = [];
let enemyBullets = [];
let theCoins = [];
let theChests = [];
let heart, halfheart, key; 
let itemTypes = ["heart", "halfheart", "key"];
let shopItems = [[], [], [], []];

let gamestate;

let player;

let map = [[0,0,0,0], 
           [0,0,0,0],
           [0,0,0,0]];

let l0, l1, l2, l3, l4, s1;

let time;

let font;

let newr = false;
let reloading = false;
let rolling = false;

let minEn = 2;
let maxEn = 6;

let money = 0;
let keys = 0;
let gatekeys = 0;

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
  l00 = loadJSON("level grids/blank.json"); // different rooms
  l0 = loadJSON("level grids/1-0.json"); 
  l1 = loadJSON("level grids/1-1.json");
  l2 = loadJSON("level grids/1-2.json");
  l3 = loadJSON("level grids/1-3.json");
  l4 = loadJSON("level grids/1-4.json");
  s1 = loadJSON("level grids/s-1.json");
  l5 = loadJSON("level grids/1-5.json");
  l6 = loadJSON("level grids/1-6.json");

  theLevels1 = [l1, l2, l3, l4, s1, l6]; // list of random rooms

  tileTL = loadImage("assets/tiles/tileTL.png"); // tiles
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

  tileTA = loadImage("assets/tiles/table00.png");
  tileTA1 = loadImage("assets/tiles/table01.png");
  tileTA2 = loadImage("assets/tiles/table02.png");
  tileTA3 = loadImage("assets/tiles/table03.png");
  tileTA4 = loadImage("assets/tiles/table04.png");
  tileTA5 = loadImage("assets/tiles/table05.png");
  tileTA6 = loadImage("assets/tiles/table06.png");
  tileTA7 = loadImage("assets/tiles/table07.png");
  tileTA8 = loadImage("assets/tiles/table08.png");
  tileTA9 = loadImage("assets/tiles/table09.png");

  lock = loadImage("assets/tiles/lock.png");
  spike = loadImage("assets/tiles/spike01.png");

  logo = loadImage("assets/misc/dungeon logo.png");

  coinimg = loadImage("assets/misc/coin.png"); // miscellaneous images
  heartimg = loadImage("assets/misc/heart.png");
  halfheartimg = loadImage("assets/misc/halfheart.png"); 
  keyimg = loadImage("assets/misc/key.png"); 
  gatekeyimg = loadImage("assets/misc/gatekey.png");

  chestimg = loadImage("assets/misc/chest.png"); 

  healthimg = loadImage("assets/misc/healthbar.png");
  healthemptyimg = loadImage("assets/misc/healthbarempty.png");

  pistolimage = loadImage("assets/misc/pistol.png");
  shotgunimage = loadImage("assets/misc/shotgun.png");
  machinegunimage = loadImage("assets/misc/machinegun.png");

  pistolbulletimage = loadImage("assets/misc/pistol bullet.png");
  shotgunbulletimage = loadImage("assets/misc/shotgun bullet.png");
  machinegunbulletimage = loadImage("assets/misc/machinegun bullet.png");

  playerimg = loadImage('assets/player/basic_idle_01.png');

  font = loadFont('assets/8bitfont.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  cellWidth = width / COLS;
  cellHeight = height / ROWS;

  player = new Sprite(width/2, height/2); // player
  player.collider = "d";
  player.health = 6;
  player.healthtotal = 6;
  player.movespeed = 3;

  player.iframes = 1000; // set number of iframes
  player.iframes2 = 1001; // iframes player has

  player.rolltime = 300; // how much time during rolling
  player.rolling = 0;

  player.rollcooldown = 301; // cooldown time for rolling
  player.rollcooldowntime = 300;
  player.visible = false;


  player.addAni('idle', 'assets/player/basic_idle_01.png', 3) // idle animation
  player.addAni('run', 'assets/player/basic_running_01.png', 2) // running animation
  player.addAni('hurt', 'assets/player/playerhit_01.png', 2) // hurt animation

  player.width = playerimg.width/2;
  player.height = playerimg.height/2;
  player.ani.frameDelay = 15;

  shopkeeper = new Sprite(width/4, cellHeight * 8); // make shopkeeper
  shopkeeper.addAni('idle', 'assets/misc/shopkeeper_01.png', 2);
  shopkeeper.ani.frameDelay = 60
  shopkeeper.collider = "none";
  shopkeeper.visible = false;

  coinimg.width = coinimg.width/4; // image resizing
  coinimg.height = coinimg.height/4;
  heartimg.width = heartimg.width/4;
  heartimg.height = heartimg.height/4;
  halfheartimg.width = halfheartimg.width/4;
  halfheartimg.height = halfheartimg.height/4;
  keyimg.width = keyimg.width/4;
  keyimg.height = keyimg.height/4;
  gatekeyimg.width = gatekeyimg.width/4;
  gatekeyimg.height = gatekeyimg.height/4;

  healthimg.width = healthimg.width/2;
  healthimg.height = healthimg.height/2;
  healthemptyimg.width = healthemptyimg.width/2;
  healthemptyimg.height = healthemptyimg.height/2;

  pistolimage.width = pistolimage.width/4;
  pistolimage.height = pistolimage.height/4;
  shotgunimage.width = shotgunimage.width/2;
  shotgunimage.height = shotgunimage.height/2;
  machinegunimage.width = machinegunimage.width/2;
  machinegunimage.height = machinegunimage.height/2;

  gamestate = "main"; // main menu

  // makeRoom();

  room = l0; // set room to start room

  pistol = new Sprite(player.x + player.width, player.y, 20, 10, "n"); // create pistol
  pistol.image = pistolimage;

  pistol.magazine = 12; // magazine and ammo
  pistol.ammo = 12;

  pistol.reloadtime = 500; // reloadtime
  pistol.reload = 500;

  pistol.firerate = 300; // firerate
  pistol.fired = 301;
  pistol.visible = false

  shotgun = new Sprite(player.x + player.width, player.y, 17, 13, "n"); // create shotgun
  shotgun.image = shotgunimage;

  shotgun.magazine = 4;
  shotgun.ammo = 4;

  shotgun.reloadtime = 1300;
  shotgun.reload = 1300;

  shotgun.firerate = 1000;
  shotgun.fired = 1001;
  shotgun.visible = false;

  machinegun = new Sprite(player.x + player.width, player.y, 30, 6, "n"); // create machine gun
  machinegun.image = machinegunimage;

  machinegun.magazine = 2;
  machinegun.ammo = 2;

  machinegun.reloadtime = 3000;
  machinegun.reload = 3000;

  machinegun.firerate = 300;
  machinegun.fired = 301;

  machinegun.visible = false;

  playerguns = [pistol];
  guns = [shotgun, machinegun]; // guns list
  gun = playerguns[0];

  gate = new Sprite(width/2, 0 + cellHeight/2, cellWidth * 6, cellHeight, 's');
  gate.image = lock;
  gate.visible = false;

  makeMap(theLevels1); // create map out of the levels
}

function makeMap(list) {
  let n;

  map[0][1] = l5; // set place for boss room
  map[1][1] = l0; // set place for start room

  for(let i = map.length - 1; i >= 0; i--) {
    for(let k = map[i].length - 1; k >= 0; k--) {
     n = Math.floor(random(0, list.length - 1)) 
      if(random(0, 100) < 80 && list.length > 0 && map[i][k] === 0) { // so the maps arent placed in a bunch
        map[i][k] = list[n] // replace 0 in map with level
        list[n].status = "incomplete" // set levels to incomplete status
        list[n].chest = false // no chest in room
        list.splice(n, 1) // removes level from list of addable levels
        }
    }
  }

  s1.status = "shop" // shop room
  l5.status = "boss" // boss room

  for(let i = map.length - 1; i >= 0; i--) {
    for(let k = map[i].length - 1; k >= 0; k--) {
      if(map[i][k] !== 0 && map[i][k] !== l5) { // if it's a room
          if(i > 0 && map[i-1][k] && map[i-1][k] !== l5){ // open top door if theres a room above
            map[i][k][0][map[i][k][0].length/2 - 3] = 0 // removes walls on the top side
            map[i][k][0][map[i][k][0].length/2 - 2] = 0
            map[i][k][0][map[i][k][0].length/2 - 1] = 0
            map[i][k][0][map[i][k][0].length/2] = 0
            map[i][k][0][map[i][k][0].length/2 + 1] = 0
            map[i][k][0][map[i][k][0].length/2 + 2] = 0
          } 

          if(i < map.length - 1 && map[i+1][k] && map[i+1][k] !== l5){ // room below
            map[i][k][ROWS - 1][map[i][k][0].length/2 - 3] = 0
            map[i][k][ROWS - 1][map[i][k][0].length/2 - 2] = 0
            map[i][k][ROWS - 1][map[i][k][0].length/2 - 1] = 0
            map[i][k][ROWS - 1][map[i][k][0].length/2] = 0
            map[i][k][ROWS - 1][map[i][k][0].length/2 + 1] = 0
            map[i][k][ROWS - 1][map[i][k][0].length/2 + 2] = 0
          }

          if(i > 0 && map[i][k-1] && map[i][k-1] !== l5){ // room left
            map[i][k][map[i][k][0].length/4 - 3][0] = 0
            map[i][k][map[i][k][0].length/4 - 2][0] = 0
            map[i][k][map[i][k][0].length/4 - 1][0] = 0
            map[i][k][map[i][k][0].length/4][0] = 0
            map[i][k][map[i][k][0].length/4 + 1][0] = 0
            map[i][k][map[i][k][0].length/4 + 2][0] = 0
          } 

          if(i < map[i].length - 1 && map[i][k+1] && map[i][k+1] !== l5){ // room right
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

  mapX, mapY = mapPosition(); // map position check

  enemyShot();
  checkCollide();

  drawRoom();
  drawStuff();

  moveEnemies();
  trackBullet();

  newRoom();
  roomComplete();

  reload();

  pickupItems();
  buyItems();

  dodgeRoll();
  movePlayer();

  bossAI();
  checkState();
}

function movePlayer(){ // player movement and drawing
  playerxPos = Math.floor((player.x - player.width/2)/cellWidth);
  playeryPos = Math.floor((player.y - player.height/2)/cellHeight);
  playerxPos2 = Math.floor((player.x + player.width/2)/cellWidth);
  playeryPos2 = Math.floor((player.y + player.height/2)/cellHeight);

  if (gamestate === "game") { // only allow movement when game
    player.visible = true; // show player
    if (room.status !== "in progress") { // if there arent enemies make the player faster
      player.movespeed = 4.5;
    }
  
    else { // fighting enemies
      player.movespeed = 3;
    }
  
    if(player.y + player.height/2 < height && player.y - player.height/2 > 0) {
      if(room[playeryPos][playerxPos] > 0 || room[playeryPos2][playerxPos] > 0 || room[playeryPos][playerxPos2] > 0 || room[playeryPos2][playerxPos2] > 0) { // if touching wall
        player.x -= player.vel.x; // repels you from wall
        player.y -= player.vel.y;
      }
  
        if((room[playeryPos][playerxPos] === -1 || room[playeryPos2][playerxPos] === -1 || room[playeryPos][playerxPos2] === -1 || room[playeryPos2][playerxPos2] ===-1) && millis() - player.iframes2 > player.iframes) { // if on spikes
        player.health -= 1;
        player.iframes2 = millis()
      }
    }
  
    if (kb.pressing('W') && rolling === false) { //up
  
      player.vel.y = -(player.movespeed); // move you up at player speed
      player.ani = 'run'; //running animation
      player.ani.frameDelay = 15;
    }
  
    if (kb.pressing('A') && rolling === false) { //left
  
      player.vel.x = -(player.movespeed);
      player.ani = 'run';
      player.ani.frameDelay = 15;
  
      player.mirror.x = true // flips you horizontally
      for(i = 0; i < playerguns.length; i ++) {
        playerguns[i].mirror.x = true; // flips gun horizontally
      }
    }
  
    if (kb.pressing('S') && rolling === false) { //down
      player.vel.y = player.movespeed;
      player.ani = 'run';
      player.ani.frameDelay = 15;
    }
  
    if (kb.pressing('D') && rolling === false) { //right
      player.vel.x = player.movespeed;
      player.ani = 'run';
      player.ani.frameDelay = 15;
  
      player.mirror.x = false
      for(i = 0; i < playerguns.length; i ++) { // turns gun with player
        playerguns[i].mirror.x = false;
      }
    }
  
    if (!keyIsPressed && rolling === false) { // dont move if nothing is pressed
      player.vel.x = 0;
      player.vel.y = 0;
      player.ani = 'idle'; // idle animation
      player.ani.frameDelay = 15;
    }
  
    if(player.x >= width || player.x <= 0 || player.y >= height || player.y <= 0) { // if you go out of bounds, change the room
      changeRoom();
    }
  
    if(millis() - player.iframes2 < player.iframes && rolling === false) { // if player was hit
      player.ani = 'hurt'; //hurt animation
      player.ani.frameDelay = 5;
    }
  }
}

function mousePressed() {
  if (gamestate === "game") {
    shootBullet(); // shoot gun
    // changeTile();
  }
}

function mouseWheel() { // scrolling through guns
  index = playerguns.indexOf(gun) // number of your gun
  if (index >= playerguns.length - 1) { // final gun -> first gun
    index = -1
  }
  gun = playerguns[index + 1] // change gun to next gun

}

function keyPressed() {
  if(keyCode === 82 && gun.ammo < gun.magazine && reloading === false) { // reload when R pressed
    gun.reload = millis()
    reloading = true
  }

  if(keyCode === 69 && millis() - player.rollcooldown > player.rollcooldowntime && rolling === false && (player.vel.x !== 0 || player.vel.y !== 0)) { // dodge roll when E pressed
    player.rolling = millis()
    rolling = true;
  }

  if(keyCode === 81 && dist(player.x, player.y, gate.x, gate.y) < 150 && gate.visible === true && gatekeys > 0) { // unlock when Q pressed
    gatekeys -= 1;
    gate.remove(); // delete gate
  }

  if (theChests.length > 0) { // unlock when Q pressed
    if(keyCode === 81 && dist(player.x, player.y, chest.x, chest.y) < 150 && chest.visible === true && keys > 0) { 
      keys -= 1;
      chestOpen();
    }
  }
}

function spawnEnemies() {
  for(let i = Math.floor(random(minEn, maxEn)); i >= 0 ; i--) {

    enemy = new Sprite(random(enemyWidth, width - enemyWidth), random(enemyWidth, height - enemyWidth),"k"); // create enemy

    enemy.xPos = Math.floor((enemy.x - enemy.width/2)/cellWidth); // enemy place in grid

    enemy.yPos = Math.floor((enemy.y - enemy.height/2)/cellHeight);

    enemy.xPos2 = Math.floor((enemy.x + enemy.width/2)/cellWidth);

    enemy.yPos2 = Math.floor((enemy.y + enemy.height/2)/cellHeight);

    while (!(enemy.xPos > 0 && enemy.yPos > 0 && enemy.yPos2 < ROWS - 1 && enemy.xPos2 < COLS - 1) || room[enemy.yPos][enemy.xPos] !== 0 || room[enemy.yPos2][enemy.xPos] !== 0 
    || room[enemy.yPos][enemy.xPos2] !== 0 || room[enemy.yPos2][enemy.xPos2] !== 0) {
      // keep rerolling enemy position until it's not in a wall and not out of bounds
      enemy.x = random(0 + enemyWidth, width - enemyWidth)
      enemy.y = random(0 + enemyWidth, height - enemyWidth)

      enemy.xPos = Math.floor((enemy.x - enemy.width/2)/cellWidth);

      enemy.yPos = Math.floor((enemy.y - enemy.height/2)/cellHeight);
  
      enemy.xPos2 = Math.floor((enemy.x + enemy.width/2)/cellWidth);
  
      enemy.yPos2 = Math.floor((enemy.y + enemy.height/2)/cellHeight);
    }

    enemy.speed = 1; // enemy speed
    enemy.health = (Math.floor(random(1, 3))); // random health

    if(enemy.health === 1) { // red enemies have 1 health
      enemy.totalhealth = 1;
      enemy.addAni('walk1', 'assets/enemies/enemy-1-01.png', 3);
    }
    if(enemy.health === 2) { // blue enemies have 2 health
      enemy.totalhealth = 2;
      enemy.addAni('walk2', 'assets/enemies/enemy-2-01.png', 3);
    }

    enemy.vel.x = 0; // no movement to start
    enemy.vel.y = 0;

    enemy.inv = 81 // invincibility frames for enemies
    player.overlaps(enemy) // player doesnt collide with enemy
    theEnemies.push(enemy);
  }
}

function enemyShot() { // enemy bullet collision check
  for(let i = theEnemies.length - 1; i >= 0; i--) { // enemies shot 
    for(let k = theBullets.length - 1; k >= 0; k--) {
      if (theBullets[k].overlaps(theEnemies[i]) && millis() - enemy.inv > 80) {
        theEnemies[i].health -= theBullets[k].strength; // remove enemy health equivalent to how strong the bullet was
        theEnemies[i].color = ("orange") // enemy hit animation

        theBullets[k].remove(); // delete the bullet
        theBullets.splice(k, 1);

        enemy.inv = millis(); // invincibility frames for enemy
      }

      if (theEnemies[i].health <= 0) { // if enemies lose all health
        coin = new Sprite(theEnemies[i].x, theEnemies[i].y, 'k'); // generate coin on where enemy died
        coin.overlaps(player) // player doesnt collide with coin

        coin.addAni('sit', 'assets/misc/coin01.png', 4) // set coin animation
        coin.ani = 'sit'
        coin.ani.frameDelay = 10

        theEnemies[i].remove(); // delete enemy
        theEnemies.splice(i, 1);
        theCoins.push(coin);
        
        k = 0 // prevents loop from breaking
      }
    }
  }

  if (room.status === "boss battle") {
    for(let i = theBullets.length - 1; i >= 0; i--) { // boss shot
      if (theBullets[i].overlaps(boss)) {
        boss.health -= theBullets[i].strength; 
        theBullets[i].remove(); 
        theBullets.splice(i, 1);
        boss.ani = 'hurt'
        player.ani.frameDelay = 1
      }
    }

    if (boss.health <= 0) { // if enemies lose all health   
      boss.remove();
      gamestate = "win"
    }
  }
}

function checkCollide() { // player collision
  for (let i = theEnemies.length - 1; i >= 0; i--) {
    if (player.overlaps(theEnemies[i]) && millis() - player.iframes2 > player.iframes){ // player collides with enemy body
          player.health -= 1 //reduce health
          player.iframes2 = millis() // give player immunity
      }
  }
  for (let i = enemyBullets.length - 1; i >= 0; i--) {
    if (player.overlaps(enemyBullets[i]) && millis() - player.iframes2 > player.iframes){ // player collides with enemy body
          player.health -= 1 //reduce health
          player.iframes2 = millis() // give player immunity
      }
  }
  if (player.health < 0) {
    gamestate = "lose"
  }
}


function shootBullet() { // spawns and moves bullets to cursor
  if(reloading === false) { // if not reloading
    if(gun === pistol && millis() - gun.fired > gun.firerate && gun.ammo > 0) { // pistol shooting
      stroke("black")
      gun.ammo-- //reduce ammo

      bullet = new Sprite(gun.x + gun.width/2, gun.y, 10);

      bullet.overlaps(player) // bullet doesnt collide with player
      bullet.image = pistolbulletimage

      bullet.collider = "d"
      bullet.strength = 1;
      bullet.speed = 10

      bullet.moveTowards(mouse, bullet.speed / dist(bullet.x, bullet.y, mouseX, mouseY)); // dividing by distance from mouse to keep speed constant

      theBullets.push(bullet);
      gun.fired = millis(); // fire rate check
    }

    if(gun === shotgun && millis() - gun.fired > gun.firerate && gun.ammo > 0) { // shotgun
      stroke("black")
      gun.ammo--
        for(let i = -2; i < 3; i++) { // 4 bullets
          if (i !== 0) { // no center bullet
            bullet = new Sprite(gun.x + gun.width/2, player.y, 10);
            bullet.overlaps(player)
            bullet.image = shotgunbulletimage
            bullet.collider = "d"
            bullet.strength = 1;
            bullet.speed = 7
            bullet.color = (80, 80, 80)
            bullet.moveTowards(mouseX + (abs(player.y - mouseY) * tan(15 * i)), mouseY + (abs(player.x - mouseX) * tan(15 * i)), bullet.speed / dist(bullet.x, bullet.y, 
                              mouseX + (abs(player.y - mouseY) * tan(15 * i)), mouseY + (abs(player.x - mouseX) * tan(15 * i)))); // math for each bullet
            theBullets.push(bullet);
            gun.fired = millis() // fire rate check
        }
      }
    }

    if(gun === machinegun && millis() - gun.fired > gun.firerate && gun.ammo > 0) { // machine shooting
      stroke("black")
      machinegun.bulletspread1 = millis()
      gun.ammo-- //reduce ammo

      bullet = new Sprite(gun.x + gun.width/2, gun.y, 300);
    
      bullet.overlaps(player) // bullet doesnt collide with player
      bullet.image = machinegunbulletimage;
    
      bullet.collider = "d"
      bullet.strength = 5;
      bullet.speed = 6;
    
      bullet.moveTowards(mouse, bullet.speed / dist(bullet.x, bullet.y, mouseX, mouseY)); // dividing by distance from mouse to keep speed constant
    
      theBullets.push(bullet);
      gun.fired = millis(); // fire rate check
    }
  }
}

function trackBullet() { // bullet deletion
  for(let i = theBullets.length - 1; i >= 0; i--) {

    bullet.xPos = Math.floor(theBullets[i].x/cellWidth); // bullet position
    bullet.yPos = Math.floor(theBullets[i].y/cellHeight);

    if(theBullets[i].x >= width || theBullets[i].x <= 0 || theBullets[i].y >= height || theBullets[i].y <= 0) { // if bullet goes out of bounds
      theBullets[i].remove(); // delete bullet
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
    if(theCoins[i].overlaps(player)) { // if player touches a coin
      theCoins[i].remove(); // delete sprite & remove from array
      theCoins.splice(i,1);
      money += 1; // increase money
    }
  }
}

function makeRoom() { // creates blank room if needed
  for (let i = 0; i < ROWS; i++) {
    room.push([]);
    for (let k = 0; k < COLS; k++) {
      if (k === 0 || i === 0 || k === COLS - 1 || i === ROWS - 1) { // walls on edge
        room[i].push(1);
      }
      else {
        room[i].push(0);
      }
    }
  }
}

function drawRoom() { // draws room based on tiles
  let cellWidth = width / COLS;
  let cellHeight = height / ROWS;

  for (let i = 0; i < ROWS; i++) {
    for (let k = 0; k < COLS; k++) {
      if (room[i][k] === 0) { // if tile = 0, color it white
        noStroke();
        if (i === 0 || i === ROWS - 1 || k === 0 || k === COLS - 1){
          image(tileF, k * cellWidth, i * cellHeight, cellWidth, cellHeight);
        }
        else if (room[i + 1][k] === 0 && room[i - 1][k] === 0 && room[i][k - 1] === 0 && room[i][k + 1] === 0 && room[i - 1][k - 1] === 0 && room[i - 1][k + 1] === 0 && room[i + 1][k - 1] === 0 && room[i + 1][k + 1] === 0) { // floor 1
          image(tileF1, k * cellWidth, i * cellHeight, cellWidth, cellHeight);
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

      if (room[i][k] === 2) { // tables

        if(room[i][k - 1] === 2 && room[i + 1][k] === 2 && room[i][k + 1] === 2 && room[i - 1][k] !== 2) { // top middle
          image(tileTA5, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }        
        
        else if(room[i][k + 1] ==! 2 && room[i][k - 1] === 2 && room[i + 1][k] === 2 && room[i - 1][k] === 2) { // vertical right
          image(tileTA3, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }

        else if(room[i][k - 1] ==! 2 && room[i][k + 1] === 2 && room[i + 1][k] === 2 && room[i - 1][k] === 2) { // vertical left
          image(tileTA8, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }

        else if(room[i][k - 1] === 2 && room[i - 1][k] === 2 && room[i][k + 1] !== 2) { // bottom right
          image(tileTA2, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }

        else if(room[i][k + 1] === 2 && room[i - 1][k] === 2 && room[i][k - 1] !== 2) { // bottom left
          image(tileTA4, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }

        else if(room[i][k + 1] === 2 && room[i + 1][k] === 2 && room[i - 1][k] !== 2) { // top left
          image(tileTA6, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }

        else if(room[i][k - 1] === 2 && room[i + 1][k] === 2 && room[i][k + 1] !== 2) { // top right
          image(tileTA7, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }

        else if(room[i][k - 1] === 2 && room[i + 1][k] === 2 && room[i][k + 1] === 2 && room[i - 1][k] === 2) { // center
          image(tileTA9, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }

        else { // horizontal
          image(tileTA1, k * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }
      }

      if (room[i][k] === 3) { //special table for items
        image(tileTA, k * cellWidth, i * cellHeight, cellWidth, cellHeight);
      }

      if (room[i][k] === -1) { //spikes
        image(spike, k * cellWidth, i * cellHeight, cellWidth, cellHeight);
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
  // else if (room[yPos][xPos] === 1) {
  //   room[yPos][xPos] = 2;
  // }   
  // else if (room[yPos][xPos] === 2) {
  //   room[yPos][xPos] = 3;
  // } 
  else if (room[yPos][xPos] === 1) {
    room[yPos][xPos] = -1;
  }  

  else if (room[yPos][xPos] === -1) {
    room[yPos][xPos] = 0;
  }   
}

function moveEnemies() {
  for(let i = theEnemies.length - 1; i >= 0; i--) {
    if (theEnemies[i].totalhealth === 1) {
      theEnemies[i].ani = "walk1"
    }
    if (theEnemies[i].totalhealth === 2) {
      theEnemies[i].ani = "walk2"
    }
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
        }

        else if(wallSides(theEnemies[i].xPos, theEnemies[i].yPos, theEnemies[i].xPos2, theEnemies[i].yPos2)) { // wall below or above
          if (player.y / theEnemies[i].y > 1) { // enemy is above player
            theEnemies[i].vel.y = 1 // move down
            }
          else if (player.y / theEnemies[i].y < 1) { // enemy is below player
            theEnemies[i].vel.y = -1; // move up
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

function wallSides(left, top, right, bottom) {
  return room[top][right + 1] === 1 || room[bottom][right + 1] === 1 || room[bottom][left - 1] === 1 || room[top][left - 1] === 1;
}

function touchingWall(left, top, right, bottom) {
  return room[top][left] !== 1 && room[bottom][left] !== 1 && room[top][right] !== 1 && room[bottom][right] !== 1;
}

function wallRight(left, top, right, bottom) {
  return room[top][right + 1] === 1 || room[bottom][right + 1] === 1 && (room[bottom][left - 1] ==! 1 && room[top][left - 1] ==! 1);
}

function wallAbove(left, top, right, bottom) {
  return (room[top - 1][right] === 1 && room[top - 1][left] === 1) && room[bottom + 1][right] === 1 || room[bottom + 1][left] === 1 
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
    room = map[mapY][mapX + 1]; // switch place in map
    player.x = player.width/2; // so you're not on border
    if(room.status === "shopping") {
      room.status = "shop";
    }
  }

  if (player.x <= 0) { // left
    room = map[mapY][mapX - 1];
    player.x = width - player.width/2;
    if(room.status === "shopping") {
      room.status = "shop";
    }
  }

  if (player.y >= height) { // down
    room = map[mapY + 1][mapX];
    player.y = player.height/2;
    if(room.status === "shopping") {
      room.status = "shop";
    }
  }

  if (player.y <= 0) { // up
    room = map[mapY - 1][mapX];
    player.y = height - player.height/2;
    if(room.status === "shopping") {
      room.status = "shop";
    }
  }

  newr = true
}

function newRoom() { // does things once room is entered
  if (room === l0 && gamestate === "game") { // show gate when in start room
    gate.visible = true;
    gate.collider = "s"
  }

  if (room.chest === true) { // if in room with chest show chest
    chest.visible = true;
  }

  if (newr === true) { // start timer
    for (let i = theBullets.length - 1; i >=0; i--) { // removes all bullets on screen
      theBullets[i].remove();
      theBullets.splice(i, 1);
    }

    for(i = theCoins.length - 1; i >= 0; i--) { // if you enter a new room but there are still coins on the floor, auto collect the coins
      theCoins[i].remove();
      theCoins.splice(i,1);
      money += 1;
    }

    time = millis(); // timer for door shut
    newr = false;

    shopkeeper.visible = false; // invisible shopkeeper
    gate.visible = false; // invisible gate
    gate.collider = "n"; // prevent colliding with gate when not in room

    if (theChests.length === 1) {
      chest.visible = false; // invisible chest
    }


    if (room.status === "shop") { // do shop sequence
      doShop();
    }

    else if (room.status !== "shop"){
      for(let i = shopItems.length - 1; i >= 0; i--) {
        for(let k = shopItems[i].length - 1; k >= 0; k--) { // make items invisible
          shopItems[i][k].visible = false;
        }
      }
    }

  }

  if (millis() - time > 2000 && room.status === "incomplete" || millis() - time > 2000 && room.status === "boss") { // once it's been 2 seconds block the doors and spawn the enemies
    blockade(room);
    if (room.status === "incomplete") {
      room.status = "in progress";
      spawnEnemies();
    }

    if(room.status === "boss") { // do boss battle sequence
      startbossFight();
    }
  }
}

function blockade(room) { // blocks the doors
  oldroom = [] // copy of room so it can be reset after
  for (let i = 0; i < 20; i++) {
    oldroom.push([]);
    for (let k = 0; k < room[i].length; k++) {
      if(room[i][k] === 1){
        oldroom[i].push(1);
      }
      else if(room[i][k] === 0){
        oldroom[i].push(0);
      }
      else if(room[i][k] === -1){
        oldroom[i].push(-1);
      }
    }
  }

  for (let i = 19; i >= 0; i--){
    for (let k = room[i].length - 1; k >= 0; k--){
      if (i === 0){
        room[i][k] = 1;
      }
      if (k === 0){
        room[i][k] = 1;
      }
      if (i === ROWS - 1){
        room[i][k] = 1;
      }
      if (k === COLS - 1){
        room[i][k] = 1;
      }
    }
  }
}

function roomComplete(){ // if all the enemies are dead
  for (let i = map.length - 1; i >= 0; i--) {
    for (let k = map[i].length - 1; k >= 0; k--) {
      if (map[i][k] !== 0 && theEnemies.length === 0 && map[i][k].status === "in progress") {
        room.status = "complete";
        if(random(0, 5) < 1 && room.chest === false && theChests.length === 0) {
            chest = new Sprite(width/2, height/2, 50, 50, "n"); // makes a chest
            chest.image = chestimg
            room.chest = true; // prevent multiple chests
            theChests.push(chest)
          }
          else if (random(0, 5) > 1 && room.chest === false) {
            room.chest = "failed" // no chest
          }

          for (let i = 0; i < 20; i++) {
            for (let k = 0; k < room[i].length; k++) {
              room[i][k] = oldroom[i][k];
          }
        }
     }
    }
  }
}

function drawStuff() {
  for (let i = 0; i < player.healthtotal; i++) { // total health
    image(healthemptyimg, cellWidth/1.7  + i * cellWidth/1.5, cellHeight/2);
  }

  for(let k = 0; k < player.health; k++) { // current health
    image(healthimg, cellWidth/1.7  + k * cellWidth/1.5, cellHeight/2);
  }

  fill("yellow") // money
  image(coinimg, cellWidth/1.7, cellHeight * 2, cellWidth * 1.2, cellHeight * 1.2);
  strokeWeight(2);
  textSize(cellWidth);
  textFont(font);
  text(money, cellWidth*2, cellHeight * 3);

  fill("grey") // keys
  image(keyimg, cellWidth/1.7, cellHeight * 3.3, cellWidth * 1.2, cellHeight * 1.2);
  strokeWeight(2);
  textSize(cellWidth);
  textFont(font);
  text(keys, cellWidth * 2, cellHeight * 4.3);

  if (gatekeys > 0) {
    image(gatekeyimg, cellWidth/1.7, cellHeight * 4.5, cellWidth * 1.2, cellHeight * 1.2 )
  }

  stroke("white"); // gun display
  strokeWeight(3);
  fill(80, 80, 80, 80);
  rect(width - cellWidth * 5, height - cellHeight * 4.5, cellWidth * 4, cellHeight * 3);

  stroke("black"); // ammo count
  strokeWeight(4);
  fill(255, 255, 255);
  text(gun.ammo + "/" + gun.magazine, width - cellWidth * 5, height - 15);

  if(gun === pistol) { // show pistol
    image(pistolimage, width - cellWidth * 5 + (pistolimage.width * 1.5), height - cellHeight * 4.5 + (pistolimage.height * 1.5), pistolimage.width * 3, pistolimage.height * 3);
  }

  if(gun === shotgun) { // show shotgun
    image(shotgunimage, width - cellWidth * 5, height - cellHeight * 4.5 + shotgunimage.height * 1.5, shotgunimage.width * 3, shotgunimage.height * 3);
  }

  if(gun === machinegun) { // show machinegun
    image(machinegunimage, width - cellWidth * 5 + (machinegunimage.width * 1.5), height - cellHeight * 4.5 + (machinegunimage.height * 1.5), machinegunimage.width * 3, machinegunimage.height * 3);
  }

  strokeWeight(1)

  for (let i = 0; i < playerguns.length; i++) { // draw gun next to player

    if(player.mirror.x === false) { // turns gun with player
      playerguns[i].x = player.x + player.width/2;
    }

    else if (player.mirror.x === true) {
      playerguns[i].x = player.x - player.width/2;
    }

    playerguns[i].y = player.y + player.width/5;

    if (playerguns[i] !== gun) { // show only the gun you're holding
      playerguns[i].visible = false;
    }
    else if (gamestate === "game"){
      playerguns[i].visible = true;
    }
  }

  if (gate.visible === true && dist(player.x, player.y, gate.x, gate.y) < 100) { // if close to gate
    fill("white");
    textSize(30);
    text("Q - Unlock?", gate.x - gate.width/2, gate.y + 100); // write unlock text
  }

  if (theChests.length > 0) { // if chest
    if (chest.visible === true && dist(player.x, player.y, chest.x, chest.y) < 100) { // if close to visible chest
      fill("white");
      textSize(20);
      text("Q - Unlock?", chest.x, chest.y + 30); // write unlock text
    }
  }
}

function reload() { // if R is pressed, after a certain amount of time refill magazine

  if(reloading === true) {

    if (millis() - gun.reload < gun.reloadtime) { // reload wait time
      fill("white");
      rect(player.x - player.width * 1.1, player.y - player.height * 1.1, player.width * 2.2, player.height / 5);
      fill("green");
      noStroke();
      rect(player.x - player.width * 1.1, player.y - player.height * 1.1, (player.width * 2.2 * (millis() - gun.reload)) / gun.reloadtime, player.height / 5);
    }

    if (millis() - gun.reload > gun.reloadtime) { // fills gun with bullets
        gun.ammo = gun.magazine;
        gun.reload = millis();
        reloading = false;
    }
  }
}

function doShop() {

  room.status = "shopping" // so items dont respawn

  shopkeeper.visible = true // show shopkeeper

  if(shopItems[0].length === 0 && shopItems[1].length === 0 && shopItems[2].length === 0 ){
    for(let i = ROWS - 1; i >= 0; i--) {
      for(let k = room[i].length - 1; k >= 0; k--) {
        if(room[i][k] === 3) {

          randitem = itemTypes[Math.floor(random(0, itemTypes.length))] // picks a random item
  
          if(randitem === "heart") { // heartitem
            heart = new Sprite(cellWidth * k + cellWidth/2, cellHeight * i + heartimg.height/2, "n");
            heart.value = 5;
            heart.img = heartimg;
            shopItems[0].push(heart);
          }
  
          if (randitem === "halfheart") { // halfheart item
            halfheart = new Sprite(cellWidth * k + cellWidth/2, cellHeight * i + halfheartimg.height/2, "n");
            halfheart.value = 3;
            halfheart.img = halfheartimg;
            shopItems[1].push(halfheart);
          }

          if (randitem === "key") { // key item
            key = new Sprite(cellWidth * k + cellWidth/2, cellHeight * i + keyimg.height/2, "n");
            key.value = 4;
            key.img = keyimg;
            shopItems[2].push(key);
          }
        }
      }
    }
  }

  gatekey = new Sprite(cellWidth * 15 + cellWidth/2, cellHeight * 15 + heartimg.height/2, "n");
  gatekey.value = 7;
  gatekey.img = gatekeyimg;
  shopItems[3].push(gatekey);  

  for(let i = shopItems.length - 1; i >= 0; i--) { // show items
    for(let k = shopItems[i].length - 1; k >= 0; k--) {
      shopItems[i][k].visible = true;
    }
  }

}

function buyItems() {
  for(let i = shopItems.length - 1; i >=0; i--) {
    for(let k = shopItems[i].length - 1; k >=0; k--) {
      if(dist(player.x,  player.y, shopItems[i][k].x, shopItems[i][k].y) < 100 && shopItems[i][k].visible === true) { // if close to displayed item

        textSize(cellWidth/2); // display item cost
        textFont(font);
        text(shopItems[i][k].value, shopItems[i][k].x - cellWidth/4 + shopItems[i][k].width/4, shopItems[i][k].y - cellHeight/2);

        if(keyCode === 66 && money >= shopItems[i][k].value) { // if B is pressed and you have enough money
          money -= shopItems[i][k].value; // take away money

          if (shopItems[i][k] === heart) { // buy heart
            if (player.health !== player.healthtotal) { // only purchase if you're not at full health
              player.health += 2;
              shopItems[i][k].remove(); // get rid of item
              shopItems[i].splice(k, 1);
            }
            else {
              money += shopItems[i][k].value;
            }
          }
          
          if (shopItems[i][k] === halfheart) { // buy halfheart
            if (player.health !== player.healthtotal) { // only purchase if you're not at full health
              player.health += 1;
              shopItems[i][k].remove(); // get rid of item
              shopItems[i].splice(k, 1);
            }
            else {
              money += shopItems[i][k].value;
            }
          }

          if (shopItems[i][k] === key) { // buy key
            keys += 1
            shopItems[i][k].remove(); // get rid of item
            shopItems[i].splice(k, 1);
          }

          if (shopItems[i][k] === gatekey) { // buy gate key
            gatekeys += 1
            shopItems[i][k].remove(); // get rid of item
            shopItems[i].splice(k, 1);
          }
        }
      }
    }
  }
}

function dodgeRoll() {
  if(rolling === true) {
    if(millis() - player.rolling < player.rolltime) { // makes you invulnerable for a small while
      player.iframes2 = millis() - 970 // invulnerable
      player.moveTo(player.x + player.vel.x * 30, player.y + player.vel.y * 30, 12) // move in direction you weren't previously going in
      player.mirror.y = true; // flips sprite upside down
    }

    if(millis() - player.rolling > player.rolltime) { // end invulnerability
      rolling = false;
      player.mirror.y = false; // unflip
      player.rollcooldown = millis(); // cooldown for rolling
    }
  }
}

function startbossFight() {
  if (room.status === "boss") {
    boss = new Sprite (width/2, height/4, 300, 300, 'd');
    boss.addAni('moving', "assets/boss/bossidle/boss_moving_01.png", 2);
    boss.addAni('attack0', "assets/boss/bossattack01/boss_attack_1_01.png", 7);
    boss.addAni('attack1', "assets/boss/bossattack02/boss_attack_2_01.png", 7);
    boss.addAni('attack2', "assets/boss/bossattack03/boss_attack_3_01.png", 7);
    boss.addAni('hurt', "assets/boss/bosshurt/boss_hurt_01.png", 3);
    boss.totalhealth = 65;
    boss.health = 65;
    room.status = "boss battle";
    boss.status = "moving";
  }
}

function bossAI() { // boss movement and attack
  if(room.status === "boss battle") {
    for (let i = enemyBullets.length - 1; i >= 0; i--) { // bullets check
      if (enemyBullets[i].x > width || enemyBullets[i].x < 0 || enemyBullets[i].y > height || enemyBullets[i].y < 0) {
        enemyBullets[i].remove();
        enemyBullets.splice(i, 1);
      }
    }
    if (enemyBullets.length === 0) { // if all the bullets are gone, allow boss to move
      boss.status = "moving";
    } 

    if(boss.vel.x > 0) {
      boss.mirror.x = true;
    }
    else {
      boss.mirror.x = false;
    }

    fill("white") // boss healthbar
    rect(width/4, 20, width/2, 50);
    fill("green");
    rect(width/4, 20, width/2 / (boss.totalhealth / boss.health), 50);
    fill("red");
    text("blorbo, the mildly unpleasant", width/4 + 29 * 5, 100);

    if (boss.status === "moving") { // movement
      if (random(0, 1000) < 50 && boss.vel.x === 0) { 
        boss.ani = 'moving';
        if (boss.x - boss.width/2 < 0 || boss.x + boss.width/2 > width) { // if out of bounds
          boss.moveTo(width/2, boss.y, 3); // move to center
        }
        else {
          boss.moveTo(boss.x + 80 * (random(-3, 3)), boss.y, 3); // random movement
        }
      }
    }

    if (random(0, 1000) < 20 && boss.vel.x === 0 && boss.status !== "attacking") { // boss attacks
      boss.status = "attacking";  // prevents moving whilst attacking
      n = Math.floor(random(0, 4)) // picks which attack

      if (n === 0) { // side to side lower
        j = Math.floor(random(0,2)); // direction to shoot from
        for (let i = 0; i <= 4; i++) {
          for (let k = 0; k <= 5; k++) {
            if (j === 1) { // rightwards attack
              bossbullet = new Sprite(0 + 20 * k, height/1.4 - 50 * i, 10);
            }
            else { // leftwards
              bossbullet = new Sprite(width - 20 * k, height/1.4 - 50 * i, 10);
            }
            bossbullet.overlaps(player)
            bossbullet.overlaps(boss) // bullet doesnt collide with player
            bossbullet.image = pistolbulletimage
      
            bossbullet.collider = "k"
            bossbullet.strength = 1;
            bossbullet.speed = 7

            if (j === 1) { // rightwards attack
              bossbullet.moveTo(width + 10, bossbullet.y); // move to edge of screen 
            } 
            else { // leftwards attack
              bossbullet.moveTo(-10, bossbullet.y);
            }

            enemyBullets.push(bossbullet) 
          }   
        }
      }

      if (n === 1) { // side to side higher
        j = Math.floor(random(0,2)); // direction to shoot from
        for (let i = 0; i <= 4; i++) {
          for (let k = 0; k <= 5; k++) {
            if (j === 1) { // rightwards attack
              bossbullet = new Sprite(0 + 20 * k, height/1.2 - 50 * i, 10);
            }
            else { // leftwards
              bossbullet = new Sprite(width - 20 * k, height/1.2 - 50 * i, 10);
            }
            bossbullet.overlaps(player)
            bossbullet.overlaps(boss) // bullet doesnt collide with player
            bossbullet.image = pistolbulletimage
      
            bossbullet.collider = "k"
            bossbullet.strength = 1;
            bossbullet.speed = 7

            if (j === 1) { // rightwards attack
              boss.ani = 'attack0'
              boss.ani.frameDelay = 10
              bossbullet.moveTo(width + 10, bossbullet.y); // move to edge of screen 
            } 
            else { // leftwards attack
              boss.ani = 'attack1'
              boss.ani.frameDelay = 10
              bossbullet.moveTo(-10, bossbullet.y);
            }

            enemyBullets.push(bossbullet) 
          }   
        }
      }

      if(n === 2) { // top down left side
        boss.ani = 'attack2'
        boss.ani.frameDelay = 10
        for (let i = 0; i <= 8; i++) {
          for (let k = 0; k <= 6; k++) {
            bossbullet = new Sprite(width/3 - 50 * i, 0 - 30 * k, 10);
  
            bossbullet.overlaps(player); // bullet doesnt collide with player
            bossbullet.overlaps(boss);
            bossbullet.image = pistolbulletimage;
      
            bossbullet.collider = "k";
            bossbullet.strength = 1;
            bossbullet.speed = 7;
      
            bossbullet.moveTo(bossbullet.x, height + 10); // dividing by distance from mouse to keep speed constant   
            enemyBullets.push(bossbullet);   
          }   
        }
      }

      if(n === 3) { // top down right side
        boss.ani = 'attack2'  
        boss.ani.frameDelay = 10
        for (let i = 0; i <= 8; i++) {
          for (let k = 0; k <= 6; k++) {
            bossbullet = new Sprite(width/1.5 - 50 * i, 0 - 30 * k, 10);
  
            bossbullet.overlaps(player) ;
            bossbullet.overlaps(boss);
            bossbullet.image = pistolbulletimage;
      
            bossbullet.collider = "k";
            bossbullet.strength = 1;
            bossbullet.speed = 7;
      
            bossbullet.moveTo(bossbullet.x, height + 10); 
            enemyBullets.push(bossbullet); 
          }   
        }
      }
    }
  }
}

function checkState() {
  if(gamestate === "main") { // draw main menu
    fill(41, 30, 49);
    rect(0, 0, width, height);
    image(logo, width/2 - logo.width/2, height/10);
    makeButton(width/2 - 100, height/1.5, 200, 50, (75, 49, 68), (61, 44, 62), 20, "start", "game");
    makeButton(width/2 - 100, height/1.3, 200, 50, (75, 49, 68), (61, 44, 62), 20, "controls", "controls");
  }

  if(gamestate === "controls") { // controls menu
    fill(41, 30, 49);
    rect(0, 0, width, height);
    fill(75, 49, 68);
    rect(width/2 - 300, height/5, 600, 700);
    makeButton(width/2 - 300, height/1.2, 50, 50, (75, 49, 68), (61, 44, 62), 20, "<-", "main");
    textSize(40);
    fill("white");
    text("W - Move Up", width/2 - 290, height/5 + 40);
    text("A - Move Left", width/2 - 290, height/5 + 80);
    text("S - Move Down", width/2 - 290, height/5 + 120);
    text("D - Move Right", width/2 - 290, height/5 + 160);
    text("E - Dodge Roll", width/2 - 290, height/5 + 200);
    text("R - Reload", width/2 - 290, height/5 + 240);
    text("B - Buy Items", width/2 - 290, height/5 + 280);
    text("Q - Unlock", width/2 - 290, height/5 + 320);
    text("Scroll - Change Gun", width/2 - 290, height/5 + 360);
    textSize(20);
    text("Dodge Rolling: If you ever find yourself about to hit an", width/2 - 290, height/5 + 400);
    text("enemy or projectile, dodge through it!", width/2 - 290, height/5 + 440);
    text("Gun Change: If you open a chest and find a gun in it,", width/2 - 290, height/5 + 480);
    text("scroll to switch guns!", width/2 - 290, height/5 + 520);
  }

  if(gamestate === "win") { // controls menu
    fill(41, 30, 49);
    rect(0, 0, width, height);
    player.visible = false;
    gun.visible = false;
    fill("white");
    text("you did it! cool", width/2, height/2);
  }

  if(gamestate === "lose") { // loss menu
    fill(41, 30, 49);
    rect(0, 0, width, height);
    player.visible = false;
    gun.visible = false;
    fill("white");
    text("wah wah, refresh?", width/2, height/2);
  }
}

function makeButton(x, y, width, height, rectcolor, textcolor, textsize, textc, statechange){ // flag game code, draws rectangle with text
  if (mouseIn(x, x + width, y, y + height)){ // darkens rectangle if mouse is in
    rectcolor = "purple"
    if(mouseIsPressed) {
      gamestate = statechange;
    }
  }
  
  if (!mouseIn(x, x + width, y, y + height)){ // lightens rectangle if mouse is out
    rectcolor = (75, 49, 68);
  }
  
  fill(rectcolor);
  rect(x, y, width, height); // draws rect
  
  fill(textcolor);
  textSize(textsize);
  text(textc, x + (textc.length * textsize)/2, y + textsize); //writes text
  }

function mouseIn(left, right, top, bottom){ // flag game code, button parameter function
  return mouseX >= left && mouseX <= right && 
  mouseY >= top && mouseY <= bottom;
}

function chestOpen() {
  n = Math.floor(random(0, guns.length));
  playerguns.push(guns[n]);
  guns.splice(n, 1);
  chest.remove();
  theChests = []
}