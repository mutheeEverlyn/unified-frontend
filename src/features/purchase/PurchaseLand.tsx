import { useState ,useEffect} from 'react';
import { Toaster, toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { useGetLandQuery, TLand } from "./LandApi";
import { useCreatePurchaseMutation } from './PurchaseApi';
import { useGetLocationQuery, Tlocation } from '../location/LocationApi';
import debounce from 'lodash.debounce';

const PurchaseLand = () => {
  const { data: lands, isLoading, error } = useGetLandQuery();
  const { data: locations, isLoading: isLocationsLoading, error: locationsError } = useGetLocationQuery();
  const [createPurchase] = useCreatePurchaseMutation();
  const navigate = useNavigate();
  const [selectedLocation_id, setSelectedLocation_id] = useState<number | null>(null);
  const [selectedLand, setSelectedLand] = useState<TLand | null>(null);
  const [showDetails, setShowDetails] = useState<number | null>(null);

  const userDetailsString = localStorage.getItem('userDetails') || '{}';
  const userDetails = JSON.parse(userDetailsString);
  const user_id = userDetails?.user_id;

  useEffect(() => {
      console.log("Vehicle Data:", lands);
      if (error) {
        console.log("Vehicle Fetch Error:", error);
      }
    }, [lands, error]);
  const handlePurchase = async () => {
    if (!selectedLocation_id) {
      toast.error("Please select a location.");
      return;
    }
    if (!selectedLand) {
      toast.error("No land selected.");
      return;
    }
    if (!user_id) {
      toast.error("User not logged in.");
      return;
    }

    if (selectedLand.status !=='available') {
      toast.error("The land is not available for purchase.");
      return;
    }

    try {
      const response = await createPurchase({
        user_id,
        land_id: selectedLand.land_id,
        location_id: selectedLocation_id,
        price: selectedLand.price,
        status: 'Pending'
      });
      if (response?.data?.msg === 'purchase created successfully') {
        toast.success("Land purchased successfully!");
        navigate('/userDashboard/purchase');
      } else {
        console.error('Error purchasing the land:', response?.error);
        toast.error("Failed to purchase the land.");
      }
    } catch (error) {
      console.error('Error booking the land:', error);
      toast.error("Failed to book the land.");
    }
  };

  const handleShowDetails = debounce((landId: number) => {
    setShowDetails(prev => (prev === landId ? null : landId));
  },300);

  // const handleCloseDetails = () => {
  //   setShowDetails(null);
  // };


  if (isLoading || isLocationsLoading) return <p>Loading...</p>;
  if (error || locationsError) return <p>Error loading data.</p>;

  const filteredLands = selectedLocation_id
    ? lands?.filter((land: TLand) => land.location_id === selectedLocation_id)
    : lands;

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
        <h1 className="text-3xl sm:text-4xl font-semibold font-serif mb-3">Available Land for Sale</h1>
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
          {filteredLands?.map((land: TLand) => (
            <div key={land.land_id} className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 w-full">
              <img src={land.image} alt="Land" className="w-full h-48 object-cover rounded-md" />
              <h3 className="text-xl font-semibold mt-3">{land.land_type}</h3>
              <p className="text-gray-600">Size: {land.size}</p>
              <p className="text-lg font-bold text-green-600 mt-2">${land.price}</p>
              <button onClick={() => handleShowDetails(land.land_id)} className="bg-green-600 text-white px-4 py-2 mt-4 w-full rounded-md hover:bg-green-700 focus:outline-none">
                {showDetails === land.land_id ? "Hide Details" : "More Details"}
              </button>
              {showDetails === land.land_id && (
                <div className="mt-4">
                  <p className="text-gray-600">Land Type: {land.land_type}</p>
                  <p className="text-gray-600">Size: {land.size}</p>
                  <p className="text-gray-600">Location: {land.location_id}</p>
                  <p className="text-gray-600">Price: ${land.price}</p>
                </div>
              )}
              {land.status === 'available' ? (
                <button onClick={() => setSelectedLand(land)} className="bg-blue-600 text-white px-4 py-2 mt-4 w-full rounded-md hover:bg-blue-700 focus:outline-none">
                  Purchase  
                </button>
              ):(<p className="text-red-500 mt-2">Not Available</p>

              )}
            </div>
          ))}
        </div>
      </div>
      {selectedLand && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 max-w-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Confirm Purchase</h2>
            <p><strong>Land Type:</strong> {selectedLand.land_type}</p>
            <p><strong>Size:</strong> {selectedLand.size}</p>
            <p><strong>Location:</strong> {selectedLand.location_id}</p>
            <p><strong>Price:</strong> ${selectedLand.price}</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button onClick={()=>setSelectedLand(null)} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none">cancel</button>
              <button onClick={handlePurchase} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">confirm purchase</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseLand;