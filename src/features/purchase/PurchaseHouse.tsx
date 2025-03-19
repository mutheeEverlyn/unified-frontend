import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePurchaseMutation } from "./PurchaseApi";
import { useGetLocationQuery, Tlocation } from '../location/LocationApi';
import { useGetHousesQuery, THouse } from "./HouseApi";
import { Toaster, toast } from "sonner";
import debounce from 'lodash.debounce';

const PurchaseHouse = () => {
  const { data: houses, isLoading, error } = useGetHousesQuery();
  const { data: locations, isLoading: isLocationsLoading, error: locationsError } = useGetLocationQuery();
  const [createPurchase] = useCreatePurchaseMutation();
  const navigate = useNavigate();
  const [selectedHouse, setSelectedHouse] = useState<THouse | null>(null);
  const [selectedLocation_id, setSelectedLocation_id] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState<number | null>(null);
  const userDetailsString = localStorage.getItem("userDetails") || "{}";
  const userDetails = JSON.parse(userDetailsString);
  const user_id = userDetails?.user_id;

  useEffect(() => {
    console.log("House Data:", houses);
    if (error) {
      console.log("House Fetch Error:", error);
    }
  }, [houses, error]);

  const handlePurchase = async () => {
    if (!selectedLocation_id) {
      toast.error("Please select a location.");
      return;
    }
    if (!selectedHouse) {
      toast.error("No house selected.");
      return;
    }

    if (!user_id) {
      toast.error("User not logged in.");
      return;
    }

    if (selectedHouse.status !== "available") {
      toast.error("This house is not available for purchase.");
      return;
    }
    console.log("Selected Location ID:", selectedLocation_id);

    try {
      const response = await createPurchase({
        user_id,
        property_type: "house",
        property_id: selectedHouse.house_id,
        total_amount: Number(selectedHouse.price),
        location_id: Number(selectedLocation_id),
        purchase_status: 'Pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }).unwrap();

      console.log('Server response:', response);

      if (response?.msg === "purchase created successfully") {
        toast.success("House purchased successfully!");
        navigate("/userDashboard/purchase");
      } else {
        console.error('Error purchasing the house:', response?.error);
        toast.error("Failed to purchase the house.");
      }
    } catch (error) {
      console.error("Error purchasing house:", error);
      if (error && typeof error === 'object' && 'originalStatus' in error) {
        if ((error as any).originalStatus === 400) {
          toast.error('Bad request: ' + (error as any).data.error);
        } else {
          toast.error('Failed to purchase house.');
        }
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  }

  const handleShowDetails = debounce((houseId: number) => {
    setShowDetails(prev => (prev === houseId ? null : houseId));
  }, 300);

  const filteredHouses = selectedLocation_id
    ? houses?.filter((house: THouse) => house.location_id === selectedLocation_id)
    : houses;

  if (isLoading || isLocationsLoading) return <div className="text-center text-xl mt-10">Loading houses...</div>;
  if (error || locationsError) return <div className="text-center text-red-500 mt-10">Failed to load houses</div>;

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
        <h1 className="text-3xl sm:text-4xl font-semibold font-serif mb-3">Available Houses</h1>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">Select Location</label>
          <select
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={selectedLocation_id || ''}
            onChange={(e) => setSelectedLocation_id(Number(e.target.value))}
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
          {filteredHouses?.map((house: THouse) => (
            <div key={house.house_id} className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 w-full">
              <img src={house.exterior_image} alt="House" className="w-full h-48 object-cover rounded-md" />
              <h3 className="text-lg font-semibold text-gray-800">{house.type}</h3>
              <p className="text-gray-600">Bedrooms: {house.number_of_bedrooms} | Rooms: {house.number_of_rooms}</p>
              <p className="text-gray-700 font-semibold">Price: ${house.price}</p>
              <button
                onClick={() => handleShowDetails(house.house_id)}
                className="bg-green-600 text-white px-4 py-2 mt-4 w-full rounded-md hover:bg-green-700 focus:outline-none">
                {showDetails === house.house_id ? "Hide Details" : "More Details"}
              </button>
              {showDetails === house.house_id && (
                <div className="mt-4">
                  <p className="text-gray-600">Year built: {house.year_built}</p>
                  <p className="text-gray-600">Rooms: {house.number_of_rooms}</p>
                  <p className="text-gray-600">Status: {house.status}</p>
                  <p className="text-gray-600">History: {house.history}</p>
                  <div className="flex space-x-4">
                    <div>
                      <p className="text-gray-600">Exterior Image:</p>
                      <img src={house.exterior_image} alt="House" className="w-48 h-48 object-cover rounded-md" />
                    </div>
                    <div>
                      <p className="text-gray-600">Interior Image:</p>
                      <img src={house.interior_image} alt="House" className="w-48 h-48 object-cover rounded-md" />
                    </div>
                  </div>
                  <p className="text-gray-600">House Type: {house.type}</p>
                  <p className="text-gray-600">Price: {house.price}</p>
                  <p className="text-gray-600">Number of Rooms: {house.number_of_rooms}</p>
                  <p className="text-gray-600">Number of Bedrooms: {house.number_of_bedrooms}</p>
                  <p className="text-gray-600">Year Built: {house.year_built}</p>
                  <p className="text-gray-600">Status: {house.status}</p>
                  <p className="text-gray-600">History: {house.history}</p>
                </div>
              )}
              {house.status === "available" ? (
                <button
                  onClick={() => setSelectedHouse(house)}
                  className="bg-blue-600 text-white px-4 py-2 mt-4 w-full rounded-md hover:bg-blue-700 focus:outline-none">
                  Purchase
                </button>
              ) : (
                <p className="text-red-500 mt-2">Not Available</p>
              )}
            </div>
          ))}
        </div>
      </div>
      {selectedHouse && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 max-w-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Confirm Purchase</h2>
            <p><strong>House Type:</strong> {selectedHouse.type}</p>
            <p><strong>Number of Rooms:</strong> {selectedHouse.number_of_rooms}</p>
            <p><strong>Year Built:</strong> {selectedHouse.year_built}</p>
            <p><strong>Price:</strong> {selectedHouse.price}</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button onClick={() => setSelectedHouse(null)} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none">Cancel</button>
              <button onClick={handlePurchase} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">Confirm Purchase</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseHouse;