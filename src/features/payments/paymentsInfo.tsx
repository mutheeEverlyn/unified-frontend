import React, { useState } from 'react';
import { useCreatePaymentsMutation } from './PaymentsApi';
import { Toaster, toast } from 'sonner';

const PaymentsInfo: React.FC = () => {
  const [contact_phone, setContact_phone] = useState('');
  const [amount, setAmount] = useState(0);
  const [initiateMpesaPayment] = useCreatePaymentsMutation();

  const handlePayment = async () => {
    try {
      const response = await initiateMpesaPayment({ contact_phone, amount }).unwrap();
      if (response.success) {
        toast.success('Payment initiated successfully!');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Failed to initiate payment. Please try again.');
    }
  };

  return (
    <div>
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'bg-green-400',
          },
        }}
      />
      <h3>Mpesa Payment</h3>
      <input
        type="text"
        placeholder="Enter phone number"
        value={contact_phone}
        onChange={(e) => setContact_phone(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button onClick={handlePayment}>Pay {amount} KES</button>
    </div>
  );
};

export default PaymentsInfo;
