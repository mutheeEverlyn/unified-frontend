import React, { useState, useEffect } from "react";
import { useGetVehiclesQuery, useCreateVehiclesMutation, useUpdateVehiclesMutation, useDeleteVehiclesMutation, TVehicle } from "./VehicleApi";
import { Toaster, toast } from 'sonner';

const Vehicles: React.FC = () => {
  const { data: vehicles, isLoading, isError } = useGetVehiclesQuery();
  const [createVehicle] = useCreateVehiclesMutation();
  const [updateVehicle] = useUpdateVehiclesMutation();
  const [deleteVehicle] = useDeleteVehiclesMutation();
  
  // Form state
  const [status, setStatus] = useState('');
  const [make, setmake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number | string>('');
  const [price, setPrice] = useState<number | string>('');
  const [fuel_type, setFuel_type] = useState('');
  const [engine_capacity, setEngine_capacity] = useState('');
  const [transmission, setTransmission] = useState('');
  const [seating_capacity, setSeating_capacity] = useState<number | string>('');
  const [color, setColor] = useState('');
  const [history, setHistory] = useState('');
  const [interior_image, setInterior_image] = useState<string>('');
  const [exterior_image, setExterior_image] = useState<string>('');
  // Edit state
  const [editvehicleId, setEditvehicleId] = useState<number | null>(null);
  
  useEffect(() => {
    if (editvehicleId !== null && vehicles) {
      const vehicleToEdit = vehicles?.find((vehicle: TVehicle) => vehicle.vehicle_id === editvehicleId);
      if (vehicleToEdit) {
        setStatus(vehicleToEdit.status);
        setmake(vehicleToEdit.make);
        setModel(vehicleToEdit.model);
        setYear(vehicleToEdit.year);
        setFuel_type(vehicleToEdit.fuel_type);
        setEngine_capacity(vehicleToEdit.engine_capacity);
        setTransmission(vehicleToEdit.transmission);
        setSeating_capacity(vehicleToEdit.seating_capacity);
        setColor(vehicleToEdit.color);
        setPrice(vehicleToEdit.price);
        setHistory(vehicleToEdit.history);
        setInterior_image(vehicleToEdit.interior_image);
        setExterior_image(vehicleToEdit.exterior_image);
      }
    }
  }, [editvehicleId, vehicles]);

  const handlecreateVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const newvehicle = {
      status,
      make,
      model,
      year: parseInt(year.toString(), 10),
      fuel_type,
      engine_capacity,
      transmission,
      seating_capacity: parseInt(seating_capacity.toString(), 10),
      color,
      price: parseFloat(price.toString()),
      history,
      interior_image, // Use image URL directly
      exterior_image,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  
    try {
      await createVehicle(newvehicle).unwrap(); // Removed the 'result' variable
      toast.success('vehicle added successfully');
      // Reset form fields
      resetForm();
    } catch (error: any) {
      if (error.data) {
        toast.error(`Failed to add vehicle: ${error.data.message}`);
      } else {
        toast.error('Failed to add vehicle');
      }
    }
  };
  

  const handleEditvehicle = (vehicle: TVehicle) => {
    setEditvehicleId(vehicle.vehicle_id);
    setStatus(vehicle.status);
    setmake(vehicle.make);
    setModel(vehicle.model);
    setYear(vehicle.year);
    setFuel_type(vehicle.fuel_type);
    setEngine_capacity(vehicle.engine_capacity);
    setTransmission(vehicle.transmission);
    setSeating_capacity(vehicle.seating_capacity);
    setColor(vehicle.color);
    setPrice(vehicle.price);
    setHistory(vehicle.history);
    setInterior_image(vehicle.interior_image); // Set image URL
    setExterior_image(vehicle.exterior_image);
  };

  const handleUpdateVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (editvehicleId === null) {
      toast.error('No vehicle selected for update');
      return;
    }
  
    const updatedVehicle = {
      status,
      make,
      model,
      year: parseInt(year.toString(), 10),
      fuel_type,
      engine_capacity,
      transmission,
      seating_capacity: parseInt(seating_capacity.toString(), 10),
      color,
      price: parseFloat(price.toString()),
      history,
      interior_image,
      exterior_image,
      updated_at: new Date().toISOString(),
    };
  
    try {
      await updateVehicle({ vehicle_id: editvehicleId, ...updatedVehicle }).unwrap();
      toast.success('vehicle updated successfully');
      setEditvehicleId(null);
      // Reset form fields
      resetForm();
    } catch (error: any) {
      if (error.data) {
        toast.error(`Failed to update vehicle: ${error.data.message || 'Unknown error'}`);
      } else {
        toast.error('Failed to update vehicle');
      }
    }
  };

  const handledeleteVehicle = async (id: number) => {
    try {
      await deleteVehicle(id).unwrap();
      toast.success('vehicle deleted successfully');
    } catch (error: any) {
      toast.error('Failed to delete vehicle');
    }
  };

  const resetForm = () => {
    setStatus('');
    setmake('');
    setModel('');
    setYear('');
    setFuel_type('');
    setEngine_capacity('');
    setTransmission('');
    setSeating_capacity('');
    setColor('');
    setPrice('');
    setHistory('');
    setInterior_image('');
    setExterior_image('');
  };

  return (
    <>
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          },
        }}
      />
      <div className="overflow-x-auto  bg-amber-300 text-white rounded-lg p-4 min-h-screen">
        <h1 className="text-xl my-4">{editvehicleId ? 'Edit vehicle' : 'Add New vehicle'}</h1>
        <form onSubmit={editvehicleId ? handleUpdateVehicle : handlecreateVehicle} className="mb-4">
          <div className="mb-2">
            <label htmlFor="status" className="block">status:</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 rounded bg-white text-black"
              required
            >
              <option value="">Select status</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="make" className="block">make:</label>
            <input
              id="make"
              type="text"
              value={make}
              onChange={(e) => setmake(e.target.value)}
              className="w-full p-2 rounded bg-white text-black"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="model" className="block">Model:</label>
            <input
              id="model"
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full p-2 rounded bg-white text-black"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="year" className="block">Year:</label>
            <input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full p-2 rounded bg-white text-black"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="fuel_type" className="block">Fuel Type:</label>
            <input
              id="fuel_type"
              type="text"
              value={fuel_type}
              onChange={(e) => setFuel_type(e.target.value)}
              className="w-full p-2 rounded bg-white text-black"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="engine_capacity" className="block">Engine Capacity:</label>
            <input
              id="engine_capacity"
              type="text"
              value={engine_capacity}
              onChange={(e) => setEngine_capacity(e.target.value)}
              className="w-full p-2 rounded bg-white text-black"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="transmission" className="block">Transmission:</label>
            <input
              id="transmission"
              type="text"
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
              className="w-full p-2 rounded bg-white text-black"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="seating_capacity" className="block">Seating Capacity:</label>
            <input
              id="seating_capacity"
              type="number"
              value={seating_capacity}
              onChange={(e) => setSeating_capacity(e.target.value)}
              className="w-full p-2 rounded bg-white text-black"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="color" className="block">Color:</label>
            <input
              id="color"
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full p-2 rounded bg-white text-black"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="price" className="block">Rental Rate:</label>
            <input
              id="price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 rounded bg-white text-black"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="history" className="block">history:</label>
            <input
              id="history"
              type="text"
              value={history}
              onChange={(e) => setHistory(e.target.value)}
              className="w-full p-2 rounded bg-white text-black"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="interior_image" className="block">interior_image (URL):</label>
            <input
              id="interior_image"
              type="text"
              value={interior_image}
              onChange={(e) => setInterior_image(e.target.value)}
              className="w-full p-2 rounded bg-white text-black"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="exterior_image" className="block">exterior_image (URL):</label>
            <input
              id="exterior_image"
              type="text"
              value={exterior_image}
              onChange={(e) => setExterior_image(e.target.value)}
              className="w-full p-2 rounded bg-white text-black"
            />
          </div>
          <button
            type="submit"
            className="bg-gray-400 hover:bg-black-300 text-white font-bold py-2 px-4 rounded"
          >
            {editvehicleId ? 'Update vehicle' : 'Add vehicle'}
          </button>
        </form>

        {isLoading && <p>Loading vehicles...</p>}
        {isError && <p>Error loading vehicles.</p>}
        
        <table className="table-auto border-collapse  w-full bg-gray-400 text-white border border-white">
          <thead>
            <tr>
              <th className='text-white border border-white px-4 py-2'>ID</th>
              <th className='text-white border border-white px-4 py-2'>make</th>
              <th className='text-white border border-white px-4 py-2'>Model</th>
              <th className='text-white border border-white px-4 py-2'>Year</th>
              <th className='text-white border border-white px-4 py-2'>status</th>
              <th className='text-white border border-white px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles && vehicles.map((vehicle: TVehicle) => (
              <tr key={vehicle.vehicle_id}>
                <td className="border border-white px-4 py-2">{vehicle.vehicle_id}</td>
                <td className="border border-white px-4 py-2">{vehicle.make}</td>
                <td className="border border-white px-4 py-2">{vehicle.model}</td>
                <td className="border border-white px-4 py-2">{vehicle.year}</td>
                <td className="border border-white px-4 py-2">{vehicle.status}</td>
                <td className="border border-white px-4 py-2">
                  <button
                    onClick={() => handleEditvehicle(vehicle)}
                    className="bg-green-400 rounded p-0.5 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handledeleteVehicle(vehicle.vehicle_id)}
                    className="bg-red-700 rounded p-0.5"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Vehicles;
