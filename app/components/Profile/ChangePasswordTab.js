import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { Field, Form, Formik } from 'formik';
import { Button } from '@material-ui/core';
import * as Yup from 'yup';
import axios from 'axios';
import { API_URL } from '../../containers/App/constants';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
  },

  formFields: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
   marginLeft:"135px",
    margin: '50px',
    marginBottom: '25px',
  },

  passwordContainer: {
    display: 'flex',
    flexDirection: 'column',
    // marginTop:"2%"
  },

  fieldHeading: {
    // marginBottom: '5px',
    marginTop:"-10%"
  },

  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '50px',
  },

  inputField: {
    height: '40px',
    width: '130%',
  },
  updateButton: {
    color: '#417505',
    fontSize: '13px',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  errorText: {
    color: 'red',
    marginTop: '5px',
    fontSize: '12px',
  },
  submitButton: {
    background: theme.palette.primary.main,
    marginTop: '10%',
    color: theme.palette.white,
    '&:hover': {
      background: theme.palette.primary.hover,
    },
  },
});

const ChangePasswordForm = props => (

  < Formik
    initialValues={{
      currentPassword: '',
      newPassword: '',
      repeatPassword: '',
      password: props.password,
    }}

    
    // validationSchema={
    //   Yup.object().shape({
    //     currentPassword: Yup.mixed()
    //       .required('Please enter the current password!')
    //       .oneOf([Yup.ref('password'), null], "Passwords don't match"),
    //     newPassword: Yup.mixed()
    //       .required('Please enter the new password!')
    //       .oneOf(
    //         [Yup.ref('currentPassword'), null],
    //         'New password cannot be same as current password',
    //       ),
    //     repeatPassword: Yup.mixed().when('newPassword', {
    //       is: val => !!(val && val.length > 0),
    //       then: Yup.string().oneOf(
    //         [Yup.ref('newPassword')],
    //         'Passwords do not match',
    //       ),
    //     }),
    //   })
    // }
    onSubmit={async values => {
      

      const user = JSON.parse(localStorage.getItem('loggedUser'));
      const res = await axios.post(`${API_URL}/user/updatePassword`, {
        password: values.newPassword,
        username: user.username,
      });
      
      if (res.data.status === 1) {

        
        props.notify('Password successfully updated', 'success');
        user.password = values.newPassword;
        const updateUser = JSON.stringify(user);
        localStorage.setItem('loggedUser', updateUser);       
        // props.notify('Password successfully updated', 'success');
      ;
      } else {
        props.notify('Error while updating password', 'error');
      }
    }}
  >
    { formikProps => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
      } = formikProps;

      const { classes } = props;
      const [showNewPassword, setShowNewPassword] = useState(false);
      const [showCurrentPassword, setShowCurrentPassword] = useState(false);
      const [showRepeatPassword, setShowRepeatPassword] = useState(false);

      const handleMouseDownPassword = event => {
        event.preventDefault();
      };
      // console.log(props)

      return (
        <Form>
          <div className={classes.formContainer}>
          
            <div className={classes.formFields}>
           
              <span className={classes.fieldHeading}>Current Password</span>
              <Field
                id="currentPassword"
                component={OutlinedInput}
                type={showCurrentPassword ? 'text' : 'password'}
                value={values.currentPassword}
                labelWidth={0}
                className={classes.inputField}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.currentPassword && touched.currentPassword && (
                <div className={classes.errorText}>
                  {errors.currentPassword}
                </div>
              )}
            </div>
        

            <div className={classes.formFields}>
              <span className={classes.fieldHeading}>New Password</span>

              <Field
                id="newPassword"
                component={OutlinedInput}
                className={classes.inputField}
                type={showNewPassword ? 'text' : 'password'}
                value={values.newPassword}
                labelWidth={0}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showNewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.newPassword && touched.newPassword && (
                <div className={classes.errorText}>{errors.newPassword}</div>
              )}
            </div>

            <div className={classes.formFields}>
              <span className={classes.fieldHeading}>Repeat Password</span>

              <Field
                id="repeatPassword"
                component={OutlinedInput}
                className={classes.inputField}
                type={showRepeatPassword ? 'text' : 'password'}
                value={values.repeatPassword}
                labelWidth={0}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showRepeatPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.repeatPassword && touched.repeatPassword && (
                <div className={classes.errorText}>{errors.repeatPassword}</div>
              )}
            </div>
            <div className={classes.formFields} style={{marginTop:"-2%"}}>
              <Button
                className={[classes.inputField, classes.submitButton]}
                variant="contained"
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </div>
          </div>
        </Form>
      );
    }}
  </Formik >
);

class ChangePasswordTab extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes,notify } = this.props;
    console.log(this.props);
    console.log(notify);
    const { password } = JSON.parse(localStorage.getItem('loggedUser'));
    return (
      <div>
        <div className={classes.passwordContainer} style={{marginTop:"8%",marginLeft:"10%"}}>
          {/* <span style={{ fontWeight: '600' }}>Change Password</span> */}
          <ChangePasswordForm classes={classes} password={password} notify={notify} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ChangePasswordTab);
