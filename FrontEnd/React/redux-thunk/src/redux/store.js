import rootReducer from "./rootReducer";
import { applyMiddleware, createStore } from 'redux';
import { firstWare } from "./Middlewares/console";
export const store = createStore(rootReducer,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    applyMiddleware(firstWare)
    )
