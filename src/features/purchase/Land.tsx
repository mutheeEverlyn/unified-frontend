import React, { useState, useEffect } from "react";
import { useGetLandQuery, useCreateLandMutation, useUpdateLandMutation, useDeleteLandMutation, TLand } from "./LandApi";
import { Toaster, toast } from 'sonner';

const Land: React.FC = () => {
  const { data: land, isLoading, isError } = useGetLandQuery();
  const [createLand] = useCreateLandMutation();
  const [updateLand] = useUpdateLandMutation();
  const [deleteLand] = useDeleteLandMutation();
  
  // Form state
  const [size, setSize] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [land_type, setLand_type] = useState('');
  const [history, setHistory] = useState('');
  const [status, setStatus] = useState<string>('');
  const [image, setImage] = useState<string>('');
  // Edit state
  const [editLandId, setEditLandId] = useState<number | null>(null);
  
  useEffect(() => {
    if (editLandId !== null && land) {
      const LandToEdit = land?.find((Land: TLand) => Land.land_id === editLandId);
      if (LandToEdit) {
        setSize(LandToEdit.size);
        setLand_type(LandToEdit.land_type);
        setPrice(LandToEdit.price);
        setHistory(LandToEdit.history);
        setStatus(LandToEdit.status);
        setImage(LandToEdit.image);
      }
    }
  }, [editLandId, land]);

  const handlecreateLand = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const newLand = {
      size,
      land_type,
      price: parseFloat(price.toString()),
      history,
      status, // Use image URL directly
      image,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  
    try {
      await createLand(newLand).unwrap(); // Removed the 'result' variable
      toast.success('Land added successfully');
      // Reset form fields
      resetForm();
    } catch (error: any) {
      if (error.data) {
        toast.error(`Failed to add Land: ${error.data.message}`);
      } else {
        toast.error('Failed to add Land');
      }
    }
  };
  

  const handleEditLand = (land: TLand) => {
    setEditLandId(land.land_id);
    setSize(land.size);
    setLand_type(land.land_type);
    setPrice(land.price);
    setHistory(land.history);
    setStatus(land.status); // Set image URL
    setImage(land.image);
  };

  const handleUpdateLand = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (editLandId === null) {
      toast.error('No Land selected for update');
      return;
    }
  
    const updatedLand = {
      size,
      land_type,
      price: parseFloat(price.toString()),
      history,
      status,
      image,
      updated_at: new Date().toISOString(),
    };
  
    try {
      await updateLand({ land_id: editLandId, ...updatedLand }).unwrap();
      toast.success('Land updated successfully');
      setEditLandId(null);
      // Reset form fields
      resetForm();
    } catch (error: any) {
      if (error.data) {
        toast.error(`Failed to update Land: ${error.data.message || 'Unknown error'}`);
      } else {
        toast.error('Failed to update Land');
      }
    }
  };

  const handledeleteLand = async (id: number) => {
    try {
      await deleteLand(id).unwrap();
      toast.success('Land deleted successfully');
    } catch (error: any) {
      toast.error('Failed to delete Land');
    }
  };

  const resetForm = () => {
    setSize('');
    setLand_type('');
    setPrice('');
    setHistory('');
    setStatus('');
    setImage('');
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
      <div className="overflow-x-auto bg-amber-300 text-white rounded-lg p-4 min-h-screen">
        <h1 className="text-xl my-4">{editLandId ? 'Edit Land' : 'Add New Land'}</h1>
        <form onSubmit={editLandId ? handleUpdateLand : handlecreateLand} className="mb-4">
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
            <label htmlFor="land_type" className="block">land_type:</label>
            <input
              id="land_type"
              type="text"
              value={land_type}
              onChange={(e) => setLand_type(e.target.value)}
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
            <label htmlFor="size" className="block">size:</label>
            <input
              id="size"
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full p-2 rounded bg-white text-black"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="image" className="block">image (URL):</label>
            <input
              id="image"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-2 rounded bg-white text-black"
            />
          </div>
          <button
            type="submit"
            className="bg-gray-400 hover:bg-black text-white font-bold py-2 px-4 rounded"
          >
            {editLandId ? 'Update Land' : 'Add Land'}
          </button>
        </form>

        {isLoading && <p>Loading land...</p>}
        {isError && <p>Error loading land.</p>}
        
        <table className="table-auto border-collapse w-full bg-gray-400 text-white border border-white">
          <thead>
            <tr>
              <th className='text-white border border-white px-4 py-2'>ID</th>
              <th className='text-white border border-white px-4 py-2'>status</th>
              <th className='text-white border border-white px-4 py-2'>price</th>
              <th className='text-white border border-white px-4 py-2'>land_type</th>
              <th className='text-white border border-white px-4 py-2'>size</th>
              <th className='text-white border border-white px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {land && land.map((land: TLand) => (
              <tr key={land.land_id}>
                <td className="border border-white px-4 py-2">{land.land_id}</td>
                <td className="border border-white px-4 py-2">{land.status}</td>
                <td className="border border-white px-4 py-2">{land.price}</td>
                <td className="border border-white px-4 py-2">{land.land_type}</td>
                <td className="border border-white px-4 py-2">{land.size}</td>
                <td className="border border-white px-4 py-2">
                  <button
                    onClick={() => handleEditLand(land)}
                    className="bg-green-400 rounded p-0.5 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handledeleteLand(land.land_id)}
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

export default Land;
