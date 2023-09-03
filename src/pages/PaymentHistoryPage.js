import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Grid,
} from '@mui/material';
// components
import usePaymentSummary from '../hooks/usePaymentSummary';
import Loading from '../components/loading/Loading';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import PaymentHistoryCard from '../components/payment-history/PaymentHistoryCard';
import PaymentHistoryBkashCard from '../components/payment-history/PaymentHistoryBkashCard';

// ----------------------------------------------------------------------
import Nagad from '../images/Nagad.svg';
import bKash from '../images/bkash.svg';

// sections
import { PaymentListHead, PaymentListToolbar } from '../sections/@dashboard/paymentHistory';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: 'transactionId', label: 'Trx Id', alignRight: false },
  { id: 'paymentAmount', label: 'Payment Amount', alignRight: false },
  { id: 'storeAmount', label: 'Store Amount', alignRight: false },
  { id: 'vendor', label: 'Vendor', alignRight: false },
  { id: 'Campaign', label: 'Campaign', alignRight: false },
  { id: 'reference', label: 'Reference', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function PaymentHistoryPage() {
  const [paymentData, setPaymentData] = useState([]);

  const [dataCount, setDataCount] = useState(0);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [pickDate, setPickDate] = useState(Date.now());

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [searchTerm, setSearchTerm] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [paymentSummary, loading] = usePaymentSummary();

  useEffect(() => {
    const take = rowsPerPage; // Number of data to load per page
    console.log('Taking:', take);
    const skip = page * rowsPerPage; // Number of data to skip
    console.log('Skipping:', skip);
    const url = `https://spread-admin-api-staging.azurewebsites.net/api/PaymentReport/user-payment-history?take=${take}&skip=${skip}&searchTerm=${searchTerm}`;

    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPaymentData(data);
        setDataCount(data.length);
      })
      .catch((err) => console.log('err: ', err));
  }, [page, rowsPerPage, searchTerm]);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataCount) : 0;

  const filteredPayment = applySortFilter(paymentData, getComparator(order, orderBy));

  const isNotFound = !filteredPayment.length && !!searchTerm;

  // Add console logs to various parts of the component
  // console.log('page:', page);
  // console.log('rowsPerPage:', rowsPerPage);
  // console.log('dataCount:', dataCount);
  // console.log('filteredPayment:', filteredPayment);

  return (
    <>
      <Helmet>
        <title> Payment History | Brotherhood ERP </title>
      </Helmet>

      {loading ? (
        <Container sx={{ display: 'flex', height: '90vh', placeItems: 'center' }}>
          <Loading />
        </Container>
      ) : (
        <>
          <Container maxWidth={'lg'} sx={{ marginBottom: '30px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <PaymentHistoryCard
                  title="Total Store Amount"
                  value={paymentSummary?.totalStoreAmout}
                  color="#F1F0E8"
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <PaymentHistoryCard
                  title="Total Payment Amount"
                  value={paymentSummary?.receivedAmout}
                  color="#C8FFE0"
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <PaymentHistoryCard title="Total Donation Amount" value={paymentSummary?.byDonation} color="#EDE4FF" />
              </Grid>

              <Grid item xs={12} md={3}>
                <PaymentHistoryBkashCard summaryData={paymentSummary} color="#E2F6CA" />
              </Grid>
            </Grid>
          </Container>
          <Container>
            <Card>
              <PaymentListToolbar searchTerm={searchTerm} onSearchTerm={handleSearchTerm} />

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  {dataCount === 0 ? (
                    <Loading />
                  ) : (
                    <Table>
                      <PaymentListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        onRequestSort={handleRequestSort}
                        date={pickDate}
                        setPickDate={setPickDate}
                      />
                      <TableBody>
                        {filteredPayment.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                          const {
                            id,
                            name,
                            phone,
                            transactionId,
                            paymentAmount,
                            storeAmount,
                            vendor,
                            campaign,
                            reference,
                            dateTime,
                          } = row;

                          return (
                            <TableRow hover key={id} tabIndex={-1} role="checkbox">
                              <TableCell>
                                <Typography variant="subtitle2" alignItems="center" noWrap>
                                  {page * rowsPerPage + i + 1}
                                </Typography>
                              </TableCell>

                              <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="subtitle2" noWrap>
                                    {name}
                                  </Typography>
                                </Stack>
                              </TableCell>

                              <TableCell align="left">{phone}</TableCell>

                              <TableCell align="left">{transactionId}</TableCell>

                              <TableCell align="center">৳ {paymentAmount}</TableCell>

                              <TableCell align="center">৳ {storeAmount}</TableCell>

                              <TableCell align="left">
                                {vendor === 'bKash' ? (
                                  <img src={bKash} alt="bkash" width={40} height={32} />
                                ) : vendor === 'Nagad' ? (
                                  <img src={Nagad} alt="nagad" height="30" width="50" />
                                ) : (
                                  vendor
                                )}
                              </TableCell>

                              <TableCell align="left">{campaign}</TableCell>

                              <TableCell align="left">{reference}</TableCell>

                              <TableCell align="left">{dateTime.substring(0, 10)}</TableCell>

                              <TableCell align="right">
                                <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                                  <Iconify icon={'eva:more-vertical-fill'} />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>

                      {isNotFound && (
                        <TableBody>
                          <TableRow>
                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                              <Paper
                                sx={{
                                  textAlign: 'center',
                                }}
                              >
                                <Typography variant="h6" paragraph>
                                  Not found
                                </Typography>

                                <Typography variant="body2">
                                  No results found for &nbsp;
                                  <strong>&quot;{searchTerm}&quot;</strong>.
                                  <br /> Try checking for typos or using complete words.
                                </Typography>
                              </Paper>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      )}
                    </Table>
                  )}
                </TableContainer>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[10, 25]}
                component="div"
                count={dataCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Container>{' '}
        </>
      )}

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 200,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Download receipt
        </MenuItem>

        <MenuItem>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Send receipt
        </MenuItem>
      </Popover>
    </>
  );
}
