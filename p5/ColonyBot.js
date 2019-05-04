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

    rotateToNext=()=>{
        this.sprite.rotation=this.mapBoard.getAngleByIndex(this.currentSiteNumber, this.nextSiteNumber);
    };

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
            this.rotateToNext();
            this.nextCommand();
        } else if(this.isAtNextSite()){
            this.currentSiteNumber=this.nextSiteNumber;
            //fixme 190504: conceptual problem: what's the next site by default?
            this.moving=false;
        }
    };

    turn=(amount)=>{
        const currentSite = this.mapBoard.sites[this.currentSiteNumber];
        const numAdj = currentSite.adjacent.length;
        this.nextSiteNumber = currentSite.adjacent[((this.currentSiteNumber%numAdj)+amount)%numAdj];
        this.rotateToNext();
        this.nextCommand();
    };

    turnLeft=()=>{
        this.turn(-1);
        this.nextCommand();
    };

    turnRight=()=>{
        this.turn(1);
        this.nextCommand();
    };

    moveForward=()=>{
        this.sprite.setSpeed(this.speed,this.sprite.rotation);
        this.moving = true;
    };
    moveBackward=()=>{
        this.sprite.setSpeed(-this.speed,this.sprite.rotation);
        this.moving = true;
    };
    nextCommand = () =>{
        if(!this.commandQueue.isEmpty()){
            this.commandQueue.nextCommand();
        }
    };
}
