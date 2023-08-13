import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
// sections
import { LoginForm } from '../sections/auth/login';
import Loading from '../components/loading/Loading';

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
  const mdUp = useResponsive('up', 'md');

  const [loading, setLoading] = useState(false);

  return (
    <>
      <Helmet>
        <title> Login | Brotherhood ERP </title>
      </Helmet>

      {loading ? (
        <Container sx={{ minHeight: '90vh', display: 'grid', placeItems: 'center' }}>
          <Loading />
        </Container>
      ) : (
        <StyledRoot>
          {mdUp && (
            <StyledSection>
              <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                Brotherhood ERP
              </Typography>
              <img src="/assets/illustrations/illustration_login.png" alt="login" />
            </StyledSection>
          )}

          <Container maxWidth="sm">
            <StyledContent>
              <Typography variant="h4" gutterBottom>
                Sign in to Brotherhood
              </Typography>

              <Typography variant="body2" sx={{ mb: 5 }}>
                Don’t have an account? {''}
                <Link to="/landing" variant="subtitle2">
                  Get started
                </Link>
              </Typography>
              <LoginForm setLoading={setLoading} />
            </StyledContent>
          </Container>
        </StyledRoot>
      )}
    </>
  );
}
