class DrawQueue{
    constructor(interval){
        this.sequence = [];
        this.interval=interval?interval:50;
    }
    addFunction=(fn)=>{
        if(typeof fn != 'function'){
            throw('only functions can be added to the DrawQueue')
        }
        this.sequence.push(fn);
    };
    execFunctions = ()=>{
        Window.setInterval(
            ()=>{
                const fn = this.sequence.shift();
                if(typeof fn != 'function'){
                    throw('DrawQueue contained element that was not a function')
                }
                fn.call();
            },
            this.interval
        )
    }
}
