var Game = require("./game.js");

document.addEventListener("keydown", function(event){
    game.turnMonster(event);
});


var game = new Game();
game.showMonster();
game.showCookie();
game.startGame();
