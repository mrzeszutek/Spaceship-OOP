export class Missile {
 constructor(x, y, container) {
  this.x = x;
  this.y = y;
  this.container = container;
  this.element = document.createElement('div')
  this.interval = null;
 }

 init() {
  this.element.classList.add('missile')     //dodajemy klase missile z css
  this.container.appendChild(this.element);  //zalaczamy do containera
  this.element.style.left = `${this.x - this.element.offsetWidth / 2}px`     //ustalamy aktualna pozycje na osi x dla pociska gdzie ma byc w momencie strzalu
  this.element.style.top = `${this.y - this.element.offsetHeight}px` //jw. tylko y
  this.interval = setInterval(() => (this.element.style.top = `${this.element.offsetTop - 1}px`), 5); //badamy interwalem pozycje dla przycisku co 10 milisekund
 }
 remove() {
  clearInterval(this.interval) //czyszczenie interwalu po spelnieniu warunku pocisku mniejszego od zera z game'a
  this.element.remove()
 }
}