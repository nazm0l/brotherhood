import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
// sections
import RegistrationForm from '../sections/auth/register/RegistrationForm';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 800,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const { search } = useLocation();
  const [verified, setVerified] = useState(true);
  const [paymentResponse, setPaymentResponse] = useState({});

  // verify transaction id

  console.log(search);
  useEffect(() => {
    // The URL-encoded string
    const encodedData = search;

    // Decode the URL-encoded string
    const decodedData = decodeURIComponent(encodedData.split('?data=')[1]);

    if (paymentResponse.BrTrxId) {
      try {
        const jsonData = JSON.parse(decodedData);
        const { paymentResponse } = jsonData;
        setPaymentResponse(paymentResponse);

        // Set the paymentData state with the extracted data\

        fetch('https://spread-admin-api-staging.azurewebsites.net/api/PaymentReport/payment-validity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ transactionId: paymentResponse.BrTrxId }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data === true) {
              setVerified(true);
            }
          });
      } catch (error) {
        toast.error('Invalid transaction id');
      }
    }
  }, []);

  return (
    <>
      <Helmet>
        <title> Registration | Brotherhood ERP</title>
      </Helmet>

      {verified ? (
        <StyledRoot>
          <Container maxWidth="md" sx={{ marginTop: { md: '30px' } }}>
            <StyledContent>
              <Typography variant="h5" sx={{ mb: 5, padding: '10px', bgcolor: '#e4fde1', color: '#0a5c36' }}>
                Your transaction has been verified. Transaction Id - {paymentResponse.BrTrxId}
              </Typography>
              <RegistrationForm BrTrxId />
            </StyledContent>
          </Container>
        </StyledRoot>
      ) : (
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h4" paragraph>
            Please wait while we verify your transaction...
          </Typography>
        </StyledContent>
      )}
    </>
  );
}
