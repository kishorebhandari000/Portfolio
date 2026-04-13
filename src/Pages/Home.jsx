import background from '../assets/background.jpeg'

function Home() {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* <div className="absolute inset-0 bg-black/20"></div> */}

      <div className="min-h-screen w-full flex flex-wrap justify-center text-center mx-auto">
        
      <h1 className="text-4xl text-white font-bold">
            This is my Portfolio
          </h1>
          
       </div>
    </div>
  )
}

export default Home