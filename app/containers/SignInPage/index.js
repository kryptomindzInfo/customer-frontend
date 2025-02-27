/**
 *
 * SignInPage
 *
 */

import React, { useState, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Form, Formik } from 'formik';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import * as Yup from 'yup';

import Link from '@material-ui/core/Link';
import history from '../../utils/history';
import { API_URL } from '../App/constants';

// import A from 'components/A';

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
    // background: theme.palette.vGradient,
    background:'linear-gradient(to bottom, #6cac6a, #102910)',
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
    fontWeight: '600',
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
    marginTop: '1%',
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
    marginTop: '7%',
    padding: '0px',
    fontSize: '24px',
    color: theme.palette.white,
    width: '70%',
    '&:hover': {
      background: theme.palette.primary.hover,
    },
  },
});

const redirectUser = user => {
  console.log('inside redirect user', user);
  switch (user.status) {
    case 1:
      history.push('/dashboard');
      break;
    case 0:
      history.push('/choose-bank');
      break;
    case 2:
      history.push('/user-verification');
      break;
    case 3:
      history.push('/user-verification');
      break;
    default:
      history.push('/');
      break;
  }
};

const SignInPage = props => {
  const [visiblity, setvisiblity] = React.useState(false);

  const toggleVisiblity = () => {
    visiblity ? setvisiblity(false) : setvisiblity(true);
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={async values => {
        const obj = {
          username: values.username.trim(),
          password: values.password,
        };
        try {
          const res = await axios.post(`${API_URL}/user/login`, obj);
          if (res.data.status === 1) {
            console.log(res.data)
            if (res.data.error) {
              throw res.data.message;
            } else {
              localStorage.setItem('customerLogged', res.data.token);
              const loggedUser = JSON.stringify(res.data.user);
              const bank = JSON.stringify(res.data.bank);
              localStorage.setItem('loggedUser', loggedUser);
              localStorage.setItem('mobile', res.data.user.mobile);
              localStorage.setItem('bank', bank);
              localStorage.setItem('bankId', res.data.user.bank_id);
              return redirectUser(res.data.user);
            }
          } else {
            throw res.data.message;
          }
        } catch (err) {
          // notify(err, 'error');
          props.notify(err, 'error');
          console.log(props)
        }
      }}
      validationSchema={Yup.object().shape({
        username: Yup.mixed(),
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
          <Fragment>
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
                  <Typography
                    variant="h5"
                    className={classes.setupPageSubtitle2}
                  >
                    Welcome to E-wallet <br />
                    Create your wallet for easy transfering <br />
                    of money to your friends and family
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
                  
                  
                  >
                 <span style={{
                   marginTop:"",marginLeft:"-15%",
                   fontStyle:"Helvetica-Bold",fontSize:"25px",
                   
                  color:"#417505"
                     
                    }}><strong>Sign In</strong> </span>
                  </Typography>
                  <br/><br/>
                  <Typography variant="h5">Login to your account</Typography>
                  <Typography
                    variant="subtitle2"
                    style={{
                      fontSize: '14px',
                      color: '#9ea0a5',
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
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div>
                      <TextField
                        name="password"
                        label="Password"
                        className={classes.textField}
                        type={visiblity ? 'text' : 'password'}
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <span
                        onClick={toggleVisiblity}
                        style={{
                          position: 'relative',
                          top: '30px',
                          right: '33px',
                        }}
                      >
                        <i>
                          {visiblity ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </i>
                      </span>
                    </div>
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
                            color: '#9ea0a5',
                            fontSize: '14px',
                            paddingTop: '5%',
                            width: '85%',
                          }}
                        >
                          Don't have an account?
                          <Link
                            color="primary"
                            style={{
                              fontWeightBold: '700',
                              paddingLeft: '4px',
                              fontSize: '14px',
                              fontWeight: '600',
                            }}
                            href="/sign-up"
                          >
                            Sign Up
                          </Link>
                        </Typography>
                      </Grid>
                      <Grid item md={6} sm={12} xs={12}>
                        <Typography
                          style={{
                            fontSize: '14px',
                            paddingTop: '5%',
                            // textAlign: 'end'
                            // paddingLeft: '5%',
                          }}
                        >
                          <Link
                            color="primary"
                            style={{
                              fontWeightBold: '900',
                              fontSize: '14px',
                              paddingTop: '5%',
                              fontWeight: '600',
                            }}
                            href="/forgot-password"
                          >
                            Forgot password?
                          </Link>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Form>
                </Grid>
              </Grid>
            </div>
          </Fragment>
        );
      }}
    </Formik>
  );
};

export default withStyles(styles)(SignInPage);
