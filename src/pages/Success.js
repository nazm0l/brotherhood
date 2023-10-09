import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box, Grid, Divider, Paper } from '@mui/material';
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

  return (
    <>
      <Helmet>
        <title> Thank You | Brotherhood </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Payment Successful
          </Typography>

          <Divider />
          {paymentData && (
            <Paper sx={{ padding: 2, marginY: 2 }}>
              <Grid container spacing={2} sx={{ marginY: 2 }}>
                <Grid item xs={6}>
                  <Typography variant="subtitle3">Transaction ID:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">{paymentData?.TrxId || 'N/A'}</Typography>
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
            </Paper>
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
