import React from "react";
import { useGetHousesQuery,THouse } from "./HouseApi"; 
import { Toaster, toast } from "sonner"; 

const PurchaseHouse: React.FC = () => {
  const { data: houses, isLoading, error } = useGetHousesQuery();

  if (isLoading) return <div className="text-center text-xl mt-10">Loading houses...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">Failed to load houses</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Available Houses</h2>
      
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {houses?.map((house:THouse) => (
          <div key={house.house_id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={house.exterior_image} alt="House" className="w-full h-52 object-cover" />

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{house.type}</h3>
              <p className="text-gray-600">Bedrooms: {house.number_of_bedrooms} | Rooms: {house.number_of_rooms}</p>
              <p className="text-gray-700 font-semibold">Price: ${house.price}</p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => toast.success("House booked successfully!")}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                >
                  Rent
                </button>
                <button
                  onClick={() => toast.success("House purchased successfully!")}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition"
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Toaster />
    </div>
  );
};

export default PurchaseHouse;
