import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, Typography, OutlinedInput, InputAdornment, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
// component
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

PaymentListToolbar.propTypes = {
  numSelected: PropTypes.number,
  searchTerm: PropTypes.string,
  pickDate: PropTypes.string,
  onSearchTerm: PropTypes.func,
  setPickDate: PropTypes.func,
};

export default function PaymentListToolbar({ numSelected, searchTerm, onSearchTerm, pickDate, setPickDate }) {
  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <StyledSearch
          value={searchTerm}
          onChange={onSearchTerm}
          placeholder="Search Trx Id..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <DatePicker label="Start Date" value={pickDate} onClick={(newValue) => setPickDate(newValue)} />
        <DatePicker label="End Date" value={pickDate} onClick={(newValue) => setPickDate(newValue)} />
      </Box>
    </StyledRoot>
  );
}
