var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var scoreDisplay = document.getElementById("score");
var message = document.getElementById("message");

var gravity = 0.5;
var velocity = 0;
var gameRunning = false;
var score = 0;
var gap = 120; 

block.addEventListener("animationiteration", () => {
    var gameHeight = 700;
    var holeHeight = 120;
    var randomTop = Math.floor(Math.random() * (gameHeight - holeHeight));
    hole.style.top = randomTop + "px";

    if (gameRunning) {
        score++;
        scoreDisplay.innerHTML = score;
    }
});
setInterval(function(){ //gravity function
    if(!gameRunning) return;
    
    velocity += gravity;
    character.style.top = character.offsetTop + velocity + "px";
    
    var characterTop = character.offsetTop;
    var characterBottom = characterTop + 20;
    
    var blockLeft = block.offsetLeft;
    var holeTop = hole.offsetTop;
    var holeBottom = holeTop + gap;
    
    if(characterTop <= 0 || characterBottom>=700) {
        endGame();
    }
    
    if(blockLeft < 120 && blockLeft > 50) {
        if (characterTop < holeTop || characterBottom > holeBottom+120) {
            endGame();
        }
    }
 }, 20);

function jump(){
    if (!gameRunning) {
        startGame();
    }
    velocity = -8;
}
function startGame() {
    gameRunning = true;
    score = 0;
    scoreDisplay.innerHTML = score;
    message.innerHTML = "";
}
function endGame() {
    gameRunning = false;
    message.innerHTML = "Game Over! Press Space";
    character.style.top = "100px";
    velocity = 0;
}
document.addEventListener("keydown", function(event) {
    if (event.code === "Space" || event.code === "ArrowUp") {
        jump();
    }
});
