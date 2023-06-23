import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box, Stack, DialogContent, Dialog } from '@mui/material';
import uc from '../images/uc.svg';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 800,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function DonationPage() {
  const [open, setOpen] = useState(false);

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

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center', marginTop: { sm: '30px' } }}>
          <Typography variant="h3" paragraph>
            Help us making a sustainable system
          </Typography>

          <Stack direction="column" spacing={2}>
            <Typography align="justify" sx={{ color: 'text.secondary' }}>
              As a nonprofit organization, we rely on the generosity of donors like you to support our work and make an
              impact. Your donation helps us to provide for the needy people
            </Typography>
            <Typography align="justify" sx={{ color: 'text.secondary' }}>
              Whether you're able to give a little or a lot, every contribution helps. It's easy to donate - simply
              click the "Donate" button below and follow the prompts to complete your secure online donation. We allow
              any mobile banking wallet, credit & debit cards. As a part of service we will be collecting service
              charges respectively. All payment related data will be available in the registered user dashboard.
            </Typography>
            <Typography align="justify" sx={{ color: 'text.secondary' }}>
              Thank you again for your support. We couldn't do it without you!
            </Typography>
          </Stack>
          <Button size="xs" sx={{ marginTop: '25px' }} variant="contained" onClick={handleClickOpen}>
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
          </Box>
        </StyledContent>
      </Container>
    </>
  );
}
