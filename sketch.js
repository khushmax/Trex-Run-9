//CREATING VARIABLES
var trex, trex_running, trex_collide;
var ground, invisibleground, ground_image;
var cloud, cloudImg;
var cactus, cactusImg1, cactusImg2, cactusImg3, cactusImg4, cactusImg5, cactusImg6;
var cloudsGroup, cactusGroup;
var over, gameOverImg;
var restart, restartImg;

var soundjump, sounddie, soundpoint;

var score;

var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var message = "hi i am Khush";


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collide = loadAnimation("trex_collided.png");
  ground_image = loadImage("ground2.png");
  cloudImg = loadImage("cloud.png");
  cactusImg1 = loadImage("obstacle1.png");
  cactusImg2 = loadImage("obstacle2.png");
  cactusImg3 = loadImage("obstacle3.png");
  cactusImg4 = loadImage("obstacle4.png");
  cactusImg5 = loadImage("obstacle5.png");
  cactusImg6 = loadImage("obstacle6.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

  soundjump = loadSound("jump.mp3");
  sounddie = loadSound("die.mp3");
  soundpoint = loadSound("checkPoint.mp3");
}


function setup() {
  //CREATING THE CANVAS
  createCanvas(600, 200);

  //CREATING GROUPS
  cactusGroup = new Group();
  cloudsGroup = new Group();

  //CREATING A GROUND SPRITE
  ground = createSprite(300, 180, 600, 5);
  ground.addImage("ground9", ground_image);

  score = 0;

  //create a trex sprite
  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collide9", trex_collide);
  trex.scale = 0.5;

  //CREATING A INVISIBLEGROUND SPRITE
  invisibleground = createSprite(300, 190, 600, 5);
  invisibleground.visible = false;

  //PUTTING A OVER IMAGE
  over = createSprite(300, 70, 30, 30);
  over.addAnimation("over9", gameOverImg);
  over.scale = 0.5

  //PUTTING A RESTART IMAGE
  restart = createSprite(300, 100, 30, 30);
  restart.addAnimation("restart9", restartImg);
  restart.scale = 0.5

  //SETTING OF THE COLLIDER
  trex.debug = false;
  trex.setCollider("circle", 0, 0, 40);

}

function draw() {

  //CREATING A BACKGROUND
  background("white");

  //PUTTING SCORE
  text("high Score:" + score, 450, 50);

  if (gamestate === PLAY) {
    ground.velocityX = -(3 + 3*score/100);

    score = score + Math.round(getFrameRate() / 60);

    if ((score % 100 === 0) && score > 0) {
      soundpoint.play();
    }
    
    

    //MAKING THE TREX JUMP
    if (keyDown("space") && trex.y > 150) {
      trex.velocityY = -10;
      soundjump.play();
    }

    //GIVING THE GRAVITY
    trex.velocityY = trex.velocityY + 0.5;

    //INFINITE SCROLLING
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    spawnclouds();
    spawncactus();


    console.log(message);

    over.visible = false;
    restart.visible = false;

    //FINISHING THE GAME
    if (cactusGroup.isTouching(trex)) {
      gamestate = END;
      sounddie.play();
    }

  } else
  if (gamestate === END) {
    trex.changeAnimation("collide9", trex_collide);
    ground.velocityX = 0;
    cactusGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    trex.velocityY =0;

    cactusGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);

    over.visible = true;
    restart.visible = true;

    if (mousePressedOver(restart)) {
      replay9();
    }

  }


  trex.collide(invisibleground);
  drawSprites();

}

function spawnclouds() {

  //CREATING THE CLOUDS ON EVERY 60 FRAME
  if (frameCount % 60 === 0) {

    //CREATING CLOUDS SPRITE
    cloud = createSprite(600, 40, 20, 20);
    cloud.addImage("cloud9", cloudImg);
    cloud.scale = 0.7
    cloud.velocityX = -(3 + 3*score/100);
    cloud.y = (Math.round(random(40, 100)));

    console.log(getFrameRate());

    //INCREASING THE DEPTH OF THE TREX
    trex.depth = cloud.depth;
    trex.depth = trex.depth + 1;

    //GIVING THE LIFETIME
    cloud.lifetime = 200;

    cloudsGroup.add(cloud);

  }
}

function spawncactus() {
  if (frameCount % 60 === 0) {
    cactus = createSprite(600, 160, 20, 20);
    cactus.velocityX = -(3 + 3*score/100);;

    var rand = Math.round(random(1, 6));

    switch (rand) {
      case 1:
        cactus.addImage("cactus1", cactusImg1);
        break;

      case 2:
        cactus.addImage("cactus2", cactusImg2);
        break;

      case 3:
        cactus.addImage("cactus3", cactusImg3);
        break;

      case 4:
        cactus.addImage("cactus4", cactusImg4);
        break;

      case 5:
        cactus.addImage("cactus5", cactusImg5);
        break;

      case 6:
        cactus.addImage("cactus6", cactusImg6);
      default:
        break;
    }
    cactus.scale = 0.5;
    cactus.lifetime = 200;
    cactusGroup.add(cactus);

  }

}

function replay9() {
  score = 0;
  cactusGroup.destroyEach();
  cloudsGroup.destroyEach();
  restart.visible = false;
  over.visible = false;
  gamestate = PLAY;
  trex.changeAnimation("running", trex_running);
}