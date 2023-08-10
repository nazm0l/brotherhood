import React from 'react';
import { Box } from '@mui/material';

import bondhon from '../../images/bondhon.png';

export default function AppSlider() {
  return (
    <Box>
      <img style={{ borderRadius: '10px' }} src={bondhon} width="100%" height="300px" alt="slider" />
    </Box>
  );
}
