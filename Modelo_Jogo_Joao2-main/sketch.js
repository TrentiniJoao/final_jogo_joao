var canvas;
var backgroundImage, car1_img, car2_img,car3_img,car4_img, track;
var fuelImage, powerCoinImage, lifeImage;
var obstacle1Image, obstacle2Image;
var gameState = 0;
var form, player, playerCount;
var car1, boot, fuels, powerCoins, obstacles;
var blastImage;
var score = 0;

var intro, pista, bkImg;
var leftInv,rightInv;
var bordas;
var bootGroup, goldGroup;
var gold, reiniciar, fimDoJogo,imagemFimDoJogo, imagemReiniciar;


function preload() {
  backgroundImage = loadImage("assets/planodefundo.png");
  bkImg = loadImage("assets/back.jpg");
  car1_img = loadImage("assets/car1.png");
  car2_img = loadImage("assets/car2.png");
  car3_img = loadImage("assets/car3.png");
  car4_img = loadImage("assets/car4.png");
  track = loadImage("assets/pist.png");
  fuelImage = loadImage("assets/fuel.png");
  powerCoinImage = loadImage("assets/goldCoin.png");
  obstacle1Image = loadImage("assets/obstacle1.png");
  obstacle2Image = loadImage("assets/obstacle2.png");
  lifeImage = loadImage("assets/life.png");
  blastImage = loadImage("assets/blast.png");
  imagemFimDoJogo= loadImage("assets/fimDoJogocor.png");
  imagemReiniciar= loadImage("assets/reiniciarcor.png");
  
}

function setup() {
  canvas = createCanvas(500,930);
 
  //cria Pista
  pista = createSprite(250,250,600,20);
  //adiciona imagem de Pista
  pista.addImage("pista", track)
  pista.y = width/2;
  pista.scale = 2.0;

  leftInv = createSprite(50,400,150,1200)
  leftInv.visible = false;
  rightInv = createSprite(450,400,200,1200)
  rightInv.visible = false;

  player = createSprite(width/2,camera.position.y+500,400,20);
  player.addImage("player",car1_img);
  player.scale=0.07
  
  bordas = createEdgeSprites();

  bootGroup = createGroup();
  goldGroup = createGroup();

  fimDoJogo = createSprite(width/2,height/2-20,400,20);
  fimDoJogo.addImage(imagemFimDoJogo);

  reiniciar = createSprite(width/2,height/2+20);
  reiniciar.addImage(imagemReiniciar);

  fimDoJogo.scale = 0.5;
  fimDoJogo.depth = fimDoJogo.depth+100
  reiniciar.scale = 0.07;
  reiniciar.depth = reiniciar.depth+100
  fimDoJogo.visible = false;
  reiniciar.visible = false;
  
}

function draw() {
  background(bkImg);
  
  if (gameState === 0) {
    
    
    //image(bkImg, 0, -height, width, height);
    pista.velocityY = 4;

    if (pista.y>900){
      pista.y=height/2;
    }

    if(keyDown(UP_ARROW)) {
      player.y=player.y - 5;
    }
    if(keyDown(DOWN_ARROW)) {
      player.y=player.y + 5;
    }
    if(keyDown(RIGHT_ARROW)) {
      player.x = player.x + 5;
    }
    if(keyDown(LEFT_ARROW)) {
      player.x = player.x - 5;
    }

    if (player.collide(leftInv)||player.collide(rightInv)||player.isTouching(bordas)) {
      player.y = 800;
    }
    
    if(player.overlap(goldGroup)){
      score = score + 5;
      gold.remove();
      
            
    }

    if(bootGroup.isTouching(player)){
      gameState = 1;
      
            
    }

    bootGame();
    coin();
    

  } else if (gameState === 1) {

    pista.velocityY = 0;  
    bootGroup.setVelocityYEach(0);

    fimDoJogo.visible = true;
    reiniciar.visible = true;

    if(mousePressedOver(reiniciar)){
      reinicie();     
    }   
  }

  drawSprites();

  fill('black');
  textSize(20);
  text("Pontuação: "+ score,180,50);
}



function bootGame() {
  if (frameCount % 120 === 0) {
    boot = createSprite(random(200,300), random(height - 100,height + 100));
    //boot.addImage("car1", car2_img);
   
    boot.scale = 0.07;
    //boot.addImage("blast", blastImage);
    boot.velocity.y = -4;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: boot.addImage(car2_img);
              break;
      case 2: boot.addImage(car3_img);
              boot.scale = 0.9;
              break;
      case 3: boot.addImage(car4_img);
              boot.scale = 0.9;
              break;
      default: break;
    }

    bootGroup.add(boot);
  }  
}

function coin() {
  if (frameCount % 70 === 0) {
    gold = createSprite(random(200,300), random(height - 100,height + 100));   
    gold.scale = 0.07;
    gold.velocity.y = -5;
    gold.addImage(powerCoinImage)
    
    

    goldGroup.add(gold);
  }  
}

function reinicie(){
  gameState = 0;
  fimDoJogo.visible = false;
  reiniciar.visible = false;
  
  bootGroup.destroyEach();
  goldGroup.destroyEach();
  
  score = 0;
}
