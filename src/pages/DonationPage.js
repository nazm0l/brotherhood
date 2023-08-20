import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box, Stack, DialogContent, Dialog, Grid } from '@mui/material';
import DonationCard from '../components/donation-card/DonationCard';
import Loading from '../components/loading/Loading';
import uc from '../images/uc.svg';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 900,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function DonationPage() {
  const [open, setOpen] = useState(false);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDonations = async () => {
    setLoading(true);
    await fetch('https://spread-admin-api-staging.azurewebsites.net/api/Donation/get-donation-campaign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setDonations(data));
    setLoading(false);
  };

  useEffect(() => {
    getDonations();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title> Donation | Brotherhood </title>
      </Helmet>

      {loading ? (
        <Container sx={{ display: 'flex', height: '90vh', placeItems: 'center' }}>
          <Loading />
        </Container>
      ) : (
        <Container>
          <StyledContent sx={{ marginTop: { sm: '30px' } }}>
            <Grid container spacing={3}>
              {donations.map((donation) => (
                <DonationCard key={donation.donationId} donation={donation} />
              ))}
            </Grid>

            {/* <Button
            size="xs"
            sx={{ marginTop: '25px', padding: '10px 40px' }}
            variant="contained"
            onClick={handleClickOpen}
          >
            Donate Now
          </Button>

          <Box>
            <Dialog open={open} onClose={handleClose}>
              <Stack spacing={2} sx={{ padding: '20px 40px 10px 40px' }}>
                <Typography variant="h4" align="center" sx={{ color: 'text.dark' }}>
                  Under Construction
                </Typography>
                <img src={uc} alt="under-construction" width="100%" />
              </Stack>
              <DialogContent sx={{ padding: '20px 40px 40px 40px' }}>
                <Stack direction="row" marginTop="30px" justifyContent="flex-end" gap={3}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleClose}
                    sx={{ padding: { xs: '5px 30px', md: '8px 30px' } }}
                  >
                    Close
                  </Button>
                </Stack>
              </DialogContent>
            </Dialog>
          </Box> */}
          </StyledContent>
        </Container>
      )}
    </>
  );
}
