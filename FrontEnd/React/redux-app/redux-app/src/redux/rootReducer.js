import { combineReducers } from "redux";
import { todoReducer } from "./Todo/reducer";
import { counterReducer } from "./Counter/reducer";

const rootReducer = combineReducers({
    todo:todoReducer,
    count:counterReducer
});


export default rootReducer;
