// RONNIE SAINI
var adventureManager;
var playerSprite;
var playerAnimation;
var clickablesManager;    
var clickables;           

const playGameIndex = 0;


function preload() {
  clickablesManager = new ClickableManager('data/clickableLayout.csv');
  adventureManager = new AdventureManager('data/adventureStates.csv', 'data/interactionTable.csv', 'data/clickableLayout.csv');
}


function setup() {
  createCanvas(1280, 720);

  clickables = clickablesManager.setup();

  playerSprite = createSprite(width/2, height/2, 80, 80);

  playerSprite.addAnimation('regular', loadAnimation('assets/avatars/t1.png', 'assets/avatars/t3.png'));
  
  adventureManager.setPlayerSprite(playerSprite);

  adventureManager.setClickableManager(clickablesManager);

  adventureManager.setup();

  setupClickables(); 
}


function draw() {

  adventureManager.draw();

  clickablesManager.draw();

  if( adventureManager.getStateName() !== "Splash" && 
      adventureManager.getStateName() !== "Instructions" ) {
      
    moveSprite();

    drawSprite(playerSprite);
  } 
}


function keyPressed() {

  if( key === 'f') {
    fs = fullscreen();
    fullscreen(!fs);
    return;
  }

  adventureManager.keyPressed(key); 
}

function mouseReleased() {
  adventureManager.mouseReleased();
}

function moveSprite() {
  if(keyIsDown(RIGHT_ARROW))
    playerSprite.velocity.x = 10;
  else if(keyIsDown(LEFT_ARROW))
    playerSprite.velocity.x = -10;
  else
    playerSprite.velocity.x = 0;

  if(keyIsDown(DOWN_ARROW))
    playerSprite.velocity.y = 10;
  else if(keyIsDown(UP_ARROW))
    playerSprite.velocity.y = -10;
  else
    playerSprite.velocity.y = 0;
}


function setupClickables() {
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;
    clickables[i].onPress = clickableButtonPressed;
  }
}

clickableButtonHover = function () {
  this.color = "#AA33AA";
  this.noTint = false;
  this.tint = "#FF0000";
}

clickableButtonOnOutside = function () {
  this.color = "#AAAAAA";
}

clickableButtonPressed = function() {
  adventureManager.clickablePressed(this.name); 
}

class InstructionsScreen extends PNGRoom {
  preload() {
    this.textBoxWidth = (width/6)*4;
    this.textBoxHeight = (height/6)*4; 
    this.instructionsText = "Use Arrow keys to move around ";
  }

  draw() {
    tint(128);
    super.draw();
    fill(255);
    textAlign(CENTER);
    textSize(30);
    text(this.instructionsText, width/6, height/6, this.textBoxWidth, this.textBoxHeight );
  }
}

