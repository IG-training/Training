const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');
cvs.style.border = '1px solid #0ff';

ctx.lineWidth = 3;

const paddle_width = 100;
const paddle_margin_bottom = 50;
const paddle_height = 20;
const ball_rad = 8;
let life = 3;
let bricks = [];
let leftArrow = false;
let rightArrow = false;
let score = 0;
let level = 1;
const max_level=3;
const background_img = new Image();
background_img.src = 'BG1.jfif';

const level_img = new Image();
level_img.src='level.jpg';

const life_img = new Image();
life_img.src= 'life.jpg';

const score_img = new Image();
score_img.src = 'score.png.crdownload';

const gameover_img = new Image();
gameover_img.src = 'Game-over.png';

const congrats_img = new Image();
congrats_img.src = 'con2.png'


const paddle = {
    x : cvs.width/2 - paddle_width/2,
    y : cvs.height - paddle_margin_bottom - paddle_height,
    width : paddle_width,
    height : paddle_height,
    dx :4
}

const ball = {
    x : cvs.width/2,
    y : paddle.y-ball_rad,
    radius : ball_rad,
    Speed : 4,
    dx : 3*(Math.random()*2-1),
    dy : -3
}

const brick = {
    row : 1,
    column : 7,
    width : 75,
    height : 25,
    offSetLeft : 35,
    offSetTop : 20,
    marginTop : 40,
    fillColor : '#2e3548',
    strokeColor : '#FFF'
}

function createBricks(){
    for(let r = 0; r<brick.row; r++){
        bricks[r] = [];
        for(let c=0;c<brick.column; c++){
            bricks[r][c] = {
                x : c*(brick.offSetLeft + brick.width) + brick.offSetLeft, 
                y : r*(brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
                status : true
            }
        }
    }
}

createBricks();

function drawBricks(){
    for(let r = 0; r<brick.row; r++){
        for(let c=0;c<brick.column; c++){
            let b= bricks[r][c];
            if(b.status){
                ctx.fillStyle = brick.fillColor;
                ctx.fillRect(b.x,b.y,brick.width,brick.height);
                ctx.strokeStyle = brick.strokeColor;
                ctx.strokeRect(b.x,b.y,brick.width,brick.height);
            }
        }
    }
}

function drawpaddle(){
    ctx.fillStyle = 'green';
    ctx.fillRect(paddle.x , paddle.y , paddle.width , paddle.height);

    ctx.strokeStyle = '';
    ctx.strokeRect(paddle.x , paddle.y , paddle.width , paddle.height);
}

function movedown(event){
    if(event.keyCode==37){
        leftArrow = true;
    }else if(event.keyCode==39){
        rightArrow = true;
    }
}

function moveup(event){
    if(event.keyCode==37){
        leftArrow = false;
    }else if(event.keyCode==39){
        rightArrow = false;
    }
}

function movepaddle(){
    if(rightArrow && paddle.x + paddle.width<cvs.width){
        paddle.x += paddle.dx;
    }else if(leftArrow && paddle.x + paddle.width > paddle.width){
        paddle.x -= paddle.dx;
    }
}
function drawball(){
    ctx.beginPath();
    ctx.arc(ball.x , ball.y , ball.radius , 0 , Math.PI*2);
    ctx.fillStyle = '#ffcd05';
    ctx.fill();

    ctx.strokeStyle = '#2e3548';
    ctx.stroke();

    ctx.closePath();
}

function moveball(){
    ball.x += ball.dx;
    ball.y += ball.dy;
}
function draw(){
    drawpaddle();
    drawball();
    drawBricks();
    Gamestats(score,35,25,score_img,5,5);
    Gamestats(life,cvs.width-25,25,life_img,cvs.width-55,5);
    Gamestats(level,cvs.width/2,25,level_img,cvs.width/2-30,5);
}
function update(){
    //paddle.x -= 10;
    if(level<4){    
        if(life>0){
            movepaddle();
            moveball();
            ball_wall_collision();
            ball_paddle_collision();
            ballBrickcollision();
            level_Up();
        }else{
            ctx.drawImage(gameover_img , cvs.width/2-120,cvs.height/2-120,400,400);
            ctx.fillText(score,cvs.width/2)
        }
    }
    else{
        ctx.drawImage(congrats_img , cvs.width/2-160,cvs.height/2-160,500,500);
    }
    // if(level>1){
    //      ctx.drawImage(congrats_img , cvs.width/2-120,cvs.height/2-120,400,400);
    //  }
}

function ball_wall_collision(){
    if(ball.x+ball.radius> cvs.width || ball.x - ball.radius <0){
        ball.dx = -ball.dx;
    }
    if(ball.y<0){
        ball.dy = -ball.dy;
    }

    if(ball.y+ball.radius>cvs.height){
        life--;
        reset();
    }
}

function level_Up(){
    let leveldone = true;
    for(let r = 0; r<brick.row; r++){
        for(let c=0;c<brick.column; c++){     
            leveldone = leveldone && !bricks[r][c].status;
        }
    }

    if(leveldone){
            level++;
        // if(level>1){
        //     ctx.drawImage(congrats_img , cvs.width/2-120,cvs.height/2-120,400,400);
        // }else{
            brick.row++;
            createBricks();
            ball.dx = -ball.dx;
        
            reset();
    }


}

function reset(){
    ball.x = cvs.width/2;
    ball.y = paddle.y-ball_rad;
    ball.dx = 3*(Math.random()*2-1);
    ball.dy = -3
    paddle.x = cvs.width/2 - paddle_width/2,
    paddle.y = cvs.height - paddle_margin_bottom - paddle_height,
    //width : paddle_width,
    //height : paddle_height,
    paddle.dx =4
}
function ball_paddle_collision(){
    if(ball.x<paddle.x + paddle.width && ball.x > paddle.x && 
        paddle.y<paddle.y+paddle.height && ball.y>paddle.y){
            ball.dx = 3*(Math.random()*2-1);
            ball.dy = -ball.dy;
    }
}

function ballBrickcollision(){
    for(let r=0;r<brick.row;r++){
        for(let c=0;c<brick.column;c++){
            let b=bricks[r][c];
            if(b.status){
                if(b.x<ball.x+ball.radius && b.x+brick.width>ball.x-ball.radius && 
                    ball.y + ball.radius>b.y && ball.y - ball.radius<b.y + brick.height){
                        ball.dy = - ball.dy;
                        b.status = false;
                        score = score+10;
                }
            }
        }
    }
}

function Gamestats(text,textX,textY,img,imgX,imgY){
    ctx.fillStyle = '#FFF';
    ctx.font = '25px Germania One';
    ctx.fillText(text,textX,textY);

    ctx.drawImage(img,imgX,imgY,width =25 , height =25);
}
function loop(){
    ctx.drawImage(background_img,0,0,800,600);
    draw();

    update();

    requestAnimationFrame(loop);
}
loop();

document.addEventListener('keydown', movedown, false);
document.addEventListener('keyup', moveup, false);
