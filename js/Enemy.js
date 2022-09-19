export class Enemy {
 constructor(container, intervalTime, enemyClass, explosionClass, lives = 1) {
  this.container = container;
  this.element = document.createElement('div');
  this.enemyClass = enemyClass;
  this.explosionClass = explosionClass;
  this.interval = null;
  this.intervalTime = intervalTime;
  this.lives = lives;
 }
  init() {
  this.#setEnemy()
  this.#updatePosition()
 }

 #setEnemy() {
  this.element.classList.add(this.enemyClass);
  this.container.appendChild(this.element);
  this.element.style.top = '0px'
  this.element.style.left = `${this.#randomPosition()}px`;
 }
 #randomPosition() {
  return Math.floor(Math.random() * (window.innerWidth - this.element.offsetWidth)) //losowanie wrogow, losowa liczba razy szerokosc okna minus szerokosc wroga 
 }
 #updatePosition() {
  this.interval = setInterval(() => this.#setNewPosition(), this.intervalTime) //update przesuwania wrogow
 }
 #setNewPosition() {
  this.element.style.top = `${this.element.offsetTop + 1}px` //przesuwanie w dol
 }
 hit() { //opisanie co sie dzieje w przypadku udanego hita - odejmowanie zyc wrogom, oraz eksplozja
  this.lives--; 
  if(!this.lives) {
   this.explode()
  }
 }
 explode() {
  this.element.classList.remove(this.enemyClass)
  this.element.classList.add(this.explosionClass)
  clearInterval(this.interval)
  const animationTime = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--explosions-animation-time'), 10) //pobranie wartosci z roota ze styli
  setTimeout(() => this.element.remove(), animationTime);
 }
}
