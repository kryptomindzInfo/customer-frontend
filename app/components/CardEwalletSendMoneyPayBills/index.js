/**
 *
 * CardEwalletSendMoneyPayBills
 *
 */

import React, { Component } from 'react';
import { Typography, withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import history from 'utils/history';

import { API_URL, CURRENCY } from 'containers/App/constants';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import SendMoneyPopup from './SendMoneyPopup';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const styles = theme => ({
  mainContainer: {
    paddingLeft: '11%',
    // textAlign: 'center',
    borderRadius: '7px',
    paddingRight: '0%',
    background: 'white',
    // marginLeft: '15%',

    boxShadow: '0 4px 9px 0 rgba(0, 0, 0, 0.02)',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
      // paddingRight: '4%',
      // textAlign: 'center'
    },
  },
  cardEwalletTitle: {
    paddingTop: '5%',
    paddingBottom: '5%',
    fontWeight: 500,
    width: '150px',
    marginRight: '-100px',
    fontSize: '32px',
  },
  cardEwalletCurrency: {
    fontWeight: 600,
    paddingTop: '2%',
    // paddingBottom: '0%',
  },
  sendMoney: {
    padding: '8px',
    borderRadius: '2px',
    minWidth: '0 !important',
    border: `solid 1px ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    fontSize: '11px',
    fontWeight: 'bold',
    background: '#fff',

    i: {
      marginRight: '5px',
      fontSize: '11px',
    },
  },
  textField: {
    marginBottom: '0.03375rem',
    width: '100%',
    // height: '45px'
  },
  signUpButton: {
    background: theme.palette.primary.main,
    marginBottom: '3%',
    marginTop: '3%',
    color: theme.palette.white,
    width: '100%',
    '&:hover': {
      background: theme.palette.primary.hover,
    },
  },
  eWalletTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardBankTitle: {
    paddingTop: '3%',
    fontSize: '12px',
    marginRight: '20px',
    wordBreak: 'break-word',
  },
});

class CardEwalletSendMoneyPayBills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      sendMoneyPopup: false,
    };
  }

  showSendMoneyPopup = () => {
    this.setState({ sendMoneyPopup: true });
  };

  closeSendMoneyPopup = () => {
    this.setState({ sendMoneyPopup: false });
  };

  goToBillsPaymentPage = () => {
    history.push('/bill-payments-merchants');
  };

  componentDidMount = async () => {
    const { username } = JSON.parse(localStorage.getItem('loggedUser'));
    const res = await axios.get(`${API_URL}/user/getBalance`, { username });
    if (res.data.status === 1) {
      this.setState({ balance: res.data.balance });
    } else {
      console.log('Error while fetching balance ');
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper elevation={0}>
        <Grid container className={classes.mainContainer}>
          <Grid item md={12} xs={12} sm={12}>
            <div className={classes.eWalletTitle}>
              <span className={classes.cardEwalletTitle}>E-WALLET</span>
              <span className={classes.cardBankTitle}>
                Powered by Axis bank
              </span>
            </div>
            <Typography variant="subtitle2">Available:</Typography>
            <Typography className={classes.cardEwalletCurrency} variant="h4">
              {CURRENCY} {this.state.balance.toFixed(2)}
            </Typography>
            <Grid
              container
              xs={12}
              md={12}
              spacing="4"
              style={{ marginTop: '20px', paddingBottom: '6%' }}
            >
              <Grid xs={12} md={6} item>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ paddingRight: '20px' }}
                  onClick={this.showSendMoneyPopup}
                  className={`${'sendMoneyButton'} ${classes.sendMoney}`}
                  startIcon={<Icon>send</Icon>}
                >
                  Send Money
                </Button>
              </Grid>
              <Grid xs={12} md={6} item>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ paddingRight: '30px' }}
                  onClick={this.goToBillsPaymentPage}
                  className={`${'sendMoneyButton'} ${classes.sendMoney}`}
                  startIcon={<Icon>receipt</Icon>}
                >
                  Pay Bills
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <SendMoneyPopup
          onClose={() => this.closeSendMoneyPopup()}
          open={this.state.sendMoneyPopup}
        />
      </Paper>
    );
  }
}

CardEwalletSendMoneyPayBills.propTypes = {};

export default withStyles(styles)(CardEwalletSendMoneyPayBills);
