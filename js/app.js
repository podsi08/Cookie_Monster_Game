var Game = require("./game.js");

var game = new Game();
var startBtn = document.querySelector(".start_btn");
var newGameBtn = document.querySelector(".new_game_btn");

function startNewGame() {
    game.resetGame();
    game.showMonster();
    game.showCookie();
    game.startGame();
}


document.addEventListener("keydown", function(event){
    game.turnMonster(event);
});


startBtn.addEventListener("click", function() {
    startNewGame();
});


newGameBtn.addEventListener("click", function() {
    var gameOverInfo = document.getElementById("over");
    gameOverInfo.classList.add("invisible");

    startNewGame();
});