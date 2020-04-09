/**
 *
 * SignInPage
 *
 */

import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import { Typography, withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Form, Formik } from 'formik';

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

const redirectUser = user => {
  switch (user.status) {
    case 1:
      return history.push('/dashboard');
    case 2:
      return history.push('/choose-bank');
    case 3:
      return history.push('/upload-documents');
    case 4:
      return history.push('/dashboard');
    default:
      return history.push('/dashboard');
  }
};

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
        const res = await axios.post(`${API_URL}/user/login`, values);
        if (res.status === 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            localStorage.setItem('customerLogged', res.data.token);
            const loggedUser = JSON.stringify(res.data.user);
            localStorage.setItem('loggedUser', loggedUser);
            redirectUser(res.data.user);
          }
        } else {
          throw res.data.error;
        }
      } catch (err) {
        // notify(err, 'error');
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
                    fontSize: '14px',
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
