// material

import { LoadingButton } from '@mui/lab';
import { Card, Container, FormControl, Stack, TextField } from '@mui/material';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      oldPassword: data.get('oldPassword'),
      newPassword: data.get('newPassword'),
      confirmNewPassword: data.get('confirmNewPassword'),
    });
  };

  return (
    <Container maxWidth="lg">
      <Card sx={{ p: 3 }}>
        <FormControl autoComplete="off" noValidate onSubmit={handleSubmit} fullWidth>
          <Stack spacing={3} alignItems="flex-end">
            <TextField fullWidth autoComplete="on" type="password" label="Old Password" />

            <TextField fullWidth autoComplete="on" type="password" label="New Password" />

            <TextField fullWidth autoComplete="on" type="password" label="Confirm New Password" />

            <LoadingButton type="submit" variant="contained">
              Save Changes
            </LoadingButton>
          </Stack>
        </FormControl>
      </Card>
    </Container>
  );
}
