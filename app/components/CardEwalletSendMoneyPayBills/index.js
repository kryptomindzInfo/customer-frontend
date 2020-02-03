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

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Popup from 'components/Popup';

import { Formik, useField, Form } from 'formik';

import { object, string, number, email, boolean } from 'yup';

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
    // paddingBottom: 0
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
            <Grid container spacing="8" style={{ paddingBottom: '6%' }}>
              <Grid item>
                <button
                  className={`${'sendMoneyButton'} ${classes.sendMoney}`}
                  onClick={this.showSendMoneyPopup}
                >
                  Send Money
                </button>
              </Grid>
              <Grid item>
                <button className={`${'sendMoneyButton'} ${classes.sendMoney}`}>
                  Pay Bills
                </button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {this.state.sendMoneyPopup ? (
          <Popup close={this.closeSendMoneyPopup.bind(this)}>
            <div
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: '1.5rem',
                paddingBottom: '1rem',
              }}
            >
              Transfer the Amount
            </div>

            <Formik
              initialValues={{
                mobileNumber: '',
                amount: '',
                note: '',
                balance: 0,
              }}
              onSubmit={async values => {
                try {
                  // const res = await axios('api end point', values);
                  // console.log(res);
                  history.push('/sign-in');
                } catch (err) {}
              }}
            >
              {props => {
                const {
                  values,
                  touched,
                  errors,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                } = this.props;
                return (
                  <>
                    <Form>
                      <Container>
                        <Row>
                          <Col md={12} sm={12} xs={12}>
                            <label />
                            <TextField
                              label="Mobile Number"
                              placeholder="Mobile Number"
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              name="mobileNumber"
                              values={props.values.mobileNumber}
                            />
                          </Col>
                          <Col md={12} sm={12} xs={12}>
                            <label />
                            <TextField
                              label="Amount"
                              placeholder="Amount"
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              name="amount"
                              values={props.values.amount}
                            />
                            <Typography
                              variant="body1"
                              style={{
                                color: 'grey',
                                textAlign: 'left',
                                paddingBottom: '0.8rem',
                                paddingTop: '0.5rem',
                              }}
                            >
                              <span style={{ color: 'red' }}>* </span>
                              Total Available {CURRENCY}
                              {props.values.balance}
                            </Typography>
                          </Col>
                          <Col md={12} sm={12} xs={12}>
                            <TextField
                              name="Note"
                              label="Note"
                              placeholder="Note"
                              multiline
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              values={props.values.note}
                            />
                            <Typography
                              variant="body1"
                              style={{
                                color: 'grey',
                                textAlign: 'left',
                                paddingBottom: '0.8rem',
                                paddingTop: '0.5rem',
                              }}
                            >
                              <span style={{ color: 'red' }}>* </span>I have
                              read the <a> Term & Conditions</a>
                            </Typography>
                            <Button
                              variant="contained"
                              type="submit"
                              disabled={isSubmitting}
                              className={classes.signUpButton}
                            >
                              Proceed
                            </Button>
                            <Typography
                              variant="body1"
                              style={{
                                color: 'grey',
                                textAlign: 'left',
                                paddingBottom: '2.5rem',
                              }}
                            >
                              <span style={{ color: 'red' }}>* </span>Total fee{' '}
                              {CURRENCY}
                              {props.values.balance} will be charged
                            </Typography>
                          </Col>
                        </Row>
                      </Container>
                    </Form>
                  </>
                );
              }}
            </Formik>
          </Popup>
        ) : null}
        {/* <FormattedMessage {...messages.header} /> */}
      </div>
    );
  }
}

CardEwalletSendMoneyPayBills.propTypes = {};

export default withStyles(styles)(CardEwalletSendMoneyPayBills);
