import car1 from '../assets/Range Rover Evoque.jfif';
import car2 from '../assets/lamborghini urus.jpg'
import car3 from '../assets/mercedes benz.jpg';
import land1 from '../assets/land.jpg';
import land2 from '../assets/land2.jpg';
import land3 from '../assets/land3.jpg';
import house1 from '../assets/house7.png';
import house2 from '../assets/town house.jpg';
import house3 from '../assets/family house.jpg';
import { Link } from 'react-router-dom';
const properties = [{
name:"Range Rover Evoque",
price:200,
image:car1
},
{
name:"Lamborghini Urus",
price:300,
image:car2
},
{
name:"Mercedes Benz",
price:250,
image:car3
},
{
name:"agricultural land",
price:200,
image:land1
},
{
name:"agricultural land",
price:300,
image:land2
},
{
name:"commercial land",
price:250,
image:land3
},
{
name:"town house",
price:200,
image:house1
},
{
name:"town house",
price:300,
image:house2
},
{
name:"family house",
price:250,
image:house3
}
]
const FeaturedProperties = () => {
  return (
    <div className="pb-24 container mx-auto">
         <div className="container">
        
        <h1 className="text-3xl sm:text-4xl font-semibold font-serif mb-3 mt-3 text-center" >some of our featured properties</h1>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
            {properties.map((data) => (
              <div className="space-y-3 border-2 border-gray-300 hover:border-blue-400 p-3 rounded-xl relative group" >
                <div className="w-full h-[120px]">
                  <img
                    src={data.image}
                    alt="car"
                    className="w-full h-[120px] object-contain sm:translate-x-8 group-hover:sm:translate-x-16 duration-700"
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="text-primary font-semibold">{data.name}</h1>
                  <div className="flex justify-between items-center text-xl font-semibold">
                    <p>${data.price}</p>
                    {/* <a href="#">Details</a> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className=" place-items-center mt-8 flex gap-4 items-center m-auto w-96">
          <button  className="bg-blue-400 p-2  hover:bg-primary/80 transition duration-500  rounded-md">
           <Link to='/register'>Buy Yours Today</Link> 
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeaturedProperties
