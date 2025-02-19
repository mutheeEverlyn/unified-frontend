import Footer from "./Footer";
import Navbar from "./Navbar";
const AboutUs = () => {
  return (
    <div>
     <Navbar/>
     <h1 className="text-center pt-10 text-amber-300 text-3xl pb-1.5">About Unified Property</h1>
     <div className="container mx-auto px-4 py-5 text-center">
      <p>Welcome to Unified Property, your trusted partner in buying and selling vehicles, land, and houses. We are committed to providing the best services to our clients, ensuring a seamless and satisfactory experience.</p>
      <h2 className="text-2xl text-amber-300 ">Our Services</h2>
      <ul>
        <li><strong>Vehicles:</strong> We offer a wide range of vehicles for sale, from cars to trucks, ensuring you find the perfect match for your needs.</li>
        <li><strong>Land:</strong> Whether you are looking for residential, commercial, or agricultural land, we have a variety of options to suit your requirements.</li>
        <li><strong>Houses:</strong> Our portfolio includes houses of all types and sizes, helping you find your dream home with ease.</li>
      </ul>
      <p>At Unified Property, we prioritize customer satisfaction and strive to make the buying and selling process as smooth as possible. Contact us today to learn more about our services and how we can assist you.</p>
      </div>
      <Footer/>
    </div>
  )
}

export default AboutUs
