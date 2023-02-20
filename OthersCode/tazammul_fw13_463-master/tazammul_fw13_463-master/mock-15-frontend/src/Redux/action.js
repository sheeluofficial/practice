import { START_GAME, STORE_SCORE } from "./actionTypes"

const startGame = (payload)=>{
    return {
        type:START_GAME,
        payload
    }
}

const storeScore = (payload)=>{
    return {
        type:STORE_SCORE,
        payload
    }
}


export {startGame, storeScore}