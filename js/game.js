var Cookie = require("./cookie.js");
var Monster = require("./monster.js");

function Game() {
    this.board = document.querySelectorAll("#board div");
    this.monster = new Monster();
    this.cookie = new Cookie();
    this.score = 0;

    //przeliczanie indeksu x i y na indeks w tablicy jednowymiarowej (0, 99)
    this.index = function(x, y) {
        return x + (y * 10);
    };

    //chowanie potwora i pojawienie go w innej komórce
    this.showMonster = function() {
        this.hideVisibleMonster();
        this.board[this.index(this.monster.x, this.monster.y)].classList.add("monster");
    };

    //pokazanie ciastka
    this.showCookie = function() {
        this.board[this.index(this.cookie.x, this.cookie.y)].classList.add("cookie");
    };


    this.startGame = function() {
        var self = this;
        //przypisujemy this to zmiennej, ponieważ wewnątrz eventu "this" odnosi się do eventu nie do obiektu
        //zapisujemy zwracany przez metodę id do zmiennej aby potem móc go usunąć
        this.idSetInterval = setInterval(function(){
            self.moveMonster()
        }, 500);
    };

    this.moveMonster = function() {
        //określamy kolejną pozycję potwora na podstawie jego kierunku
        if(this.monster.direction === "right") {
            this.monster.x += 1;
        } else if (this.monster.direction === "left") {
            this.monster.x -= 1;
        } else if (this.monster.direction === "up") {
            this.monster.y -= 1;
        } else {
            this.monster.y += 1;
        }

        if(!this.gameOver()) {
            //pokazujemy następnego potwora tylko gdy gra nie została zakończona
            this.showMonster();
            //sprawdzamy czy występuje kolizja z ciastkiem
            this.checkCookieCollision();
        }
    };

    this.hideVisibleMonster = function() {
        var visibleMonster = document.querySelector(".monster");

        //na początku gry żaden z elementów nie ma jeszcze klasy "monster" więc nie można go wtedy usunąć
        //metoda showMonster nie działałaby, dodajemy warunek:
        if (visibleMonster !== null){
            visibleMonster.classList.remove("monster");
        }
    };

    //callback do zdarzenia keydown
    this.turnMonster = function(event) {
        //w zależności od kodu przycisku zwróconego przez event.which zmieniamy kierunek poruszania się potwora
        switch(event.which) {
            case 37:
                this.monster.direction = "left";
                break;
            case 38:
                this.monster.direction = "up";
                break;
            case 39:
                this.monster.direction = "right";
                break;
            case 40:
                this.monster.direction = "down";
                break;
        }
    };

    //sprawdzanie kolizji z ciastkiem
    this.checkCookieCollision = function() {
        //pozycja potwora i ciastka musi być taka sama
        if(this.monster.x === this.cookie.x && this.monster.y === this.cookie.y) {

            //usuwamy ciastko
            var currentCookie = document.querySelector(".cookie");
            currentCookie.classList.remove("cookie");

            //dodajemy punkty
            this.score++;

            //punkty zostają wyświetlone na stronie
            var scoreOnPage = document.querySelector("#score strong");
            scoreOnPage.innerText = this.score;

            //dodajemy nowe ciastko
            this.cookie = new Cookie();

            //pojawiamy nowe ciastko
            this.showCookie();
        }
    };

    this.gameOver = function() {
        //jeżeli potwór wyjdzie za planszę - koniec gry
        if(this.monster.x < 0 || this.monster.x > 9 || this.monster.y < 0 || this.monster.y > 9) {

            //usuwamy interwał
            clearInterval(this.idSetInterval);

            //ukrywamy potwora
            this.hideVisibleMonster();

            //wyświetlamy komunikat o końcu gry
            var over = document.getElementById("over");
            var scoreInfo = document.querySelector(".info__score");
            over.classList.remove("invisible");
            scoreInfo.innerText = "Your score: " + this.score;
            return true;
        }
        return false;
    }
}

module.exports = Game;