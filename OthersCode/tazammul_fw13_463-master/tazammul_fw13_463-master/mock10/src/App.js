import logo from './logo.svg';
import './App.css';
import {Route,Routes} from 'react-router-dom'
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import AddNote from './Components/AddNote';
import Note from './Components/Note';

function App() {
  return (
    <div className="App">
      <Navbar />
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='add-note' element={<AddNote />} />
      <Route path='notes' element={<Note />} />
      {/* <Route path='Leaderboard' element={<Leaderboard />} />
      <Route path='/' element={<Home />} /> */}
    </Routes>
    </div>
  );
}

export default App;
