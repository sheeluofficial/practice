import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom"
import Navbar from './Components/Navbar/Navbar';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import AllBlogs from './Components/All_Blogs/AllBlogs';
import MyBlogs from './Components/My_Blogs/MyBlogs';
import WriteBlog from './Components/Write_Blog/WriteBlog';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<LoginSignup />} />
        <Route path='/all-blogs' element={<AllBlogs />} />
        <Route path='/my-blogs' element={<MyBlogs />} />
        <Route path='/write-blog' element={<WriteBlog />} />
      </Routes>
    </div>
  );
}

export default App;
