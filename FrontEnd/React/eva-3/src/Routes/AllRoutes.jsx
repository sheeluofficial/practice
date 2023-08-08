import React from 'react'
import {Route, Routes} from "react-router-dom";
import { PrivateRoute } from '../Components/PrivateRoute';
import { Dashboard } from './Dashboard';
import { Home } from './Home';
import { Login } from './Login';

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
        <Route path='/login' element={<Login />}/>
    </Routes>
  )
}
