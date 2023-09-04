/* eslint-disable react/jsx-boolean-value */
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Controller, useForm } from 'react-hook-form';
// @mui
import {
  Grid,
  Button,
  Container,
  Stack,
  Box,
  Dialog,
  Typography,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from '@mui/material';
import { toast } from 'react-toastify';
// components
import Loading from '../components/loading/Loading';
import Iconify from '../components/iconify';
import { BlogPostCard } from '../sections/@dashboard/blog';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function BlogPage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [donations, setDonations] = useState([]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      baseAmount: 0,
      goalAmount: 0,
      isRunning: 'true',
      takingFund: 'true',
      closedDate: '',
      imagePath: '',
      videoPath: '',
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getDonations();
  }, []);

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

  // Define validation rules
  const rules = {
    required: 'This field is required',
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://spread-admin-api-staging.azurewebsites.net/api/Donation/create-donation-campaign',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        toast.success('Campaign created successfully!');
      } else {
        toast.error('Something went wrong!');
      }
    } catch (error) {
      toast.error('Something went wrong!', error);
    }

    setOpen(false);
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title> Donation | Brotherhood ERP </title>
      </Helmet>

      {loading ? (
        <Container sx={{ height: '90vh', display: 'grid', placeItems: 'center' }}>
          <Loading />
        </Container>
      ) : (
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="end" mb={5}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpen}>
              New Donation Campaign
            </Button>
          </Stack>

          <Typography variant="h6" sx={{ marginBottom: '20px' }}>
            On Going Campaigns
          </Typography>
          <Divider variant="fullWidth" sx={{ marginBottom: '30px' }} />
          <Grid container spacing={3}>
            {donations.map(
              (donation, index) =>
                donation.isRunning === true && (
                  <BlogPostCard key={donation.donationId} donation={donation} index={index} />
                )
            )}
          </Grid>

          <Typography variant="h6" sx={{ marginY: '20px' }}>
            Closed Campaigns
          </Typography>
          <Divider variant="fullWidth" sx={{ marginBottom: '30px' }} />
          <Grid container spacing={3}>
            {donations.map(
              (donation, index) =>
                donation.isRunning === false && (
                  <BlogPostCard key={donation.donationId} donation={donation} index={index} />
                )
            )}
          </Grid>

          <Box>
            <Dialog maxWidth="lg" open={open} onClose={handleClose} component="form" onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2} sx={{ padding: '20px 40px 10px 40px' }}>
                <Typography variant="h4" align="center" sx={{ color: 'text.dark' }}>
                  Add New Donation Campaign
                </Typography>
                <Typography variant="body" align="justify" sx={{ color: 'text.secondary' }}>
                  Please add campaign details to create a new donation campaign.
                </Typography>
              </Stack>
              <DialogContent sx={{ padding: '20px 40px 40px 40px' }}>
                <Stack flexBasis={1} spacing={2}>
                  <Controller
                    name="title"
                    control={control}
                    rules={rules}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Title"
                        autoFocus
                        error={fieldState.invalid}
                        helperText={fieldState.invalid && 'Please enter your name'}
                      />
                    )}
                  />
                  <Controller
                    name="description"
                    control={control}
                    rules={rules}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Description"
                        multiline
                        minRows={3}
                        maxRows={4}
                        error={fieldState.invalid}
                        helperText={fieldState.invalid && 'Please enter your name'}
                      />
                    )}
                  />
                  <Stack direction={{ md: 'row', xs: 'column' }} spacing={2}>
                    <Controller
                      name="baseAmount"
                      control={control}
                      rules={rules}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Base Amount"
                          error={fieldState.invalid}
                          helperText={fieldState.invalid && 'Please enter base amount'}
                        />
                      )}
                    />
                    <Controller
                      name="goalAmount"
                      control={control}
                      rules={rules}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Goal Amount"
                          error={fieldState.invalid}
                          helperText={fieldState.invalid && 'Please enter goal amount'}
                        />
                      )}
                    />
                  </Stack>
                  <Stack direction={{ md: 'row', xs: 'column' }} spacing={2}>
                    <Controller
                      name="isRunning"
                      control={control}
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.runningGroup)} fullWidth>
                          <InputLabel id="running-group-label" sx={{ background: 'white', px: 0.5 }}>
                            Running
                          </InputLabel>
                          <Select labelId="running-group-label" id="running-group" {...field}>
                            <MenuItem value="true">Yes</MenuItem>
                            <MenuItem value="false">No</MenuItem>
                          </Select>
                          {errors.runningGroup && (
                            <Typography variant="caption" color="error">
                              {errors.runningGroup.message}
                            </Typography>
                          )}
                        </FormControl>
                      )}
                    />
                    <Controller
                      name="takingFund"
                      control={control}
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.takingFundGroup)} fullWidth>
                          <InputLabel id="takingFund-group-label" sx={{ background: 'white', px: 0.5 }}>
                            Taking Fund
                          </InputLabel>
                          <Select labelId="takingFund-group-label" id="takingFund-group" {...field}>
                            <MenuItem value="true">Yes</MenuItem>
                            <MenuItem value="false">No</MenuItem>
                          </Select>
                          {errors.takingFundGroup && (
                            <Typography variant="caption" color="error">
                              {errors.takingFundGroup.message}
                            </Typography>
                          )}
                        </FormControl>
                      )}
                    />
                  </Stack>

                  <Controller
                    name="closedDate"
                    control={control}
                    rules={rules}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="date"
                        label="Campaign End Date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        error={fieldState.invalid}
                        helperText={fieldState.invalid && 'Please enter end date'}
                      />
                    )}
                  />

                  <Typography variant="title1" sx={{ color: 'text.dark', marginTop: '20px' }}>
                    Upload Campaign Media:
                  </Typography>

                  <Stack direction={{ md: 'row', xs: 'column' }} spacing={2}>
                    <Controller
                      name="imagePath"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type="file"
                          label="Campaign Image"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={fieldState.invalid}
                          helperText={fieldState.invalid && 'Please upload image'}
                        />
                      )}
                    />
                    <Controller
                      name="videoPath"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type="file"
                          label="Campaign Video"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={fieldState.invalid}
                          helperText={fieldState.invalid && 'Please upload video'}
                        />
                      )}
                    />
                  </Stack>
                </Stack>
                <Stack direction="row" marginTop="30px" justifyContent="flex-end" gap={3}>
                  <Button variant="contained" type="submit" sx={{ padding: { xs: '5px 30px', md: '8px 40px' } }}>
                    Create Campaign
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
        </Container>
      )}
    </>
  );
}
