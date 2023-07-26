import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';

import load from './load.svg';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

// ----------------------------------------------------------------------

export default function Loading() {
  return (
    <>
      <Helmet>
        <title> Loading... </title>
      </Helmet>

      <Container maxWidth="lg">
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <img src={load} alt="Loading..." width="200px" />
        </StyledContent>
      </Container>
    </>
  );
}
