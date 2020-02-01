/**
 *
 * Dashboard
 *
 */

import React from 'react';
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

const styles = theme => ({
  gridCardEwalletSendMoney: {
    margin: '3% 2% 0% 2%',
    borderRadius: '4px',

    [theme.breakpoints.down('sm')]: {
      margin: '3% 3%',
      // width: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '4% 5%',
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
  recentActivitiesTypes:{
    // margin: '2% 0%',
    padding: '4%',
    fontWeight: 600
  }
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

export function Dashboard(props) {
  // useInjectReducer({ key: 'dashboard', reducer });
  // useInjectSaga({ key: 'dashboard', saga });
  const { classes } = props;
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      <MainHeader />
      <Grid container >
        <Grid container direction="">
          <Grid
            className={classes.gridCardEwalletSendMoney}
            item
            md={3}
            sm={6}
            xs={12}
          >
            <CardEwalletSendMoneyPayBills />
          </Grid>
          <Grid
            className={classes.gridCardEwalletSendMoney}
            item
            md={8}
            sm={6}
            xs={12}
          >
            {/* <CardEwalletSendMoneyPayBills /> */}
            <Typography className={classes.amountReceivedMessage} variant="h5">
              Congrats!
              <Typography variant="h6">
                You have received $200.00 from Hatim daudi on 27th December 2019
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
            sm={6}
            xs={12}
          >
            <CardDownloadOurApp />
          </Grid>
          <Grid
            className={classes.recentActivitiesTable}
            item
            md={8}
            sm={6}
            xs={12}
          >
            <Typography style={{ margin: '2% 3%' }} variant="h5">
              Recent Activities
            </Typography>
            <div>
              <span className={classes.recentActivitiesTypes}>All</span>
              <span className={classes.recentActivitiesTypes}>Payments Sent</span>
              <span className={classes.recentActivitiesTypes}>Payments Received</span>
            </div>
            {/* <CardEwalletSendMoneyPayBills /> */}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
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
