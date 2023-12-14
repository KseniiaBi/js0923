import { formSubmitBtn, nameOfUserArr, userNameInfo } from './formLogin.js';
import {
    ctx, cWidth, cHeight,
    gameButton, gameTimerDiv, gameCount, reloadBtn, startBtn, highLowSpeedIntut,
    keyLEFT, keyUP, keyRIGHT, keyDOWN,
    highwayLine, 
    heightLine, heightCar, widthCar
} from './constants.js';
import { imageCarArray } from './variables.js';
/////////////////////////////////
let lives = 10;
let okLeft = false;
let okRight = false;
let okUp = false;
let okDown = false;
let idRequest = 0;
let isStop = false;
let isPause = false;
let isCarCrash = false;
let idTimer;
let countUp = 0;
let countDown = 0;
let residual23X = 0;    
let ranCoordXSecCar = 0;
let ranCoordXThirdCar = 0;

/////////////////////////////////////////
//helper/auxiliary functions
function drawExistingLives(){
    ctx.font = "30px sans-serif";
    ctx.fillStyle = "#000000";
    ctx.fillText("Lives: " + lives, 440, 26);
}

function drawMovementLineY(lineNPart, speed) {
    lineNPart.Y += speed;
        if(lineNPart.Y > cHeight){
            lineNPart.Y = -heightLine;
        }
    return lineNPart;
}
function setCoordImage(obj, x, y) {
    obj.X = x;  
    obj.Y = y;     
}
        
    
function randomGetImageCar(imageCarArray){
	let randomNumCar = Math.floor(Math.random() * imageCarArray.length); 	
    return imageCarArray[randomNumCar];//image.setAttribute("src", imageCarArray[randomNum]);
}

let line1FirstPart = new Image();
line1FirstPart.src = highwayLine;
setCoordImage(line1FirstPart, 180, -140);// line1FirstPart.X = 180; line1FirstPart.Y = -140;

let line1SecondPart = new Image();
line1SecondPart.src = highwayLine;
setCoordImage(line1SecondPart, 180, 160); 

let line2FirstPart = new Image();
line2FirstPart.src = highwayLine;
setCoordImage(line2FirstPart, 390, -140); 

let line2SecondPart = new Image();
line2SecondPart.src = highwayLine;
setCoordImage(line2SecondPart, 390, 160); 

let firstCar = new Image();
firstCar.src = randomGetImageCar(imageCarArray);  
setCoordImage(firstCar, 50, 400); // firstCar.X = 50;    // firstCar.Y = 400;

let secondCar = new Image();
secondCar.src = randomGetImageCar(imageCarArray); 
setCoordImage(secondCar, 150, 10);   

let thirdCar = new Image();
thirdCar.src = randomGetImageCar(imageCarArray); 
setCoordImage(thirdCar, 320, -150);

//////////////////////////////////
//main functions

function drawPause() {
    gameButton.addEventListener('click', () => {
        isPause = !isPause;
        if (isPause) {
            cancelAnimationFrame(idRequest);
            gameButton.children[0].style.display = 'none';
            gameButton.children[1].style.display = 'initial';
            stopDrawTimer();
        }
        else {
            idRequest = requestAnimationFrame(startRace);
            gameButton.children[0].style.display = 'initial';
            gameButton.children[1].style.display = 'none';
            startDrawTimer();
            }
        });
}

function drawHighway() {
    ctx.fillStyle = "#817f84"; //"Grey" color of road;
    ctx.fillRect(0, 0, 600, 500); //ctx.fillRect(x, y, width, height);
    gameButton.style.visibility = 'visible';
}

function startDrawTimer() {
    idTimer = setInterval(function () {
       
        gameCount.style.visibility = 'visible';
        gameTimerDiv.style.visibility = 'visible';
        gameTimerDiv.innerHTML = gameTimerDiv.innerHTML - 1;
        if (Number(gameTimerDiv.innerHTML) === 0 || lives === 0) {
             clearInterval(idTimer);
            gameTimerDiv.innerHTML = String("Time's up!");
            stopRace();
       }
    }, 1000);
    startBtn.removeEventListener("click", startDrawTimer);
    startBtn.addEventListener("click", stopDrawTimer);
}
function stopDrawTimer() {
    clearInterval(idTimer);

    startBtn.removeEventListener("click", stopDrawTimer);
    startBtn.addEventListener("click", startDrawTimer);
}

function drawGreeting() {   
    ctx.font = "30px ";
    ctx.fillStyle = "#000000";
    
    for (let i = 0; i < nameOfUserArr.length; i++){
        if (userNameInfo.nickname === nameOfUserArr[i] ) {
            ctx.fillText("wellcome back " + userNameInfo.nickname, 15, 26);
             return true;
         }
        ctx.fillText("Hello " + userNameInfo.nickname, 15, 26);
        return true;
     }
}

function drawLines(){
    ctx.drawImage(line1FirstPart, line1FirstPart.X, line1FirstPart.Y);
    drawMovementLineY(line1FirstPart, 3);

    ctx.drawImage(line1SecondPart, line1SecondPart.X, line1SecondPart.Y);
    drawMovementLineY(line1SecondPart, 3);

    ctx.drawImage(line2FirstPart, line2FirstPart.X, line2FirstPart.Y);
    drawMovementLineY(line2FirstPart, 3);
        
    ctx.drawImage(line2SecondPart, line2SecondPart.X, line2SecondPart.Y);
    drawMovementLineY(line2SecondPart, 3);
}    

function stopRace(){
    cancelAnimationFrame(idRequest);
    ctx.font = "60px";
    ctx.fillStyle = "#ff0a0a"; // text of message about ending of game is #FF6B0A -orange
    ctx.fillText("Race stopped", 180, 200);
    ctx.fillStyle = "black";
    ctx.fillText(`${userNameInfo.name}, yr score: ${userNameInfo.score}`, 180, 250);
    ctx.fillText(`count's crashes ${userNameInfo.countCrash}`, 180, 300);
    isStop = true;
    gameButton.children[0].style.display = 'none';
    reloadBtn.style.display = 'initial';
    }    

function drawMainCar() {
/////////////////////////////////////////
//check conditions of work of key buttons "left" and "right"   
    if(okLeft === true && firstCar.X > 0){
        firstCar.X -=5;
    }
    else if(okRight === true && firstCar.X < 535){
        firstCar.X +=5;
    }      
//////////////////////////////////////
//check conditions of work of key button "up"    
    if (okUp === true && countUp>=1 && firstCar.Y < cHeight) { 
        firstCar.Y -= 2;
        highLowSpeedIntut.value = `${userNameInfo.name}, take foot off the gas: `;  
        setTimeout(function () {
            highLowSpeedIntut.value = ` `;  
             }, 2500);
        }
    if (okUp === true && firstCar.Y === 0) {
        firstCar.Y = 410;
    }
//////////////////////////////////////
//check conditions of work of key button "down"   
    else if (okDown === true && countDown > 1 && firstCar.Y < cHeight ) {  
        firstCar.Y-=1;
        highLowSpeedIntut.value = `${userNameInfo.name}, put on speed: `;  
        setTimeout(function () {
            highLowSpeedIntut.value = ` `;  
             }, 2500);   
        }
    if (okDown === true && firstCar.Y === 0) {
                firstCar.Y = 410;
    }
    //////////////////////////////////////////////      
    ctx.drawImage(firstCar, firstCar.X, firstCar.Y); //to draw image
    }

function drawSecondCar() {
    if(secondCar.Y + heightCar > firstCar.Y && secondCar.X + widthCar > firstCar.X && secondCar.X < firstCar.X + widthCar){
        isCarCrash = true;
        userNameInfo.countCrash++;
        userNameInfo.score--;
        secondCar.Y = thirdCar.Y - 400;
        lives--;
        if(lives < 1){
            stopRace();
        }
    }
    else{
        isCarCrash = false;
    }
    if(!isCarCrash){
        ctx.drawImage(secondCar, secondCar.X, secondCar.Y);
        secondCar.Y += 2;
        ranCoordXSecCar = Math.floor(Math.random() * 535);
        residual23X = Math.abs(thirdCar.X - ranCoordXSecCar);
        if (secondCar.Y > cHeight) {
            secondCar.Y = -heightCar;
            secondCar.X = ranCoordXSecCar;
        }
    }
    return userNameInfo;
}

function drawThirdCar() {
    if (thirdCar.Y + heightCar > firstCar.Y && thirdCar.X + widthCar > firstCar.X && thirdCar.X < firstCar.X + widthCar) {
        isCarCrash = true;
        userNameInfo.countCrash++;
        userNameInfo.score--;
        thirdCar.Y = secondCar.Y - 400; 
        lives--;
            if (lives < 1) {
                stopRace();
            }
    }
     else {
         isCarCrash = false;
    }
    if (!isCarCrash) {
        ctx.drawImage(thirdCar, thirdCar.X, thirdCar.Y);
        ranCoordXThirdCar = Math.floor(Math.random() * 535);
        thirdCar.Y += 2;               
        residual23X = Math.abs(secondCar.X - ranCoordXThirdCar);         
        if (thirdCar.Y > cHeight) {
            thirdCar.Y = -heightCar;
            if (residual23X <= widthCar && (secondCar.X + widthCar + 2) <= 535 && (secondCar.X + widthCar + 2) >= 0) {
                thirdCar.X = secondCar.X + widthCar + 2;
            }                   
            else if (residual23X <= widthCar && (secondCar.X + widthCar + 2) <= 0){                       
                thirdCar.X = secondCar.X;
            }                   
            else {
                thirdCar.X = ranCoordXThirdCar;
            }
        }
    }       
    return userNameInfo;
}
        
function startRace(){
    if (isStop === true) {
        return;
    }
    drawHighway();
    drawLines();
    drawMainCar();
    drawSecondCar();
    drawThirdCar();
    drawPause();
    drawGreeting();
    drawExistingLives();

    idRequest = requestAnimationFrame(startRace); 
}

    addEventListener("keydown", function(event){
        let newDirect = event.keyCode;
        if(newDirect === keyLEFT){//newDirect === 37
            okLeft = true;
        }
        else if (newDirect === keyRIGHT) {//newDirect === 39
            okRight = true;
        }
    })

    addEventListener("keyup", function (event) {
        let newDirect = event.keyCode;//event.keyCode change on event.key or event.code
        if (newDirect === keyLEFT) {//newDirect === 37
            okLeft = false;
        }
        else if (newDirect === keyRIGHT) {//newDirect === 39 ArrowRight
            okRight = false;
        }
    })

    //курсор < 37 LEFT, курсор ^ 38 UP, курсор > 39 RIGHT, курсор v 40 DOWN

    addEventListener("keydown", function(event){
        let newSpeed = event.keyCode;
        if(newSpeed === keyUP){//newSpeed === 38
            okUp = true;
        }
        else if (newSpeed === keyDOWN) { //newSpeed === 40
            okDown = true;
        }
    })
    addEventListener("keyup", function(event){
        let newSpeed = event.keyCode;
        if(newSpeed === keyUP){//newSpeed === 38 ArrowUp
            okUp = false;
           countUp = countUp + 1;
        }
        else if (newSpeed === keyDOWN) {//newSpeed === 40
            okDown = false;
             countDown = countDown + 1;
        }
        return { countUp, countDown };
    })

startBtn.addEventListener("click", (e) => {
    formSubmitBtn.parentNode.style.display = "none";
    startRace();
    startBtn.style.display = "none";
    startDrawTimer();
});
reloadBtn.addEventListener("click", (e) => window.location.reload());