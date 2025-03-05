import { Toaster, toast } from "sonner";
import { useGetLandQuery,TLand } from "./LandApi";

const PurchaseLand= () => {
  const { data: lands, isLoading, error } = useGetLandQuery();

  if (isLoading) {
    return <div className="text-center text-blue-500 mt-10">Loading land listings...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load land listings. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Available Land for Sale/Rent</h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {lands?.map((land:TLand) => (
          <div
            key={land.land_id}
            className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300"
          >
            <img
              src={land.image}
              alt="Land"
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold mt-3">{land.land_type}</h3>
            <p className="text-gray-600">Size: {land.size}</p>
            <p className="text-gray-600">Status: {land.status}</p>
            <p className="text-lg font-bold text-green-600 mt-2">${land.price}</p>
            <div className="flex justify-between mt-4">
                <button
                  onClick={() => toast.success("House booked successfully!")}
                  className="px-4 py-2 bg-gray-400 hover:bg-black text-white rounded-md transition"
                >
                  more details
                </button>
                <button
                  onClick={() => toast.success("House purchased successfully!")}
                  className="px-4 py-2 bg-amber-300 hover:bg-black text-white rounded-md transition"
                >
                  Buy
                </button>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseLand;
