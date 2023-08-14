// material

import { Card, Stack, Grid, TextField, Typography, Box, FormControl } from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';

// utils

const countries = [
  {
    code: 'ID',
    label: 'Indonesia',
  },
  {
    code: 'US',
    label: 'United States',
  },
  {
    code: 'SG',
    label: 'Singapore',
  },
  {
    code: 'MY',
    label: 'Malaysia',
  },
];

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: '',
      email: '',
      number: '',
      address: '',
      country: '',
      state: '',
      city: '',
      zipCode: '',
      about: '',
    },
  });

  // Define validation rules
  const rules = {
    required: 'This field is required',
  };

  const onSubmit = (data) => {
    console.log(data); // Handle form submission
  };

  return (
    <FormControl autoComplete="off">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
              <Box
                component="img"
                alt="profile"
                src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
                sx={{ width: 500, height: 280, mx: 'auto', mb: 5, borderRadius: '50%' }}
              />
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Mr John Doe
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <Controller
                    name="name"
                    control={control}
                    rules={rules}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Name"
                        error={fieldState.invalid}
                        helperText={fieldState.invalid && 'Please enter your name'}
                      />
                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    rules={rules}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Email Address"
                        error={fieldState.invalid}
                        helperText={fieldState.invalid && 'Please enter your email address'}
                      />
                    )}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <Controller
                    name="number"
                    control={control}
                    rules={rules}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Phone Number"
                        error={fieldState.invalid}
                        helperText={fieldState.invalid && 'Please enter a valid phone number'}
                      />
                    )}
                  />
                  <Controller
                    name="address"
                    control={control}
                    rules={rules}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Address"
                        error={fieldState.invalid}
                        helperText={fieldState.invalid && 'Please enter your address'}
                      />
                    )}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <Controller
                    name="country"
                    control={control}
                    rules={rules}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Country"
                        error={fieldState.invalid}
                        helperText={fieldState.invalid && 'Please enter your country'}
                      />
                    )}
                  />
                  <Controller
                    name="state"
                    control={control}
                    rules={rules}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="State/Region"
                        error={fieldState.invalid}
                        helperText={fieldState.invalid && 'Please enter your state/region'}
                      />
                    )}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <Controller
                    name="city"
                    control={control}
                    rules={rules}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="City"
                        error={fieldState.invalid}
                        helperText={fieldState.invalid && 'Please enter your city'}
                      />
                    )}
                  />
                  <Controller
                    name="zipCode"
                    control={control}
                    rules={rules}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Zip/Code"
                        error={fieldState.invalid}
                        helperText={fieldState.invalid && 'Please enter your zip code'}
                      />
                    )}
                  />
                </Stack>
                <Controller
                  name="about"
                  control={control}
                  rules={rules}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      minRows={4}
                      maxRows={4}
                      label="About"
                      error={fieldState.invalid}
                      helperText={fieldState.invalid && 'Please enter your about'}
                    />
                  )}
                />
              </Stack>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton type="submit" variant="contained">
                  Save Changes
                </LoadingButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </form>
    </FormControl>
  );
}
