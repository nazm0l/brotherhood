import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Stack, TextField, Box, Grid, Typography, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { toast } from 'react-toastify';
// components

// ----------------------------------------------------------------------

export default function RegistrationForm({ BrTrxId }) {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm();
  const [imagePath, setImagePath] = useState('');

  const onSubmit = async (data) => {
    // Handle form submission here
    console.log('Form submitted:', {
      ...data,
      imagePath,
      roles: ['0DA3649E-E5EC-4C5B-A9C0-EC3B19F86E0C'],
    });

    try {
      const response = await axios.post(
        'https://spread-admin-api-staging.azurewebsites.net/api/UserManagement/AddUser',
        {
          ...data,
          password: '123456',
          Trxid: BrTrxId,
          roles: ['0DA3649E-E5EC-4C5B-A9C0-EC3B19F86E0C'],
          imagePath,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response);
      toast.success('User created successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {/* user name */}

        <Grid container spacing={2} component="fieldset" sx={{ border: 1, borderColor: '#dddddd' }}>
          {/* <legend>
            <Typography variant="h6">User Name</Typography>
          </legend> */}
          <Grid item lg={12} xs={12} sm={12}>
            <Stack spacing={2}>
              <Box sx={{ display: 'grid', placeItems: 'center' }}>
                <TextField
                  name="userName"
                  label="User Name"
                  {...register('userName', { required: 'User Name is required' })}
                  error={Boolean(errors.userName)}
                  helperText={errors.userName?.message}
                  sx={{ width: '50%' }}
                />
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* personal information */}
        <Grid container spacing={2} component="fieldset" sx={{ marginTop: '20px', border: 1, borderColor: '#dddddd' }}>
          <legend>
            <Typography variant="h6">Personal Information</Typography>
          </legend>

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
              <Controller
                name="maritalStatus"
                control={control}
                defaultValue=""
                rules={{ required: 'Marital Status is required' }}
                render={({ field }) => (
                  <FormControl error={Boolean(errors.maritalStatus)} fullWidth>
                    <InputLabel sx={{ background: 'white', px: 0.5 }} id="marital-status-label">
                      Marital Status
                    </InputLabel>
                    <Select labelId="marital-status-label" id="marital-status" {...field}>
                      <MenuItem value="Married">Married</MenuItem>
                      <MenuItem value="Unmarried">Unmarried</MenuItem>
                    </Select>
                    {errors.maritalStatus && (
                      <Typography variant="caption" color="error">
                        {errors.maritalStatus.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
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
        <Grid container spacing={2} component="fieldset" sx={{ marginTop: '20px', border: 1, borderColor: '#dddddd' }}>
          <legend>
            <Typography variant="h6">Contact Information</Typography>
          </legend>
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
            </Stack>
          </Grid>
        </Grid>
        {/* Additional Information */}
        <Grid container spacing={2} component="fieldset" sx={{ marginTop: '20px', border: 1, borderColor: '#dddddd' }}>
          <legend>
            <Typography variant="h6">Additional Information</Typography>
          </legend>
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

              <Controller
                name="bloodGroup"
                control={control}
                defaultValue=""
                rules={{ required: 'Blood Group is required' }}
                render={({ field }) => (
                  <FormControl error={Boolean(errors.bloodGroup)} fullWidth>
                    <InputLabel id="blood-group-label" sx={{ background: 'white', px: 0.5 }}>
                      Blood Group
                    </InputLabel>
                    <Select labelId="blood-group-label" id="blood-group" {...field}>
                      <MenuItem value="A+">A+</MenuItem>
                      <MenuItem value="A-">A-</MenuItem>
                      <MenuItem value="B+">B+</MenuItem>
                      <MenuItem value="B-">B-</MenuItem>
                      <MenuItem value="AB+">AB+</MenuItem>
                      <MenuItem value="AB-">AB-</MenuItem>
                      <MenuItem value="O+">O+</MenuItem>
                      <MenuItem value="O-">O-</MenuItem>
                    </Select>
                    {errors.bloodGroup && (
                      <Typography variant="caption" color="error">
                        {errors.bloodGroup.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                name="religion"
                control={control}
                defaultValue=""
                rules={{ required: 'Religion is required' }}
                render={({ field }) => (
                  <FormControl error={Boolean(errors.religion)} fullWidth>
                    <InputLabel sx={{ background: 'white', px: 0.5 }} id="religion-status-label">
                      Religion
                    </InputLabel>
                    <Select labelId="religion-status-label" id="religion-status" {...field}>
                      <MenuItem value="Islam">Islam</MenuItem>
                      <MenuItem value="Hindu/Sanatan">Hindu/Sanatan</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                    {errors.religion && (
                      <Typography variant="caption" color="error">
                        {errors.religion.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
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
        {/* Upload Image */}

        <Grid container spacing={2} component="fieldset" sx={{ marginTop: '20px', border: 1, borderColor: '#dddddd' }}>
          <legend>
            <Typography variant="h6">Upload Image</Typography>
          </legend>
          <Grid item lg={12} xs={12} sm={12}>
            <Stack spacing={2}>
              <Box sx={{ display: 'grid', placeItems: 'center' }}>
                {imagePath ? (
                  <img
                    src={URL.createObjectURL(imagePath)}
                    alt="profile"
                    width={120}
                    height={120}
                    style={{ borderRadius: '50%' }}
                  />
                ) : (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
                    alt="icon"
                    width={120}
                    height={120}
                    style={{ borderRadius: '50%' }}
                  />
                )}
                <TextField
                  sx={{ marginY: '20px' }}
                  name="imagePath"
                  type="file"
                  onChange={(e) => setImagePath(e.target.files[0])}
                />
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <Stack direction="row" marginTop="30px" justifyContent="flex-end" gap={3}>
          <LoadingButton fullWidth size="large" type="submit" variant="contained">
            Confirm Register
          </LoadingButton>
          <LoadingButton fullWidth size="large" color="error" variant="contained">
            Cancel
          </LoadingButton>
        </Stack>
      </Box>
    </>
  );
}
