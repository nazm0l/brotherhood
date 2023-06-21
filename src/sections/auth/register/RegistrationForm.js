import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Typography,
  Box,
  InputLabel,
  Select,
  Grid,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
// components

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Handle form submission here
    console.log('Form submitted:', data);

    const response = await axios.post(
      'https://spread-admin-api-staging.azurewebsites.net/api/BrotherhoodUser/CreateBrotherhood',
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(response);

    navigate('/thank-you');
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {/* personal information */}
        <Grid container spacing={2} component="fieldset" sx={{ border: 1, borderColor: '#dddddd' }}>
          <legend>Personal Information</legend>
          <Grid item lg={6} xs={12} sm={12}>
            <Stack spacing={2}>
              <TextField
                name="name"
                label="Name"
                {...register('name', { required: 'Name is required' })}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
              />
              <TextField
                name="fatherName"
                label="Father's Name"
                {...register('fatherName', { required: "Father's Name is required" })}
                error={Boolean(errors.fatherName)}
                helperText={errors.fatherName?.message}
              />
              <TextField
                name="motherName"
                label="Mother's Name"
                {...register('motherName', { required: "Mother's Name is required" })}
                error={Boolean(errors.motherName)}
                helperText={errors.motherName?.message}
              />
            </Stack>
          </Grid>
          <Grid item lg={6} xs={12} sm={12}>
            <Stack spacing={2}>
              <TextField
                name="professionalStatus"
                label="Profession"
                {...register('professionalStatus', { required: 'Profession is required' })}
                error={Boolean(errors.professionalStatus)}
                helperText={errors.professionalStatus?.message}
              />
              <TextField
                name="maritalStatus"
                label="Marital Status"
                {...register('maritalStatus', { required: 'Marital Status is required' })}
                error={Boolean(errors.maritalStatus)}
                helperText={errors.maritalStatus?.message}
              />
              <TextField
                name="dateOfBirth"
                type="date"
                label="Date of Birth"
                {...register('dateOfBirth', { required: 'DoB is required' })}
                error={Boolean(errors.dateOfBirth)}
                helperText={errors.dateOfBirth?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Stack>
          </Grid>
        </Grid>
        {/* Contact Information */}
        <Grid container spacing={2} component="fieldset" sx={{ marginTop: '10px', border: 1, borderColor: '#dddddd' }}>
          <legend>Contact Information</legend>
          <Grid item lg={6} xs={12} sm={12}>
            <Stack spacing={2}>
              <TextField
                name="email"
                label="Email Address"
                {...register('email', { required: 'Email Address is required' })}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
              <TextField
                name="phone"
                label="Phone Number"
                {...register('phone', {
                  required: 'Phone Number is required',
                  pattern: {
                    value: /^[0-9]{10,11}$/,
                    message: 'Number should be 11 digits',
                  },
                })}
                error={Boolean(errors.phone)}
                helperText={errors.phone?.message}
              />
              <TextField
                name="alternatePhone"
                label="Alternate Number"
                {...register('alternatePhone', { required: 'Alternate Number is required' })}
                error={Boolean(errors.alternatePhone)}
                helperText={errors.alternatePhone?.message}
              />
            </Stack>
          </Grid>
          <Grid item lg={6} xs={12} sm={12}>
            <Stack spacing={2}>
              <TextField
                name="presentAddress"
                label="Present Address"
                multiline
                minRows={3}
                maxRows={4}
                {...register('presentAddress', { required: 'Present Address is required' })}
                error={Boolean(errors.presentAddress)}
                helperText={errors.presentAddress?.message}
              />
              <TextField
                name="permanentAddress"
                label="Permanent Address"
                multiline
                minRows={2}
                maxRows={4}
                {...register('permanentAddress', { required: 'Permanent Address is required' })}
                error={Boolean(errors.permanentAddress)}
                helperText={errors.permanentAddress?.message}
              />
              {/* <TextField
                name="school"
                label="School Name"
                {...register('school', { required: 'School is required' })}
                error={Boolean(errors.school)}
                helperText={errors.school?.message}
              />
              <TextField
                name="college"
                label="College Name"
                {...register('college', { required: 'College is required' })}
                error={Boolean(errors.college)}
                helperText={errors.college?.message}
              />
              <TextField
                name="university"
                label="University Name"
                {...register('university', { required: 'University is required' })}
                error={Boolean(errors.university)}
                helperText={errors.university?.message}
              /> */}
            </Stack>
          </Grid>
        </Grid>
        {/* Additional Information */}
        <Grid container spacing={2} component="fieldset" sx={{ marginTop: '10px', border: 1, borderColor: '#dddddd' }}>
          <legend>Additional Information</legend>
          <Grid item lg={6} xs={12} sm={12}>
            <Stack spacing={2}>
              <TextField
                name="nid"
                label="NID Number"
                {...register('nid', {
                  required: 'National ID (NID) is required',
                  pattern: {
                    value: /^[0-9]{7,12}$/,
                    message: 'NID should be a number with 7 to 12 digits',
                  },
                })}
                error={Boolean(errors.nid)}
                helperText={errors.nid?.message}
              />
              <TextField
                name="bloodGroup"
                label="Blood Group"
                {...register('bloodGroup', { required: 'Blood Group is required' })}
                error={Boolean(errors.bloodGroup)}
                helperText={errors.bloodGroup?.message}
              />
              <TextField
                name="religion"
                label="Religion"
                {...register('religion', { required: 'Religion is required' })}
                error={Boolean(errors.religion)}
                helperText={errors.religion?.message}
              />
            </Stack>
          </Grid>
          <Grid item lg={6} xs={12} sm={12}>
            <Stack spacing={2}>
              <TextField
                name="school"
                label="School Name"
                {...register('school', { required: 'School is required' })}
                error={Boolean(errors.school)}
                helperText={errors.school?.message}
              />
              <TextField
                name="college"
                label="College Name"
                {...register('college', { required: 'College is required' })}
                error={Boolean(errors.college)}
                helperText={errors.college?.message}
              />
              <TextField
                name="university"
                label="University Name"
                {...register('university', { required: 'University is required' })}
                error={Boolean(errors.university)}
                helperText={errors.university?.message}
              />
            </Stack>
          </Grid>
        </Grid>
        <LoadingButton sx={{ marginTop: '30px' }} fullWidth size="large" type="submit" variant="contained">
          Confirm Register
        </LoadingButton>
      </Box>
    </>
  );
}
