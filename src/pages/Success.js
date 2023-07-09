import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';

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
        <title> Thank You | Brotherhood </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Thank you for registering!
          </Typography>

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
