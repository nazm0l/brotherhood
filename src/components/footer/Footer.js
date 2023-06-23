import React from 'react';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        backgroundColor: 'primary.main',
        paddingTop: '1rem',
        paddingBottom: '1rem',
      }}
    >
      <Container maxWidth="100%">
        <Grid container direction="row" gap={4}>
          <Grid item xs={12} sm={12} md={6}>
            <img src="https://invoice.aamarpay.com/invoice-form/production/Footer-Logo.png" alt="amarpay" />
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <Stack alignItems="center">
              <img
                src="https://spread360.com.bd/wp-content/uploads/2022/12/logo-final1.png"
                alt="Spre’ad360"
                width="150px"
              />
              <Typography color="black" variant="body">
                Tech partner : Spre’ad360 (www.spread360.com.bd)
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
