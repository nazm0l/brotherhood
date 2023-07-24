import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Stack, Tabs, Icon, Tab, Box } from '@mui/material';
// sections
import { capitalCase } from 'change-case';
import AccountGeneral from '../components/accounts/AccountGeneral';
import { AppBlog } from '../sections/@dashboard/app';
import AppWelcome from '../components/app-welcome/AppWelcome';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState('general');

  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: '',
      component: <AccountGeneral />,
    },
    {
      value: 'change_password',
      icon: '',
      component: <p>Change password</p>,
    },
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard | Brotherhood ERP </title>
      </Helmet>

      <Container maxWidth="xl">
        {/* <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography> */}

        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <AppWelcome displayName="Kholil" />
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Typography variant="h4" sx={{ mb: 5 }}>
              User Details
            </Typography>

            <Stack spacing={5}>
              <Tabs
                value={currentTab}
                scrollButtons="auto"
                variant="scrollable"
                allowScrollButtonsMobile
                onChange={handleChangeTab}
              >
                {ACCOUNT_TABS.map((tab) => (
                  <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value} />
                ))}
              </Tabs>

              {ACCOUNT_TABS.map((tab) => {
                const isMatched = tab.value === currentTab;
                return isMatched && <Box key={tab.value}>{tab.component}</Box>;
              })}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
