import React, { useState, useEffect } from 'react';
import { useGetUsersQuery, useDeleteUserMutation, useCreateUserMutation, useUpdateUserMutation } from '../user_management/UsersApi';
import { Toaster, toast } from 'sonner';

export interface Tuser {
  user_id: number;
  full_name: string;
  email: string;
  contact_phone: string;
  address: string;
  password: string;
  role: string;
}

const UsersTable: React.FC = () => {
  const { data, error, isLoading, isError, refetch } = useGetUsersQuery();

  const [deleteUser, { data: deleteMsg }] = useDeleteUserMutation();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    contact_phone: '',
    address: '',
    password: '',
    role: '',
  });

  useEffect(() => {
    if (editUserId !== null) {
      const userToEdit = data?.find((user: Tuser) => user.user_id === editUserId);
      if (userToEdit) {
        setFormData(userToEdit);
      }
    } else {
      setFormData({
        full_name: '',
        email: '',
        contact_phone: '',
        address: '',
        password: '',
        role: '',
      });
    }
  }, [editUserId, data]);

  const handleDelete = async (user_id: number) => {
    try {
      await deleteUser(user_id).unwrap();
      toast.success(deleteMsg?.msg || 'User deleted successfully');
      refetch(); // Refresh the user list after deletion
    } catch (err) {
      toast.error('Failed to delete user');
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(formData).unwrap();
      toast.success('User created successfully');
      setFormData({
        full_name: '',
        email: '',
        contact_phone: '',
        address: '',
        password: '',
        role: '',
      });
      refetch(); // Refresh the user list after creation
    } catch (err) {
      toast.error('Failed to create user');
      console.error('Create user error:', err); 
    }
  };

  const handleEditUser = (user: Tuser) => {
    setEditUserId(user.user_id);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editUserId === null) return;

    try {
      const result = await updateUser(formData).unwrap();
      console.log('Update result:', result); // Check if the update was successful
      toast.success('User updated successfully');
      setEditUserId(null);
      refetch(); // Refresh the user list after update
    } catch (err) {
      toast.error('Failed to update user');
      console.error('Update user error:', err);
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
      <div className="overflow-x-auto bg-amber-300 text-white rounded-lg p-4 min-h-screen">
        <form onSubmit={editUserId !== null ? handleUpdateUser : handleCreateUser}>
          <div className="mb-2">
            <label htmlFor="full_name" className="block">Full Name:</label>
            <input
              id="full_name"
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white text-black"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block">Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white text-black"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="contact_phone" className="block">Contact Phone:</label>
            <input
              id="contact_phone"
              type="tel"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white text-black"
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
              className="w-full p-2 rounded bg-white text-black"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block">Password:</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white text-black"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="role" className="block">Role:</label>
            <input
              id="role"
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white text-black"
              required
            />
          </div>
          <button className='bg-gray-400 p-0.5 rounded-b-sm'>{editUserId !== null ? 'Update User' : 'Add User'}</button>
        </form>
        <h1 className='text-xl my-4 text-center'>Users Data</h1>
        <table className="table-auto border-collapse w-full bg-gray-400 text-white border border-white">
          <thead>
            <tr>
              <th className='text-white  border-white px-4 py-2'>User ID</th>
              <th className='text-white  border-white px-4 py-2'>Full Name</th>
              <th className='text-white  border-white px-4 py-2'>Email</th>
              <th className='text-white  border-white px-4 py-2'>Phone</th>
              <th className='text-white  border-white px-4 py-2'>Address</th>
              <th className='text-white  border-white px-4 py-2'>Role</th>
              <th className='text-white  border-white px-4 py-2'>Options</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={7}>Loading...</td></tr>
            ) : (
              isError ? (
                <tr><td colSpan={7}>Error: {error?.data?.message || 'An error occurred'}</td></tr>
              ) : (
                data && data.map((user: Tuser) => (
                  <tr key={user.user_id}>
                    <th  className="border border-white px-4 py-2">{user.user_id}</th>
                    <td  className="border border-white px-4 py-2">{editUserId === user.user_id ? (
                      <input
                        type="text"
                        value={formData.full_name}
                        name="full_name"
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-400 text-white"
                        required
                      />
                    ) : (
                      user.full_name
                    )}</td>
                    <td  className="border border-white px-4 py-2">{editUserId === user.user_id ? (
                      <input
                        type="email"
                        value={formData.email}
                        name="email"
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-400 text-white"
                        required
                      />
                    ) : (
                      user.email
                    )}</td>
                    <td  className="border border-white px-4 py-2">{editUserId === user.user_id ? (
                      <input
                        type="tel"
                        value={formData.contact_phone}
                        name="contact_phone"
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-400 text-white"
                        required
                      />
                    ) : (
                      user.contact_phone
                    )}</td>
                    <td  className="border border-white px-4 py-2">{editUserId === user.user_id ? (
                      <input
                        type="text"
                        value={formData.address}
                        name="address"
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-400 text-white"
                        required
                      />
                    ) : (
                      user.address
                    )}</td>
                    <td  className="border border-white px-4 py-2">{editUserId === user.user_id ? (
                      <input
                        type="text"
                        value={formData.role}
                        name="role"
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-400 text-white"
                        required
                      />
                    ) : (
                      user.role
                    )}</td>
                    <td className='space-x-2 border border-white px-4 py-2'>
                      {editUserId === user.user_id ? (
                        <>
                          <button className='bg-green-400 rounded-b-md p-0.5' onClick={handleUpdateUser}>Save</button>
                          <button className='bg-red-600 rounded-b-md p-0.5' onClick={() => setEditUserId(null)}>Cancel</button>
                        </>
                      ) : (
                        <button className='bg-green-400 rounded-b-md p-0.5' onClick={() => handleEditUser(user)}>Edit</button>
                      )}
                      <button className='bg-red-600 rounded-b-md p-0.5' onClick={() => handleDelete(user.user_id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )
            )}
          </tbody>
          <tfoot>
            <tr><td className='text-white' colSpan={6}>{data ? `${data.length} records` : '0 records'}</td></tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default UsersTable;
