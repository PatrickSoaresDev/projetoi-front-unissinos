import React, { useState } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'


import CreateAccount from './pages/Login/Register'
import { RequireAuth } from './contexts/Auth/RequireAuth'
import { AuthProvider } from './contexts/Auth/AuthProvider'
import { PageProvider } from './contexts/Page/PageProvider'

const AppRoutes = () => {
    return (
        <Router>
            <AuthProvider>
                <PageProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<CreateAccount />} />
                        <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
                    </Routes>
                </PageProvider>
            </AuthProvider>
        </Router>
    )
}

export default AppRoutes