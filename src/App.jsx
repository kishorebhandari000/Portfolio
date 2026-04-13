import { useState } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar.jsx'
import Home from './Pages/Home.jsx'
import Goals from './Pages/Goals.jsx'
import Present from './Pages/Present.jsx'
import Hobbies from './Pages/Hobbies.jsx'
import Footer from './Components/Footer'
import Register from './Pages/Register.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Navbar/>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/Goals" element={<Goals/>}/>
    <Route path="/Present" element={<Present/>}/>
    <Route path="/Hobbies" element={<Hobbies/>}/>
    <Route path="/Register" element={<Register/>}/>
   </Routes>
   <Footer />
    </>
  )
}

export default App
