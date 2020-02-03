/**
 *
 * Dashboard
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import MainHeader from '../MainHeader';
import Card from 'components/Card';
import CardEwalletSendMoneyPayBills from 'components/CardEwalletSendMoneyPayBills';


import { withStyles, Grid, Typography } from '@material-ui/core';

import axisBankLogo from 'images/axis-bank-logo.jpg';
import CardDownloadOurApp from '../../components/CardDownloadOurApp';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  gridCardEwalletSendMoney: {
    margin: '3% 2% 0% 2%',
    borderRadius: '4px',

    [theme.breakpoints.down('sm')]: {
      margin: '3% 3%',
      // maxWidth: '62%',
      // margin: '0 auto'
      // width: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '4% 5%',
      // maxWidth: '100%',
      // margin: '0 auto'
    },
  },
  recentActivitiesTable: {
    margin: '3% 2%',
    borderRadius: '4px',
    background: 'white',
    borderRadius: '7px',

    boxShadow: '0 4px 9px 0 rgba(0, 0, 0, 0.02)',
    [theme.breakpoints.down('sm')]: {
      margin: '3% 3%',
      // width: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '4% 5%',
    },
  },
  amountReceivedMessage: {
    background: 'white',
    boxShadow: '0 4px 9px 0 rgba(0, 0, 0, 0.02)',
    padding: '2%',
    borderRadius: '7px',

    marginBottom: '1%',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '3%',
      // width: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '3%',
    },
  },
  listOfMerchantsContainer: {
    background: 'white',
    boxShadow: '0 4px 9px 0 rgba(0, 0, 0, 0.02)',
    padding: '2%',
    borderRadius: '7px',

    marginBottom: '1%',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '3%',
      // width: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '3%',
      padding: '4%',
    },
  },
  listOfBanks: {
    textAlign: 'center',
  },
  bankIcons: {
    height: '4rem',
  },
  nameOfBank: {
    paddingBottom: '13%',
    textDecoration: 'none',
  },
  seeAllMerchants: {
    textDecoration: 'italic',
    marginTop: '12%',
    [theme.breakpoints.down('sm')]: {
      marginTop: '%',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '3%',
      marginTop: '2%',
    },
  },
  recentActivitiesTypes: {
    // margin: '2% 0%',
    padding: '4%',
    fontWeight: 600,
  },
  table: {
    minWidth: 700,
  },
});

const listOfBanks = [
  {
    imageLink: axisBankLogo,
    bankName: 'Axis Bank',
  },
  {
    imageLink: axisBankLogo,
    bankName: 'Axis Bank',
  },
  {
    imageLink: axisBankLogo,
    bankName: 'Axis Bank',
  },
  {
    imageLink: axisBankLogo,
    bankName: 'Axis Bank',
  },
];

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class Dashboard extends Component {
  // useInjectReducer({ key: 'dashboard', reducer });
  // useInjectSaga({ key: 'dashboard', saga });
  constructor(props) {
    super(props);
    this.state = {
      allTransactionsVisible: true,
      paymentsSentVisible: false,
      paymentsReceivedVisible: false,
    };
  }

  showallTransactions = () => {
    console.log('working!!');
    this.setState({ allTransactionsVisible: true });
    this.setState({ paymentsSentVisible: false });
    this.setState({ paymentsReceivedVisible: false });
  };
  showPaymentsSent = () => {
    console.log('working!!');
    this.setState({ paymentsSentVisible: true });
    this.setState({ allTransactionsVisible: false });
    this.setState({ paymentsReceivedVisible: false });
  };
  showPaymentsReceived = () => {
    console.log('working!!');
    this.setState({ paymentsSentVisible: false });
    this.setState({ allTransactionsVisible: false });
    this.setState({ paymentsReceivedVisible: true });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="Description of Dashboard" />
        </Helmet>
        <MainHeader />
        <Grid container>
          <Grid container direction="">
            <Grid
              className={classes.gridCardEwalletSendMoney}
              item
              md={3}
              sm={12}
              xs={12}
            >
              <CardEwalletSendMoneyPayBills />
            </Grid>
            <Grid
              className={classes.gridCardEwalletSendMoney}
              item
              md={8}
              sm={12}
              xs={12}
            >
              {/* <CardEwalletSendMoneyPayBills /> */}
              <Typography
                className={classes.amountReceivedMessage}
                variant="h5"
              >
                Congrats!
                <Typography variant="h6">
                  You have received $200.00 from Hatim daudi on 27th December
                  2019
                </Typography>
              </Typography>

              <Grid container className={classes.listOfMerchantsContainer}>
                {listOfBanks.map((lob, i) => (
                  <Grid md={2} sm={6} xs={6}>
                    <a href="/">
                      <img className={classes.bankIcons} src={lob.imageLink} />
                    </a>
                    <Typography variant="h6" className={classes.nameOfBank}>
                      {lob.bankName}
                    </Typography>
                  </Grid>
                ))}
                <Grid item md={4} xs={12}>
                  <Typography className={classes.seeAllMerchants} variant="h6">
                    See All Merchants
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container direction="">
            <Grid
              className={classes.gridCardEwalletSendMoney}
              item
              md={3}
              sm={12}
              xs={12}
            >
              <CardDownloadOurApp />
            </Grid>
            <Grid
              className={classes.recentActivitiesTable}
              item
              md={8}
              sm={12}
              xs={12}
            >
              <Typography style={{ margin: '2% 3%' }} variant="h5">
                Recent Activities
                <Typography
                  style={{ color: 'grey', margin: '0% 0% 1% 1%' }}
                  variant="body1"
                >
                  E-wallet activity
                </Typography>
              </Typography>

              <div>
                <span
                  className={`${classes.recentActivitiesTypes} ${
                    this.state.allTransactionsVisible
                    // ? 'ActiveTab'
                    // : 'InactiveTab'
                  }`}
                  onClick={this.showallTransactions}
                >
                  All
                </span>
                <span
                  className={`${classes.recentActivitiesTypes} ${
                    this.state.paymentsSentVisible
                  }`}
                  onClick={this.showPaymentsSent}
                >
                  Payments Sent
                </span>
                <span
                  className={`${classes.recentActivitiesTypes} ${
                    this.state.paymentsReceivedVisible
                  }`}
                  onClick={this.showPaymentsReceived}
                >
                  Payments Received
                </span>
              </div>

              <div
                style={{
                  display: `${
                    this.state.allTransactionsVisible ? 'block' : 'none'
                  }`,
                }}
              >
                {/* hiiiii */}
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Description</TableCell>
                      <TableCell align="right">Fat (g)</TableCell>
                      <TableCell align="right">Carbs (g)</TableCell>
                      <TableCell align="right">Protein (g)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div
                style={{
                  display: `${
                    this.state.paymentsSentVisible ? 'block' : 'none'
                  }`,
                }}
              >
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Description</TableCell>
                      <TableCell align="right">Fat (g)</TableCell>
                      {/* <TableCell align="right">Carbs (g)</TableCell>
                      <TableCell align="right">Protein (g)</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>


              <div
                style={{
                  display: `${
                    this.state.paymentsReceivedVisible ? 'block' : 'none'
                  }`,
                }}
              >
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      {/* <TableCell align="right">Description</TableCell>
                      <TableCell align="right">Fat (g)</TableCell> */}
                      {/* <TableCell align="right">Carbs (g)</TableCell>
                      <TableCell align="right">Protein (g)</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {/* <CardEwalletSendMoneyPayBills /> */}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

// Dashboard.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//   dashboard: makeSelectDashboard(),
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

export default withStyles(styles)(Dashboard);
