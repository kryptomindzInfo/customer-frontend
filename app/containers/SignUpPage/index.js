/**
 *
 * SignUpPage
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import history from 'utils/history';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Form, Formik, useField } from 'formik';

import { boolean, mixed, object, string } from 'yup';

import Link from '@material-ui/core/Link';
import MuiCheckbox from '@material-ui/core/Checkbox';
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
     //background: theme.palette.vGradient,
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
  setsignupname:{
    width: '121px',
    height: '38px',
   
    fontFamily: 'Helvetica',
    fontSize: '25px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0px',
    color: '#417505'
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
    fontWeight: '600',
    padding: '0px',
    fontSize: '20px',
    color: theme.palette.white,
    width: '70%',
    '&:hover': {
      background: theme.palette.primary.hover,
    },
    // paddingBottom: 0
  },

  checkboxMessage: {
    color: '#9ea0a5',
    fontSize: '14px',
    paddingLeft: '5px',
  },
});

export const Checkbox = ({ ...props }) => {
  const [field] = useField(props.name);

  return (
    <MuiCheckbox
      {...field}
      style={{
        color: 'rgb(53, 153, 51)',
        '&$checked': {
          color: 'rgb(53, 153, 51)',
        },
      }}
      checked={field.value}
    />
  );
};

const SignUpPage = props => (
  <Formik
    initialValues={{
      name: '',
      mobile: '',
      email: '',
      address: '',
      last_name: '',
      password: '',
      acceptedTerms: false,
    }}
    onSubmit={async values => {
      console.log(values)
      try {
        const res = await axios.post(`${API_URL}/user/verify`, values);
        if (res.data.status === 1) {
          if (res.data.error) {
            props.notify(res.data.error, 'error');
          } else {
            localStorage.setItem('customerMobile', values.mobile);
            localStorage.setItem('customerName', values.name);
            localStorage.setItem('customerLastName', values.last_name);
            localStorage.setItem('customerEmail', values.email);
            localStorage.setItem('customerAddress', values.address);
            localStorage.setItem('customerPassword', values.password);
            history.push('/sign-up-verify');
          }
        } else {
          props.notify(
            'User already exist with either same email id or mobile number.',
            'error',
          );
        }
      } catch (err) {
        props.notify(
          'User already exist with either same email id or mobile number.',
          'error',
        );
      }
    }}
    validationSchema={object().shape({
      email: string()
        .email()
        .required('Email is required'),
      password: mixed().required('Password is required'),
      name: string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      acceptedTerms: boolean().oneOf(
        [true],
        'You must accept the terms and conditions.',
      ),
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
            <title>SignUp</title>
            <meta name="description" content="Description of SetupPage" />
          </Helmet>
          <div className={classes.root}>
            <Grid container justify="center">
              <Grid item md={6} className={classes.setupPageLeftSide}>
                <Typography className={classes.setupPageTitle} variant="h1">
                  E-WALLET
                </Typography>
                <Typography variant="h5" className={classes.setupPageSubtitle1}>
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

{/* <span className={classes.setsignupname} >Sign Up</span> */}
<Typography
                  
                  
                >
               <span style={{
                 marginLeft:"-15%",marginBotton:"5%",
                 fontStyle:"Helvetica-Bold",fontSize:"25px",
                 
                color:"#417505"
                   
                  }}><ArrowBackIcon/>{' '}<strong>Sign Up</strong> </span>
                </Typography>
                <br/>

                <Typography variant="h5" >Create New Account</Typography>
                <Typography
                  variant="subtitle2"
                  style={{
                    color: '#9ea0a5',
                    fontSize: '14px',
                    paddingTop: '1%',
                    marginBottom: '20px',
                  }}
                >
                  Use your Mobile number to create new account at no cost.
                </Typography>
                <Form>
                  <TextField
                    id="outlined-with-name"
                    label="Given Name"
                    placeholder="Given Name"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="name"
                    value={values.name}
                    size="small"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name && (
                    <div className={classes.inputFeedback}>{errors.name}</div>
                  )}
                  <TextField
                    id="outlined-with-name"
                    label="Family Name"
                    placeholder="Family Name"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="last_name"
                    value={values.last_name}
                    size="small"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.last_name && touched.last_name && (
                    <div className={classes.inputFeedback}>{errors.last_name}</div>
                  )}
                  <TextField
                    // id="outlined-with-name"
                    label="Mobile Number"
                    placeholder="Mobile Number"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="mobile"
                    size="small"
                    value={values.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.mobile && touched.mobile && (
                    <div className={classes.inputFeedback}>{errors.mobile}</div>
                  )}
                  <TextField
                    // error
                    // id="outlined-email-input"
                    label="Email"
                    className={classes.textField}
                    type="email"
                    name="email"
                    autoComplete="email"
                    margin="normal"
                    size="small"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <div className={classes.inputFeedback}>{errors.email}</div>
                  )}
                  {/* <TextField
                    name="address"
                    label="Address"
                    placeholder="Address"
                    multiline
                    size="small"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  /> */}
                  <TextField
                    name="password"
                    label="Password"
                    size="small"
                    className={classes.textField}
                    type="password"
                    // autoComplete="current-password"
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

                  <div style={{ paddingTop: '15px', marginTop: '2%' }}>
                    <Checkbox name="acceptedTerms" />
                    <span>
                      I have read the <u> terms and conditions </u>
                    </span>
                  </div>
                  {errors.acceptedTerms && touched.acceptedTerms ? (
                    <div className={classes.inputFeedback}>
                      {errors.acceptedTerms}
                    </div>
                  ) : (
                      ''
                    )}
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
                          color: '#9ea0a5',
                          fontSize: '14px',
                          paddingTop: '5%',
                          width: '85%',
                        }}
                      >
                        Have an account?
                        <Link
                          color="primary"
                          style={{
                            fontWeight: '600',
                            paddingLeft: '4px',
                            fontSize: '14px',
                          }}
                          href="/sign-in"
                        >
                          Sign In
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
                            fontWeight: '600',
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
        </div>
      );
    }}
  </Formik>
);

export default withStyles(styles)(SignUpPage);
