var man,manShooting,manAnim;
var bgImg,vImg,bgImg,bulletImg,bulletSound;
var bulletGrp,VirusGrp,maskGrp;
var gameState = "PLAY";
var score = 500;

var Score = 300;



 function preload(){

    manAnim = loadAnimation("JK_P_Gun__Idle_000.png","JK_P_Gun__Idle_001.png","JK_P_Gun__Idle_002.png","JK_P_Gun__Idle_003.png","JK_P_Gun__Idle_004.png","JK_P_Gun__Idle_005.png","JK_P_Gun__Idle_006.png","JK_P_Gun__Idle_007.png","JK_P_Gun__Idle_008.png","JK_P_Gun__Idle_009.png");
    manShoot = loadAnimation("JK_P_Gun__Attack_000.png","JK_P_Gun__Attack_001.png","JK_P_Gun__Attack_002.png","JK_P_Gun__Attack_003.png","JK_P_Gun__Attack_004.png","JK_P_Gun__Attack_005.png","JK_P_Gun__Attack_006.png","JK_P_Gun__Attack_007.png","JK_P_Gun__Attack_008.png","JK_P_Gun__Attack_009.png");
    manDie  = loadImage("JK_P__Die_009.png")
    bgImg = loadImage("road2.png");
    vImg = loadImage("v.png");
    maskImg= loadImage("mask.png");
    bulletImg = loadImage("bullet-8471.png");
    bulletSound = loadSound("bullet.mp3");
    numImg = loadImage("num.png");
    HandSImg = loadImage("hand.png");
    gamovrImg = loadImage("gameovr.png");
    restartImg = loadImage("restart.png");

}

function setup() {
    createCanvas(1200, 700);
    
    bulletGrp = new Group();
    VirusGrp  = new Group();
    maskGrp   = new Group();
    handGrp = new  Group();

    man = createSprite(100,height-170,50,50);
    man.addAnimation("idle",manAnim);
    man.addAnimation("shooying",manShoot);
    man.addAnimation("Die",manDie);
    man.addAnimation("Die",manDie);
    man.scale = 0.3;

    wall = createSprite(10,350,2,700);
    wall.visible = false;

    gameover = createSprite(600,350,20,20);
    gameover.addImage(gamovrImg);

    restart = createSprite(600,450,20,20);
    restart.addImage(restartImg);
    restart.scale = 0.05;
    
}

function draw() {
    
    background(bgImg);
    virus();
    mask();
    hand()

    man.velocityY = 0;

    if(gameState=="PLAY"){

  restart.visible = false;
  gameover.visible = false;
    if(keyWentDown("Space")){
    man.changeAnimation("shooying",manShoot);
    bulletSound.play();
    shoot();
    }else{
    man.changeAnimation("idle",manAnim);
    }

    if(keyDown("UP_ARROW")){
    man.velocityY = -10
    }

    if(keyDown("DOWN_ARROW")){
    man.velocityY = 10
    }

    if(bulletGrp.isTouching(VirusGrp)){
    bulletGrp.destroyEach();
    Score = Score-20;
    VirusGrp.destroyEach();
    }

    if(bulletGrp.isTouching(maskGrp)){
        bulletGrp.destroyEach();
        maskGrp.destroyEach();
        }

     if(VirusGrp.isTouching(man)){
         VirusGrp.destroyEach();
         number = createSprite(600,350,20,20);
         number.addImage(numImg);
         number.scale = 0.05;
         number.velocityY = 10;
         score = score-250;
     }
      

    if(VirusGrp.isTouching(wall)){
        number = createSprite(600,350,20,20);
        number.addImage(numImg);
        number.scale = 0.05;
        number.velocityY = 10;
        Score = Score-8;
        VirusGrp.destroyEach();
    }

    if(maskGrp.isTouching(wall)){
        maskGrp.destroyEach();
    }

    if(maskGrp.isTouching(man)){
        maskGrp.destroyEach();
        score = score+10;
    }

    if(handGrp.isTouching(man)){
        handGrp.destroyEach();
        score = score+10;
    }

    if(score<1){
        gameState = "End";
    }

} 
if(gameState==="End"){
    
 man.changeAnimation("Die",manDie);
 bulletGrp.destroyEach(); 
    VirusGrp.destroyEach();
    maskGrp.destroyEach();
    handGrp.destroyEach();
   

    restart.visible = true;
    gameover.visible = true;

    if(mousePressedOver(restart)){
        reset();

}
}

    drawSprites();
    textSize(20);
    fill("yellow");
    stroke(20);
    textFont('Helvetica');
    text("Health :"+score,1000,120)

  
} 

function virus(){

    if (frameCount % 150 === 0){
    var virus = createSprite(1250,600,40,10);
    virus.y = Math.round(random(0,700));
    virus.addImage(vImg);
    VirusGrp.add(virus);
    virus.scale = 0.041;
    virus.velocityX = -15;
    }

}

function mask(){
    if (frameCount % 260 === 0) {
    var mask = createSprite(1250,600,40,10);
   mask.y = Math.round(random(0,700));
    mask.addImage(maskImg);
    maskGrp.add(mask);
    mask.scale = 0.02;
    mask.velocityX = -8;
    }
    
}

function shoot(){
    bullet = createSprite(man.x+80,man.y+27);
    bullet.addImage(bulletImg);
    bullet.scale = 0.035;
    bullet.velocityX = 60;
    bulletGrp.add(bullet);
}


function hand(){
    if (frameCount % 180 === 0) {
    var HandS = createSprite(1250,600,40,10);
    HandS.y = Math.round(random(0,700));
    HandS.addImage(HandSImg);
    handGrp.add(HandS);
    HandS.scale = 0.1;
    HandS.velocityX = -10;
    }
    
}

function reset(){
    gameState = "PLAY";
    score = 500;
    
    man.changeAnimation("idle",manAnim)
    gameover.destroy();        
    restart.destroy();
}
