import {INCREASE_COUNT,DECREASE_COUNT,RESET_COUNT} from "./action"

const initialState = {
    count:0
}

export const counterReducer = (state=initialState,action)=>{
console.log("state in counter",state)
    switch(action.type){
         case INCREASE_COUNT: return {...state,count:state.count+action.payload};
         case DECREASE_COUNT: return {...state, count:state.count- action.payload};
         case RESET_COUNT: return { ...state, count:0};
         default : return state;
    }

}