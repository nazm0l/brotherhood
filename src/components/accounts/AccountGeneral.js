// material

import { Card, Stack, Grid, TextField, Typography, Box, FormControl } from '@mui/material';

import { LoadingButton } from '@mui/lab';

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
  const handleSubmit = () => {};

  return (
    <FormControl autoComplete="off" noValidate onSubmit={handleSubmit}>
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
                <TextField fullWidth label="Name" />
                <TextField fullWidth disabled label="Email Address" />
              </Stack>

              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <TextField fullWidth label="Phone Number" />
                <TextField fullWidth label="Address" />
              </Stack>

              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <TextField
                  select
                  fullWidth
                  label="Country"
                  placeholder="Country"
                  SelectProps={{ native: true }}
                  helperText="Please select your country"
                >
                  <option value="" />
                  {countries.map((option) => (
                    <option key={option.code} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
                <TextField fullWidth label="State/Region" />
              </Stack>

              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <TextField fullWidth label="City" />
                <TextField fullWidth label="Zip/Code" />
              </Stack>

              <TextField fullWidth multiline minRows={4} maxRows={4} label="About" />
            </Stack>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <LoadingButton type="submit" variant="contained">
                Save Changes
              </LoadingButton>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </FormControl>
  );
}
