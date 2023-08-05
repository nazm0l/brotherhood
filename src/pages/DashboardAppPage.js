import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// sections
import AppDonationTable from '../components/app-donation/AppDonationTable';
import { AppCurrentVisits, AppBlog, AppWidgetSummary } from '../sections/@dashboard/app';
import AppWelcome from '../components/app-welcome/AppWelcome';
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const { auth } = useAuth();

  return (
    <>
      <Helmet>
        <title> Dashboard | Brotherhood ERP </title>
      </Helmet>

      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <AppWelcome displayName={auth.user} />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h4">Slider appeared here</Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Active Users" total={1420} icon={'clarity:users-solid'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Store Amount" total={10206} color="info" icon={'nimbus:money'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Donation Received" total={1723} color="warning" icon={'nimbus:money'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Withdrawn Money" total={1006} color="error" icon={'vaadin:money-withdraw'} />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h5" sx={{ marginBottom: '30px' }}>
              Recent donated users
            </Typography>
            <AppDonationTable />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h5" sx={{ marginBottom: '30px' }}>
              Panel/Board Members
            </Typography>
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppBlog />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
