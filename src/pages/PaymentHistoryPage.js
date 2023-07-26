import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
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
import Loading from '../components/loading/Loading';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import PaymentHistoryCard from '../components/payment-history/PaymentHistoryCard';

// ----------------------------------------------------------------------
import Nagad from '../images/Nagad.svg';
import bKash from '../images/bkash.svg';

// sections
import { PaymentListHead, PaymentListToolbar } from '../sections/@dashboard/paymentHistory';

// data

const data = [
  {
    id: '1',
    name: 'John Doe',
    phone: '01700000000',
    transactionId: '123456789',
    paymentAmount: '1000',
    storeAmount: '1000',
    vendor: 'bKash',
    campaign: 'Campaign 1',
    reference: 'Reference 1',
    dateTime: '2021-10-10',
  },
  {
    id: '2',
    name: 'John Kumar',
    phone: '01700000000',
    transactionId: '123456789',
    paymentAmount: '1000',
    storeAmount: '1000',
    vendor: 'Nagad',
    campaign: 'Campaign 1',
    reference: 'Reference 1',
    dateTime: '2021-10-10',
  },
  {
    id: '3',
    name: 'John Cena',
    phone: '01700000000',
    transactionId: '123456789',
    paymentAmount: '1000',
    storeAmount: '1000',
    vendor: 'bKash',
    campaign: 'Campaign 1',
    reference: 'Reference 1',
    dateTime: '2021-10-10',
  },
];

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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.transactionId.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function PaymentHistoryPage() {
  const [paymentData, setPaymentData] = useState([]);

  const [dataCount, setDataCount] = useState(0);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [pickDate, setPickDate] = useState('');

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterTrxId, setFilterTrxId] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const take = rowsPerPage; // Number of data to load per page
    console.log('Taking:', take);
    const skip = page * rowsPerPage; // Number of data to skip
    console.log('Skipping:', skip);
    const url = `https://spread-admin-api-staging.azurewebsites.net/api/PaymentReport/admin-payment-report?take=${take}&skip=${skip}`;

    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data: ', data);
        setPaymentData(data.paymentHistory);
        setDataCount(data.totalItem);
      })
      .catch((err) => console.log('err: ', err));
  }, [page, rowsPerPage]);

  // Finance

  useEffect(() => {}, []);

  console.log('paymentData: ', paymentData);

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

  const handleFilterByTrxId = (event) => {
    setPage(0);
    setFilterTrxId(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataCount) : 0;

  const filteredPayment = applySortFilter(paymentData, getComparator(order, orderBy), filterTrxId);

  const isNotFound = !filteredPayment.length && !!filterTrxId;

  // Add console logs to various parts of the component
  console.log('page:', page);
  console.log('rowsPerPage:', rowsPerPage);
  console.log('dataCount:', dataCount);
  console.log('filteredPayment:', filteredPayment);

  return (
    <>
      <Helmet>
        <title> Payment History | Brotherhood ERP </title>
      </Helmet>

      <Container maxWidth={'lg'} sx={{ marginBottom: '30px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <PaymentHistoryCard title="Total User" value={dataCount} />
          </Grid>

          <Grid item xs={12} md={3}>
            <PaymentHistoryCard title="Total Payment Amount" value={5000000} />
          </Grid>

          <Grid item xs={12} md={3}>
            <PaymentHistoryCard title="Total Store Amount" value={5010000} />
          </Grid>

          <Grid item xs={12} md={3}>
            <PaymentHistoryCard title="Total Campaign Run" value={10} />
          </Grid>
        </Grid>
      </Container>

      <Container>
        <Card>
          <PaymentListToolbar filterTrxId={filterTrxId} onFilterTrxId={handleFilterByTrxId} />

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
                              <strong>&quot;{filterTrxId}&quot;</strong>.
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
      </Container>

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
