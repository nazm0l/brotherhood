import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box, Stack } from '@mui/material';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 800,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function SingleDonationPage() {
  return (
    <>
      <Helmet>
        <title> Campaign | Brotherhood ERP </title>
      </Helmet>

      <StyledContent>
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Campaign Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            This page is under construction.
          </Typography>
        </Stack>
      </StyledContent>
    </>
  );
}
