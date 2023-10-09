import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
// sections
import RegistrationForm from '../sections/auth/register/RegistrationForm';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
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
  const mdUp = useResponsive('up', 'md');

  const { search } = useLocation();
  const [verified, setVerified] = useState(false);

  // verify transaction id

  console.log(search);
  useEffect(() => {
    // The URL-encoded string
    const encodedData = search;

    // Decode the URL-encoded string
    const decodedData = decodeURIComponent(encodedData.split('?data=')[1]);

    try {
      // Parse the JSON data
      const jsonData = JSON.parse(decodedData);

      // Access the paymentResponse object
      const { paymentResponse } = jsonData;

      // Now you can access individual properties from paymentResponse
      console.log(paymentResponse.BrTrxId);

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
      console.error('Error parsing JSON:', error);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title> Registration | Brotherhood ERP</title>
      </Helmet>

      {verified ? (
        <StyledRoot>
          {/* <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )} */}

          <Container maxWidth="md" sx={{ marginTop: { md: '30px' } }}>
            <StyledContent>
              <Typography variant="h4" gutterBottom>
                Register to Brotherhood ERP
              </Typography>

              <Typography variant="body2" sx={{ mb: 5 }}>
                Already have an account? {''}
                <Link to="/login" variant="subtitle2">
                  Login now
                </Link>
              </Typography>
              <RegistrationForm BrTrxId />
            </StyledContent>
          </Container>
        </StyledRoot>
      ) : (
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Please wait while we verify your transaction...
          </Typography>
        </StyledContent>
      )}
    </>
  );
}
