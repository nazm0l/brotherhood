import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from './blogo.png';

const drawerWidth = 240;
const navItems = [
  { name: 'Main Website', link: '#' },
  { name: 'About', link: '/about' },
  { name: 'Support', link: '/support' },
  { name: 'Pay Premium', link: '/pay-premium' },
  { name: 'Donation', link: '/donation' },
  { name: 'Register', link: '/landing' },
  { name: 'Unfinished Registration', link: '/unfinished-registration' },
  { name: 'Login', link: '/login' },
];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ backgroundColor: '#3eb3af', display: 'grid', placeItems: 'center' }}>
        <Link to="/">
          <img src={Logo} width="80px" alt="logo" />
        </Link>
      </Box>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <Link
              style={{
                fontSize: '1.2rem',
                textDecoration: 'none',
                padding: '10px',
                color: '#3eb3af',
                width: '100%',
                textAlign: 'center',
              }}
              to={item.link}
            >
              <ListItemText sx={{ textAlign: 'center' }} primary={item.name} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, marginLeft: '40px' }}>
            <Link to="/">
              <img src={Logo} width="100px" alt="logo" />
            </Link>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item, index) => (
              <Link
                to={item.link}
                style={{
                  fontSize: '1.1rem',
                  textDecoration: 'none',
                  padding: '10px',
                  color: '#fff',
                }}
                key={index}
                sx={{ color: '#fff' }}
              >
                {item.name}
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
