import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
// material
import styled from '@emotion/styled';
import { alpha } from '@mui/material/styles';
import { Grid, Card, Typography, Divider, Avatar } from '@mui/material';

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
  const { title, description, baseAmount, goalAmount, isRunning, closedDate } = donation;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Link target="_blank" to="/single" style={{ textDecoration: 'none' }}>
        <Card {...other} sx={{ maxWidth: '300px' }}>
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
              src="https://cdn-icons-png.flaticon.com/512/2746/2746081.png"
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
          {/* 
      <Box sx={{ textAlign: 'center', mt: 2, mb: 2.5 }}>social</Box> */}

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
      </Link>
    </Grid>
  );
}