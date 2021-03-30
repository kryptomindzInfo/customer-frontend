/**
 *
 * CardEwalletSendMoneyPayBills
 *
 */

import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import history from 'utils/history';
import Button from '../../components/Button';
import { API_URL, CURRENCY } from 'containers/App/constants';
import Paper from '@material-ui/core/Paper';
import SendIcon from '@material-ui/icons/Send';
// import Button from '@material-ui/core/Button';
import axios from 'axios';
import SendMoneyPopup from './SendMoneyPopup';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const styles = theme => ({
  mainContainer: {
    paddingLeft: '6%',
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
    fontSize: '28px',
  },
  cardEwalletCurrency: {
    fontWeight: 600,
    paddingTop: '2%',
    color:"green",
    // paddingBottom: '0%',
  },
  textField: {
    marginBottom: '0.03375rem',
    width: '100%',
    // height: '45px'
  },
  eWalletTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardBankTitle: {
    paddingTop: '3%',
    fontSize: '12px',
    marginRight: '45px',
    wordBreak: 'break-word',
  },
});

class CardEwalletSendMoneyPayBills extends Component {
  constructor() {
    super();
    this.state = {
      balance: 0,
      sendMoneyPopup: false,
    };
  }

  showSendMoneyPopup = () => {
    this.setState({ sendMoneyPopup: true });
  };

  closeSendMoneyPopup = () => {
    console.log("click")
    this.setState({ sendMoneyPopup: false });
  };

  goToBillsPaymentPage = () => {
    history.push({
      pathname: `/bill-payments-merchants`,
      // notify: this.props.notify,
      // secDetailsID: section,
    });
    // history.push('/bill-payments-merchants');
  };

  componentDidMount = async () => {
    const { username } = JSON.parse(localStorage.getItem('loggedUser'));
    try {
      const res = await axios.get(`${API_URL}/user/getBalance`, { username });
      if (res.data.status === 1) {
        this.setState({ balance: res.data.balance });
        // this.props.notify('getbalnace');
      } else {
        this.props.notify(res.data.error, 'error');
      }
    } catch (e) {
      this.props.notify('Error while fetching balance', 'error');
    }
  };

  render() {
    const { classes, notify } = this.props;
    const { bank } = JSON.parse(localStorage.getItem('loggedUser'));
    

    return (
      <Paper elevation={0}>
        <Grid container className={classes.mainContainer}>
          <Grid item md={12} xs={12} sm={12} style={{backgroundColor:""}}>
            <div className={classes.eWalletTitle}>

              <span className={classes.cardEwalletTitle}>E-Wallet</span>
              <Button
                  accentedOutline
                  style={{height:'fit-contnt', margin:'auto', marginLeft:'100px'}}
                >
                  {/* <Typography noWrap> */}
                     My Bank
                  {/* </Typography> */}
                </Button>
              {/* <span className={classes.cardBankTitle}>Powered by {bank}</span> */}
            </div>
            <Typography variant="subtitle2" style = {{color:"grey"}}>Available</Typography>
            <Typography className={classes.cardEwalletCurrency} variant="h4">
              {CURRENCY} {this.state.balance.toFixed(2)}
            </Typography>
           
            <Grid
              container
              xs={12}
              md={12}
              // spacing="4"
              style={{ marginTop: '20px', paddingBottom: '6%',backgroundColor:"" }}
            >
             
                <Button
                  accentedOutline
                  // variant="outlined"
                  // color="primary"
                  onClick={this.showSendMoneyPopup}
                  style={{ fontSize: '11px' }}
                  
                  // style={{backgroundColor:"red"}}
                >

                  {/* <Typography noWrap> */}
                    <i><SendIcon/></i> Send Money
                  {/* </Typography> */}
                </Button>
             
         {' '}
                <Button

                  accentedOutline
                  // variant="outlined"
                  // color="primary"
                  // style={{ fontSize: '11px' }}
                  onClick={this.goToBillsPaymentPage}
                >
                  {/* <Typography noWrap> */}
                    <i><InsertDriveFileIcon/></i>Pay Bills
                  {/* </Typography> */}
                </Button>
          
            </Grid>
          </Grid>
        </Grid>
        {this.state.sendMoneyPopup ? (
          <SendMoneyPopup
            notify={this.props.notify}
            balance={this.state.balance}
            onClose={() => this.closeSendMoneyPopup()}
            open={this.state.sendMoneyPopup}

          />
        ) : null}
      </Paper>
    );
  }
}

CardEwalletSendMoneyPayBills.propTypes = {};

export default withStyles(styles)(CardEwalletSendMoneyPayBills);
