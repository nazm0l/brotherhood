import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box, Stack } from '@mui/material';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 800,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function SupportPage() {
  return (
    <>
      <Helmet>
        <title> Support | Brotherhood </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center', marginTop: { sm: '30px' } }}>
          <Typography variant="h3" paragraph>
            We are here to support
          </Typography>

          <Stack direction="column" spacing={2}>
            <Typography align="justify" sx={{ color: 'text.secondary' }}>
              Welcome to the support page! We're here to help you with any questions or issues you may have. When
              contacting us, please provide as much information as possible about your issue. This will help us quickly
              identify the problem and provide a solution. If you have an account with us, please include your account
              information in your message. We strive to respond to all inquiries within 24 hours. However, during peak
              times, it may take longer for us to get back to you. Rest assured, we're working hard to resolve your
              issue as soon as possible.
            </Typography>
            <Typography align="justify" sx={{ color: 'text.dark' }}>
              Call at : 01717 745424
            </Typography>
          </Stack>
        </StyledContent>
      </Container>
    </>
  );
}
