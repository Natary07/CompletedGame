var lumberjack, bg, bgImg;
var logGroup,foxGroup;
var log,logImg, fox, foxImg, running, standing;
var gameOver,reset,resetImg, startbg;
var PLAY = 1;
var END = 0;
var START = 2
var gameState = START;
var score = 0
var highScore=0
function preload(){
  bgImg=loadImage("Road+Forest.jpeg");
  standing = loadAnimation("Standing.png");
  running = loadAnimation("Running1.png","Running2.png","Running3.png","Running4.png","Running5.png","Running6.png","Running7.png","Running8.png")
  foxImg=loadAnimation("fox1.png","fox2.png","fox3.png");
  logImg= loadImage("Log.png");
  gameOver = loadImage("GameOver.png");
  resetImg = loadImage("Reset.png");
  startbg = loadImage("start.jpg");
 
}

function setup(){
  createCanvas(400,500)
  
  bg = createSprite(200,0,400,500)
  bg.addImage(bgImg)
  bg.velocityY=2;
  bg.scale=1
  
  running.frameDelay=2
  lumberjack = createSprite(200,350,40,40);
  lumberjack.addAnimation("running", running);
  lumberjack.addAnimation("stand", standing);
  lumberjack.shapeColor="orange";
  lumberjack.scale=1
  
  
  reset = createSprite(170,250);
  reset.addImage(resetImg)
  reset.scale=0.15
  reset.visible=false
  
  logGroup = new Group();
  foxGroup = new Group();
}
function draw(){
 
  background(startbg);
  if(bg.y>400){
    bg.y=200;
  }
  
  camera.position.x=lumberjack.position.x
  if(gameState===START){
    textSize(28);
    fill("black");
    textStyle(BOLD)
    textFont("algerian")
   
    text("Help the Lumberjack!",70,150)
    textSize(20);
    text("Use Left and Right Arrow keys to move\nthe lumberjack left and right.\nUse your Up and Down arrow keys to\nzoom in and out of your game.",35,180)
    text("Press Spacebar to start the game!",55,460);
    
    if(keyDown("space")){
      gameState = 1;
    }
}
  if(gameState===PLAY){
    if(logGroup.isTouching(lumberjack)){
     score=score+1
      logGroup[0].destroy();
    
    }
    //console.log(camera.zoom)
    
  if(keyDown("RIGHT_ARROW")){
    lumberjack.x=lumberjack.x+3
  }
  if(keyDown("LEFT_ARROW")){
    lumberjack.x=lumberjack.x-3
  }
  if(keyDown("UP_ARROW")&& camera.zoom<=1.5){
    camera.zoom=camera.zoom+0.1
  }
    if(keyDown("DOWN_ARROW")&& camera.zoom>=0.5){
    camera.zoom=camera.zoom-0.1
  }
    if(lumberjack.position.x<50){
      lumberjack.position.x=50
    }
    if(lumberjack.position.x>300){
      lumberjack.position.x=300
    }
 if(foxGroup.isTouching(lumberjack)){
        gameState = END;
    }
    
    spawnLog();
    spawnFox();
    drawSprites();
  }
  else if(gameState===END){
    logGroup.destroyEach();
    foxGroup.destroyEach();
    bg.velocityY=0;
    lumberjack.changeAnimation("stand",standing);
    reset.visible=true
    drawSprites();
    image(gameOver,50,70,250,150);
    camera.zoom=1;
    if(mousePressedOver(reset)){
      restart();
    }
    
    if(score>highScore){
      highScore=score
    }
  }
  
  
  

  fill("black")
  stroke("black")
  textSize(17);
  text("Score: "+ score, 160,50);
  textSize(20);
  text("High Score: "+ highScore,120,20)

}

function spawnLog(){
  if(frameCount % 150 === 0){
    log = createSprite(120,0,20,20)
    log.addImage(logImg);
    log.x = Math.round(random(100,300));
    log.velocityY=3
    log.scale=0.05
    
    logGroup.add(log);
  }

}

function spawnFox(){
  if(frameCount % 100 === 0){
    fox = createSprite(150,0,20,20)
    fox.addAnimation("run", foxImg)
    fox.x = Math.round(random(100,300))
    fox.velocityY=4
    fox.scale=1.2
    //fox.shapeColor="green"
    
    fox.lifetime = 600
    
    foxGroup.add(fox);
  }
}

function restart(){
  gameState = PLAY
  lumberjack.changeAnimation("running",running);
  bg.velocityY=1;
  reset.visible=false
  score = 0
  camera.zoom=1;
}
