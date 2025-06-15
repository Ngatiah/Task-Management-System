// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import {Theme} from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Theme>
    <App />
  </Theme>
  </BrowserRouter>,
)
