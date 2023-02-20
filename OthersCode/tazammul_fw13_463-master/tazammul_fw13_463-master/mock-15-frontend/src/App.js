import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom"
import Home from './Pages/Home/Home';
import Playzone from './Pages/Playzone/Playzone';
import Result from './Pages/Result/Result';
import Leaderboard from './Pages/Leaderboard/Leaderboard';
function App() {
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/playzone' element={<Playzone />} />
      <Route path='/result' element={<Result />} />
      <Route path='/leaderboard' element={<Leaderboard />} />
     </Routes>
    </div>
  );
}

export default App;
