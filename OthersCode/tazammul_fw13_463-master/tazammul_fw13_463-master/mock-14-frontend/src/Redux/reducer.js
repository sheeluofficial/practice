import {START_QUIZ, STORE_SCORE} from "./actionTypes"

const init = {
    name: "",
    category:"",
    difficulty:"",
    amount:0,
    correctAnswer:null,
    accuracy:null,
}

const reducer = (state=init, action)=>{
    switch(action.type)
    {
        case START_QUIZ: 
             return {name:action.payload.name, category:action.payload.category, difficulty:action.payload.difficulty, amount:action.payload.amount, corectAnswer:null, accuracy:null}
        
        case STORE_SCORE: 
        console.log(action.payload)
             return {...state, correctAnswer:action.payload.correctAnswer, accuracy:action.payload.accuracy}

        default:
             return state;
    }
}

export {reducer}