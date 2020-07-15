/**
 *
 * ForgotPassword
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
import makeSelectForgotPassword from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import history from 'utils/history';

import { Formik, useField, Form } from 'formik';

import * as Yup from 'yup';

import { API_URL } from '../App/constants';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  inputFeedback: {
    color: 'red',
    marginTop: '.25rem',
    fontSize: '11px',
  },
  setupPageLeftSide: {
    background: theme.palette.vGradient,
    height: '100vh',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  setupPageTitle: {
    color: theme.palette.white,
    margin: '0 auto',
    textAlign: 'center',
    paddingTop: '27%',
    paddingBottom: '7%',
    fontWeight: '500',
  },
  setupPageSubtitle1: {
    color: theme.palette.white,
    textAlign: 'center',
    display: 'inline-block',
    width: '90%',
    margin: '0 auto',
    paddingLeft: '9%',
    paddingBottom: '3%',
  },
  setupPageSubtitle2: {
    color: theme.palette.white,
    textAlign: 'center',
    display: 'inline-block',
    width: '79%',
    margin: '0 auto',
    paddingLeft: '20%',
  },
  setupPageRightSide: {
    marginTop: '5%',
    paddingLeft: '10%',
    overflow: 'hidden',

    [theme.breakpoints.down('sm')]: {
      paddingLeft: '20%',
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '21%',
    },
  },
  textField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    marginBottom: '0.03375rem',
    width: '70%',
    // height: '45px'
  },
  signInButton: {
    // margin: theme.spacing.unit,
    background: theme.palette.primary.main,
    // marginLeft: theme.spacing.unit,
    marginTop: '10%',
    color: theme.palette.white,
    fontSize: '16px',
    width: '70%',
    '&:hover': {
      background: theme.palette.primary.hover,
    },
  },
});

const ForgotPassword = props => (
  // useInjectReducer({ key: 'forgotPassword', reducer });
  // useInjectSaga({ key: 'forgotPassword', saga });
  <Formik
    initialValues={{
      mobileNumber: '',
      password: '',
    }}
    onSubmit={async values => {
      try {
        // const res = await axios('api end point', values);

        // console.log(res);
        history.push('/otp-forgot-password');
      } catch (err) {}
    }}
    validationSchema={Yup.object().shape({
      name: Yup.number(),
      // .max(15, 'Must be 15 characters or less')
      // .required('Required'),
    })}
  >
    {formikProps => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      } = formikProps;

      const { classes } = props;
      return (
        <div>
          <Helmet>
            <title>ForgotPassword</title>
            <meta name="description" content="Description of ForgotPassword" />
          </Helmet>
          <div className={classes.root}>
            <Grid container justify="center">
              <Grid item md={6} className={classes.setupPageLeftSide}>
                <Typography className={classes.setupPageTitle} variant="h1">
                  E-WALLET
                </Typography>
                <Typography variant="h4" className={classes.setupPageSubtitle1}>
                  Welcome to E-wallet
                </Typography>
                <Typography variant="h6" className={classes.setupPageSubtitle2}>
                  Create your wallet for easy transferring of money to your
                  friends and family
                </Typography>
              </Grid>
              <Grid
                item
                md={6}
                sm={12}
                xs={12}
                className={classes.setupPageRightSide}
              >
                <Typography
                  style={{
                    paddingTop: '10%',
                    paddingBottom: '3%',
                  }}
                  variant="h5"
                >
                  Enter your Mobile number
                </Typography>

                <Form>
                  <TextField
                    label="Mobile Number"
                    placeholder="Mobile Number"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="mobileNumber"
                    value={values.mobileNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    className={classes.signInButton}
                  >
                    GET OTP
                  </Button>
                </Form>
              </Grid>
            </Grid>
          </div>
        </div>
      );
    }}
  </Formik>
);

// ForgotPassword.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//   forgotPassword: makeSelectForgotPassword(),
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

export default withStyles(styles)(ForgotPassword);
