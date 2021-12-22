var PLAY = 1;
var END = 0;
var gameState = PLAY;

var r;
var beaver;
var logs;
var peanut;
var bg;
var invisibleGround;

var jumpSound;
var dieSound;

var gameOver, gameOver_Image;
var restart, restart_Image;

function preload() {
    beaverImage = loadImage("beaver.gif");
    bgImage = loadImage("bg.gif");
    logsImage = loadImage("log.gif");
    peanutImage = loadImage("peanut.gif");

    dieSound = loadSound("die.mp3");
    jumpSound = loadSound("jump.mp3");

    gameOver_Image = loadImage("gameOver.png");
    restart_Image = loadImage("restart.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    beaver = createSprite(50, 180, 10, 40);
    beaver.addImage("moving", beaverImage);
    beaver.setCollider('circle', 0, 0, 350);
    beaver.scale = 0.5;

    bg = createSprite(300, 195, 400, 20);
    bg.addImage("bg", bgImage);
    bg.velocityX = -5;
    bg.x = width / 2
    
    invisibleGround = createSprite(50, 210, 200, 20);
    invisibleGround.visible = false;

    gameOver = createSprite(300, 80, 10, 10);
    gameOver.addImage(gameOver_Image);
    gameOver.scale = 0.5;

    restart = createSprite(300, 100, 10, 10);
    restart.addImage(restart_Image);
    restart.scale = 0.5;

    r = Math.round(0, 5);
    console.log(r);

    score = 0;
}

function draw() {

    textSize(20);
    fill("lightgreen");
    text("Score=" + score, 500, 50);

    if (gameState === PLAY) {
        gameOver.visible = false;
        restart.visible = false;

        if (bg.x < 0) {
            bg.x = bg.width / 2;
        }

        if (keyDown("UP") && beaver.y > 150) {
            beaver.velocityY = -10;
            jumpSound.play();
        }

         if (beaver.isTouching(peanut)) {
            peanut.destroyEach();
            score = score + 100;
          }
        spawnLogs();
        spawnPeanuts();

        beaver.velocityY = beaver.velocityY + 0.8;

        if (logs.isTouching(beaver)) {
            gameState = END;
            dieSound.play();
        }
    } else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;

        bg.velocityX = 0;
        beaver.velocityY = 0;

        logs.setVelocityXEach(0);
        peanut.setVelocityXEach(0);

        logs.setLifetimeEach(-1);
        peanut.setLifetimeEach(-1);

        if (mousePressedOver(restart)) {
            reset();
        }
    }

    beaver.collide(invisibleGround);

    console.log(frameCount);
    drawSprites();
}

function spawnLogs() {
    if (frameCount % 50 === 0) {
        logs = createSprite(570, 100, 40, 10);
        logs.velocityX = -4;
        logs.addImage(logImage);
        logs.scale = 0.6;
        logs.y = Math.round(random(20, 100));
        logs.lifetime = 150;
    }
}

function spawnPeanuts() {
    if (frameCount % 80 === 0) {
        peanut = createSprite(570, 100, 40, 10);
        peanut.velocityX = -4;
        peanut.addImage(peanutImage);
        peanut.scale = 0.6;
        peanut.y = Math.round(random(20, 100));
        peanut.lifetime = 150;
    }
}

function reset() {

    gameState = PLAY;
    score = 0;
    gameOver.visible = false;
    restart.visible = false

}