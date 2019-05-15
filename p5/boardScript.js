

let shipImage, ship,colonyBot;

function preload(){
    shipImage = loadAnimation("img/mover.svg");
}

function setup(){
    let canvas = createCanvas(600,300);
    background(255,255,255);
    const mapBoard = createMap();
    //fixme 190515: for some reason when it gets to mapBoard all the sites over 16 have undefined locations even though they are there before it's returned...
    drawMap(mapBoard);
    canvas.parent('board');
    colonyBot = new ColonyBot(mapBoard);
    // colonyBot.addCommand((colonyBot.turnLeft));
    // colonyBot.addCommand(colonyBot.turnRight);
    // colonyBot.addCommand(colonyBot.turnRight);
    //todo 190509: problem here is that nextCommand() will probably run before the blocks evaluate, need to do something about that
    //colonyBot.nextCommand();
    //noLoop();

}

function draw(){
    background(255,255,255);
    drawMap(colonyBot.mapBoard);
    drawSprites();
    colonyBot.draw();
}


function drawMap(mapBoard){
    const drawSite=(site)=>{
        const location = site.location;
        fill(255,255,0);
        stroke(0,0,0);
        ellipse(location.x,location.y,20,20);
        textSize(16);
        fill(0,0,0);
        stroke(255,255,255);
        text(site.index,location.x,location.y)
    };
    const drawRoad = (fromLoc, toLoc)=>{
        stroke(255,0,0);
        strokeWeight(4);
        line(fromLoc.x,fromLoc.y,toLoc.x,toLoc.y);
        const halfwayBetween = (x1,y1,x2,y2)=>{return {x:(x2-x1)/2,y:(y2-y1)/2}};
    };
    mapBoard.sites.forEach(site=>{drawSite(site)});
    mapBoard.roads.forEach(road=>{
        const fromSite = mapBoard.sites[road.sites[0]];
        const toSite= mapBoard.sites[road.sites[1]];
        drawRoad(fromSite.location, toSite.location);
    })
}




