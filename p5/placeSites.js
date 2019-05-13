const randInt=()=> {
    let max, min = 0;
    if (arguments.length == 2) {
        min = arguments[0];
        max = arguments[1];
    } else {
        max = arguments[0];
    }
}
siteCoords(topLeft, bottomRight){

}



semiGaussianRandom=(min,max,depth=4)=>{
    let total=0;
    for(let i=0;i<depth;i++){
        total+=randInt(min,max);
    }
    return Math.floor(total/depth);
}

function generateSites(averageFrequency,boardWidth=600,boardHeight=300,hDiv=8,vDiv=4){
    let lastIndex=0;
    let sites = [];
    let xBlockSize = boardWidth/hDiv;
    let yBlockSize = boardHeight/vDiv
    for(let xMin=0;xMin<boardWidth;xMin+=hDiv){
        for(let yMin=0;yMin<boardHeight;yMin+=vDiv){
            const numSites = semiGaussianRandom(2,5);
            for(let siteNum=0;siteNum<numSites;siteNum++){
                const xCoord = randInt(xMin,xMin+xBlockSize);
                const yCoord = randInt(yMin,yMin+yBlockSize);
                sites.push(new Site(lastIndex++,[],{x:xCoord,y:yCoord},[]))
            }
        }
    }
    //todo 190513: create adjacents
    return sites;
}

