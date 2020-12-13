var towerimg, tower;
var ghost, ghostimg;
var invisibleblock;
var gameState = "play";

function preload(){
  
spookySound = loadSound("spooky.wav");
  
  climbersGroup = new Group();
  doorsGroup = new Group();
  invisibleblockGroup = new Group();
  
  towerimg = loadImage("tower.png");
  doorimg = loadImage("door.png");
  climberimg = loadImage("climber.png");
  ghostimg = loadImage("ghost-standing.png")
}

function setup(){
  
  createCanvas(600, 600);
  
 spookySound.loop();
  
  
  tower = createSprite(300, 300);
  tower.addImage("tower", towerimg);
  tower.velocityY = 1;
  
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghostimg);
  //ghost.velocityY = 2;
  ghost.scale = 0.3;
}

function draw(){
  background("white");
  
  if(gameState === "play"){
    
  
  if(tower.y > 400){
    tower.y = 300;
    
  }
  
  if(keyDown(LEFT_ARROW)){
    ghost.x = ghost.x - 2;
  }
  
   if(keyDown(RIGHT_ARROW)){
    ghost.x = ghost.x + 2;
  }
  
  if(keyDown("SPACE")){
    ghost.velocityY = -3;
  }
  
  ghost.velocityY = ghost.velocityY + 0.5;
  
 if(climbersGroup.isTouching(ghost)){
   ghost.velocityY = 0;
 }
  
  if(invisibleblockGroup.isTouching(ghost) ||     ghost.y > 600){
    ghost.destroy(); 
    gameState = "end";
  }
  
  spawnDoors();
  
  
  drawSprites();
  }
  
  if(gameState === "end"){
     stroke("yellow");
    fill("yellow");
    textSize(40);
    text("GameOver", 200, 250);
  }
}

function spawnDoors(){
  
  if (frameCount % 240 === 0) {
  var doors = createSprite(200,-50);
    doors.velocityY = 1;
    doors.lifetime = 800;
    doors.addImage(doorimg);
    doors.x = random(120, 400);
    doorsGroup.add(doors);
     doors.depth = ghost.depth;
     ghost.depth = ghost.depth + 1;
    
    var climber = createSprite(210);
    climber.velocityY = 1;
    climber.lifetime = 800;
    climber.addImage(climberimg);
    climbersGroup.add(climber);
    climber.x = doors.x;
    
     invisibleblock = createSprite(200, 15);
    invisibleblockGroup.add(invisibleblock);
  invisibleblock.width = climber.width;
    invisibleblock.height = 5;
    invisibleblock.x = doors.x;
    invisibleblock.velocityY = 1;
  }
}