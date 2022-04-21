var road_img;
var coin_img,coin;
var car_img;
var nitro_img;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var alien_img;
var score=0

function preload() {

  //pre-load images
  road_img = loadImage("road.png");
  coin_img = loadImage("coin.png");
  car_img = loadImage("tractor.png");
  nitro_img = loadImage("nitro.png");
  alien_img = loadImage("alien.png");
}

function setup() {
  createCanvas(400, 400);
  //create sprites here
  

  road = createSprite(400, 350, 200, 200);
  road.addImage("road", road_img);
  road.scale = 1;

  car = createSprite(350, 270, 10, 10);
  car.addImage("car", car_img);
  car.scale = 0.1;

  //create coinGroup,nitroGroup and alienGroup
  coinGroup = new Group();
  nitroGroup = new Group();
  alienGroup = new Group();

 
  
}

function draw() {
  background(0);
  textSize(20);
  text("score: "+ score,10,30); 
 
  // creating wall1 and wall2
  var wall1 = createSprite(200, 105, 400, 8);
  var wall2 = createSprite(200, 395, 400, 5);

  //colliding car to wall1 and wall2
  car.collide(wall1);
  car.collide(wall2);

  //giving color to wall1 and wall2
  wall1.shapeColor = "skyBlue";
  wall2.shapeColor = "skyBlue";


  if (gameState === PLAY) {

    // giving car controls for up & down
    if (keyDown("w")) {
      car.y = car.y - 7;
    }

    if (keyDown("s")) {
      car.y = car.y + 7;
    }
    // creating coins,nitro and alien
    spawn_coin();
    spawn_nitro();
    spawn_alien();



    //moving road 
    road.velocityX = -4;

    // moving road in an infinite loop 
    if(road.x < 400 ){
      road.x = road.width/2;
    }
    
    if(coinGroup.isTouching(car)){
      coinGroup.destroyEach();
  
    }
    if(nitroGroup.isTouching(car)){
      nitroGroup.destroyEach();
      
    }
    if(alienGroup.isTouching(car)){
      alienGroup.destroyEach();
      road.velocityX= 0;
      car.velocityY= 0;
    }
    
    if(alienGroup.isTouching(car)){
      gameState = END;
    }

    if(gameState === END){
    car.velocityY=0;
    road.velocityX= 0;
    }
  
  drawSprites();}
  
  


function spawn_coin() {

  if (frameCount % 100 === 0) {
    
    coin = createSprite(1, 300, 10, 10);
    coin.addImage("coin", coin_img);
    coin.scale = 0.01;
    coin.y = Math.round(random(300, 200));
    coin.velocityX = 4;

    //add each coin to the group 
    coinGroup.add(coin);
    

  }


}

function spawn_nitro(){
if(frameCount % 160 === 0) {

  nitro = createSprite(1, 200, 10, 10);
  nitro.addImage("nitro", nitro_img);
  nitro.scale = 0.08;
  nitro.y = Math.round(random(150,350));
  nitro.velocityX = 6;
 
  //add each nitro to the group    
  nitroGroup.add(nitro);
    
}
}



function spawn_alien(){
  if(frameCount % 80 === 0){
     alien = createSprite(1,350,10,10);
     alien.addImage("alien",alien_img);
     alien.scale=0.05;
     alien.y = Math.round(random(150,370));
     alien.velocityX = 9
    //add each alien to the group     
   alienGroup.add(alien);   
  }
  }
}
   

