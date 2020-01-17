var c = document.getElementById("canvas");
const ctx = c.getContext('2d');

const box = 32;

const fooditem = new Image();
fooditem.src = "images/apple.jpg";


const ground = new Image();
ground.src = "images/background.png";

let snake = [];
snake[0] = {
    x: 9*box,
    y: 10*box
}

let food = {
    x: Math.floor(Math.random()*17+1) * box,
    y: Math.floor(Math.random()*15+3) * box,
    
}


let lose = false;
let score = 0;

let d;

document.addEventListener("keydown", direction);
document.addEventListener("keydown", spacebarpressed);

function direction(event){
    if(event.keyCode == 37){
        d = "LEFT";
        console.log("LEFT key is pressed");
    }
    else if(event.keyCode == 38){
        d = "UP";
        console.log("UP key is pressed");
    }
    else if(event.keyCode == 39){
        d = "RIGHT";
        console.log("RIGHT key is pressed");
    }
    else if(event.keyCode == 40){
        d = "DOWN";
        console.log("DOWN key is pressed");
        
    }
}

function spacebarpressed(event){
    if(event.keyCode == 32 && lose){
        location.reload();
        console.log("SPACEBAR is pressed");
        
    }
}




function draw(){
    ctx.drawImage(ground, 0, 0, c.width, c.height * c.height / c.width);
    for(let i =0;i<snake.length;i++){
        ctx.shadowBlur = 5;
        ctx.shadowColor = "black";
        ctx.fillStyle = (i == 0)? "tomato" : "lightcoral";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
        
    }
    ctx.drawImage(fooditem, food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    
    if(d == "LEFT"){
        snakeX -= box;
    }
    if(d == "UP"){
        snakeY -= box;
    }
    if(d == "RIGHT"){
        snakeX += box;
    }
    if(d == "DOWN"){
        snakeY += box;
    }
    
    function collision(head, array){
        for(let i = 0; i< array.length; i++){
            if(head.x == array[i].x && head.y == array[i].y){
                return true;
            }
        }
    }
    if(snakeX == food.x && snakeY == food.y){
        score++;
        ctx.strokeStyle = "yellowgreen";
        ctx.fillRect(food.x,food.y,box,box);
        
        food = {x: Math.floor(Math.random()*17+1) * box,
        y: Math.floor(Math.random()*15+3) * box,
        };
    }else{
        snake.pop();
    }
    


    let newHead = {
        x: snakeX,
        y: snakeY
    
    } 
    function changeColor(){
        for(let i =0;i<snake.length;i++){
            ctx.shadowBlur = 0;
            ctx.fillStyle = "white";
            ctx.font = "50px Arial";
            ctx.fillText("YOU LOSE!", box*5, box*10);
            ctx.font = "20px Arial";
            ctx.fillText("Press Space To Try Again", box*5.5, box*12);
            ctx.font = "30px Arial";
            ctx.fillText("Your final score: " + score, box*5.5, box*14);
            ctx.fillStyle = (i == 0)? "tomato" : 'rgba('+Math.random()*255+','+Math.random()*255+',' +Math.random()*255+')';
            ctx.fillRect(snake[i].x,snake[i].y,box,box);
            ctx.strokeStyle = "white";
            ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    
            
            
        }
    }
    if(snakeX < box*0 || snakeX > 18*box || snakeY < box*0 || snakeY > 18*box || collision(newHead, snake)){
        lose = true;
        clearInterval(game);
        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.fillText("YOU LOSE!", box*5, box*10);
        ctx.font = "20px Arial";
        ctx.fillText("Press Space To Try Again", box*5.5, box*12);
        ctx.font = "30px Arial";
        ctx.fillText("Your final score: " + score, box*5.5, box*14);
       
        setInterval(changeColor, 1000);
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, 15*box, 2*box);
    

    
}



let game = setInterval(draw, 100);
