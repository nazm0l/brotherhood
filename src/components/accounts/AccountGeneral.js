// material

import { Card, Stack, Grid, TextField, Typography, Box, FormControl } from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { auth } = useAuth();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: '',
      email: '',
      fatherName: '',
      motherName: '',
      phone: '',
      alternatePhone: '',
      presentAddress: '',
      permanentAddress: '',
      nid: '',
      country: '',
      state: '',
    },
  });

  const onSubmit = (data) => {
    console.log({ ...data, acc: 'random' });
  };

  return (
    <FormControl autoComplete="off">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 8, px: 3, textAlign: 'center' }}>
              <Box
                component="img"
                alt="profile"
                src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
                sx={{ width: 500, height: 280, mx: 'auto', mb: 5, borderRadius: '50%' }}
              />
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                {auth?.email}
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
                    name="fatherName"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Father's Name"
                        error={fieldState.invalid}
                        helperText={fieldState.invalid && 'Please enter your father name'}
                      />
                    )}
                  />
                  <Controller
                    name="motherName"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Mother's Name"
                        error={fieldState.invalid}
                        helperText={fieldState.invalid && 'Please enter your mother name'}
                      />
                    )}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <Controller
                    name="phone"
                    control={control}
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
                    name="alternatePhone"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Alternate Phone Number"
                        error={fieldState.invalid}
                        helperText={fieldState.invalid && 'Please enter a valid phone number'}
                      />
                    )}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <Controller
                    name="presentAddress"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Present Address"
                        error={fieldState.invalid}
                        helperText={fieldState.invalid && 'Please enter your present address'}
                      />
                    )}
                  />

                  <Controller
                    name="nid"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="NID"
                        error={fieldState.invalid}
                        helperText={fieldState.invalid && 'Please enter your nid'}
                      />
                    )}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <Controller
                    name="country"
                    control={control}
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
