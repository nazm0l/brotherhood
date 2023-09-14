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

export default function Failed() {
  return (
    <>
      <Helmet>
        <title> Payment Failed | Brotherhood </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Box
            component="img"
            src="/assets/illustrations/failed-img.png"
            sx={{ width: 700, height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button to="/landing" size="large" variant="contained" component={RouterLink}>
            Pay Again
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}
