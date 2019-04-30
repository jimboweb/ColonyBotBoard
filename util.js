function isArrayOfType(arr,type,expectedLength){
    if(!arr.length||(expectedLength&&arr.length!==expectedLength)){
        return false;
    }
    const isAllOfType=(rtrn,val)=>val instanceof type?rtrn:false;
    return arr.reduce(
        isAllOfType,true
    )
}
