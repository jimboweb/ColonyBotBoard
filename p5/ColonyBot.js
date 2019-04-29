class ColonyBot{
    constructor(map,location={x:300,y:150}){
        this.map=map;
        this.location=location;
        this.currentSiteNumber = 0;
        const sprite = createSprite(location.x,location.y);
        sprite.setAnimation("shipImage",shipImage);
        sprite.scale=0.2;
        this.sprite = sprite;
        this.nextSiteNumber=1;
        this.speed = 5;
        this.moving = false;
        this.commandQueue = [];
    }

    rotateToNext=()=>{
        this.sprite.rotation=map.getAngleByIndex(this.currentSiteNumber, this.nextSiteNumber);
    };

    isAtNextSite=()=>{
        const nextSite = map.sites[this.currentSiteNumber];
        const xOffset=Math.abs(this.sprite.location.x-nextSite.location.x);
        const yOffset=Math.abs(this.sprite.location.y-nextSite.location.y);
        return(xOffset<5&&yOffset<5);
    };

    draw=()=>{
        if(!this.moving){
            const currentSite = map.sites[this.currentSiteNumber];
            this.location = currentSite.location;
            this.sprite.location = this.location;
            this.rotateToNext();
        } else {
            if(this.isAtNextSite()){
                this.moving=false;
            }
        }
    };

    turn=(amount)=>{
        this.nextSiteNumber = ((this.currentSiteNumber%amount)+amount)%amount;
        this.rotateToNext();
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
        sprite.setSpeed(this.speed,this.sprite.rotation);
        this.moving = true;
        this.nextCommand();
    };
    moveBackward=()=>{
        sprite.setSpeed(-this.speed,this.sprite.rotation);
        this.moving = true;
        this.nextCommand();
    };
    nextCommand = () =>{
        if(this.commandQueue.length>0){
            this.commandQueue.pop()();
        }
    };
}
