import { useEffect, useState } from 'react';

const usePaymentSummary = () => {
  const [paymentSummary, setPaymentSummary] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handlePaymentSummary();
  }, []);

  const handlePaymentSummary = async () => {
    setLoading(true);

    await fetch('https://spread-admin-api-staging.azurewebsites.net/api/PaymentReport/payment-summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        setPaymentSummary(data);
      })
      .catch((err) => console.log('err: ', err));

    setLoading(false);
  };

  return [paymentSummary, loading];
};

export default usePaymentSummary;
