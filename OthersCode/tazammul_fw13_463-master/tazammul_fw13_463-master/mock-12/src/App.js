import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom"
import LoginSignup from './Components/LoginSignup/LoginSignup';
import Navbar from './Components/Navbar/Navbar';
import Students from './Components/Students/Students';
import AddStudent from './Components/AddStudent/AddStudent';
import SearchStudent from './Components/SearchStudents/SearchStudent';

function App() {
  return (
    <div className="App">
      <Navbar />
     <Routes>
        <Route path='/' element={<LoginSignup />} />
        <Route path='/students' element={<Students />} />
        <Route path='/add-student' element={<AddStudent />} />
        <Route path='/search-students' element={<SearchStudent />} />
      </Routes>
    </div>
  );
}

export default App;
