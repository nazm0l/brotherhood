/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Stack, Grid, Divider, Box, Dialog, DialogContent, TextField } from '@mui/material';

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
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    // Handle form submission here
    setLoading(true);

    try {
      const response = await axios.post(
        'https://spread-brotherhood-api-staging.azurewebsites.net/api/PaymentInitiator/registration-payment',
        JSON.stringify({ ...data, reference: 'user-reg', campaign: 'UR-23', amount: 2 }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        window.location.replace(response.data.payment_url);
      }

      console.log(response.data.payment_url);
    } catch (error) {
      toast.error('Something went wrong! Please try again.');
    }
    setOpen(false);
    setLoading(false);
  };

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
              <Button
                variant="contained"
                sx={{ padding: { xs: '5px 40px', md: '8px 50px' } }}
                onClick={handleClickOpen}
              >
                Donate Now
              </Button>
            </Grid>
          </Grid>
        </Stack>

        <Box>
          <Dialog open={open} onClose={handleClose} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} sx={{ padding: '20px 40px 10px 40px' }}>
              <Typography variant="h4" align="center" sx={{ color: 'text.dark' }}>
                Donation Payment
              </Typography>
              <Typography variant="body" align="justify" sx={{ color: 'text.secondary' }}>
                Please input the required details to continue your donation process. Only after successful payment you
                will be able to see your payment id.
              </Typography>
            </Stack>
            <DialogContent sx={{ padding: '20px 40px 40px 40px' }}>
              <Stack flexBasis={1} spacing={2}>
                <TextField
                  name="minPayment"
                  autoFocus
                  label="Amount "
                  type="number"
                  {...register('minPayment', { required: 'Payment amount should be high' })}
                  error={Boolean(errors.minPayment)}
                  helperText={errors.minPayment?.message}
                />
                <TextField
                  name="name"
                  label="Payee Name"
                  {...register('name', { required: 'Name is required' })}
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                />
                <Stack direction={{ md: 'row', xs: 'column' }} spacing={2}>
                  <TextField
                    name="phone"
                    label="Phone Number"
                    fullWidth
                    required
                    {...register('phone', {
                      required: 'Phone Number is required',
                      pattern: {
                        value: /^[0-9]{10,11}$/,
                        message: 'Number should be 11 digits',
                      },
                    })}
                    error={Boolean(errors.phone)}
                    helperText={errors.phone?.message}
                  />
                  <TextField
                    name="email"
                    label="Email Address"
                    fullWidth
                    required
                    {...register('email', { required: 'Email Address is required' })}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                </Stack>
              </Stack>
              <Stack direction="row" marginTop="30px" justifyContent="flex-end" gap={3}>
                <Button variant="contained" type="submit" sx={{ padding: { xs: '5px 30px', md: '8px 40px' } }}>
                  pay
                </Button>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  sx={{ backgroundColor: '#CB4154', padding: { xs: '5px 30px', md: '8px 30px' } }}
                >
                  Cancel
                </Button>
              </Stack>
            </DialogContent>
          </Dialog>
        </Box>
      </StyledContent>
    </>
  );
}
