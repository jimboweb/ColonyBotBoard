

let shipImage, ship;

function preload(){
    shipImage = loadAnimation("img/mover.svg");
}

function setup(){
    background(0,0,0);
    let canvas = createCanvas(600,300);
    canvas.parent('board');
    ship=createSprite(300,150);
    ship.addAnimation("shipImage",shipImage);
    ship.scale= 0.2;
    frameRate(5);
    noLoop();
    const boardMap = getPregeneratedMap();
    drawMap(boardMap);

}

function draw(){
    drawSprites();
}


function drawMap(map){
    const drawSite=(location)=>{
        fill(255,255,0);
        ellipse(location.x,location.y,20,20);
    };
    const drawRoad = (fromLoc, toLoc)=>{
        stroke(255,0,0);
        strokeWeight(4);
        line(fromLoc.x,fromLoc.y,toLoc.x,toLoc.y)
    }
    map.sites.forEach(site=>{drawSite(site.location)});
    map.roads.forEach(road=>{
        const fromSite = map.sites[road.sites[0]];
        const toSite= map.sites[road.sites[1]];
        drawRoad(fromSite.location, toSite.location);
    })
}




function moveForward(sprite){
    let dir = ship.rotation* (Math.PI / 180);
    let deltaX = Math.cos(dir)*5;
    let deltaY = Math.sin(dir)*5;
    let newX = ship.position.x + deltaX;
    let newY = ship.position.y + deltaY;
    ship.position.x=newX;
    ship.position.y=newY;
    redraw();
}

function moveBackward(sprite){
    let dir = ship.rotation* (Math.PI / 180);
    let deltaX = Math.cos(dir)*5;
    let deltaY = Math.sin(dir)*5;
    let newX = ship.position.x - deltaX;
    let newY = ship.position.y - deltaY;
    ship.position.x=newX;
    ship.position.y=newY;
    redraw();
}

function turnLeft(sprite){
    let newDir=ship.rotation-90;
    ship.rotation=newDir;
    redraw();
}

function turnRight(sprite){
    let newDir=ship.rotation+90;
    ship.rotation=newDir;
    redraw();
}


