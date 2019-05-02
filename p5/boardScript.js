

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
    colonyBot.rotateToNext();
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
    background(255,255,255);
    drawMap(colonyBot.mapBoard);
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
    };
    mapBoard.sites.forEach(site=>{drawSite(site.location)});
    mapBoard.roads.forEach(road=>{
        const fromSite = mapBoard.sites[road.sites[0]];
        const toSite= mapBoard.sites[road.sites[1]];
        drawRoad(fromSite.location, toSite.location);
    })
}




