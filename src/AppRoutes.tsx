import React, { useState } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes, 
    Navigate
} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'

import { AuthProvider} from './contexts/auth'

const AppRoutes = () => {



    return (
        <Router>
            <AuthProvider>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
            </AuthProvider>
        </Router>
    )
}

export default AppRoutes