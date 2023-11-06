import React, { useEffect } from 'react';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import './CustomizedTables.css';

import { useDispatch, useSelector } from 'react-redux';
import * as companiesActions from '../../features/companies/companiesSlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export function CustomizedTables() {
  const { companies, errors, loading } = useSelector((state) => state.companiesSlice);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(companiesActions.fetchCompanies());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <CircularProgress sx={{color: 'grey'}}/>
      </Box>
    );
  }

  return (
    <>
      <TableContainer component={Paper} className="table-container">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Ticker</StyledTableCell>
              <StyledTableCell align="left">Exchange</StyledTableCell>
              <StyledTableCell align="left">Price</StyledTableCell>
              <StyledTableCell align="left">Change</StyledTableCell>
              <StyledTableCell align="left">Change Percent</StyledTableCell>
              <StyledTableCell align="left">Dividend</StyledTableCell>
              <StyledTableCell align="left">Yield</StyledTableCell>
              <StyledTableCell align="left">Last Trade Time</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {companies.map((companie) => (
              <StyledTableRow key={companie.ticker}>
                <StyledTableCell component="th" scope="row">
                  {companie.ticker}
                </StyledTableCell>
                <StyledTableCell align="left">{companie.exchange}</StyledTableCell>
                <StyledTableCell align="left">{companie.price}</StyledTableCell>
                <StyledTableCell align="left">{companie.change}</StyledTableCell>
                <StyledTableCell align="left">{companie.change_percent}</StyledTableCell>
                <StyledTableCell align="left">{companie.dividend}</StyledTableCell>
                <StyledTableCell align="left">{companie.yield}</StyledTableCell>
                <StyledTableCell align="left">{companie.last_trade_time}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {companies.length === 0 && !errors && (
        <Alert variant="filled" severity="info">
          No companies are currently available.
        </Alert>
      )}

      {errors && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity="error">{errors}</Alert>
        </Stack>
      )}
    </>
  )
}
