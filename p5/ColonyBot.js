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
        //fixme 190510: this still isn't quite right because it'll skip the first road to the right
        const posDegrees = (degrees)=>(degrees%360+360)%360
        const adjSites = this.mapBoard.sites[this.currentSiteNumber].adjacent;
        const clockAngle = posDegrees(this.sprite.rotation);
        const getPositionInAngles = (clockAngle,angles)=>{
            const posAngles = angles.map(posDegrees);
            posAngles.forEach(
                (angle,index)=>{if (angle>clockAngle){return index}}
            );
            return posAngles.length+1;
        }
        if (amount!==0){
            const positionInAngles = getPositionInAngles(clockAngle,adjSites.map(
                adjSite=>adjSite.angle)
                .map(posDegrees)
            );
            const newPosition = (positionInAngles+amount%adjSites.length+adjSites.length)%adjSites.length
                                        + angle>0?-1:0;
            this.sprite.rotation=adjSites[newPosition].angle;
        }
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
