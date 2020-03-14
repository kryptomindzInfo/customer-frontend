/**
 *
 * SignUpPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSignUpPage from './selectors';
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

import { object, string, number, email, boolean } from 'yup';

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
    marginTop: '3%',
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
    // marginRight: theme.spacing.unit,
    marginBottom: '0.03375rem',
    width: '70%',
    // height: '45px'
  },
  signUpButton: {
    // margin: theme.spacing.unit,
    background: theme.palette.primary.main,
    // marginLeft: theme.spacing.unit,
    marginTop: '3%',
    color: theme.palette.white,
    width: '70%',
    '&:hover': {
      background: theme.palette.primary.hover,
    },
    // paddingBottom: 0
  },

  checkboxMessage: {
    // color: 'red',
    fontSize: '12px',
    paddingBottom: '3px',
  },
});

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div style={{ color: 'red' }} className={classes.error}>
          {meta.error}
        </div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} type="checkbox" />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const SignUpPage = props => (
  // constructor() {
  //   super();
  //   this.state = {
  //     checkedA: true,
  //     name: '',
  //     mobileNumber: '',
  //     email: '',
  //     address: '',
  //     password: '',
  //   };
  // }
  // useInjectReducer({ key: 'signUpPage', reducer });
  // useInjectSaga({ key: 'signUpPage', saga });
  // render() {

  <Formik
    initialValues={{
      name: '',
      mobileNumber: '',
      email: '',
      address: '',
      password: '',
      acceptedTerms: false,
    }}
    onSubmit={async values => {
      console.log(values);
      try {
        const res = await axios.post(`${API_URL}/userSignup`, values);
        console.log(res);
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            localStorage.setItem("customerMobile", values.mobileNumber);
            localStorage.setItem("customerName", values.name);
            history.push('/sign-up-verify');  
          }
        } else {
          throw res.data.error;
        }
        
      } catch (err) {
        props.notify(err, 'error');
      }
    }}
    validationSchema={object().shape({
      email: string().email(),
      name: string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      acceptedTerms: boolean()
        .required('Required')
        .oneOf([true], 'You must accept the terms and conditions.'),
      // address: Yup.string()
      //   // .max(20, "Must be 20 characters or less")
      //   .required('Required'),
      // password: Yup.string()
      //   // .password()
      //   .max(15, 'Must be 15 characters or less')
      //   .required('Required'),
    })}
    // onSubmit={(values, { setSubmitting }) => {
    //   setTimeout(() => {
    //     alert(JSON.stringify(values, null, 2));
    //     setSubmitting(false);
    //   }, 400);
    // }}
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
            <title>SignUp</title>
            <meta name="description" content="Description of SetupPage" />
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
                <Typography variant="h5">Create New Account</Typography>
                <Typography
                  variant="subtitle2"
                  style={{
                    fontSize: '12px',
                    paddingTop: '1%',
                  }}
                >
                  Use your Mobile number to create new account at no cost.
                </Typography>
                <Form>
                  <TextField
                    id="outlined-with-name"
                    label="Name"
                    placeholder="Name"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name && (
                    <div className={classes.inputFeedback}>{errors.name}</div>
                  )}
                  <TextField
                    // id="outlined-with-name"
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
                    // error
                    // id="outlined-email-input"
                    label="Email"
                    className={classes.textField}
                    type="email"
                    name="email"
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <div className={classes.inputFeedback}>{errors.email}</div>
                  )}
                  <TextField
                    name="address"
                    label="Address"
                    placeholder="Address"
                    multiline
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    name="password"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    // autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {/* {errors.password && touched.password && (
                    <div className={classes.inputFeedback}>
                      {errors.password}
                    </div>
                  )} */}
                  <div style={{ paddingTop: '3px' }}>
                    <MyCheckbox name="acceptedTerms">
                      <span className={classes.checkboxMessage}>
                        {' '}
                        I accept the terms and conditions
                      </span>
                    </MyCheckbox>{' '}
                  </div>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    className={classes.signUpButton}
                  >
                    SIGN UP
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
                        Have an account?
                        <A
                          style={{
                            color: 'black',
                            textDecoration: 'none',
                            paddingLeft: '4px',
                          }}
                          href="/sign-in"
                        >
                          Sign In
                        </A>
                      </Typography>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                      <Typography
                        style={{
                          fontSize: '12px',
                          paddingTop: '5%',
                          // textAlign: 'end'
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

          {/* <FormattedMessage {...messages.header} /> */}
        </div>
      );
    }}
  </Formik>
);
// }

// SignUpPage.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//   signUpPage: makeSelectSignUpPage(),
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

export default withStyles(styles)(SignUpPage);
