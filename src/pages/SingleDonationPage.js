/* eslint-disable jsx-a11y/img-redundant-alt */
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box, Stack, Grid } from '@mui/material';
import { Image } from '@mui/icons-material';

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
        <Stack sx={{ my: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <img
                src="https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="campaign image"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  border: '1px solid #ccc',
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Campaign Description
              </Typography>
              <Typography variant="body2" gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
              <Stack spacing={2} sx={{ marginTop: '20px' }}>
                <Typography variant="body2">Minimum Amount: 1000 Tk</Typography>
                <Typography variant="body2">Total Raised: 100000 Tk</Typography>
                <Typography variant="body2">Closed Date: 10/10/2023</Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={12} sx={{ marginY: '40px' }}>
              <Typography variant="h6" gutterBottom>
                Campaign Video
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </StyledContent>
    </>
  );
}
