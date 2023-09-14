import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
// @mui
import { styled } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';
import { Button, Typography, Container, Box, Card, FormControl, Grid, TextField, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';

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
  const [messageCount, setMessageCount] = useState(0);

  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      message: '',
      phoneNumber: '',
    },
  });

  const onSubmit = async (data) => {
    // Handle form submission here
    console.log('Form submitted:', data);

    try {
      const response = await axios.post(
        'https://spread-admin-api-staging.azurewebsites.net/api/Communication/send-sms',
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.result.includes('Error')) {
        toast.error(response.data.result);
      } else {
        toast.success(response.data.result);
      }

      console.log(response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const messageValue = watch('message', ''); // Get the value of the message input field
  useEffect(() => {
    setMessageCount(messageValue.length); // Update character count
  }, [messageValue]);

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
                      <Stack direction={'row'} sx={{ justifyContent: 'space-between' }} spacing={2}>
                        <Typography variant="h6" gutterBottom>
                          Send Message
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                          Credit left: 100
                        </Typography>
                      </Stack>

                      <Controller
                        name="phoneNumber"
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
                      <Typography variant="body2">
                        Character Count: {messageCount}/160
                        <span style={{ color: 'red', display: 'block' }}>
                          {' '}
                          Sms Count : {messageCount > 160 ? Math.ceil(messageCount / 160) : 1}
                        </span>
                      </Typography>
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
