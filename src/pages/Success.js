import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box, Grid, Divider } from '@mui/material';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ThankYou() {
  const [paymentData, setPaymentData] = useState(null);

  // get data from query params
  const { search } = useLocation();
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
      console.log(paymentResponse.UserId);
      console.log(paymentResponse.PaymentAmount);
      console.log(paymentResponse.Name);
      console.log(paymentResponse.TrxId);
      // ... and so on

      // Set the paymentData state with the extracted data
      setPaymentData(paymentResponse);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title> Thank You | Brotherhood </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Thank you for registering!
          </Typography>

          <Divider />
          {paymentData && (
            <Grid container spacing={2} sx={{ marginY: 2 }}>
              <Grid item xs={6}>
                <Typography variant="subtitle3">User ID:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{paymentData?.UserId || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle3">Payment Amount:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{paymentData?.PaymentAmount || 0}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle3">Name:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{paymentData?.Name || 'N/A'}</Typography>
              </Grid>
            </Grid>
          )}

          <Typography sx={{ color: 'text.secondary' }}>
            Thank you for registering! You will receive an email with further instructions.
          </Typography>

          <Box
            component="img"
            src="/assets/illustrations/Ok-bb.svg"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button to="/login" size="large" variant="contained" component={RouterLink}>
            Return to Login
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}
