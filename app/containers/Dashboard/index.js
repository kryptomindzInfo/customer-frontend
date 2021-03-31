/**
 *
 * Dashboard
 *
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import CardEwalletSendMoneyPayBills from 'components/CardEwalletSendMoneyPayBills';

import { Grid, Typography } from '@material-ui/core';
import {withStyles}  from '@material-ui/core/styles'

import CardDownloadOurApp from '../../components/CardDownloadOurApp';
import Footer from '../../components/Footer';
import AlignItemsList from '../../components/MessageList';
import MainHeader from '../MainHeader';
import RecentActivityTab from './RecentActivityTab';
import ContactList from './ContactList';

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
    display: 'none',
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
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',

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
  recentActivitiesTypes: {
    // margin: '2% 0%',
    padding: '4%',
    fontWeight: 600,
  },
});

class Dashboard extends Component {
  // useInjectReducer({ key: 'dashboard', reducer });
  // useInjectSaga({ key: 'dashboard', saga });
  constructor(props) {
    super(props);
    this.state = {
      bankLogo: JSON.parse(localStorage.getItem('bank')).logo,
      bankName: JSON.parse(localStorage.getItem('bank')).name,
    }
  }

  render() {
    const { classes, notify } = this.props;
    return (
      <div>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="Description of Dashboard" />
        </Helmet>

        <MainHeader active={'dashboard'}/>
        <Grid container style={{ background: '#fcfffc' }}>
          <Grid item md={3} sm={12} xs={12} style={{ margin: '3% 0 0 3%' }}>
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
            {/* <Grid
              className={classes.gridCardDownloadApp}
              item
              md={12}
              sm={12}
              xs={12}
            >
              
             
              <AlignItemsList />
            </Grid> */}
          
          </Grid>

          <Grid item md={8} sm={12} xs={12} style={{backgroundColor:"",marginLeft:"3%"}}>
            <Grid
              className={classes.gridCongratsMerchantRecentActivities}
              item
              md={12}
              sm={12}
              xs={12}
              style={{backgroundColor:""}}
            >

              <Grid container className={classes.listOfMerchantsContainer}
              item
              
              >
                <ContactList notify={notify} />
              </Grid>

            </Grid>
            <br/>

            <Grid
              className={classes.recentActivitiesTable}
               item
            >
              
                <RecentActivityTab notify={notify} />   
               
            </Grid>
            {/* <CardEwalletSendMoneyPayBills /> */}
          </Grid>
        
        </Grid>
        <Footer bankname={this.state.bankName} banklogo={this.state.bankLogo}/>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
