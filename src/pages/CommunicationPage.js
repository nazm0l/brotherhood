import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box, Dialog, DialogContent, TextField, Stack } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Loading from '../components/loading/Loading';

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

export default function PaymentPage() {
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
        <title> Communication | Brotherhood ERP </title>
      </Helmet>

      <Container>
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Communication
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            This page is under construction.
          </Typography>
        </Stack>
      </Container>
    </>
  );
}
