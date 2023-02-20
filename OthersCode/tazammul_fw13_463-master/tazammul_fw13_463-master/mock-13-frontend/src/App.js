import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom"
import LoginSingup from './Components/LoginSingup/LoginSingup';
import Navbar from './Components/Navbar/Navbar';
import AdminForm from './Components/Admin/AdminForm';
import AdminListing from './Components/Admin/AdminListing';
import JobListing from './Components/User/JobListing/JobListing';
import AppliedJobs from './Components/User/AppliedJob/AppliedJobs';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<LoginSingup />} />
        <Route path='/admin-form' element={<AdminForm />} />
        <Route path='/admin-listing' element={<AdminListing />} />
        <Route path='/job-listing' element={<JobListing />} />
        <Route path='/applied-jobs' element={<AppliedJobs />} />
      </Routes>
    </div>
  );
}

export default App;
