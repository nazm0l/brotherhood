import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
} from '@mui/material';
// components
import Iconify from '../iconify';
import Scrollbar from '../scrollbar';
// sections
import { DonationListHead, DonationListToolbar } from '../../sections/@dashboard/donation/index';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'donatedAmount', label: 'Donated Amount', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'references', label: 'References', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function UserPage() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetch('https://spread-admin-api-staging.azurewebsites.net/api/UserManagement/UserList', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUserList(data));
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <Card>
          {/* <DonationListToolbar numSelected={userList.length} /> */}

          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <DonationListHead headLabel={TABLE_HEAD} rowCount={userList.length} />
              <TableBody>
                {userList.slice(1, 10).map((row, i) => {
                  const { name, bloodGroup, professionalStatus } = row;

                  return (
                    <TableRow hover key={i} tabIndex={-1} role="checkbox">
                      <TableCell>{i + 1}</TableCell>

                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar alt={name} src="" />
                          <Typography variant="subtitle2" noWrap>
                            {name}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell align="left">{professionalStatus}</TableCell>

                      <TableCell align="left">{bloodGroup}</TableCell>

                      <TableCell align="left">{name ? 'Yes' : 'No'}</TableCell>
                      <TableCell align="left">{name ? 'Yes' : 'No'}</TableCell>
                      <TableCell align="left">{name ? 'Yes' : 'No'}</TableCell>

                      <TableCell align="left">
                        {/* <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label> */}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Container>
    </>
  );
}
