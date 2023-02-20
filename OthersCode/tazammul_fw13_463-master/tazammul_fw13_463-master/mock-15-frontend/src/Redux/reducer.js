import {START_GAME, STORE_SCORE} from "./actionTypes"

const init = {
    name: "",
    difficulty:"",
    score:0
}

const reducer = (state=init, action)=>{
    switch(action.type)
    {
        case START_GAME: 
             return {...state, name:action.payload.name, difficulty:action.payload.difficulty}
        
        case STORE_SCORE: 
             return {...state, score:action.payload.score}

        default:
             return state;
    }
}

export {reducer}