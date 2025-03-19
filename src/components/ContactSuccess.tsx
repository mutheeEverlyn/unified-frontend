import React from 'react';
import { Link } from 'react-router-dom';

const ContactSuccess: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Thank you for contacting us!</h1>
      <p className="text-lg mb-4">We have received your message and will get back to you shortly.</p>
      <Link to="/" className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-amber-300 hover:text-black transition duration-300">
        Go Home
      </Link>
    </div>
  );
};

export default ContactSuccess;