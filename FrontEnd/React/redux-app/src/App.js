
import './App.css';
import {useSelector,useDispatch} from "react-redux"
import { increaseCount } from './redux/Counter/action';
import { addTodo } from './redux/Todo/action';
function App() {
  const store = useSelector((store)=>store)
const dispatch = useDispatch()
  console.log(store,"in app")
  return (
    <div className="App">
      <button onClick={()=>{
        dispatch(increaseCount(1))
      }}>count</button>

      <button onClick={()=>{
    dispatch(addTodo("added todo"))
      }}>todo</button>
    </div>
  );
}

export default App;
