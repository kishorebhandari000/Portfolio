import { Link } from 'react-router-dom'
import logok from '../assets/logok.png'
import {HiHome, HiUser,HiLightBulb, HiHeart} from 'react-icons/hi'
function Navbar(){
  return(
<nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white top-0 sticky absolute z-111 px-6 py-5">
  <div className="mx-auto flex items-center  justify-between">
    <div className="flex items-center gap-2">
    <img src={logok} alt="logo" className="w-12 h-12 object-contain rounded-full border-2 border-white "/>
    <h1 className="text-2xl !text-white">KB</h1>
    </div>
    <div className="flex gap-6">
      <Link to="/" className="flex items-center gap-1 hover:text-gray-300"><HiHome/>Home</Link>
      <Link to="/Hobbies" className="flex items-center gap-1 hover:text-gray-300"><HiHeart/>Hobbies</Link>
      <Link to="/Present" className="flex items-center gap-1 hover:text-gray-300"><HiUser/>Present</Link>
      <Link to="/Goals" className="flex items-center gap-1 hover:text-gray-300"><HiLightBulb/>Goals</Link>
    </div>
    <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition duration-300">
           My Projects
          </button>
  </div>
</nav>
  )
}
export default Navbar