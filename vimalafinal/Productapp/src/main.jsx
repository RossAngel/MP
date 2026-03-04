import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"

import App from './App.jsx'

// CSS
import "./assets/styles/global.css"
import "./assets/styles/navbar.css"
import "./assets/styles/products.css"
import "./assets/styles/forms.css"
import "./assets/styles/dashboard.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)