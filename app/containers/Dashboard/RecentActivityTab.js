import React, { Fragment, useEffect, useState } from 'react';
import {
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Typography,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useTheme } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableCell from '@material-ui/core/TableCell';
import { API_URL } from '../App/constants';

const DashBoardTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#417505',
    },
  },
})(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const DashboardTab = withStyles(theme => ({
  root: {
    margin: '1%',
    color: '#417505',
    textAlign: 'center',
    width: '50%',
    textTransform: 'none',
    fontSize: 21,
    outline: 0,
    fontWeight: theme.typography.fontWeightBold,
  },
  selected: {
    '&$selected': {
      outline: 'none',
      border: 'none',
    },
  },
}))(props => <Tab disableRipple {...props} />);

const sampleRows = [
  {
    id: '11h1ioh21219',
    date: 'Nov 17, 2020',
    time: '01:00 PM',
    action: 'TRANSFERED',
    to: 'Sandeep',
    keyword: 'to',
    amount: 400.0,
    source: 'Non Wallet',
    status: 'COMPLETED',
  },
  {
    id: '18230812n31lk22',
    date: 'Nov 15, 2020',
    time: '01:00 PM',
    action: 'RECIEVED',
    keyword: 'from',
    to: 'Sandeep',
    amount: 586.0,
    source: 'Wallet',
    status: 'COMPLETED',
  },
  {
    id: '312u3123129',
    date: 'Nov 17, 2020',
    time: '01:00 PM',
    action: 'TRANSFERED',
    to: 'Sandeep',
    keyword: 'to',
    amount: 400.0,
    source: 'Non Wallet',
    status: 'COMPLETED',
  },
  {
    id: '418293818020',
    date: 'Nov 15, 2020',
    time: '01:00 PM',
    action: 'RECIEVED',
    keyword: 'from',
    to: 'Sandeep',
    amount: 586.0,
    source: 'Wallet',
    status: 'COMPLETED',
  },
  {
    id: '182389018295',
    date: 'Nov 17, 2020',
    time: '01:00 PM',
    action: 'TRANSFERED',
    to: 'Sandeep',
    keyword: 'to',
    amount: 400.0,
    source: 'Non Wallet',
    status: 'COMPLETED',
  },
  {
    id: '1231p2838016',
    date: 'Nov 15, 2020',
    time: '01:00 PM',
    action: 'RECIEVED',
    keyword: 'from',
    to: 'Sandeep',
    amount: 586.0,
    source: 'Wallet',
    status: 'COMPLETED',
  },
  {
    id: '819389e81907',
    date: 'Nov 17, 2020',
    time: '01:00 PM',
    action: 'TRANSFERED',
    to: 'Sandeep',
    keyword: 'to',
    amount: 400.0,
    source: 'Non Wallet',
    status: 'COMPLETED',
  },
  {
    id: '182188298',
    date: 'Nov 15, 2020',
    time: '01:00 PM',
    action: 'RECIEVED',
    keyword: 'from',
    to: 'Sandeep',
    amount: 586.0,
    source: 'Wallet',
    status: 'COMPLETED',
  },
  {
    id: '91829182',
    date: 'Nov 17, 2020',
    time: '01:00 PM',
    action: 'TRANSFERED',
    to: 'Sandeep',
    keyword: 'to',
    amount: 400.0,
    source: 'Non Wallet',
    status: 'COMPLETED',
  },
  {
    id: '1op2jj312j12',
    date: 'Nov 15, 2020',
    time: '01:00 PM',
    action: 'RECIEVED',
    keyword: 'from',
    to: 'Sandeep',
    amount: 586.0,
    source: 'Wallet',
    status: 'COMPLETED',
  },
];

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function TablePaginationActions(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Fragment>
      <IconButton
        onClick={handleFirstPageButtonClick}
        className={page !== 0 ? classes.iconSelected : ''}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        className={page !== 0 ? classes.iconSelected : ''}
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        className={
          page >= Math.ceil(count / rowsPerPage) - 1 ? '' : classes.iconSelected
        }
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        className={
          page >= Math.ceil(count / rowsPerPage) - 1 ? '' : classes.iconSelected
        }
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Fragment>
  );
}

const useStyles = makeStyles(() => ({
  paper: {
    padding: '2%',
    width: '100%',
  },
  allTab: {
    textAlign: 'center',
    width: '10%',
  },
  tab: {
    textAlign: 'center',
    width: '50%',
  },
  iconSelected: {
    color: '#417505',
  },
}));

const getTransactionHistory = async notify => {
  try {
    const controller = 'getTransactionHistory';
    const { username } = JSON.parse(localStorage.getItem('loggedUser'));

    const res = await axios.get(`${API_URL}/user/${controller}`, {
      username,
    });
    if (res.status === 200) {
      if (res.data.error) {
        notify(res.data.error, 'error');
      } else {
        return res.data.history;
      }
    } else {
      notify(res.data.error, 'error');
    }
  } catch (err) {
    throw err;
  }
};

export default ({ notify }) => {
  const classes = useStyles();
  let rows = [];
  useEffect(() => {
    getTransactionHistory(notify)
      .then(r => {
        rows = r;
        return rows;
      })
      .catch(error => {
        notify('Error while fetching history', 'error');
      });
  }, rows);
  const [fullRow, setRow] = useState(sampleRows);
  const [value, setValue] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, fullRow.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        setRow(sampleRows);
        break;
      case 1:
        setRow(sampleRows.filter(row => row.action === 'TRANSFERED'));
        setPage(0);
        break;
      case 2:
        setRow(sampleRows.filter(row => row.action === 'RECIEVED'));
        setPage(0);
        break;
      default:
        setRow(sampleRows);
    }
    setValue(newValue);
  };

  return (
    <Fragment>
      <Grid
        container
        justify="flex-start"
        alignItems="flex-start"
        className={classes.paper}
      >
        <Grid
          item
          xl={1}
          lg={1}
          md={4}
          sm={4}
          xs={12}
          justify="flex-start"
          alignItems="flex-start"
        >
          <Icon
            fontSize="large"
            style={{
              color: 'green',
              fontSize: 50,
            }}
          >
            playlist_add_check
          </Icon>
        </Grid>
        <Grid
          column
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Typography variant="h5" style={{ textAlign: 'start' }}>
            Recent Activity
          </Typography>
          <Typography
            variant="subtitle1"
            styles={{ textAlign: 'start', color: '#9ea0a5' }}
          >
            E-wallet activity
          </Typography>
        </Grid>
      </Grid>
      <DashBoardTabs
        variant="scrollable"
        scrollButtons="auto"
        onChange={handleChange}
        value={value}
      >
        <DashboardTab
          disableFocusRipple
          disableRipple
          label="All"
          className={classes.allTab}
        />
        <DashboardTab label="Payment Sent" className={classes.tab} />
        <DashboardTab label="Payment Recieved" className={classes.tab} />
      </DashBoardTabs>
      <Grid
        container
        xs={12}
        alignItems="center"
        justify="center"
        className={classes.paper}
      >
        <TableContainer>
          <Table aria-label="custom pagination table">
            <TableBody>
              {(rowsPerPage > 0
                ? fullRow.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage,
                )
                : fullRow
              ).map(row => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Typography variant="subtitle1">{row.date}</Typography>
                    <Typography variant="subtitle1">{row.time}</Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography variant="subtitle1">{row.id}</Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography style={{ color: '#4a90e2' }} variant="h6">
                      {row.action} {row.keyword} {row.to}
                    </Typography>
                    <Typography color="primary" variant="subtitle1">
                      {row.status}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">{row.source}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">${row.amount}</Typography>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  style={{ color: '#417505' }}
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  count={fullRow.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
    </Fragment>
  );
};
