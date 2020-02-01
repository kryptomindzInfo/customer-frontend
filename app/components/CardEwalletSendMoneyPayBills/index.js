/**
 *
 * CardEwalletSendMoneyPayBills
 *
 */

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import history from 'utils/history';



import { API_URL, STATIC_URL, CURRENCY } from 'containers/App/constants';

const styles = theme => ({
  mainContainer: {
    paddingLeft: '11%',
    // textAlign: 'center',
    borderRadius: '7px',
    paddingRight: '0%',
    background: 'white',
    boxShadow: '0 4px 9px 0 rgba(0, 0, 0, 0.02)',
    [theme.breakpoints.down('sm')]: {
      // paddingRight: '4%',
      // textAlign: 'center'
    },
  },
  cardEwalletTitle: {
    paddingTop: '4%',
    paddingBottom: '12%',
  },
  cardEwalletCurrency: {
    fontWeight: 600,
    paddingTop: '2%',
    // paddingBottom: '0%',
  },
  sendMoney: {
    padding: '6px',
    borderRadius: '2px',
    minWidth: '0 !important',
    border: 'solid 1px ${theme.palette.primary.main}',
    color: theme.palette.primary.main,
    fontSize: '11px',
    fontWeight: 'bold',
    paddingRight: '6px',
    background: '#fff',

    i: {
      marginRight: '5px',
      fontSize: '11px',
    },
  },
});

class CardEwalletSendMoneyPayBills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
    };
  }
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container className={classes.mainContainer}>
          <Grid item md={12} xs={12} sm={12}>
            <Typography className={classes.cardEwalletTitle} variant="h5">
              E-WALLET
            </Typography>
            <Typography variant="subtitle2">Available:</Typography>
            <Typography className={classes.cardEwalletCurrency} variant="h4">
              {CURRENCY} {this.state.balance.toFixed(2)}
            </Typography>
            <Grid container  spacing="8" style={{paddingBottom: '6%'}}>
              <Grid item>
                <button className={`${'sendMoneyButton'} ${classes.sendMoney}`}>
                  {/* <i
                    className={classes.sendMoneyIcon}
                    className="material-icons"
                  >
                    send
                  </i>{' '} */}
                  {/* <FormattedMessage {...messages.sendmoney} /> */}
                  Send Money
                </button>
              </Grid>
              <Grid item>
                <button className={`${'sendMoneyButton'} ${classes.sendMoney}`}>
                  {/* <i
                    className={classes.sendMoneyIcon}
                    className="material-icons"
                  >
                    send
                  </i>{' '} */}
                  {/* <FormattedMessage {...messages.sendmoney} /> */}
                  Pay Bills
                </button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* <FormattedMessage {...messages.header} /> */}
      </div>
    );
  }
}

CardEwalletSendMoneyPayBills.propTypes = {};

export default withStyles(styles)(CardEwalletSendMoneyPayBills);
