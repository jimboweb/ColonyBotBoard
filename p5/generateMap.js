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
    constructor(index, adjacent,location){
        this.index = index;
        this.adjacent = adjacent;
        this.depth=undefined;
        this.location = location?location:{x:undefined,y:undefined};
    }
}

class Road{
    constructor(connectedSites){
        const twoSites = connectedSites.length === 2;
        const isSite=(s) => s instanceof Site;
        const getAngle = (fromPoint,toPoint)=>
        {
            const deltaX = toPoint.x-fromPoint.x;
            const deltaY = toPoint.y-fromPoint.y;
            return Math.atan2(deltaY,deltaX)*180/Math.PI;
        }
        if (!(twoSites && isSite(connectedSites[0]) && isSite(connectedSites[1]))) {
            throw('the sites of a road must be an array of two sites')
        }
        this.sites = [connectedSites[0].index,connectedSites[1].index];
        this.angles = connectedSites.map(
            (thisSite,idx)=> {
                const otherSiteIndex = (idx+1)%2;
                const otherSite = connectedSites[otherSiteIndex];
                return getAngle(thisSite.location,otherSite.location)
            }
        )
    }
}

class Map{
    constructor(sites, roads){
        const getSitesToRoads=(sites, roads)=>{
            let rtrn = new Array(sites.length);
            rtrn.fill([]);
            roads.forEach(
                (road,idx)=>{
                    road.sites.forEach(
                        site=>rtrn[site].concat(idx)
                    )
                }
            )
            return rtrn;
        };

        //todo: make that isArrayOfType thing and test these
        this.sites=sites;
        this.roads=roads;
        this.sitesToRoads = getSitesToRoads(sites,roads);
    }
    getConnectingRoad=(site,idx)=>this.roads(this.sitesToRoads[site][idx]);
    getAngleByIndex=(site,idx)=>{
        const road = this.getConnectingRoad(site,idx);
        const angleIndex= road.sites.indexOf(site);
        if(angleIndex<0){
            throw 'reference error in sitesToRoads array';
        }
        return road.angles[angleIndex];
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
        new Site(0,[1,2,3,5],{x:300,y:150}),
        new Site(1, [10,9,0,6,12],{x:333,y:87}),
        new Site(2,[0,6,3],{x:390,y:210}),
        new Site(3,[0,2,4,15],{x:300,y:210}),
        new Site(4,[3,5,11,14,15],{x:215,y:205}),
        new Site(5,[0,4,12],{x:210,y:90}),
        new Site(6,[1,2,7],{x:423,y:117}),
        new Site(7,[6,8,9,15],{x:480,y:290}),
        new Site(8,[7],{x:540,y:120}),
        new Site(9,[1,7],{x:480,y:30}),
        new Site(10,[1,12],{x:270,y:30}),
        new Site(11,[4,12,13],{x:120,y:120}),
        new Site(12,[1,5,10,11],{x:150,y:30}),
        new Site(13,[11],{x:50,y:213}),
        new Site(14,[4],{x:110,y:270}),
        new Site(15,[3,7,4],{x:270,y:270})
    ];
    let roads = DrawRoads(sites);
    return new Map(sites,roads);

}

