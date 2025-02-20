import { Link } from "react-router-dom"
const Payments = () => {
  return (
    <div className="card bg-blue-400 m-auto text-neutral-content w-96">
    <div className="card-body items-center text-center">
      <h2 className="card-title">Thank you!</h2>
      <p>payment made successfully</p>
      <div className="card-actions justify-end">
        <button className="btn bg-amber-300"><Link to='/'>Home</Link></button>
        <button className="btn btn-ghost"><Link to='/userDashboard/bookings'>Go Back</Link></button>
      </div>
    </div>
  </div>
  )
}

export default Payments
