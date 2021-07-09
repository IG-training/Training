onload = ()=>{
    const canvas = document.querySelector('#canvas');
    const ctx =canvas.getContext('2d');
    const car= new Image();
    const road = new Image();
    const car1 = new Image();
    const carW = 70;
    const carH = 70;
    let x = 380;
    let y =450;
    let speed = 5;
    let dir = 0;
    let sid=0;
    car.addEventListener('load', ()=>{
        draw();
        window.addEventListener('keydown',keyHandler,false);
        window.addEventListener('keyup',keyHandler,false);
    });
    
    car.src = 'https://png2.cleanpng.com/sh/53bdf378703fb063fd3feb6c9096f959/L0KzQYm3VMIyN6h9fZH0aYP2gLBuTcNlNZRmip98aX34fLL7jCIubKNujtt3Zz32eb78jPF1d6Myi9t2dXzkhLr2jr0zbF5rjeR3aYT4gra0lP9xNadufek2NXHncbTtUsg5O2E2Uag3MUK5Qoa6UcEyPWM5SqoEM0KzRYS9Vr5xdpg=/kisspng-3d-car-simulator-driving-simulator-simulation-2d-furniture-top-view-5adacf28830196.1262531115242893205366.png';
    car1.src = 'https://www.pngfind.com/pngs/m/74-749644_black-car-topview-vector-transparent-library-top-view.png'
    road.src= 'https://ak.picdn.net/shutterstock/videos/28797286/thumb/1.jpg';
    function draw() {
        if(road.complete && car.complete){
            if(x>300  && x<canvas.width-245) {
                console.log(x,y);
                //y += dir*speed;
                x += sid*speed;
            
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.drawImage(road,0,0,1000,700)
                ctx.drawImage(car, x,y,carW,carH);
            }else{
                x=x>306? canvas.width-carW-210:306
               // y=y>1? canvas.width-carH:1
            }

            if(y>0 && y<canvas.height-carH){
                console.log(x,y);
                y += dir*speed;
                //x += sid*speed;
            
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.drawImage(road,0,0,1000,700)
                ctx.drawImage(car, x,y,carW,carH);
            }else{
                //x=x>306? canvas.width-carW:306
                y=y>1? 500:1
            }
            
                

        }
        requestAnimationFrame(draw);
    }
    function keyHandler(e){
        console.log('Event',e);
        switch(e.type){
            case 'keydown':
                switch(e.code){
                    case 'keyW':
                    case 'ArrowUp':
                        dir=-1;
                        break;
                    case 'KeyS':
                    case 'ArrowDown':
                        dir=1;
                        break; 
                    case 'KeyA':
                    case 'ArrowLeft':
                        sid=-1;
                        break;
                    case 'KeyD':
                    case 'ArrowRight':
                        sid=1;
                        break;
                }
                break;
            case 'keyup':
                switch(e.code){
                    case 'keyW':
                    case 'ArrowUp':
                    case 'KeyS':
                    case 'ArrowDown':
                        dir = 0;
                    case 'KeyA':
                    case 'ArrowLeft':
                    case 'KeyD':
                    case 'ArrowRight':
                        sid=0;
                        break;

                }
                break;
        }
    }
};