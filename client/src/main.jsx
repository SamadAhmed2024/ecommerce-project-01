import React from 'react'
import ReactDOM from 'react-dom/client'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.min.css"
import "react-loading-skeleton/dist/skeleton.css"
import './assets/css/main.css'
import './assets/css/animate.min.css'
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
