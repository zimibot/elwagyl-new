import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Logo from "./assets/logo.svg"
import 'antd/dist/reset.css';
import './ant.css'
import './App.css'
import { Toaster } from "react-hot-toast";



ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <App />
        <Toaster></Toaster>
        </>

)

