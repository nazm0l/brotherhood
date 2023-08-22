import { Icon } from '@iconify/react';
// material
import { Box, Card, Stack, Typography, alpha, styled } from '@mui/material';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

// ----------------------------------------------------------------------

const PERCENT = 2.6;

export default function PaymentHistoryCard({ title, value, color }) {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, backgroundColor: color }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" sx={{ mb: 3 }}>
          {title}
        </Typography>

        <Typography variant="h3">{value}</Typography>
      </Box>
      <Icon icon="akar-icons:arrow-right" width={24} height={24} />
    </Card>
  );
}
