import hero from '../assets/Hero.jpg'
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
    <div>
      <div className="w-full max-w-full min-h-96 hero bg-cover bg-center bg-no-repeat" style={{backgroundImage:`url(${hero})`}}>
        <div className="hero-content text-center text-white">
          <h1 className="text-4xl font-bold py-12 pb-1.5 animate-typing">Welcome to ALLNONEASSETS</h1>
          <p className="text-lg mt-0">We provide the best services for land,house and vehicle properties</p>
          <button className="bg-gray-400 hover:bg-amber-300 text-white font-bold py-2 px-4 rounded mt-4 *:transition duration-500"><Link to="/about-us">Learn More</Link></button>
          </div>
      </div>
    </div>
  )
}

export default Hero
