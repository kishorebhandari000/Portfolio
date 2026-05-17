import {useState,useEffect} from 'react'
import background from '../assets/background.jpeg'
import 'animate.css'
import AOS from 'aos'
import "aos/dist/aos.css"
import image1 from '../assets/image1.jpeg'
import image2 from '../assets/image2.jpeg'
import image3 from '../assets/image3.jpeg'
import image4 from '../assets/image4.jpeg'
import image5 from '../assets/image5.jpeg'

function Home(){
const images=[image1,image2,image3,image4]
const[currentIndex,setCurrentIndex]=useState(0)

useEffect(()=>{
const interval= setInterval(()=>{
setCurrentIndex((prev)=>(prev+1)%images.length)},2000)
return()=>clearInterval(interval)
},[images.length]
)
const nextSlide=()=>{
setCurrentIndex((prev)=>(prev+1)%images.length)
}
const prevSlide=()=>{
setCurrentIndex((prev)=>(prev-1+images.length)%images.length)
}
useEffect(()=>{
  AOS.init({
    duration:2000,
    easing:"ease-in-out",
    once:false,
    mirror:true
  })
},[])
  return (
    <>
    <div
      className="relative min-h-screen w-full bg-cover bg-no-repeat bg-center px-6 md:px-20 py-20"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* <div className="absolute inset-0 bg-black/30"></div> */}

      <div className="relative z-10 max-w-7xl">
        <div className="text-left">
          <h1 className="text-5xl font-bold text-white">This is About me</h1>
          <h1 className="text-5xl font-bold text-white mt-2">Who am I?</h1>
          <p className="text-gray-200 mt-4">
            Learning the full stack development
          </p>

          <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700">
            Get started
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mt-12">
          <div className="md:col-span-1 space-y-10">
            <div>
              <h1 className="text-5xl font-bold text-white">At home</h1>
              <p className="text-2xl text-gray-200 mt-4">100% hardwork</p>
            </div>

            <div>
              <h1 className="text-5xl font-bold text-white">At School</h1>
              <p className="text-2xl text-gray-200 mt-4">0000% hardwork</p>
            </div>
          </div>

        <div className="md:col-span-2 flex flex-col items-center">
            <img
              src={images[currentIndex]}
              alt={`slide-${currentIndex + 1}`}
              className="w-full max-w-3xl h-[450px] md:h-[500px] object-cover rounded-xl shadow-lg"
            />

            <div className="flex gap-4 mt-4">
              <button
                onClick={prevSlide}
                className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30"
              >
                Prev
              </button>

              <button
                onClick={nextSlide}
                className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30"
              >
                Next
              </button>
            </div>

            <div className="flex gap-2 mt-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentIndex === index ? 'bg-white' : 'bg-white/40'
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>


{/* Another hero section */}
    <div className="min-h-screen w-full flex items-center py-16 px-15 ">
      <div className="max-w-7xl 2-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
      <div data-aos="fade-right" data-aos-delay="400" className="grid grid-cols-1 gap-6">
        <img 
        src={image4} alt="image4" className="w-full h-80 object-cover rounded-xl shadow-lg"
        />
         <img 
        src={image5} alt="image4" className="w-full h-80 object-cover rounded-xl shadow-lg"
        />
        </div>
        <div>
      <p data-aos="fade-right" data-aos-once="true" className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-bold font-mono text-2xl">About My specialties</p>
      <h1 data-aos="fade-left" data-aos-delay="200" className="text-indigo-500 font-bold text-5xl mt-3">Really, do you think I have One</h1>
            <p className="text-black font-semibold italic font-mono text-xl mt-4">I am a practical and motivated IT student with strong skills in programming, database design, and system development. </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <ul className="list-disc pl-6 space-y-3 text-lg text-black">
        <li>I have experience with Java, React, and SQL.</li>
        <li>I have good problem-solving abilities.</li>
        <li>I can organise tasks, communicate effectively. </li>
        </ul>
      
        <ul className="list-disc pl-6 space-y-3 text-lg text-black">
        <li>I am also disciplined and hardworking.</li>
        <li>I am continuously improving my skills in areas like Python, AI.</li>
        <li>I am comfortable using tools like GitHub, VS Code.</li>
      </ul>
       <button className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700">
            Know more About me!
          </button>
      </div>
      </div>
      </div>
    </div>
    </>
  )
}

export default Home