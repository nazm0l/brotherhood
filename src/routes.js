import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import CommunicationPage from './pages/CommunicationPage';
import DashboardAppPage from './pages/DashboardAppPage';
import ResetPassword from './pages/ResetPassword';
import RegistrationPage from './pages/RegistrationPage';
import AboutPage from './pages/AboutPage';
import SupportPage from './pages/SupportPage';
import PayPremiumPage from './pages/PayPremiumPage';
import DonationPage from './pages/DonationPage';
import Success from './pages/Success';
import PaymentPage from './pages/PaymentPage';
import PaymentHistoryPage from './pages/PaymentHistoryPage';
import RequireAuth from './sections/auth/RequireAuth';
import RequireAdmin from './sections/auth/RequireAdmin';
import ProfilePage from './pages/ProfilePage';
import SingleDonationPage from './pages/SingleDonationPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: (
        <RequireAuth>
          <DashboardLayout />
        </RequireAuth>
      ),
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'communication', element: <CommunicationPage /> },
        {
          path: 'payment-history',
          element: (
            <RequireAdmin>
              <PaymentHistoryPage />
            </RequireAdmin>
          ),
        },
        { path: 'donation', element: <BlogPage /> },
        { path: 'profile', element: <ProfilePage /> },
      ],
    },

    {
      path: 'reset-password',
      element: <ResetPassword />,
    },
    {
      path: 'success',
      element: <Success />,
    },
    {
      path: '/',
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/landing" />, index: true },
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'single',
          element: <SingleDonationPage />,
        },
        {
          path: 'about',
          element: <AboutPage />,
        },
        {
          path: 'support',
          element: <SupportPage />,
        },
        {
          path: 'pay-premium',
          element: <PayPremiumPage />,
        },
        {
          path: 'donation',
          element: <DonationPage />,
        },
        {
          path: 'landing',
          element: <PaymentPage />,
        },
        {
          path: 'create-brotherhood-user',
          element: <RegistrationPage />,
        },
      ],
    },
    { path: '404', element: <Page404 /> },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
