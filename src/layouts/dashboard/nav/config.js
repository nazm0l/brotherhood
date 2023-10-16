// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

export const generalNavConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
    admin: false,
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
    admin: true,
  },
  {
    title: 'payment history',
    path: '/dashboard/payment-history',
    icon: icon('ic_payment'),
    admin: false,
  },
  {
    title: 'Donation',
    path: '/dashboard/donation',
    icon: icon('ic_blog'),
    admin: false,
  },
];

export const managementNavConfig = [
  {
    title: 'profile',
    path: '/dashboard/profile',
    icon: icon('ic_profile'),
    admin: false,
  },
  {
    title: 'communication',
    path: '/dashboard/communication',
    icon: icon('ic_user'),
    admin: true,
  },
];
