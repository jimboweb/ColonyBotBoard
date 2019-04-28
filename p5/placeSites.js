function siteCoords(origin, distStart, distEnd, angleStart,angleEnd){
    const randInt=(max,min=0)=>{
        const range = max-min;
        return Math.floor(Math.random()*range)+min;
    }
    const dist = randInt(distEnd,distStart);
    const angle = randInt(angleEnd,angleStart);
    const xCoord = origin.x+Math.round(Math.cos(angle)*dist);
    const yCoord = origin.y+Math.round(Math.sin(angle)*dist);
    return {x:xCoord,y:yCoord};
}
