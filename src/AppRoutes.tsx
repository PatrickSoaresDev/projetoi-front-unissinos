import React, { useState } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'

import { AuthProvider } from './contexts/AuthProvider'
import { RequireAuth } from './contexts/RequireAuth'
import CreateAccount from './pages/Login/Register'

const AppRoutes = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<CreateAccount />} />
                    <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default AppRoutes