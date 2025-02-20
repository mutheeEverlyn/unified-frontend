import React, { useState } from 'react';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../features/user_management/UsersApi';

const Profile: React.FC = () => {
  const userDetails = localStorage.getItem('userDetails');

  if (!userDetails) {
    return <div>Error: No user is logged in.</div>;
  }

  const parsedUserDetails = JSON.parse(userDetails);
  const user_id = parsedUserDetails.user_id;

  if (!user_id) {
    return <div>Error: No user is logged in.</div>;
  }

  const { data, error, isLoading } = useGetUserByIdQuery(user_id);
  const [updateUser] = useUpdateUserMutation();

  const [formData, setFormData] = useState({
    full_name: data?.full_name || '',
    email: data?.email || '',
    contact_phone: data?.contact_phone || '',
    address: data?.address || '',
    password:data?.password || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser({ user_id, ...formData }).unwrap();
      // Optionally, you can refresh the data or redirect the user after successful update
    } catch (error) {
      console.log('Error updating profile', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div className="mx-auto w-11/12 md:w-3/4 lg:w-1/2 min-h-screen">
      <div className="updateBox">
        <div className="bg-blue-400 w-full h-18 rounded-t-lg">
          <h3 className="text-white py-4 px-4 text-lg">MY PROFILE</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-8 text-left">
          <div className="bg-gray-700 rounded mb-4 p-2">
            <div className="flex justify-between items-center">
              <label htmlFor="full_name" className="text-lg text-white mb-0">Name:</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="border-2 border-black rounded-md p-2"
              />
            </div>
          </div>

          <div className="bg-gray-700 rounded mb-4 p-2">
            <div className="flex justify-between items-center">
              <label htmlFor="email" className="text-lg text-white mb-0">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border-2 border-black rounded-md p-2"
              />
            </div>
          </div>

          <div className="bg-gray-700 rounded mb-4 p-2">
            <div className="flex justify-between items-center">
              <label htmlFor="contact_phone" className="text-lg text-white mb-0">Contact Phone:</label>
              <input
                type="text"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleChange}
                className="border-2 border-black rounded-md p-2"
              />
            </div>
          </div>

          <div className="bg-gray-700 rounded mb-4 p-2">
            <div className="flex justify-between items-center">
              <label htmlFor="address" className="text-lg text-white mb-0">Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border-2 border-black rounded-md p-2"
              />
            </div>
          </div>
          
          <div className="bg-gray-700 rounded mb-4 p-2">
            <div className="flex justify-between items-center">
              <label htmlFor="address" className="text-lg text-white mb-0">password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border-2 border-black rounded-md p-2"
              />
            </div>
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
