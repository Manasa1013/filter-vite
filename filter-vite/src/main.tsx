import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom"

import App from './App.tsx'
import { ToastProvider } from './Contexts/ToastContext.tsx'
import { FormProvider } from './Contexts/FormContext.tsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <ToastProvider>
        <FormProvider>
          <App />
        </FormProvider>
      </ToastProvider>
    </Router>
  </React.StrictMode>,
)
