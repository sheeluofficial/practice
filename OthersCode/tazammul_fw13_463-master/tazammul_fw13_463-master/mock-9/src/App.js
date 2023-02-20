import logo from './logo.svg';
import './App.css';

import {Route, Routes} from 'react-router-dom'
import Login from './Components/Login/Login';
import Restaurant from './Components/Restaurant/Restaurant';
import Cart from './Components/Cart/Cart';
import Order from './Components/Order/Order';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Restaurant" element={<Restaurant />}></Route>
        <Route path="/Cart" element={<Cart />}></Route>
        <Route path="/Order" element={<Order />}></Route>
      </Routes>
    </div>
  );
}

export default App;
