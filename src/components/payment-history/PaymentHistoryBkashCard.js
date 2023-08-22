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

export default function PaymentHistoryBkashCard({ summaryData, color }) {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, backgroundColor: color }}>
      <Box sx={{ flexGrow: 1 }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">bKash: {summaryData?.byBkash}</Typography>
            <Typography variant="subtitle2">Nagad: {summaryData?.byNagad}</Typography>
            <Typography variant="subtitle2">Rocket: {summaryData?.byRocket}</Typography>
          </Stack>
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Cards: {summaryData?.byRocket}</Typography>
            <Typography variant="subtitle2">DBBL: {summaryData?.byVisa}</Typography>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}
