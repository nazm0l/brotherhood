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

// ----------------------------------------------------------------------

function InfoItem() {
  return (
    <Grid item xs={12}>
      <Typography variant="caption" sx={{ mb: 0.5, color: 'text.secondary', display: 'block' }}>
        Phone: 01777444444
      </Typography>
      <Typography variant="caption" sx={{ mb: 0.5, color: 'text.secondary', display: 'block' }}>
        Email: abc@gmail.com
      </Typography>
    </Grid>
  );
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default function UserCard({ user, ...other }) {
  const { name, cover, position, avatarUrl } = user;

  return (
    <Card {...other}>
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
          alt={name}
          src={avatarUrl}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            position: 'absolute',
            transform: 'translateY(-50%)',
          }}
        />
        <CoverImgStyle alt="cover" src={cover} />
      </CardMediaStyle>

      <Typography variant="subtitle1" align="center" sx={{ mt: 6 }}>
        {name}
      </Typography>
      <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
        {position}
      </Typography>
      {/* 
      <Box sx={{ textAlign: 'center', mt: 2, mb: 2.5 }}>social</Box> */}

      <Divider />

      <Grid container sx={{ py: 3, textAlign: 'center' }}>
        {InfoItem()}
      </Grid>
    </Card>
  );
}
