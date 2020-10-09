var towerImage, tower;
var doorImage, door, doorGroup;
var climberImage, climber, climberGroup;
var ghostImage, ghost;
var spookySound;
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600, 600);
  
  tower = createSprite(300, 300);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  
  ghost = createSprite(300, 100, 50, 50);
  ghost.scale = 0.5;
  ghost.addImage(ghostImage);
  
  doorGroup = new Group();
  climberGroup = new Group();
}

function draw(){
  background(0);
  
  if(gameState === 1){
    spookySound.loop();
    spawnDoor();
    
    if(tower.y > 600){
    tower.y = 300;
  }
  
  if(keyDown("left")){
    ghost.x = ghost.x - 3;
  }
  
  if(keyDown("right")){
    ghost.x = ghost.x + 3;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -3;
  }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(ghost.isTouching(climberGroup) || ghost.y > 600){
    ghost.destroy();
    gameState = 0;
  }
  } 
  
  else if(gameState === 0){
    stroke("yellow");
    textSize(30);
    //fill("yellow");
    text("Game Over", 270, 300);
  }
  
  drawSprites();
}

function spawnDoor(){
  if(frameCount % 240 === 0){
    door = createSprite(50, -50);
    door.addImage(doorImage);
    door.x = Math.round(random(100, 400));
    door.velocityY = 1;
    door.lifeTime = 650;
    doorGroup.add(door);
    climber = createSprite(50, 10);
    climber.addImage(climberImage);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifeTime = 650;
    climberGroup.add(climber);
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
  }
  
  
}
