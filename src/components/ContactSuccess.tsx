import { Link } from "react-router-dom"
const ContactSuccess = () => {
  return (
    <div className="card bg-blue-400 m-auto text-neutral-content w-96">
  <div className="card-body">
    <h2 className="card-title">Thank you for contacting us!</h2>
    <p>We received your feedback and will repond to it.You are welcome to book your dream car with us</p>
    <div className="card-actions justify-end">
      <button className="btn"><Link to='/'>Home</Link></button>
    </div>
  </div>
</div>
    
  )
}

export default ContactSuccess
