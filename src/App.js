import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import 'react-toastify/dist/ReactToastify.css';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider>
            <ScrollToTop />
            <Router />
            <ToastContainer />
          </ThemeProvider>
        </LocalizationProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
