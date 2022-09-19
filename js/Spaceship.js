import { Missile } from "./Missile.js";

export class Spaceship {

 missiles = []
 #modifier = 10; //odleglosc poruszania statku
 #leftArrow = false; //sprawdzanie czy strzalka jest wcisnieta 
 #rightArrow = false;

 constructor(element, container) {
  this.element = element;
  this.container = container;
 }
 init() {
  this.setPosition() //ustawienie pozycji przy kazdej inicjalizacji 
  this.#eventListeners(); //nasluchiwania 
  this.#gameLoop();
 }
 setPosition() { //wlasciwosci z inita - ustawienie styli 
  this.element.style.bottom = '0px'; //ustawienie statku na dole
  this.element.style.left = `${window.innerWidth / 2 - this.#getPosition()}px`;
 }

 #getPosition() { //niewychodzenie poza obreb ekranu
  return this.element.offsetLeft + this.element.offsetWidth / 2
 }
 #eventListeners() { //stad do konca whatkey usprawnienie poruszania - nie zacina sie statek w momencie wcisniecia przycisku
  window.addEventListener('keydown', ({keyCode}) => {
   switch(keyCode) {
    case 37: 
    this.#leftArrow = true;
    break;
    case 39: 
    this.#rightArrow = true;
    break;
   }
  })
  window.addEventListener('keyup', ({keyCode}) => {
   switch(keyCode) {
    case 32:  //na keyup, zeby zapobiec wystrzeliwaniu podczas przytrzymanai spacji
    this.#shoot() = true;
    break;
    case 37: 
    this.#leftArrow = false;
    break;
    case 39: 
    this.#rightArrow = false;
    break;
   }
  })
 }
 #gameLoop = () => {
  this.#whatKey()
  requestAnimationFrame(this.#gameLoop)
 }
 #whatKey() {
  if(this.#leftArrow && this.#getPosition() > 12) {
   this.element.style.left = `${parseInt(this.element.style.left, 10) - this.#modifier}px`;
  }
 if(this.#rightArrow && this.#getPosition() +12 < window.innerWidth) {
  this.element.style.left = `${parseInt(this.element.style.left, 10) + this.#modifier}px`;
 }
}
#shoot() {
 const missile = new Missile(
  this.#getPosition(), 
  this.element.offsetTop, 
  this.container
 )
 missile.init()
 this.missiles.push(missile);
}
}