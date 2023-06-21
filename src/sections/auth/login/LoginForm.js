import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import axios from '../../../api/axios';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const username = data.get('username');
    const password = data.get('password');

    if (!username || !password) {
      toast.error('Please enter username and password');
      return;
    }

    console.log({
      username,
      password,
    });

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

  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
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
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          {loading ? 'Loading...' : 'Login'}
        </LoadingButton>
      </Box>
    </>
  );
}
