import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetVehiclesQuery, TVehicle } from "./VehicleApi";
import { useCreatePurchaseMutation } from "./PurchaseApi";
import { useGetLocationQuery, Tlocation } from '../location/LocationApi';
import { Toaster, toast } from "sonner";
import debounce from 'lodash.debounce';

const PurchaseVehicle = () => {
  const { data: vehicles, isLoading, error } = useGetVehiclesQuery();
  const { data: locations, isLoading: isLocationsLoading, error: locationsError } = useGetLocationQuery();
  const [createPurchase] = useCreatePurchaseMutation();
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState<TVehicle | null>(null);
  const [selectedLocation_id, setSelectedLocation_id] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState<number | null>(null);
  const userDetailsString = localStorage.getItem("userDetails") || "{}";
  const userDetails = JSON.parse(userDetailsString);
  const user_id = userDetails?.user_id;

  useEffect(() => {
    console.log("Vehicle Data:", vehicles);
    if (error) {
      console.log("Vehicle Fetch Error:", error);
    }
  }, [vehicles, error]);

  const handlePurchase = async () => {
    if (!selectedLocation_id) {
      toast.error("Please select a location.");
      return;
    }
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

    console.log("Selected Location ID:", selectedLocation_id);

    try {
      const response = await createPurchase({
        user_id,
        property_type: "vehicle",
        property_id: selectedVehicle.vehicle_id,
        total_amount: Number(selectedVehicle.price), 
        location_id: Number(selectedLocation_id), 
        purchase_status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }).unwrap();

      console.log('Server response:', response);

      if (response?.msg === "purchase created successfully") {
        toast.success("Vehicle purchased successfully!");
        navigate("/userDashboard/purchase");
      } else {
        toast.error("Failed to purchase vehicle.");
      }
    } catch (error) {
      console.error("Error purchasing vehicle:", error);
      if (error && typeof error === 'object' && 'originalStatus' in error) {
        if ((error as any).originalStatus === 400) {
          toast.error('Bad request: ' + (error as any).data.error);
        } else {
          toast.error('Failed to purchase vehicle.');
        }
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  };

  const handleShowDetails = debounce((vehicleId: number) => {
    setShowDetails(prev => (prev === vehicleId ? null : vehicleId));
  }, 300);

  const filteredVehicles = selectedLocation_id
    ? vehicles?.filter((vehicle: TVehicle) => vehicle.location_id === selectedLocation_id)
    : vehicles;

  if (isLoading || isLocationsLoading) return <p>Loading...</p>;
  if (error || locationsError) return <p>Error loading data.</p>;

  return (
    <div className="p-4">
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'bg-green-400',
          },
        }}
      />
      <div className="container">
        <h1 className="text-3xl sm:text-4xl font-semibold font-serif mb-3">Available Vehicles for sale</h1>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">Select Location</label>
          <select
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={selectedLocation_id || ''}
            onChange={(e) => {
              const selectedId = Number(e.target.value);
              console.log("Selected Location ID:", selectedId);
              setSelectedLocation_id(selectedId);
            }}
          >
            <option value="" disabled>Select a location</option>
            {locations?.map((location: Tlocation) => (
              <option key={location.location_id} value={location.location_id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-16">
          {filteredVehicles?.map((vehicle: TVehicle) => (
            <div key={vehicle.vehicle_id} className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 w-full">
              <img src={vehicle.exterior_image} alt={vehicle.make} className="w-full h-48 object-cover rounded-md" />
              <h3 className="text-xl font-semibold mt-3">{vehicle.make} {vehicle.model}</h3>
              <p className="text-gray-600">Year: {vehicle.year}</p>
              <p className="text-gray-600">Fuel Type: {vehicle.fuel_type}</p>
              <p className="text-gray-600">Transmission: {vehicle.transmission}</p>
              <p className="text-lg font-bold text-green-600 mt-2">${vehicle.price}</p>
              <button onClick={() => handleShowDetails(vehicle.vehicle_id)} className="bg-green-600 text-white px-4 py-2 mt-4 w-full rounded-md hover:bg-green-700 focus:outline-none">
                {showDetails === vehicle.vehicle_id ? "Hide Details" : "More Details"}
              </button>
              {showDetails === vehicle.vehicle_id && (
                <div className="mt-4">
                  <p className="text-gray-600">History: {vehicle.history}</p>
                  <p className="text-gray-600">Color: {vehicle.color}</p>
                  <p className="text-gray-600">Engine Capacity: {vehicle.engine_capacity}</p>
                  <div className="flex space-x-4">
                    <div>
                      <p className="text-gray-600">Exterior Image:</p>
                      <img src={vehicle.exterior_image} alt="Exterior" className="w-48 h-48 object-cover rounded-md" />
                    </div>
                    <div>
                      <p className="text-gray-600">Interior Image:</p>
                      <img src={vehicle.interior_image} alt="Interior" className="w-48 h-48 object-cover rounded-md" />
                    </div>
                  </div>
                  <p className="text-gray-600">Fuel Type: {vehicle.fuel_type}</p>
                  <p className="text-gray-600">Price: {vehicle.price}</p>
                  <p className="text-gray-600">Make: {vehicle.make}</p>
                  <p className="text-gray-600">Model: {vehicle.model}</p>
                  <p className="text-gray-600">Seating Capacity: {vehicle.seating_capacity}</p>
                </div>
              )}
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
      </div>
      {selectedVehicle && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 max-w-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Confirm Purchase</h2>
            <p><strong>Vehicle:</strong> {selectedVehicle.make} {selectedVehicle.model}</p>
            <p><strong>Price:</strong> {selectedVehicle.price}</p>
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