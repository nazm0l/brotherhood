/* eslint-disable jsx-a11y/img-redundant-alt */
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Stack, Grid, Divider } from '@mui/material';

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
            <Grid item xs={12} md={12}>
              <img
                src="https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="campaign image"
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  border: '1px solid #ccc',
                }}
              />
              <Stack direction="row" spacing={3} sx={{ marginY: '15px', justifyContent: 'space-between' }}>
                <Typography variant="body">Minimum Amount: 1000 Tk</Typography>
                <Typography variant="body">Total Raised: 100000 Tk</Typography>
                <Typography variant="body">Closed Date: 10/10/2023</Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={12} textAlign="center" sx={{ marginTop: '30px' }}>
              <Divider variant="fullWidth" sx={{ marginBottom: '30px' }} />
              <Typography variant="h6" gutterBottom>
                Campaign Title
              </Typography>
              <Typography variant="body2" align="justify" gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Consequatur ea optio nulla temporibus culpa explicabo, eveniet dolorum iusto,
                perferendis maxime quae sed quaerat! Corrupti nesciunt ex architecto, dolorum tempore necessitatibus,
                adipisci eum corporis repellat cumque ipsam asperiores, quaerat eaque nam quos! Debitis nisi
                reprehenderit consequatur minima veniam laboriosam rem ab, quo voluptatibus praesentium quaerat commodi?
                Repellendus numquam enim nesciunt quos.
              </Typography>
            </Grid>

            <Grid item xs={12} md={12} sx={{ marginY: '20px', display: 'grid', placeItems: 'center' }}>
              <Button variant="contained" sx={{ padding: { xs: '5px 40px', md: '8px 50px' } }}>
                Donate Now
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </StyledContent>
    </>
  );
}
