/**
 *
 * SignupOTP
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
import makeSelectSignupOTP from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import history from 'utils/history';
import A from 'components/A';

import { Formik, useField, Form } from 'formik';

import * as Yup from 'yup';

import { API_URL } from '../App/constants';
// import H1 from '../../components/H1';
// import H2 from '../../components/H2';

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

const SignupOTP = props => (
  // useInjectReducer({ key: 'SignupOTP', reducer });
  // useInjectSaga({ key: 'SignupOTP', saga });
  <Formik
    initialValues={{
      mobileNumber: localStorage.getItem("customerMobile"),
      password: '',
    }}
    onSubmit={async values => {
      try {
        const res = await axios.post(`${API_URL}/userVerify`, values);
        console.log(res);
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            props.notify('Account verified', 'success');
            history.push('/');  
          }
        } else {
          throw res.data.error;
        }
      } catch (err) {
        props.notify(err, 'error');
      }
    }}
    validationSchema={Yup.object().shape({
      password: Yup.string().required('Required'),
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
            <title>SignupOTP</title>
            <meta
              name="description"
              content="Description of SignupOTP"
            />
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
                  Enter OTP for { values.mobileNumber}
                </Typography>

                <Form>
                  <TextField
                    label="OTP"
                    placeholder="OTP"
                    type="password"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <div className={classes.inputFeedback}>
                      {errors.password}
                    </div>
                  )}
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    className={classes.signInButton}
                  >
                    SUBMIT
                  </Button>
                </Form>
              </Grid>
            </Grid>
          </div>

          {/* <FormattedMessage {...messages.header} /> */}
        </div>
      );
    }}
  </Formik>
);

// SignupOTP.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//   SignupOTP: makeSelectSignupOTP(),
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

export default withStyles(styles)(SignupOTP);
