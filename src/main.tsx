import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style/tailwind.css'
import 'react-toastify/dist/ReactToastify.css';
import './fontawesome'
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
        <ToastContainer />
    </React.StrictMode>,
)
