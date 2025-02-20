import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetVehiclesQuery, TVehicle } from "./VehicleApi";
import { useCreatePurchaseMutation } from "./PurchaseApi";
// import { useGetLocationQuery, Tlocation } from '../location/LocationApi';
import { Toaster, toast } from "sonner";

const PurchaseVehicle = () => {
  const { data:vehicles, isLoading, error } = useGetVehiclesQuery();
  console.log("Vehicle Data:", vehicles);
  console.log("Vehicle Fetch Error:", error);
  const [createPurchase] = useCreatePurchaseMutation();
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState<TVehicle | null>(null);

  const userDetailsString = localStorage.getItem("userDetails") || "{}";
  const userDetails = JSON.parse(userDetailsString);
  const user_id = userDetails?.user_id;

  const handlePurchase = async () => {
    if (!selectedVehicle) {
      toast.error("No vehicle selected.");
      return;
    }

    if (!user_id) {
      toast.error("User not logged in.");
      return;
    }

    if (selectedVehicle.status !== "available") {
      toast.error("This vehicle is not available for purchase.");
      return;
    }

    try {
      const response = await createPurchase({
        user_id,
        vehicle_id: selectedVehicle.vehicle_id,
        price: selectedVehicle.price,
        status: "Purchased",
      });

      if (response?.data?.msg === "purchase successful") {
        toast.success("Vehicle purchased successfully!");
        navigate("/userDashboard/purchases");
      } else {
        toast.error("Failed to purchase vehicle.");
      }
    } catch (error) {
      console.error("Error purchasing vehicle:", error);
      toast.error("Failed to purchase vehicle.");
    }
  };

  if (isLoading) return <div className="text-center text-blue-500 mt-10">Loading vehicles...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">Failed to load vehicles. Please try again later.</div>;

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h2 className="text-2xl font-bold text-center mb-6">Available Vehicles</h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {vehicles?.map((vehicle: TVehicle) => (
          <div key={vehicle.vehicle_id} className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300">
            <img src={vehicle.exterior_image} alt={vehicle.make} className="w-full h-48 object-cover rounded-md" />
            <h3 className="text-xl font-semibold mt-3">{vehicle.make} {vehicle.model}</h3>
            <p className="text-gray-600">Year: {vehicle.year}</p>
            <p className="text-gray-600">Fuel Type: {vehicle.fuel_type}</p>
            <p className="text-gray-600">Transmission: {vehicle.transmission}</p>
            <p className="text-lg font-bold text-green-600 mt-2">${vehicle.price}</p>
            {vehicle.status === "available" ? (
              <button
                onClick={() => setSelectedVehicle(vehicle)}
                className="bg-blue-600 text-white px-4 py-2 mt-4 w-full rounded-md hover:bg-blue-700"
              >
                Purchase
              </button>
            ) : (
              <p className="text-red-500 mt-2">Not Available</p>
            )}
          </div>
        ))}
      </div>

      {selectedVehicle && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 max-w-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Confirm Purchase</h2>
            <p><strong>Vehicle:</strong> {selectedVehicle.make} {selectedVehicle.model}</p>
            <p><strong>Price:</strong> ${selectedVehicle.price}</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button onClick={() => setSelectedVehicle(null)} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none">Cancel</button>
              <button onClick={handlePurchase} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">Confirm Purchase</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseVehicle;
