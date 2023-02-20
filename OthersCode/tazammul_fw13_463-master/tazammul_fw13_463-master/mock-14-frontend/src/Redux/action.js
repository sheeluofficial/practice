import { START_QUIZ, STORE_SCORE } from "./actionTypes"

const startQuiz = (payload)=>{
    return {
        type:START_QUIZ,
        payload
    }
}

const storeScore = (payload)=>{
    return {
        type:STORE_SCORE,
        payload
    }
}


export {startQuiz, storeScore}