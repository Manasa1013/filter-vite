import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";

import { Signup } from "./Components/Signup";
import { Posts } from './Components/Posts';
import { Toast } from './Components/Toast';
import { useToast } from './Contexts/ToastContext';
import './App.css'


function App() {
  const { open, hideToast } = useToast();
  useEffect(() => {
    let timer : number = setTimeout(() => {  
      if (open) hideToast();
    }, 3000)
    return () => clearTimeout(timer)
  },[open,hideToast])
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/posts" element={<Posts />}></Route>
          <Route path="*" element={<Signup />}></Route>
        </Routes>
        <Toast message={"Error at fields"} />

      </div>
    </>
  )
}

export default App;
