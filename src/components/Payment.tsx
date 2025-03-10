// import { useState } from 'react';
// import axios from 'axios';

// const Payment = () => {
//   const [phone, setPhone] = useState('');
//   const [amount, setAmount] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [response, setResponse] = useState(null);

//   const handlePayment = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.post('http://localhost:3000/stk-push', { phone, amount });
//       setResponse(res.data);
//     } catch (error) {
//       console.error('Payment Error:', error);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="p-4 border rounded-lg shadow-lg">
//       <h2 className="text-lg font-bold">MPesa Payment</h2>
//       <input
//         type="text"
//         placeholder="Phone Number (2547XXXXXXXX)"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//         className="border p-2 mt-2 w-full"
//       />
//       <input
//         type="number"
//         placeholder="Amount"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         className="border p-2 mt-2 w-full"
//       />
//       <button
//         onClick={handlePayment}
//         className="bg-blue-500 text-white px-4 py-2 mt-3 rounded-lg"
//         disabled={loading}
//       >
//         {loading ? 'Processing...' : 'Pay Now'}
//       </button>
//       {response && <pre className="mt-3 p-2 bg-gray-100">{JSON.stringify(response, null, 2)}</pre>}
//     </div>
//   );
// };

// export default Payment;



import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Toaster, toast } from 'sonner';

const Payment: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [purchaseDetails, setPurchaseDetails] = useState({
    userId: '',
    vehicleId: '',
    houseId:'',
    landId:'',
    locationId: '',
    totalAmount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPurchaseDetails({ ...purchaseDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const response = await fetch('http://localhost:8000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: purchaseDetails.totalAmount * 100 }), // amount in cents
      });

      const { client_secret } = await response.json();

      if (!client_secret) {
        toast.error('Failed to create payment intent');
        return;
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement!,
        },
      });

      if (error) {
        toast.error(error.message);
      } else if (paymentIntent) {
        const paymentData = {
          purchase_id: purchaseDetails.vehicleId,
          amount: purchaseDetails.totalAmount,
          payment_method: 'card',
          transaction_id: paymentIntent.id,
        };

        const res = await fetch('http://localhost:8000/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
        });

        if (res.ok) {
          toast.success('Payment successful and booking created!');
        } else {
          toast.error('Failed to create booking');
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    }
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
      <div className="p-4 ">
        <h1 className="text-xl my-4">Book a Car</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-2">
            <label htmlFor="userId" className="block">User ID:</label>
            <input
              id="userId"
              type="text"
              name="userId"
              value={purchaseDetails.userId}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="vehicleId" className="block">Vehicle ID:</label>
            <input
              id="vehicleId"
              type="text"
              name="vehicleId"
              value={purchaseDetails.vehicleId}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="houseId" className="block">House ID:</label>
            <input
              id="houseId"
              type="text"
              name="houseId"
              value={purchaseDetails.houseId}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="landId" className="block">Land ID:</label>
            <input
              id="landId"
              type="text"
              name="landId"
              value={purchaseDetails.landId}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="locationId" className="block">Location ID:</label>
            <input
              id="locationId"
              type="text"
              name="locationId"
              value={purchaseDetails.locationId}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="totalAmount" className="block">Total Amount:</label>
            <input
              id="totalAmount"
              type="number"
              name="totalAmount"
              value={purchaseDetails.totalAmount}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="cardElement" className="block">Card Details:</label>
            <CardElement id="cardElement" className="w-full p-2 rounded bg-gray-700 text-white" />
          </div>
          <button type="submit" className="btn btn-primary" disabled={!stripe}>Book and Pay</button>
        </form>
      </div>
    </>
  );
};

export default Payment;
