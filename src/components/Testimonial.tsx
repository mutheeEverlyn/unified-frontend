import Mary  from '../assets/Mary Khalid.jpg'
import Evah from '../assets/Evah Otieno.jpg'
import Paul from '../assets/paul kamau.jpg'
const testimonialData=[
  {
    name:"Mary khalid",
    image:Mary,
    description:"I love the website as it helps me schedule my tasks"
  },
  {
  name:"Paul Kamau",
  image:Paul,
  description:"I have used MyTasks for quite some time and i have enjoyed the services"
  },
  {
  name:"Evah Otieno",
  image:Evah,
  description:"I cannot regret using MyTasks which helps me out in organizing my work"
  }
]

const Testimonial = () => {
  return (
    <>
       <div className=" py-14 sm:pb-24">
        <div className="w-full max-w-full">
          <div className="space-y-4 pb-12">
            <p className="text-3xl font-semibold text-center sm:text-4xl font-serif" >
              What Our Clients Say About Us
            </p>
            <p  className="text-center sm:px-44">
             Here are some of the feedbacks we received from our clients
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
            {testimonialData.map((testimony) => (
              <div
                key={testimony.name}
                className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-12  bg-gray-100 duration-300  rounded-lg "
              >
                <div className="grid place-items-center ">
                  <img src={testimony.image}  className="rounded-full w-20 h-20"/>
 
                </div>
                <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                <p>{testimony.description}</p>
                <p className="text-center font-semibold">{testimony.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Testimonial
