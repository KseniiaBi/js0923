export const highwayLine = "img/highwayLine.png";
export const violetCar = "img/violetCar.png";
export const orangeCar = "img/orangeCar.png";
export const blackCar = "img/blackCar.png";
export const greenCar = "img/greenCar.png";
export const blueCar = "img/blueCar.png";
export const redCar = "img/redCar.png";

const canvas = document.querySelector('#race');
export const ctx = canvas.getContext('2d');
export const cWidth = canvas.offsetWidth;
export const cHeight = canvas.offsetHeight;

export const gameButton = document.querySelector('.game-button');

//курсор <	37	LEFT, курсор ^	38	UP, курсор >	39	RIGHT, курсор v	40 DOWN
export const keyLEFT = 37;
export const keyUP = 38;
export const keyRIGHT = 39;
export const keyDOWN = 40;

export const speed = 3;
export const heightLine = 140;
export const heightCar = 100;
export const widthCar = 65;