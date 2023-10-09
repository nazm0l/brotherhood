import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box, Divider } from '@mui/material';

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
  return (
    <>
      <Helmet>
        <title> Payment Cancelled | Brotherhood </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Payment Cancelled
          </Typography>

          <Divider />

          <Typography sx={{ color: 'text.secondary', marginY: '20px' }}>
            Something went wrong. Please try again.
          </Typography>

          <Button to="/login" size="large" variant="contained" component={RouterLink}>
            Return to Login
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}
