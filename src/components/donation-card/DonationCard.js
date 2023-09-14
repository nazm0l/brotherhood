import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
// material
import styled from '@emotion/styled';
import { alpha } from '@mui/material/styles';
import { Grid, Card, Typography, Divider, Avatar, Box } from '@mui/material';
// utils
import charity from '../../images/charity.png';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  paddingTop: 'calc(100% * 9 / 16)',
  '&:before': {
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(3px)', // Fix on Mobile
    borderTopLeftRadius: theme.shape.borderRadiusMd,
    borderTopRightRadius: theme.shape.borderRadiusMd,
    backgroundColor: alpha(theme.palette.primary.darker, 0.72),
  },
}));

const CoverImgStyle = styled('img')({
  top: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

DonationCard.propTypes = {
  donation: PropTypes.object.isRequired,
};

export default function DonationCard({ donation, ...other }) {
  const navigate = useNavigate();

  const donationDetails = (id) => {
    navigate(`/single/${id}`);
  };

  const { donationId, title, description, baseAmount, goalAmount, closedDate } = donation;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box onClick={() => donationDetails(donationId)} sx={{ cursor: 'pointer' }}>
        <Card
          {...other}
          sx={{ md: { maxWidth: '300px' }, ':hover': { boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' } }}
        >
          <CardMediaStyle>
            {/* <SvgIconStyle
          color="paper"
          src="/static/icons/shape-avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            bottom: -26,
            position: 'absolute',
          }}
        /> */}
            <Avatar
              alt="Donation"
              src={charity}
              sx={{
                width: 64,
                height: 64,
                zIndex: 11,
                position: 'absolute',
                transform: 'translateY(-50%)',
                backgroundColor: 'white',
                border: '2px solid #3EB3AF',
                objectFit: 'cover',
              }}
            />
            <CoverImgStyle
              alt="cover"
              src="https://img.freepik.com/free-vector/people-carrying-donation-charity-related-icons_53876-43091.jpg"
            />
          </CardMediaStyle>

          <Typography variant="subtitle1" align="center" sx={{ mt: 6 }}>
            {title}
          </Typography>
          <Typography variant="body2" align="justify" sx={{ color: 'text.secondary', padding: '10px' }}>
            {description.slice(0, 80)} ...
          </Typography>

          <Divider />

          <Grid container sx={{ py: 3, textAlign: 'center' }}>
            <Grid item xs={12}>
              <Typography variant="caption" sx={{ mb: 0.5, color: 'text.secondary', display: 'block' }}>
                Base Amount: {baseAmount}
              </Typography>
              <Typography variant="caption" sx={{ mb: 0.5, color: 'text.secondary', display: 'block' }}>
                Goal Amount: {goalAmount}
              </Typography>
              <Typography variant="caption" sx={{ mb: 0.5, color: 'text.secondary', display: 'block' }}>
                closed Date: {closedDate.split('T')[0]}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Grid>
  );
}
