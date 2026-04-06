import { useState } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar.jsx'
import Ghar from './Pages/Ghar.jsx'
import Goals from './Pages/Goals.jsx'
import Present from './Pages/Present.jsx'
import Hobbies from './Pages/Hobbies.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Navbar/>
   <Routes>
    <Route path="/" element={<Ghar/>}/>
    <Route path="/Goals" element={<Goals/>}/>
    <Route path="/Present" element={<Present/>}/>
    <Route path="/Hobbies" element={<Hobbies/>}/>
   </Routes>
    </>
  )
}

export default App
