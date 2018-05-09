!function(t){var e={};function o(i){if(e[i])return e[i].exports;var s=e[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=t,o.c=e,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},o.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=3)}([function(t,e){t.exports=function(){this.x=0,this.y=0,this.direction="right"}},function(t,e){t.exports=function(){this.x=Math.floor(10*Math.random()),this.y=Math.floor(10*Math.random())}},function(t,e,o){var i=o(1),s=o(0);t.exports=function(){this.board=document.querySelectorAll("#board div"),this.monster=new s,this.cookie=new i,this.score=0,this.index=function(t,e){return t+10*e},this.showMonster=function(){this.hideVisibleMonster(),this.board[this.index(this.monster.x,this.monster.y)].classList.add("monster")},this.showCookie=function(){this.board[this.index(this.cookie.x,this.cookie.y)].classList.add("cookie")},this.startGame=function(){var t=this;this.idSetInterval=setInterval(function(){t.moveMonster()},300)},this.moveMonster=function(){"right"===this.monster.direction?this.monster.x+=1:"left"===this.monster.direction?this.monster.x-=1:"up"===this.monster.direction?this.monster.y-=1:this.monster.y+=1,this.gameOver()||(this.showMonster(),this.checkCookieCollision())},this.hideVisibleMonster=function(){var t=document.querySelector(".monster");null!==t&&t.classList.remove("monster")},this.turnMonster=function(t){switch(t.which){case 37:this.monster.direction="left";break;case 38:this.monster.direction="up";break;case 39:this.monster.direction="right";break;case 40:this.monster.direction="down"}},this.checkCookieCollision=function(){this.monster.x===this.cookie.x&&this.monster.y===this.cookie.y&&(document.querySelector(".cookie").classList.remove("cookie"),this.score++,document.querySelector("#score h2 span").innerText=this.score,this.cookie=new i,this.showCookie())},this.saveScoreToLocalStorage=function(t){localStorage.setItem("cookie_monster",JSON.stringify(t))},this.loadResultsFromLocalStorage=function(){var t=JSON.parse(localStorage.getItem("cookie_monster"));return null===t?[]:t},this.gameOver=function(){if(this.monster.x<0||this.monster.x>9||this.monster.y<0||this.monster.y>9){clearInterval(this.idSetInterval),this.hideVisibleMonster();var t=this.loadResultsFromLocalStorage();-1===t.indexOf(this.score)&&(t.push(this.score),t.sort(function(t,e){return e-t}),this.saveScoreToLocalStorage(t));var e=t.indexOf(this.score),o=document.getElementById("over"),i=document.querySelector(".info__score"),s=document.querySelector(".ranking_place"),n=document.querySelector(".ranking_best");return o.classList.remove("invisible"),i.innerText=this.score,s.innerText=e+1,n.innerText=t[0],!0}return!1}}},function(t,e,o){var i=o(2);document.addEventListener("keydown",function(t){s.turnMonster(t)});var s=new i;s.showMonster(),s.showCookie(),s.startGame()}]);