import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Container, Typography } from '@mui/material';
// sections
import usePaymentSummary from '../hooks/usePaymentSummary';
import Loading from '../components/loading/Loading';
import UserCard from '../components/user-card/UserCard';
import AppSlider from '../components/app-slider/AppSlider';
import AppDonationTable from '../components/app-donation/AppDonationTable';
import { AppWidgetSummary } from '../sections/@dashboard/app';
import AppWelcome from '../components/app-welcome/AppWelcome';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const { auth } = useAuth();
  const [userList, setUserList] = useState([]);
  const [paymentSummary, loading] = usePaymentSummary();
  const admin = useAdmin();

  useEffect(() => {
    getDonationList();
  }, []);

  const getDonationList = async () => {
    await fetch('https://spread-admin-api-staging.azurewebsites.net/api/UserManagement/UserList/user-list', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUserList(data));
  };

  return (
    <>
      <Helmet>
        <title> Dashboard | Brotherhood ERP </title>
      </Helmet>

      {loading ? (
        <Container sx={{ display: 'flex', height: '90vh', placeItems: 'center' }}>
          <Loading />
        </Container>
      ) : (
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <AppWelcome displayName={auth?.user} />
            </Grid>

            <Grid item xs={12} md={4}>
              <AppSlider />
            </Grid>

            {admin && (
              <>
                <Grid item xs={12} sm={6} md={3}>
                  <AppWidgetSummary title="Total Active Users" total={userList?.length} icon={'clarity:users-solid'} />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <AppWidgetSummary
                    title="Total Store Amount"
                    total={paymentSummary?.totalStoreAmout}
                    color="info"
                    icon={'nimbus:money'}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <AppWidgetSummary
                    title="Total Donation Received"
                    total={paymentSummary?.byDonation}
                    color="warning"
                    icon={'nimbus:money'}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <AppWidgetSummary
                    title="Total Payment"
                    total={paymentSummary?.receivedAmout}
                    color="error"
                    icon={'vaadin:money-withdraw'}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12} md={12} lg={12}>
              <Typography variant="h5" sx={{ marginY: '15px' }}>
                Recent Donations
              </Typography>
              <AppDonationTable userList={userList} />
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Typography variant="h5" sx={{ marginY: '15px' }}>
                Panel/Board Members
              </Typography>

              <UserCard
                user={{
                  name: 'Md Najmul',
                  cover: 'https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg',
                  position: 'Senior',
                  avatarUrl:
                    'https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}
