
const clickPower = (level: number) => {
  return level;
};

const GetPowerCost = (level:number) =>{
    return(10*level)
}

const BuyUpgrade = (level:number,cost:number,score:number) =>{
    let x = [0,0];
    x[0] = level + 1;
    x[1] = score - cost;
    return x;
}

const GetAutoPowerCost = (level:number) =>{
    if(level){
        return(5*level)
    }
    else{
        return(5)
    }  
}

const AutoClickPower = (level: number) => {
  return level;
};

const AutoClick = (score: number, level: number) => {
    score = score + AutoClickPower(level);
    return score;
};

const GetAutoRateCost = (level:number) =>{
    if(level){
        return(5*level)
    }
    else{
        return(5)
    } 
}


export {clickPower,AutoClickPower,AutoClick,GetPowerCost,GetAutoPowerCost,GetAutoRateCost,BuyUpgrade };