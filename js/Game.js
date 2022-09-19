import { Spaceship } from './Spaceship.js';
import { Enemy } from './Enemy.js';

class Game {
 #htmlElements = { //elementy html
  spaceship: document.querySelector('[data-spaceship]'),
  container: document.querySelector('[data-container]'),
  score: document.querySelector('[data-score]'),
  lives: document.querySelector('[data-lives]'),
  modal: document.querySelector('[data-modal]'),
  scoreInfo: document.querySelector('[data-score-info]'),
  button: document.querySelector('[data-button]'),
 };
 #ship = new Spaceship(this.#htmlElements.spaceship, this.#htmlElements.container); //nowy statek
 
 #enemies = [];
 #enemiesInterval = null;
 #score = null;
 #lives = null;
 #checkPositionInterval = null; //zerowanie interwalu w momencie nowej gry
 #createEnemyInterval = null

 init() {
  this.#ship.init();
  this.#newGame();
  this.#htmlElements.button.addEventListener('click', () => this.#newGame())
 }
 #newGame() {
  this.#htmlElements.modal.classList.add('hide');
  this.#enemiesInterval = 30;
  this.#lives = 3;
  this.#score = 0;
  this.#updateLivesText();
  this.#updateScoreText();
  this.#ship.element.style.left = '0px'
  this.#ship.setPosition()
  this.#createEnemyInterval = setInterval(() => this.#randomNewEnemy(), 1000)
  this.#checkPositionInterval = setInterval(() => this.#checkPosition(), 1)
 }

 #endGame() {
  this.#htmlElements.modal.classList.remove('hide');
  this.#htmlElements.scoreInfo.textContent = `You lost! Your score is: ${this.#score}`
  this.#enemies.forEach((enemy) => enemy.explode()) //dla kazdego elementu tablicy, niech eksploduja 
  this.#enemies.length = 0; //czyscimy tablice
  clearInterval(this.#createEnemyInterval);
  clearInterval(this.#checkPositionInterval);
 }

 #randomNewEnemy() { //co 5 wrog jest duza wersja
  const randomNumber = Math.floor(Math.random() * 5) + 1;
  randomNumber % 5 ? this.#createNewEnemy(this.#htmlElements.container, this.#enemiesInterval, 'enemy', 'explosion') : this.#createNewEnemy(this.#htmlElements.container, this.#enemiesInterval * 2, 'enemy--big','explosion--big', 3)
 }

 #createNewEnemy(...params) { //przekazanie parametrow z randomenemiego
  const enemy = new Enemy(...params)

  enemy.init()
  this.#enemies.push(enemy);
 }

 #checkPosition() {
  this.#enemies.forEach((enemy, enemyIndex, enemiesArray) => {
   const enemyPosition = {
    top: enemy.element.offsetTop,
    right: enemy.element.offsetLeft + enemy.element.offsetWidth,
    bottom: enemy.element.offsetTop + enemy.element.offsetHeight,
    left: enemy.element.offsetLeft,
   }
   if(enemyPosition.top > window.innerHeight) {
    enemy.explode() //jesli if jest spelniny to  usun html
    enemiesArray.splice(enemyIndex, 1)
    this.#updateLives()
   }
   this.#ship.missiles.forEach((missile, missileIndex, missileArray) => {
    const missilePosition = {
     top: missile.element.offsetTop,
     right: missile.element.offsetLeft + missile.element.offsetWidth,
     bottom: missile.element.offsetTop + missile.element.offsetHeight,
     left: missile.element.offsetLeft,
    };
    if(missilePosition.bottom >= enemyPosition.top && missilePosition.top <= enemyPosition.bottom && missilePosition.right >= enemyPosition.left && missilePosition.left <= enemyPosition.right) { //sprawdzenie czy pocisk i wrog sie przecinaja
     enemy.hit()
     if(!enemy.lives) { //sprawdzenie czy wrog ma zycia 
      enemiesArray.splice(enemyIndex, 1)
     }
     missile.remove()
     missileArray.splice(missileIndex, 1);
     this.#updateScore();
    }
    if(missilePosition.bottom < 0) {
     missile.remove(); //jesli if jest spelniny to usun html
     missileArray.splice(missileIndex, 1)
    }
   });
  });
 }
 #updateScore() {
  this.#score++
  if(!(this.#score % 5)) {
   this.#enemiesInterval--
  }
  this.#updateScoreText();
 }

 #updateLives() {
  this.#lives--
  this.#updateLivesText();
  this.#htmlElements.container.classList.add('hit')
  setTimeout(() => this.#htmlElements.container.classList.remove('hit'))
  if(!this.#lives) {
   this.#endGame()
  }
 }

 #updateScoreText() {
  this.#htmlElements.score.textContent = `Score: ${this.#score}`
 }
 #updateLivesText() {
  this.#htmlElements.lives.textContent = `Lives: ${this.#lives}`
 }
}

window.onload = function() {
 const game = new Game();
 game.init();
}