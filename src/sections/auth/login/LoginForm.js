import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Typography,
  Box,
  Button,
  Dialog,
  DialogContent,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import axios from '../../../api/axios';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleLoginForm = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const username = data.get('username');
    const password = data.get('password');

    if (!username || !password) {
      toast.error('Please enter username and password');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/Security/login', JSON.stringify({ username, password }), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const accessToken = response?.data?.accessToken;
      localStorage.setItem('accessToken', accessToken);

      setAuth({ accessToken });

      if (response?.data?.requiresPasswordReset === true) {
        navigate('/reset-password', { replace: true });
        return;
      }

      navigate('/dashboard', { replace: true });

      setLoading(false);

      console.log(response.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.response?.status === 400) {
        toast.error('Invalid user');
      }

      toast.error('Something went wrong');
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    // Handle form submission here
    console.log('Form submitted:', data);

    const response = await axios.post(
      'https://spread-admin-api-staging.azurewebsites.net/api/SpreadUser/Spread-user-reset-password',
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.data);

    setOpen(false);
  };

  return (
    <>
      <Box component="form" onSubmit={handleLoginForm}>
        <Stack spacing={3}>
          <TextField name="username" label="Username" />

          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
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
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Stack direction="row" alignItems="center">
            <Checkbox name="remember" label="Remember me" />
            <Typography variant="body2">Remember me</Typography>
          </Stack>
          <Link variant="subtitle2" underline="hover" sx={{ cursor: 'pointer' }} onClick={handleClickOpen}>
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          {loading ? 'Loading...' : 'Login'}
        </LoadingButton>
      </Box>

      <Box>
        <Dialog open={open} onClose={handleClose} component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} sx={{ padding: '20px 40px 10px 40px' }}>
            <Typography variant="h4" align="center" sx={{ color: 'text.dark' }}>
              Forgot your password?
            </Typography>
            <Typography variant="body" align="justify" sx={{ color: 'text.secondary' }}>
              Please enter your email to get the password via your email.
            </Typography>
          </Stack>
          <DialogContent sx={{ padding: '20px 40px 40px 40px' }}>
            <Stack flexBasis={1} spacing={2}>
              <TextField
                name="email"
                autoFocus
                label="Your Email"
                {...register('email', { required: 'Email is required' })}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            </Stack>
            <Stack direction="row" marginTop="30px" justifyContent="flex-end" gap={3}>
              <Button variant="contained" type="submit" sx={{ padding: { xs: '5px 30px', md: '8px 40px' } }}>
                Get Password
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleClose}
                sx={{ padding: { xs: '5px 30px', md: '8px 30px' } }}
              >
                Cancel
              </Button>
            </Stack>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
}
