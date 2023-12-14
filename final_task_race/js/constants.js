export const highwayLine = "img/highwayLine.png";

const canvas = document.querySelector('#race');
export const ctx = canvas.getContext('2d');
export const cWidth = canvas.offsetWidth;
export const cHeight = canvas.offsetHeight;

export const gameButton = document.querySelector('.game-button');
export const gameTimerDiv = document.getElementById('game-timer');
export const gameCount = document.querySelector('.label-game-timer');
export const highLowSpeedIntut = document.getElementById("info-high-low-speed");
export const startBtn = document.querySelector('.start-btn');
export const reloadBtn = document.querySelector('.reload-btn');

//курсор < 37 LEFT, курсор ^ 38 UP, курсор > 39 RIGHT, курсор v 40 DOWN
export const keyLEFT = 37;
export const keyUP = 38;
export const keyRIGHT = 39;
export const keyDOWN = 40;

export const heightLine = 140;
export const heightCar = 100;
export const widthCar = 65;