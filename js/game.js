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

    //funkcja, która po określonym czasie nadpisuje interwał
    this.changeInterval = function(timeout, interval) {
        var self = this;
        setTimeout(function() {
            clearInterval(self.idSetInterval);
            self.idSetInterval = setInterval(function(){
                self.moveMonster()
            }, interval);
        }, timeout);
    };

    this.startGame = function() {
        var self = this;
        //przypisujemy this to zmiennej, ponieważ wewnątrz eventu "this" odnosi się do eventu nie do obiektu
        //zapisujemy zwracany przez metodę id do zmiennej aby potem móc go usunąć
        this.idSetInterval = setInterval(function(){
            self.moveMonster()
        }, 400);
        this.changeInterval(15000, 320);
        this.changeInterval(30000, 240);
        this.changeInterval(45000, 180);
        this.changeInterval(60000, 120);

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

    this.setScore = function() {
        var scoreOnPage = document.querySelector("#score h2 span");
        scoreOnPage.innerText = this.score;
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

            //aktualizacja wyniku na stronie
            this.setScore();

            //dodajemy nowe ciastko
            this.cookie = new Cookie();

            //pojawiamy nowe ciastko
            this.showCookie();
        }
    };

    //zapisywanie do local storage
    this.saveScoreToLocalStorage = function(results) {
        localStorage.setItem('cookie_monster', JSON.stringify(results));
    };

    //pobieranie wyników z local storage
    this.loadResultsFromLocalStorage = function() {
        var storageResults = JSON.parse(localStorage.getItem('cookie_monster'));

        if(storageResults === null) {
            return [];
        } else {
            return storageResults;
        }
    };

    this.gameOver = function() {
        //jeżeli potwór wyjdzie za planszę - koniec gry
        if(this.monster.x < 0 || this.monster.x > 9 || this.monster.y < 0 || this.monster.y > 9) {

            //usuwamy interwał
            clearInterval(this.idSetInterval);

            //ukrywamy potwora
            this.hideVisibleMonster();

            //pobieram wyniki z local storage
            var results = this.loadResultsFromLocalStorage();

            //zapisuję wynik do tablicy, jeżeli jeszcze nie ma takiego wyniku
            if (results.indexOf(this.score) === -1) {
                results.push(this.score);

                //sortuję tabicę i nadpisuję ją do local storage
                results.sort(function (a, b) {
                    return b - a;
                });

                this.saveScoreToLocalStorage(results);

            }

            var rankingPlace = results.indexOf(this.score);

            //wyświetlamy komunikat o końcu gry
            var over = document.getElementById("over");
            var scoreInfo = document.querySelector(".info__score");
            var rankingInfo = document.querySelector(".ranking_place");
            var bestScore = document.querySelector(".ranking_best");

            over.classList.remove("invisible");
            scoreInfo.innerText = this.score;
            rankingInfo.innerText = rankingPlace + 1;
            bestScore.innerText = results[0];

            return true;
        }
        return false;
    };

    this.resetGame = function () {
        this.monster = new Monster();
        this.score = 0;
        clearInterval(this.idSetInterval);
        this.setScore();
    }
}

module.exports = Game;