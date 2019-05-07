class Queue{
    constructor(){
        this.data=[];
    }
    add(node){
        this.data.push(node);
    }
    remove(){
        return this.data.shift();
    }
    size(){
        return this.data.length;
    }

    isEmpty(){
        return this.size()===0;
    }
}


class Site {
    constructor(index, adjacent,location,angles){
        this.index = index;
        this.adjacent = adjacent.map(
            (adj,idx)=>new AdjacentSite(adj,angles[idx])
        ).sort(
            (first,second)=>first.angle-second.angle
        );
        this.depth=undefined;
        this.location = location?location:{x:undefined,y:undefined};
    }
}

class Road{
    constructor(connectedSites){
        const twoSites = connectedSites.length === 2;
        if (!(twoSites)) {
            throw('the sites of a road must be an array of two sites')
        }
        this.sites = [connectedSites[0].index,connectedSites[1].index];
    }
}

class Map{
    constructor(sites, roads){
        const locations = this.getLocations(sites);
        const angles = this.getAngles(sites, locations);
        //todo: make that isArrayOfType thing and test these
        this.sites=sites.map(
            (site,idx)=>new Site(site.index, site.adjacent, locations[idx],angles[idx])
        );
        this.roads=roads;
    }
    getLocations=(sites) => [
        {x:300,y:150},
        {x:330,y:87},
        {x:390,y:210},
        {x:300,y:210},
        {x:215,y:205},
        {x:210,y:90},
        {x:423,y:117},
        {x:480,y:290},
        {x:540,y:120},
        {x:480,y:30},
        {x:270,y:30},
        {x:120,y:120},
        {x:150,y:30},
        {x:50,y:213},
        {x:110,y:270},
        {x:270,y:270}
    ];

    getAngle = (fromPoint,toPoint)=>
    {
        const deltaX = toPoint.x-fromPoint.x;
        const deltaY = toPoint.y-fromPoint.y;
        return Math.atan2(deltaY,deltaX)*180/Math.PI;
    };

    getAngles =(sites,locations)=>sites.map(
        site=>site.adjacent.map(
            adj=>this.getAngle(locations[site.index],locations[adj])
        )
    )

    getAngleByIndex=(site,idx)=>{
        const thisSite = this.sites[site];
        const otherSite = this.sites[idx];
        return this.getAngle(thisSite.location,otherSite.location);
    };
}

class AdjacentSite{
    constructor(index,angle){
        this.index=index;
        this.angle=angle;
    }
}

function DrawSites(input){
    return input
        .split("\n")
        .filter(notEmpty)
        .map(lineToNumbers)
        .map(arrayToGraphNode)
        .map(addDepth);
}

const addDepth=(site,i,arr)=>Object.assign(site, {depth:shortestPath(arr,site.index,0)})

function DrawMap(input){
    let sites = DrawSites(input);
    let roads = DrawRoads(sites);
    return new Map(sites, roads);
}



function DrawRoads(sites){
    return sites.reduce(
        (roads, site)=>
            {return roads.concat(
                site.adjacent.reduce(
                    (roadsInner,adjCell)=>{
                        return adjCell>site.index?
                            roadsInner.concat(new Road([site,sites[adjCell]])):
                            roadsInner},
                    []
                )
            )},
        []
    )
}

function arrayToGraphNode(arr,i){
    return new Site(i,arr);
}

function lineToNumbers(line){
    return line.split(" ")
        .filter(notEmpty)
        .map(stringToNumber);
}

function stringToNumber(numString){
    return parseInt(numString);
}

function notEmpty(string){
    return string.length>0;
}


const data = `
1 6
0 2 3 8 9
1 3 13
1 2 4
3 5 6
4 7
0 4 7
5 6 8 12
1 7 9
1 8 10 13
9 11
10 12
7 11
2 9
`;



function traceBack(parents, start, end){
    var next = end;
    var path = [];
    path.unshift(next);
    do{
        next = parents[next];
        path.unshift(next);
    } while(next!==start)
    return path;
}

function BFS(graph,start,finish){
    var q = new Queue()
    q.add(start);
    let explored = new Array(graph.length).fill(false);
    explored[start] = true;
    var parents = new Array(graph.length);
    while(!q.isEmpty()){
        current = q.remove();
        for(var n of graph[current].adjacent){
            if(!explored[n]){
                parents[n]=current;
                q.add(n)
                explored[n] = true;
            }
            if(n===finish){
                return parents;
            }
        }
    }
    throw ("no path found");
}

function shortestPath(graph,start, finish){
    if(start===finish){
        return 0;
    }
    const path = BFS(graph,start,finish);
    return traceBack(path,start,finish);
}

function testMap(){
    return DrawMap(data);
}

function getPregeneratedMap(){
     let sites = [
         {index:0,adjacent:[1,2,3,5]},
        {index:1, adjacent:[10,9,0,6,12]},
        {index:2,adjacent:[0,6,3]},
        {index:3,adjacent:[0,2,4,15]},
        {index:4,adjacent:[3,5,11,14,15]},
        {index:5,adjacent:[0,4,12]},
        {index:6,adjacent:[1,2,7]},
        {index:7,adjacent:[6,8,9,15]},
        {index:8,adjacent:[7]},
        {index:9,adjacent:[1,7]},
        {index:10,adjacent:[1,12]},
        {index:11,adjacent:[4,12,13]},
        {index:12,adjacent:[1,5,10,11]},
        {index:13,adjacent:[11]},
        {index:14,adjacent:[4]},
        {index:15,adjacent:[3,7,4]}
    ];
    let roads = DrawRoads(sites);
    return new Map(sites,roads);

}

