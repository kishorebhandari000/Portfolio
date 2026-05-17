import {Link} from 'react-router-dom'
function Footer(){
  return(
  
<div className="bg-gradient-to-r from-indigo-600/90 to-purple-600/90 text-white py-8 backdrop-blur-sm ">
<div className="max-w-7xl mx-auto px-8 flex justify-end">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-fit text-center">
<div>
  <ul className="space-y-5 text-white text-lg">
<li><Link to="/Register">Register</Link></li>
<li><Link to="/Login">Sign in</Link></li>
<li><Link to="/Contact">Contact Me</Link></li>
</ul>
</div>
<div >
 <ul className="space-y-5 text-white text-lg">
<li><a href="#" className="hover:text-gray-400 transition duration-300">Subscribe</a></li>
<li><a href="#" className="hover:text-gray-400 transition duration-300">Wanna meet ME</a></li>
<li><a href="#"  className="hover:text-gray-400 transition duration-300">Access My Resume</a></li>
</ul>
</div>
<div>
   <ul className="space-y-5 text-white text-lg">
<li><a href="#" className="hover:text-gray-400 transition duration-300">Facebook</a></li>
<li><a href="#" className="hover:text-gray-400 transition duration-300">GitHub</a></li>
<li><a href="#"  className="hover:text-gray-400 transition duration-300">Reddit</a></li>
</ul>
</div>
</div>
</div>

<h1 className="text-center text-white font-bold text-xl mt-6">@Copyright Reserved Kishore2026</h1>
  </div>
  )
}
export default Footer 