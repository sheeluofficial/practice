//ACTION TYPES
export const INCREASE_COUNT = "INCREASE_COUNT";
export const DECREASE_COUNT = "DECREASE_COUNT";
export const RESET_COUNT = "RESET_COUNT";

//ACTION CREATOR

export const increaseCount = (payload=1)=>{
    return {type:INCREASE_COUNT,payload}
}
export const decreaseCount = (payload=1)=>{
    return {type:DECREASE_COUNT,payload}
}
export const resetCount = ()=>{
    return {type:RESET_COUNT}
}

