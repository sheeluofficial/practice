import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login.jsx"
import Dashboard from "./Dashboard"
import SingleRestaurantPage from "./SingleRestaurantPage"
import PrivateRoute from "../Components/PrivateRoute";
function AllRoutes() {
  return (
    <div>
      <Home></Home>
      <Routes>
        {/* <Route path="/" element={<Home></Home>}/> */}
        <Route path="/login" element={<Login></Login>}/>
        <Route path="/dashboard" element={<PrivateRoute><Dashboard></Dashboard></PrivateRoute>}/>
        <Route path="/restaurants/:id" element={<PrivateRoute><SingleRestaurantPage></SingleRestaurantPage></PrivateRoute>}/>
      </Routes>
    </div>
  );
}

export default AllRoutes;
