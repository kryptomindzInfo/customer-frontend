/**
 *
 * Dashboard
 *
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import CardEwalletSendMoneyPayBills from 'components/CardEwalletSendMoneyPayBills';

import { Grid, Typography, withStyles } from '@material-ui/core';

import axisBankLogo from 'images/axis-bank-logo.jpg';
import Button from '@material-ui/core/Button';
import CardDownloadOurApp from '../../components/CardDownloadOurApp';
import MainHeader from '../MainHeader';
import RecentActivityTab from './RecentActivityTab';

const styles = theme => ({
  gridCardEwalletSendMoney: {
    margin: '3% 2% 0% 2%',
    borderRadius: '4px',
    // border: '1px solid #cbd2d6',
    [theme.breakpoints.down('sm')]: {
      margin: '3% 3%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '4% 5%',
    },
  },
  gridCongratsMerchantRecentActivities: {
    margin: '0 auto',
    borderRadius: '4px',
    paddingTop: '5%',

    [theme.breakpoints.down('sm')]: {
      margin: '3% 3%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '4% 5%',
    },
  },
  recentActivitiesTable: {
    margin: '0 auto',
    borderRadius: '4px',
    background: 'white',
    // border: '1px solid #cbd2d6',

    boxShadow: '0 4px 9px 0 rgba(0, 0, 0, 0.02)',
    [theme.breakpoints.down('sm')]: {
      margin: '3% 3%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '4% 5%',
    },
  },
  gridCardDownloadApp: {
    margin: '6% 2% 0% 2%',
    borderRadius: '4px',

    [theme.breakpoints.down('sm')]: {
      margin: '3% 3%',
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
    paddingTop: '10%',
    paddingBottom: '10%',
    paddingRight: '5%',
    paddingLeft: '5%',
    borderRadius: '50%',
    outline: 0,
    [theme.breakpoints.down('sm')]: {
      marginTop: '%',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '3%',
      marginTop: '2%',
    },
    '&$selected': {
      outline: 0,
    },
  },
  recentActivitiesTypes: {
    // margin: '2% 0%',
    padding: '4%',
    fontWeight: 600,
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

class Dashboard extends Component {
  // useInjectReducer({ key: 'dashboard', reducer });
  // useInjectSaga({ key: 'dashboard', saga });
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, notify } = this.props;
    return (
      <div>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="Description of Dashboard" />
        </Helmet>
        <MainHeader />
        <Grid container style={{ background: '#fcfffc' }}>
          <Grid item md={3} sm={12} xs={12} style={{ margin: '2% 0 0 4%' }}>
            <Grid
              className={classes.gridCardEwalletSendMoney}
              item
              md={12}
              sm={12}
              xs={12}
            >
              <CardEwalletSendMoneyPayBills notify={notify} />
            </Grid>
            <Grid
              className={classes.gridCardDownloadApp}
              item
              md={12}
              sm={12}
              xs={12}
            >
              <CardDownloadOurApp />
            </Grid>
          </Grid>

          <Grid item md={8} sm={12} xs={12}>
            <Grid
              className={classes.gridCongratsMerchantRecentActivities}
              item
              md={11}
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
                  <Button
                    size="large"
                    variant="outlined"
                    color="primary"
                    className={classes.seeAllMerchants}
                  >
                    See All
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              className={classes.recentActivitiesTable}
              item
              md={11}
              sm={12}
              xs={12}
            >
              <RecentActivityTab notify={notify} />
            </Grid>
            {/* <CardEwalletSendMoneyPayBills /> */}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
