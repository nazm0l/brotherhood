import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
import DonationCard from '../components/donation-card/DonationCard';
import Loading from '../components/loading/Loading';

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
          </StyledContent>
        </Container>
      )}
    </>
  );
}
