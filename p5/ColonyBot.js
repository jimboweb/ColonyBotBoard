class ColonyBot{
    constructor(map,location={x:300,y:150}){
        this.mapBoard=map;
        this.location=location;
        this.currentSiteNumber = 0;
        const sprite = createSprite(location.x,location.y);
        sprite.addAnimation("shipImage",shipImage);
        sprite.scale=0.2;
        this.sprite = sprite;
        this.nextSiteNumber=1;
        this.speed = 5;
        this.moving = false;
        this.commandQueue = new CommandQueue();
    }

    addCommand=(fn)=>this.commandQueue.addCommand(fn);


    isAtNextSite=()=>{
        const nextSite = this.mapBoard.sites[this.nextSiteNumber];
        const xOffset=Math.abs(this.sprite.position.x-nextSite.location.x);
        const yOffset=Math.abs(this.sprite.position.y-nextSite.location.y);
        const distToNextSite = Math.hypot(xOffset,yOffset);
        return(distToNextSite<5);
    };

    draw=()=>{
        if(!this.moving){
            const currentSite = this.mapBoard.sites[this.currentSiteNumber];
            this.location = {x:currentSite.location.x,y:currentSite.location.y};
            this.sprite.position = this.location;
            this.nextCommand();
        } else if(this.isAtNextSite()){
            this.currentSiteNumber=this.nextSiteNumber;
            //fixme 190504: conceptual problem: what's the next site by default?
            this.moving=false;
            this.nextCommand();
        }
    };

    turn=(amount)=>{
        const clockMod = (val, modulus)=>(val%modulus+modulus)%modulus;
        const posDegrees = degrees=>clockMod(degrees,360);
        const adjSites = this.mapBoard.sites[this.currentSiteNumber].adjacent
            .map(adj=>Object.assign({index: adj.index,angle:posDegrees(adj.angle)}))
            .sort((a1,a2)=>a1.angle-a2.angle);
        const clockAngle = posDegrees(this.sprite.rotation);
        const getPositionInAngles = (clockAngle,adj)=>{
            return adj
                    .map(adjSite=>adjSite.angle)
                    .concat(clockAngle)
                    .sort()
                    .indexOf(clockAngle);
        }
        if (amount!==0){
            const positionInAngles = getPositionInAngles(clockAngle,adjSites);
            const newPosition = clockMod(positionInAngles+amount>0?-1:0,adjSites.length);
            this.nextSiteNumber=adjSites[newPosition].index;
            this.sprite.rotation=adjSites[newPosition].angle;
        }
        this.sprite.setSpeed(5,this.sprite.rotation);
        this.moving=true;
    };

    turnLeft=(amount)=>{
        this.turn(amount?-amount:-1);
    };

    turnRight=(amount)=>{
        this.turn(amount?amount:1);
    };

    nextCommand = () =>{
        if(!this.commandQueue.isEmpty()){
            this.commandQueue.nextCommand();
        }
    };
}
