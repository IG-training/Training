var canvas,
    context,
    dragging = false,
    dragStartLocation,
    snapshot;

let draw_color='black';
let draw_width = '2';


function getCanvasCoordinates(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;

    return {x: x, y: y};
}

function takeSnapshot() {
    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreSnapshot() {
    context.putImageData(snapshot, 0, 0);
}
function drawl(position){
    
    context.lineTo(position.x,position.y);
    context.strokeStyle = draw_color;
    context.lineWidth=draw_width;
    context.lineCap='round';
    context.lineJoin='round';
    context.stroke();
    
}

function drawLine(position) {
    context.beginPath();
    context.moveTo(dragStartLocation.x, dragStartLocation.y);
    context.lineTo(position.x, position.y);
    context.stroke();
}

function drawCircle(position) {
    var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2));
    context.beginPath();
    context.arc(dragStartLocation.x, dragStartLocation.y, radius, 0, 2 * Math.PI, false);
}

function drawPolygon(position, sides, angle) {
    var coordinates = [],
        radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2)),
        index = 0;

    for (index = 0; index < sides; index++) {
        coordinates.push({x: dragStartLocation.x + radius * Math.cos(angle), y: dragStartLocation.y - radius * Math.sin(angle)});
        angle += (2 * Math.PI) / sides;
    }

    context.beginPath();
    context.moveTo(coordinates[0].x, coordinates[0].y);
    for (index = 1; index < sides; index++) {
        context.lineTo(coordinates[index].x, coordinates[index].y);
    }

    context.closePath();
}

function draw(position) {

        shape = document.querySelector('input[type="radio"][name="shape"]:checked').value;
    if (shape === "circle") {
        drawCircle(position);
    }
    if (shape === "line") {
        drawLine(position);
    }

    if (shape === "polygon") {
        drawPolygon(position, 8, Math.PI / 4);
    }

    if (shape === "Square") {
        drawPolygon(position, 4, Math.PI / 4);
    }
   
    if (shape === "Triangle") {
        drawPolygon(position, 3 , Math.PI / 4);
    }

    if (shape === "Hexagon") {
        drawPolygon(position, 10 , Math.PI / 4);
    }

    if (shape ==="cursor"){
        drawl(position);
    }
   
    
    context.stroke();
    
}

function dragStart(event) {
    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
    takeSnapshot();
    event.preventDefault();
}

function drag(event) {
    var position;
    if (dragging === true) {
        restoreSnapshot();
        position = getCanvasCoordinates(event);
        draw(position, "polygon");
    }
    event.preventDefault()
}

function dragStop(event) {
    dragging = false;
    restoreSnapshot();
    var position = getCanvasCoordinates(event);
    draw(position, "polygon");
    event.preventDefault();
}

function stop(event){
    if(dragging){
        context.stroke();
        context.closePath();
        dragging=false;
        
    }
    event.preventDefault();
}



function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');
    context.strokeStyle = '';
    context.fillStyle = '';
    context.lineWidth = 2;
    context.lineCap = '';


    canvas.addEventListener('mousedown', dragStart, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseup', dragStop, false);
    canvas.addEventListener('touchend',stop,false);
    canvas.addEventListener('mouseout',stop,false);
    canvas.addEventListener('touchstart',dragStart,false);
}

window.addEventListener('load', init, false);
