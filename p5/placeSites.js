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

function generateSites(averageFrequency,connectionFrequecy=0.25,boardWidth=600,boardHeight=300,horizontalDivisions=8,verticalDivisions=4){
    let nextIndex=0;
    let sites = [];
    let xBlockSize = boardWidth/horizontalDivisions;
    let yBlockSize = boardHeight/verticalDivisions;
    let segments = new Array(horizontalDivisions);
    segments.fill(new Array(verticalDivisions));
    for(let col=0;col<horizontalDivisions;col++){
        const xMin = col*xBlockSize;
        for(let row=0;row<verticalDivisions;row++){
            const yMin = row*yBlockSize;
            const numSites = semiGaussianRandom(2,5);
            segments[col][row]=[];
            for(let siteNum=0;siteNum<numSites;siteNum++){
                const xCoord = randInt(xMin,xMin+xBlockSize);
                const yCoord = randInt(yMin,yMin+yBlockSize);
               segments[col][row].push(nextIndex);
               sites.push(new Site(nextIndex++,[],{x:xCoord,y:yCoord},[]))
            }
        }
    }
    for(var col = 0;col<segments.length-1;col++){
        for(let row=0;row<col.lenghth-1;row++){
            segments[col][row].forEach(
                siteIndex=>{
                    for(let i=col;i<col+1;i++){
                        for(let j=row;j<row+1;j++){
                            segments[i][j].forEach(
                                otherSiteIndex=>{
                                    if(Math.random()<connectionFrequecy){
                                        const site = sites[col][row];
                                        const otherSite = sites[i][j];
                                        site.adjacent.push(otherSiteIndex);
                                        otherSite.adjacent.push(siteIndex);
                                    }
                                }
                            )
                        }
                    }
                }
            )
        }
    }
    return sites;
}

