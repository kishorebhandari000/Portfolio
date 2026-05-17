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
import ProductState from "./context/ProductState.jsx"
import ShowDetails from './Pages/ShowDetails.jsx'
import Cart from './Pages/Cart.jsx'
import Login from './Pages/Login.jsx'
import Contact from './Pages/Contact.jsx'
import Profile from "./Pages/Profile.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ProductState>
   <Navbar/>
   
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/Goals" element={<Goals/>}/>
    <Route path="/Present" element={<Present/>}/>
    <Route path="/Hobbies" element={<Hobbies/>}/>
    <Route path="/Register" element={<Register/>}/>
    <Route path="/product/:id" element={<ShowDetails/>}/>
    <Route path="/Cart" element={<Cart/>}/>
    <Route path="/Login" element={<Login/>}/>
<Route path="/Contact" element={<Contact/>}/>
<Route path="/Profile" element={<Profile />} />


   </Routes>
  
   <Footer />
   </ProductState>
    </>
  )
}

export default App
