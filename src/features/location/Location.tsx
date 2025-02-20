import React,{useState,useEffect} from 'react';
import { useGetLocationQuery, useDeleteLocationMutation,useCreateLocationMutation,useUpdateLocationMutation } from './LocationApi';
import { Toaster, toast } from 'sonner';

export interface Tlocation {
  location_id: number;
  name: string;
  address: string;
  contact_phone: string;
  created_at: string;
  updated_at: string;
}

const Location: React.FC = () => {
  const { data, error, isLoading, isError,refetch } = useGetLocationQuery();

  const [deleteLocation, {  data: deleteMsg }] = useDeleteLocationMutation();
  const[createLocation]=useCreateLocationMutation();
  const[updateLocation]=useUpdateLocationMutation();
  const[formData,setFormData]=useState({
    name:'',
    address:'',
    contact_phone:'',
    // created_at:new Date().toISOString(),
    // updated_at:new Date().toISOString(),
  })
  const[editLocationId,setEditLocationId]=useState<number |null>(null);
  useEffect(() => {
    if (editLocationId !== null) {
      const locationToEdit = data?.find((location: Tlocation) => location.location_id === editLocationId);
      if (locationToEdit) {
        setFormData(locationToEdit);
      }
    } else {
      setFormData({
        name: '',
        address: '',
        contact_phone: '',
        // created_at:'',
        // updated_at:''
      });
    }
  }, [editLocationId, data]); 
  const handleDelete = async (location_id: number) => {
    await deleteLocation(location_id);
    toast.success(deleteMsg?.msg || 'Location deleted successfully');
    refetch(); 
  };
  const handleCreateLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLocation(formData).unwrap();
      toast.success('location created successfully');
      setFormData({
        name: '',
        address: '',
        contact_phone: '',
        // created_at:'',
        // updated_at:''
      });
      refetch(); // Refresh the user list after creation
    } catch (err) {
      toast.error('Failed to create location');
      console.error('Create user error:', err); 
    }
  };

  const handleEditLocation = (location: Tlocation) => {
    setEditLocationId(location.location_id);
  };

  const handleUpdateLocation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editLocationId === null) return;

    try {
      const result = await updateLocation(formData).unwrap();
      console.log('Update result:', result); // Check if the update was successful
      toast.success('Location updated successfully');
      setEditLocationId(null);
      refetch(); // Refresh the user list after update
    } catch (err) {
      toast.error('Failed to update location');
      console.error('Update location error:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

      <div className="overflow-x-auto bg-gray-800 text-white rounded-lg p-4 min-h-screen">
      <form onSubmit={editLocationId !== null ? handleUpdateLocation : handleCreateLocation}>
          <div className="mb-2">
            <label htmlFor="full_name" className="block">Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="address" className="block">Address:</label>
            <input
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="contact phone" className="block">contact Phone:</label>
            <input
              id="contact phone"
              type="text"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <button className='btn btn-sm btn-outline btn-success'>{editLocationId !== null ? 'Update location' : 'Add location' } </button>
          </form>
        <h1 className='text-xl my-4'>Location and branches Data</h1>
        <table className="table table-xs">
          <thead>
            <tr>
              <th className='text-white'>location_id</th>
              <th className='text-white'>name</th>
              <th className='text-white'>address</th>
              <th className='text-white'>contact_phone</th>
              <th className='text-white'>created_at</th>
              <th className='text-white'>updated_at</th>
              <th className='text-white'>Options</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={7}>Loading...</td></tr>
            ) : (
              isError ? (
                <tr><td colSpan={7}>Error: {error?.data?.message || 'An error occurred'}</td></tr>
              ) : (
                data && data.map((location: Tlocation) => (
                  <tr key={location.location_id}>
                    <th>{location.location_id}</th>
                    <td>{editLocationId===location.location_id ?(
                       <input
                       type="text"
                       value={formData.name}
                       name="name"
                       onChange={handleChange}
                       className="w-full p-2 rounded bg-gray-700 text-white"
                       required
                     />
                    ):(
                    location.name)}</td>
                    <td>{editLocationId===location.location_id?( <input
                        type="text"
                        value={formData.address}
                        name="address"
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                      />):(location.address)}</td>
                    <td>{editLocationId===location.location_id?(
                          <input
                          type="text"
                          value={formData.contact_phone}
                          name="contact_phone"
                          onChange={handleChange}
                          className="w-full p-2 rounded bg-gray-700 text-white"
                          required
                        />
                    ):(location.contact_phone)}</td>
                    <td>{editLocationId===location.location_id?(
                          <input
                          type="text"
                          value={location.created_at}
                          name="created_at"
                          onChange={handleChange}
                          className="w-full p-2 rounded bg-gray-700 text-white"
                          required
                        />
                    ):(location.created_at)}</td>
                    <td>{editLocationId===location.location_id?(
                        <input
                        type="text"
                        value={location.updated_at}
                        name="updated_at"
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                      />
                    ):(location.updated_at)}</td>
                      <td className='space-x-2'>
                      {editLocationId === location.location_id ? (
                        <>
                          <button className='btn btn-sm btn-outline btn-success' onClick={handleUpdateLocation}>Save</button>
                          <button className='btn btn-sm btn-outline btn-warning' onClick={() => setEditLocationId(null)}>Cancel</button>
                        </>
                      ) : (
                        <button className='btn btn-sm btn-outline btn-info' onClick={() => handleEditLocation(location)}>Edit</button>
                      )}
                      <button className='btn btn-sm btn-outline btn-warning' onClick={() => handleDelete(location.location_id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )
            )}
          </tbody>
          <tfoot>
            <tr><td className='text-white' colSpan={7}>{data ? `${data.length} records` : '0 records'}</td></tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Location;
