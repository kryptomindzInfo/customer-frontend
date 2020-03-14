/**
 *
 * SignInPage
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
import makeSelectSignInPage from './selectors';
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

// import A from 'components/A';

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
      paddingLeft: '14%',
    },
  },
  textField: {
    // marginLeft: theme.spacing.unit,
    marginBottom: '0.03375rem',
    width: '70%',
  },
  signInButton: {
    background: theme.palette.primary.main,
    marginTop: '10%',
    color: theme.palette.white,
    width: '70%',
    '&:hover': {
      background: theme.palette.primary.hover,
    },
  },
});

const SignInPage = props => (

  // useInjectReducer({ key: 'signInPage', reducer });
  // useInjectSaga({ key: 'signInPage', saga });

  <Formik
    initialValues={{
      mobileNumber: '',
      password: '',
    }}
    onSubmit={async values => {
      try {
        const res = await axios.post(`${API_URL}/userLogin`, values);
        console.log(res);
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            localStorage.setItem("customerLogged", res.data.token);
            localStorage.setItem("customerMobile", res.data.mobile);
            localStorage.setItem("customerName", res.data.name);
            if(res.data.status == 0){
              history.push('/sign-up-verify');  
            }
            else if(res.data.status == 1){
              history.push('/choose-bank');  
            }
            else if(res.data.status == 2){
              history.push('/pending-approval');  
            }
            else if(res.data.status == 3){
              history.push('/dashboard');  
            }
          }
        } else {
          throw res.data.error;
        }
      } catch (err) {
        //notify(err, 'error');
        props.notify(err, 'error');
      }
    }}
    validationSchema={Yup.object().shape({
      mobileNumber: Yup.number(),
      // .max(15, 'Must be 15 characters or less')
      // .required('Required'),

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
            <title>SignInPage</title>
            <meta name="description" content="Description of SignInPage" />
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
                <Typography variant="h5">Login to your account</Typography>
                <Typography
                  variant="subtitle2"
                  style={{
                    fontSize: '12px',
                    paddingTop: '1%',
                    paddingBottom: '7%',
                  }}
                >
                  Use your Mobile number to Login
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
                  <TextField
                    name="password"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
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
                    SIGN IN
                  </Button>
                  <Grid container>
                    <Grid item md={6} sm={12} xs={12}>
                      <Typography
                        style={{
                          fontSize: '12px',
                          paddingTop: '5%',
                          width: '85%',
                        }}
                      >
                        Don't have an account? 
                        <A
                          style={{
                            color: 'black',
                            textDecoration: 'none',
                            paddingLeft: '4px',
                          }}
                          href="/sign-up"
                        >
                          Sign Up
                        </A>
                      </Typography>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                      <Typography
                        style={{
                          fontSize: '12px',
                          paddingTop: '5%',
                          // paddingLeft: '5%',
                        }}
                      >
                        <A
                          style={{ color: 'black', textDecoration: 'none' }}
                          href="/forgot-password"
                        >
                          Forgot password?
                        </A>
                      </Typography>
                    </Grid>
                  </Grid>
                </Form>
              </Grid>
            </Grid>
          </div>
        </div>
      );
    }}
  </Formik>
);

// SignInPage.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//   signInPage: makeSelectSignInPage(),
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

export default withStyles(styles)(SignInPage);
