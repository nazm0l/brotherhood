// material

import {
  Card,
  Stack,
  Switch,
  Grid,
  TextField,
  Typography,
  FormHelperText,
  FormControlLabel,
  Box,
  FormControl,
} from '@mui/material';

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
              src="/static/mock-images/avatars/avatar_default.jpg"
              sx={{ width: 500, height: 280, mx: 'auto', mb: 5, borderRadius: '50%' }}
            />

            <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
              {''}
            </FormHelperText>

            <FormControlLabel control={<Switch />} labelPlacement="start" label="Public Profile" sx={{ mt: 5 }} />
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
