import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
// @mui
import { styled } from '@mui/material/styles';
import {
  Button,
  Typography,
  Container,
  Box,
  Dialog,
  DialogContent,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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

export default function UnfinishedRegistration() {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Handle form submission here

    console.log(data);

    setLoading(true);

    try {
      fetch('https://spread-admin-api-staging.azurewebsites.net/api/PaymentReport/payment-validity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transactionId: data.trxId }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data === true) {
            Navigate(
              `/create-brotherhood-user?data=%7b%22paymentResponse%22%3a%7b%22BrTrxId%22%3a%22${data.trxId}%22%2c`
            );
          }
        });
    } catch (error) {
      toast.error('Invalid transaction id');
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title> Payment | Brotherhood ERP </title>
      </Helmet>

      {loading ? (
        <Container maxWidth="lg" sx={{ height: '90vh', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
          <Loading />
        </Container>
      ) : (
        <Container>
          <StyledContent sx={{ textAlign: 'center', alignItems: 'center', marginTop: { sm: '30px' } }}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ marginY: '20px' }}>
              <TextField
                name="trxId"
                label="Transaction ID"
                {...register('trxId', { required: 'trxId is required' })}
                error={Boolean(errors.trxId)}
                helperText={errors.trxId?.message}
              />
              <Button type="submit" variant="outlined" sx={{ padding: '15px' }}>
                Start
              </Button>
            </Box>
            <Stack direction="column" spacing={2}>
              <Typography align="justify" sx={{ color: 'text.secondary' }}>
                If you have already paid the fee and could not complete the registration please first call the admin. If
                you have the transaction id you can complete the registration by clicking [Unfinished Registration]
              </Typography>
            </Stack>

            <Stack marginTop="30px" direction="column" spacing={2}>
              <Typography align="justify" sx={{ color: 'text.secondary' }}>
                যদি আপনি ফি পরিশোধ করে এবং নিবন্ধন সম্পন্ন করতে না পারেন তবে প্রথমে অ্যাডমিনের সাথে যোগাযোগ করুন। যদি
                ট্রানজেকশন আইডি থাকে তবে [Unfinished Registration] ক্লিক করে নিবন্ধন সম্পন্ন করতে পারেন।
              </Typography>
            </Stack>
          </StyledContent>
        </Container>
      )}
    </>
  );
}
