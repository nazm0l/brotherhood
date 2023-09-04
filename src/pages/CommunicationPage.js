import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
// @mui
import { styled } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';
import { Button, Typography, Container, Box, Card, FormControl, Grid, TextField, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 800,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function CommunicationPage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      number: '',
      message: '',
    },
  });

  const onSubmit = async (data) => {
    // Handle form submission here
    console.log(data);
  };

  return (
    <>
      <Helmet>
        <title> Communication | Brotherhood ERP </title>
      </Helmet>

      <StyledContent>
        <FormControl autoComplete="off">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={{ xs: 2, md: 3 }}>
                    <Stack direction={{ xs: 'column', md: 'column' }} spacing={2}>
                      <Typography variant="h6" gutterBottom>
                        Send Message
                      </Typography>

                      <Controller
                        name="number"
                        control={control}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Add phone number here"
                            error={fieldState.invalid}
                            helperText={fieldState.invalid && 'Please add phone number'}
                          />
                        )}
                      />

                      <Controller
                        name="message"
                        control={control}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            fullWidth
                            multiline
                            minRows={5}
                            maxRows={6}
                            label="Type your message here"
                            error={fieldState.invalid}
                            helperText={fieldState.invalid && 'Please type your message'}
                          />
                        )}
                      />
                    </Stack>
                  </Stack>

                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <LoadingButton type="submit" variant="contained">
                      Send Message
                    </LoadingButton>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </form>
        </FormControl>
      </StyledContent>
    </>
  );
}
