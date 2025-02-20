import Hero  from '../components/Hero'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Testimonial from '../components/Testimonial'
import Contact from '../components/Contact'
import FAQS from '../components/FAQS'
import FeaturedProperties from '../components/FeaturedProperties'
const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedProperties/>
      <Testimonial/>
      <Contact/>
      <FAQS />
      <Footer/>
    </div>
  )
}

export default Home
