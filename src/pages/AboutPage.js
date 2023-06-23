import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Container, Box, Stack } from '@mui/material';

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

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title> About | Brotherhood </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center', marginTop: { sm: '30px' } }}>
          <Typography variant="h3" paragraph>
            We're on a mission to make the world more <span style={{ color: '#3eb3af' }}>enjoyable</span>
          </Typography>

          <Stack direction="column" spacing={2}>
            <Typography align="justify" sx={{ color: 'text.secondary' }}>
              Our mission is to make the world more accessible and enjoyable. We're reducing the entry barrier, making
              the path smooth for everyone.
            </Typography>
          </Stack>
        </StyledContent>
      </Container>
    </>
  );
}
