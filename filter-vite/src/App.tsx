import { useState, useEffect } from 'react'
import { Signup } from "./Components/Signup";

import './App.css'
import { useToast } from './Contexts/ToastContext';

function App() {
  const [count, setCount] = useState(0);
  const { toast, toggleToast } = useToast()
  useEffect(() => {
    setTimeout(() => {  
      toggleToast();
    },2000)
  },[toast])
  return (
    <>
      <div>
        <Signup />
      </div>
    </>
  )
}

export default App;
