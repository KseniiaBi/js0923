import { formSubmitBtn, nameOfUserArr, userNameInfo } from './formLogin.js';
import {
    ctx, cWidth, cHeight,
    gameButton,
    keyLEFT, keyUP, keyRIGHT, keyDOWN,
    speed,
    highwayLine, violetCar, orangeCar, blackCar,
    heightLine, heightCar, widthCar
} from './constants.js';

   /////////////////////////////////
 let lives = 5;
 let okLeft = false;
 let okRight = false;
 let okUp = false;
 let okDown = false;
 let myRequest = 0;
 let isStop = false;
 let isPause = false;
 let isCarCrash = false ;
  /////////////////////////////////////  

    let line1FirstPart = new Image();
    line1FirstPart.src = highwayLine;
    line1FirstPart.X = 180;  
    line1FirstPart.Y = -140; 

    let line1SecondPart = new Image();
    line1SecondPart.src = highwayLine;
    line1SecondPart.X = 180;
    line1SecondPart.Y = 160;
    
    let line2FirstPart = new Image();
    line2FirstPart.src = highwayLine;
    line2FirstPart.X = 390;
    line2FirstPart.Y = -140;

    let line2SecondPart = new Image();
    line2SecondPart.src = highwayLine;
    line2SecondPart.X = 390;
    line2SecondPart.Y = 160;

    let firstCar = new Image();
    firstCar.src = violetCar;
    firstCar.X = 50;
    firstCar.Y = 400;

    let secondCar = new Image();
    secondCar.src = orangeCar;
    secondCar.X = 50;
    secondCar.Y = -150;

    let thirdCar = new Image();
    thirdCar.src = blackCar; 
    thirdCar.X = 50;
    thirdCar.Y = -150;
    
    function drawPause() {
        gameButton.addEventListener('click', () => {
            isPause = !isPause;
            if (isPause) {
                cancelAnimationFrame(myRequest);
                gameButton.children[0].style.display = 'none';
                gameButton.children[1].style.display = 'initial';
            }
            else {
                myRequest = requestAnimationFrame(startRace);
                gameButton.children[0].style.display = 'initial';
                gameButton.children[1].style.display = 'none';
            }
        });
    }
/* */
    function drawHighway(){
        ctx.fillStyle = "#817f84"; //"Grey" color of road;
        ctx.fillRect(0, 0, 600, 500); 
        gameButton.style.visibility = 'visible';
   }

function drawGreeting() {   
    ctx.font = "30px Arial";
    ctx.fillStyle = "#000000";
    
    for (let i = 0; i < nameOfUserArr.length; i++){
         if (typeof (userNameInfo.nickname)=== nameOfUserArr[i] ) {
            ctx.fillText("wellcome back " + userNameInfo.nickname, 10, 20);
            return true;
         }
        ctx.fillText("Hello " + userNameInfo.nickname, 10, 20);
        return true;
     }
}
    function drawExistingLives(){
        ctx.font = "30px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText("Lives: " + lives, 440, 50);
    }

    function drawLines(){
        ctx.drawImage(line1FirstPart, line1FirstPart.X, line1FirstPart.Y);
        line1FirstPart.Y += speed;
        if(line1FirstPart.Y > cHeight){
            line1FirstPart.Y = -heightLine;
        }
        ctx.drawImage(line1SecondPart, line1SecondPart.X, line1SecondPart.Y);
        line1SecondPart.Y += speed;
        if (line1SecondPart.Y > cHeight) {
            line1SecondPart.Y = -heightLine;
        }
         ctx.drawImage(line2FirstPart, line2FirstPart.X, line2FirstPart.Y);
        line2FirstPart.Y += speed;
        if (line2FirstPart.Y > cHeight) {
            line2FirstPart.Y = -heightLine;
        }
        ctx.drawImage(line2SecondPart, line2SecondPart.X, line2SecondPart.Y);
        line2SecondPart.Y += speed;
        if (line2SecondPart.Y > cHeight) {
            line2SecondPart.Y = -heightLine;
        }
    }

    function stop(){
        cancelAnimationFrame(myRequest);
        ctx.font = "60px, Arial";
        ctx.fillStyle = "#ff0a0a"; 
        ctx.fillText("Race stopped", 180, 200);
        isStop = true;
    }

    function drawMainCar(){
        if(okLeft === true && firstCar.X > 0){
            firstCar.X -=5;
        }
        if(okRight === true && firstCar.X < 535){
            firstCar.X +=5;
        }
        if (okUp === true) {
        
            ctx.drawImage(line1FirstPart, line1FirstPart.X, line1FirstPart.Y);
            line1FirstPart.Y += 15;
            if (line1FirstPart.Y > cHeight) {
                line1FirstPart.Y = -heightLine;
            }
            ctx.drawImage(line1SecondPart, line1SecondPart.X, line1SecondPart.Y);
            line1SecondPart.Y += 15;
            if (line1SecondPart.Y > cHeight) {
                line1SecondPart.Y = -heightLine;
            }
            ctx.drawImage(line2FirstPart, line2FirstPart.X, line2FirstPart.Y);
            line2FirstPart.Y += 15;
            if (line2FirstPart.Y > cHeight) {
                line2FirstPart.Y = -heightLine;
            }
            ctx.drawImage(line2SecondPart, line2SecondPart.X, line2SecondPart.Y);
            line2SecondPart.Y += 15;
            if (line2SecondPart.Y > cHeight) {
                line2SecondPart.Y = -heightLine;
            }
        }        
        ctx.drawImage(firstCar, firstCar.X, firstCar.Y);
    }

    function drawSecondCar(){
        if(secondCar.Y + heightCar > firstCar.Y && secondCar.X + widthCar > firstCar.X && secondCar.X < firstCar.X + widthCar){
            isCarCrash = true;
            secondCar.Y = thirdCar.Y - 300;
            lives--;
            if(lives < 1){
            stop();
            }
        }
        else{
            isCarCrash = false;
        }
        if(!isCarCrash){
            ctx.drawImage(secondCar, secondCar.X, secondCar.Y);
             secondCar.Y +=2;
            if (secondCar.Y > cHeight) {
                secondCar.Y = -heightCar;
                secondCar.X = Math.floor(Math.random()*535);
            }
        }
    }

    function drawThirdCar() {
            if (thirdCar.Y + heightCar > firstCar.Y && thirdCar.X + widthCar > firstCar.X && thirdCar.X < firstCar.X + widthCar) {
                isCarCrash = true;
                thirdCar.Y = secondCar.Y - 300; 
                lives--;
                if (lives < 1) {
                    stop();
                }
            }
            else {
                isCarCrash = false;
            }
            if (!isCarCrash) {
                ctx.drawImage(thirdCar, thirdCar.X, thirdCar.Y);
                thirdCar.Y += 2;
                if (thirdCar.Y > cHeight) {
                    thirdCar.Y = -heightCar;
                    thirdCar.X = Math.floor(Math.random()*535);
                }
            }
}
        
    function startRace(){
        if(isStop === true){
            return;
        }
        drawHighway();
        drawLines();
        drawMainCar();
        drawSecondCar();
        drawThirdCar();
        drawPause();
        drawGreeting();
        //drawForm.drawGreeting();
        drawExistingLives();

        myRequest = requestAnimationFrame(startRace);
    }

    addEventListener("keydown", function(event){
        let newDirect = event.keyCode;
        //let newDirect = event.key;
        if(newDirect === keyLEFT){//newDirect === 37
            okLeft = true;
        }
        if (newDirect === keyRIGHT) {//newDirect === 39
            okRight = true;
        }
    })

    addEventListener("keyup", function (event) {
        let newDirect = event.keyCode;
        // let newDirect = event.key; //event.keyCode change on event.key 
        if (newDirect === keyLEFT) {//newDirect === 37
            okLeft = false;
        }
        if (newDirect === keyRIGHT) {//newDirect === 39 ArrowRight
            okRight = false;
        }
    })

    //PageUp	33, PageDown	34, курсор <	37	LEFT, курсор ^	38	UP, курсор >	39	RIGHT, курсор v	40 DOWN

    addEventListener("keydown", function(event){
        let newSpeed = event.keyCode;
        //let newDirect = event.key;
        if(newSpeed === keyUP){//newSpeed === 38
            okUp = true;
        }
        if (newSpeed === keyDOWN) { //newSpeed === 40
            okDown = true;
        }
    })
    addEventListener("keyup", function(event){
        let newSpeed = event.keyCode;///event.code
        //console.log(event.code);
        //let newDirect = event.key;
        if(newSpeed === keyUP){//newSpeed === 38 ArrowUp
            okUp = false;
        }
        if (newSpeed === keyDOWN) {//newSpeed === 40
            okDown = false;
        }
    })

document.querySelector('#start-btn').addEventListener("click", (e) => formSubmitBtn.parentNode.style.display = "none");;
     
document.querySelector('#start-btn').addEventListener('click', function () {
    return startRace();
})
document.querySelector('#start-btn').addEventListener("click", (e) => document.querySelector('#start-btn').style.display = "none");;