import {  useEffect } from 'react'
import { Signup } from "./Components/Signup";

import './App.css'
import { useToast } from './Contexts/ToastContext';
import { Toast } from './Components/Toast';

function App() {
  const { toast, showToast, hideToast } = useToast()
  useEffect(() => {
    let timer : number = setTimeout(() => {  
      if (toast === "open") hideToast();
    }, 3000)
    return () => clearTimeout(timer)
  },[toast,hideToast])
  return (
    <>
      <div>
        <Signup />
        <Toast message={"Error at fields"} />

      </div>
    </>
  )
}

export default App;
