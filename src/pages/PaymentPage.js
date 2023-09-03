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
import { useState } from 'react';
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

const values = [
  {
    value: '',
    label: 'Select Amount',
  },
  {
    value: 100,
    label: '100 BDT',
  },
  {
    value: 200,
    label: '200 BDT',
  },
  {
    value: 300,
    label: '300 BDT',
  },
  {
    value: 400,
    label: '400 BDT',
  },
  {
    value: 500,
    label: '500 BDT',
  },
];

// ----------------------------------------------------------------------

export default function PaymentPage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    control,
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

    console.log(data);

    setLoading(true);

    try {
      const response = await axios.post(
        'https://spread-brotherhood-api-staging.azurewebsites.net/api/PaymentInitiator/registration-payment',
        JSON.stringify({ ...data, reference: 'user-reg', campaign: 'UR-23' }),
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
        <title> Payment | Brotherhood ERP </title>
      </Helmet>

      {loading ? (
        <Container maxWidth="lg" sx={{ height: '90vh', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
          <Loading />
        </Container>
      ) : (
        <Container>
          <StyledContent sx={{ textAlign: 'center', alignItems: 'center', marginTop: { sm: '30px' } }}>
            <Typography variant="h3" paragraph>
              Welcome to Brotherhood!
            </Typography>

            <Stack direction="column" spacing={2}>
              <Typography align="justify" sx={{ color: 'text.secondary' }}>
                Welcome to the user registration system of brotherhood. To continue with the user registration system
                you will have to pass several steps like payment, user information and verification process. After
                successful completion of every step you will be notified via email and phone number. Be informed we will
                be tracking your ip and browser information throughout the process. If you try to abuse the system we
                will track you down and will file a formal case.
              </Typography>
              <Typography align="justify" sx={{ color: 'text.secondary' }}>
                We allow any mobile banking wallet, credit & debit cards. As a part of service we will be collecting
                service charges respectively. All payment related data will be available in the registered user
                dashboard.
              </Typography>
              <Typography align="justify" sx={{ color: 'text.secondary' }}>
                If you have already paid the fee and could not complete the registration please first call the admin. If
                you have the transaction id you can complete the registration by clicking [Unfinished Registration]
              </Typography>
              <Typography align="justify" sx={{ color: 'text.secondary' }}>
                By clicking the [Start Registration] you can start the process. We recommend completing the registration
                in one journey without any interruption to avoid any unwanted cases.
              </Typography>
            </Stack>

            <Stack marginTop="30px" direction="column" spacing={2}>
              <Typography align="justify" sx={{ color: 'text.secondary' }}>
                ব্রাদারহুডের ব্যবহারকারী নিবন্ধন সিস্টেমে আপনাকে স্বাগতম। ব্যবহারকারী নিবন্ধন সিস্টেম চালিয়ে যাওয়ার
                জন্য আপনাকে পেমেন্ট, ব্যবহারকারী তথ্য এবং যাচাইকরণ প্রক্রিয়াগুলি অতিক্রম করতে হবে। প্রতিটি ধাপ সফলভাবে
                সম্পন্ন হলে আপনাকে ইমেল এবং ফোন নম্বরের মাধ্যমে জানানো হবে। আমরা আপনার আইপি এবং ব্রাউজার তথ্যও ট্র্যাক
                করব। আপনি সিস্টেমটি অপব্যবহার করার চেষ্টা করলে আমরা আপনার অবস্থান ট্র্যাক করব এবং আমরা আইনগত ব্যবস্থা
                গ্রহণ করব।
              </Typography>
              <Typography align="justify" sx={{ color: 'text.secondary' }}>
                আমরা যেকোনো মোবাইল ব্যাংকিং ওয়ালেট, ক্রেডিট এবং ডেবিট কার্ড গ্রহণ করব। সেবার একটি অংশ হিসাবে সার্ভিস
                চার্জ সংগ্রহ করা হবে। সমস্ত পেমেন্ট সংশ্লিষ্ট তথ্য নিবন্ধিত ব্যবহারকারী ড্যাশবোর্ডে উপলভ্য হবে।
              </Typography>
              <Typography align="justify" sx={{ color: 'text.secondary' }}>
                যদি আপনি ফি পরিশোধ করে এবং নিবন্ধন সম্পন্ন করতে না পারেন তবে প্রথমে অ্যাডমিনের সাথে যোগাযোগ করুন। যদি
                ট্রানজেকশন আইডি থাকে তবে [Unfinished Registration] ক্লিক করে নিবন্ধন সম্পন্ন করতে পারেন।
              </Typography>
              <Typography align="justify" sx={{ color: 'text.secondary' }}>
                [Start Registration] ক্লিক করে আপনি প্রক্রিয়াটি শুরু করতে পারেন। সমস্ত প্রসেসটি এক সেশনে সম্পন্ন করার
                অনুরোধ রইলো ।
              </Typography>
            </Stack>

            <Button size="xs" sx={{ marginTop: '25px' }} variant="contained" onClick={handleClickOpen}>
              Start Registration
            </Button>

            <Box>
              <Dialog open={open} onClose={handleClose} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2} sx={{ padding: '20px 40px 10px 40px' }}>
                  <Typography variant="h4" align="center" sx={{ color: 'text.dark' }}>
                    Registration Payment
                  </Typography>
                  <Typography variant="body" align="justify" sx={{ color: 'text.secondary' }}>
                    Please input the required details to continue your registration process. Only after successful
                    payment you will be able to initiate registration process.
                  </Typography>
                  <Typography variant="h5" align="center" sx={{ color: 'text.secondary', marginTop: '15px' }}>
                    Registration fee: 100 BDT
                  </Typography>
                </Stack>
                <DialogContent sx={{ padding: '20px 40px 40px 40px' }}>
                  <Stack flexBasis={1} spacing={2}>
                    <Controller
                      name="amount"
                      control={control}
                      defaultValue=""
                      rules={{ required: 'Amount is required' }}
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.amount)} fullWidth>
                          <InputLabel id="marital-status-label">Select Amount</InputLabel>
                          <Select labelId="marital-status-label" id="marital-status" {...field}>
                            {values.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.maritalStatus && (
                            <Typography variant="caption" color="error">
                              {errors.maritalStatus.message}
                            </Typography>
                          )}
                        </FormControl>
                      )}
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
        </Container>
      )}
    </>
  );
}
