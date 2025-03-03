import React, { useState, useEffect } from "react";
import { useGetHousesQuery, useCreateHouseMutation, useUpdateHouseMutation, useDeleteHouseMutation, THouse } from "./HouseApi";
import { Toaster, toast } from 'sonner';


const Houses: React.FC = () => {
  const { data: houses, isLoading, isError } = useGetHousesQuery();
  const [createHouse] = useCreateHouseMutation();
  const [updateHouse] = useUpdateHouseMutation();
  const [deleteHouse] = useDeleteHouseMutation();
  
  // Form state
  const [status, setStatus] = useState('');
  const [number_of_rooms, setNumber_of_rooms] = useState<number | string>('');
  const [number_of_bedrooms, setNumber_of_bedrooms] = useState<number | string>('');
  const [year_built, setYear_built] = useState<number | string>('');
  const [price, setPrice] = useState<number | string>('');
  const [type, setType] = useState('');
  const [history, setHistory] = useState('');
  const [interior_image, setInterior_image] = useState<string>('');
  const [exterior_image, setExterior_image] = useState<string>('');
  // Edit state
  const [editHouseId, setEditHouseId] = useState<number | null>(null);
  
  useEffect(() => {
    if (editHouseId !== null && houses) {
      const houseToEdit = houses?.find((house: THouse) => house.house_id === editHouseId);
      if (houseToEdit) {
        setStatus(houseToEdit.status);
        setYear_built(houseToEdit.year_built);
        setNumber_of_rooms(houseToEdit.number_of_rooms);
        setNumber_of_bedrooms(houseToEdit.number_of_bedrooms);
        setStatus(houseToEdit.status);
        setType(houseToEdit.type);
        setPrice(houseToEdit.price);
        setHistory(houseToEdit.history);
        setInterior_image(houseToEdit.interior_image);
        setExterior_image(houseToEdit.exterior_image);
      }
    }
  }, [editHouseId, houses]);

  const handlecreateHouse = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const newHouse = {
      status,
      year_built: parseInt(year_built.toString(), 10),
      number_of_bedrooms: parseInt(number_of_bedrooms.toString(), 10),
      number_of_rooms: parseInt(number_of_rooms.toString(), 10),
      type,
      price: parseFloat(price.toString()),
      history,
      interior_image, // Use image URL directly
      exterior_image,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  
    try {
      await createHouse(newHouse).unwrap(); // Removed the 'result' variable
      toast.success('House added successfully');
      // Reset form fields
      resetForm();
    } catch (error: any) {
      if (error.data) {
        toast.error(`Failed to add House: ${error.data.message}`);
      } else {
        toast.error('Failed to add House');
      }
    }
  };
  

  const handleEditHouse = (house: THouse) => {
    setEditHouseId(house.house_id);
    setStatus(house.status);
    setNumber_of_bedrooms(house.number_of_bedrooms);
    setNumber_of_rooms(house.number_of_rooms);
    setYear_built(house.year_built);
    setType(house.type);
    setPrice(house.price);
    setHistory(house.history);
    setInterior_image(house.interior_image); // Set image URL
    setExterior_image(house.exterior_image);
  };

  const handleUpdateHouse = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (editHouseId === null) {
      toast.error('No House selected for update');
      return;
    }
  
    const updatedHouse = {
      status,
      number_of_bedrooms: parseInt(number_of_bedrooms.toString(), 10),
      number_of_rooms: parseInt(number_of_rooms.toString(), 10),
      year_built: parseInt(year_built.toString(), 10),
      type,
      price: parseFloat(price.toString()),
      history,
      interior_image,
      exterior_image,
      updated_at: new Date().toISOString(),
    };
  
    try {
      await updateHouse({ house_id: editHouseId, ...updatedHouse }).unwrap();
      toast.success('House updated successfully');
      setEditHouseId(null);
      // Reset form fields
      resetForm();
    } catch (error: any) {
      if (error.data) {
        toast.error(`Failed to update House: ${error.data.message || 'Unknown error'}`);
      } else {
        toast.error('Failed to update House');
      }
    }
  };

  const handleDeleteHouse = async (id: number) => {
    try {
      await deleteHouse(id).unwrap();
      toast.success('House deleted successfully');
    } catch (error: any) {
      toast.error('Failed to delete House');
    }
  };

  const resetForm = () => {
    setStatus('');
    setNumber_of_bedrooms('');
    setNumber_of_rooms('');
    setYear_built('');
    setType('');
    setPrice('');
    setHistory('');
    setInterior_image('');
    setExterior_image('');
  };

  return (
    <>
      <Toaster toastOptions={{classNames: {error: 'bg-red-400',success: 'text-green-400', warning: 'text-yellow-400', info: 'bg-blue-400',},}} />
      <div className="overflow-x-auto bg-amber-300 text-white rounded-lg p-4 min-h-screen">
        <h1 className="text-xl my-4">{editHouseId ? 'Edit House' : 'Add New House'}</h1>
        <form onSubmit={editHouseId ? handleUpdateHouse : handlecreateHouse} className="mb-4">
          <div className="mb-2">
            <label htmlFor="status" className="block">status:</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2 rounded bg-white text-black" required>
              <option value="">Select status</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="number_of_rooms" className="block">number_of_rooms:</label>
            <input id="number_of_rooms" type="number" value={number_of_rooms} onChange={(e) => setNumber_of_rooms(e.target.value)} className="w-full p-2 rounded bg-white text-black" required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="number_of_bedrooms" className="block">number_of_bedrooms:</label>
            <input id="number_of_bedrooms" type="number" value={number_of_bedrooms} onChange={(e) => setNumber_of_bedrooms(e.target.value)} className="w-full p-2 rounded bg-white text-black" required/>
          </div>
          <div className="mb-2">
            <label htmlFor="year_built" className="block">year_built:</label>
            <input id="year_built" type="number"value={year_built}  onChange={(e) => setYear_built(e.target.value)} className="w-full p-2 rounded bg-white text-black"required/>
          </div>
          <div className="mb-2">
            <label htmlFor="type" className="block">Type:</label>
            <input id="type" type="text" value={type} onChange={(e) => setType(e.target.value)}className="w-full p-2 rounded bg-white text-black" required  />
          </div>
          <div className="mb-2">
            <label htmlFor="price" className="block">Rental Rate:</label>
            <input id="price"
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
          <button type="submit" className="bg-gray-400 hover:bg-black text-white font-bold py-2 px-4 rounded"  >
            {editHouseId ? 'Update House' : 'Add House'}
          </button>
        </form>

        {isLoading && <p>Loading houses...</p>}
        {isError && <p>Error loading houses.</p>}
        
        <table className="table-auto border-collapse  w-full bg-gray-400 text-white border border-white">
          <thead>
            <tr>
              <th className='text-white border border-white px-4 py-2'>ID</th>
              <th className='text-white border border-white px-4 py-2'>number_of_bedrooms</th>
              <th className='text-white border border-white px-4 py-2'>number_of_rooms</th>
              <th className='text-white border border-white px-4 py-2'>year_built</th>
              <th className='text-white border border-white px-4 py-2'>status</th>
              <th className='text-white border border-white px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {houses && houses.map((house: THouse) => (
              <tr key={house.house_id}>
                <td className="border border-white px-4 py-2">{house.house_id}</td>
                <td className="border border-white px-4 py-2">{house.number_of_bedrooms}</td>
                <td className="border border-white px-4 py-2">{house.number_of_rooms}</td>
                <td className="border border-white px-4 py-2">{house.year_built}</td>
                <td className="border border-white px-4 py-2">{house.status}</td>
                <td className="border border-white px-4 py-2">
                  <button
                    onClick={() => handleEditHouse(house)}
                    className="bg-green-400 rounded p-0.5 mr-2"
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDeleteHouse(house.house_id)} className="bg-red-700 rounded p-0.5" >
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

export default Houses;
