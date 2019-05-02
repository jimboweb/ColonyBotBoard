

let shipImage, ship,colonyBot;

function preload(){
    shipImage = loadAnimation("img/mover.svg");
}

function setup(){
    let canvas = createCanvas(600,300);
    background(255,255,255);
    const mapBoard = getPregeneratedMap();
    drawMap(mapBoard);
    canvas.parent('board');
    colonyBot = new ColonyBot(mapBoard);
    colonyBot.addCommand(colonyBot.moveForward);
    colonyBot.addCommand((colonyBot.turnLeft));
    colonyBot.addCommand(colonyBot.moveForward);
    colonyBot.addCommand(colonyBot.moveForward);
    colonyBot.addCommand(colonyBot.turnRight);
    colonyBot.addCommand(colonyBot.turnRight);
    colonyBot.addCommand(colonyBot.moveForward);
    colonyBot.nextCommand();
    //noLoop();
}

function draw(){
    drawSprites();
    colonyBot.draw();
}


function drawMap(mapBoard){
    const drawSite=(location)=>{
        fill(255,255,0);
        ellipse(location.x,location.y,20,20);
    };
    const drawRoad = (fromLoc, toLoc)=>{
        stroke(255,0,0);
        strokeWeight(4);
        line(fromLoc.x,fromLoc.y,toLoc.x,toLoc.y)
        const drawSite=(location)=>{
            fill(255,255,0);
            ellipse(location.x,location.y,20,20);
        };
    };
    mapBoard.sites.forEach(site=>{drawSite(site.location)});
    mapBoard.roads.forEach(road=>{
        const fromSite = mapBoard.sites[road.sites[0]];
        const toSite= mapBoard.sites[road.sites[1]];
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


