import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Stack, Tabs, Tab, Box } from '@mui/material';
// sections
import { capitalCase } from 'change-case';
import AccountGeneral from '../components/accounts/AccountGeneral';
import AccountChangePassword from '../components/accounts/AccountChangePassword';

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
      component: <AccountChangePassword />,
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

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
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
