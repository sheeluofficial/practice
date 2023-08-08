
import './App.css';
import {Route,Routes} from "react-router-dom"
import Home from "./components/Home.jsx"
// import About from "./components/About.jsx"
import Navbar from './components/Navbar';
import OrderSummary from './components/OrderSummary';
import NoMatch from './components/NoMatch';
import Products from './components/Products';
import Featured from './components/Featured';
import New from './components/New';
import Users from './components/Users';
import UserDetails from './components/UserDetails';
import React from 'react';
import Profile from './components/Profile';
import Login from './components/Login';
import RequireAuth from './components/RequireAuth';

const AboutComp = React.lazy(()=>{
  return import("./components/About")
})
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
     <Routes>
      <Route path='users' element={<Users></Users>}></Route>
      <Route path='login' element={<Login></Login>}></Route>
     
<Route path='profile' element={ <RequireAuth><Profile></Profile> </RequireAuth>} />
     
      
      <Route path='/' element={<Home></Home>}/>
      <Route path='about' element={<React.Suspense fallback="loading"><AboutComp></AboutComp></React.Suspense>}/>
      <Route path='order-summary' element={<OrderSummary>
        
      </OrderSummary>}> </Route>
      <Route path='products' element={<Products></Products>}>
        <Route index element={<Featured></Featured>}/> 
        <Route path="featured" element={<Featured></Featured>}/>
        <Route path="new" element={<New></New>}/>
      </Route>
      <Route path="users/:userId" element={<UserDetails></UserDetails>}></Route>
      <Route path='*' element={<NoMatch></NoMatch>}/>

      <Route/>
     </Routes>
    </div>
  );
}

export default App;
