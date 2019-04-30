class CommandQueue{
    constructor(/*interval*/){
        this.sequence = [];
        //this.interval=interval?interval:50;
    }
    addCommand=(fn)=>{
        if(typeof fn != 'function'){
            throw('only functions can be added to the CommandQueue')
        }
        this.sequence.push(fn);
    };

    nextCommand=()=>{
        this.sequence.pop()();
    }

    // execFunctions = ()=>{
    //     Window.setInterval(
    //         ()=>{
    //             const fn = this.sequence.shift();
    //             if(typeof fn != 'function'){
    //                 throw('CommandQueue contained element that was not a function')
    //             }
    //             fn.call();
    //         },
    //         this.interval
    //     )
    // }
}
