import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Stack, TextField, InputAdornment, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import Iconify from '../components/iconify';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const mdUp = useResponsive('up', 'md');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const password1 = data.get('password1');
    const password2 = data.get('password2');

    if (password1 !== password2) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      toast.success('Password reset successfully');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Helmet>
        <title> Reset Password | Brotherhood </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome to <br /> Brotherhood
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Reset your password
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              You have to reset your password
            </Typography>

            <Stack spacing={3} onSubmit={handleResetPassword} component="form">
              <TextField
                name="password1"
                label="New password"
                type={showPassword ? 'text' : 'password'}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                name="password2"
                label="Confirm new password"
                type={showPassword ? 'text' : 'password'}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <LoadingButton fullWidth size="large" type="submit" variant="contained">
                Confirm Password
              </LoadingButton>
            </Stack>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
