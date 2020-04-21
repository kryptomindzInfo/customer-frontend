/**
 *
 * PersonalInfoTab
 *
 */

import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import { API_URL } from '../../containers/App/constants';

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
    marginTop: '0px',
    margin: '50px',
    marginBottom: '40px',
  },

  personalInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  fieldHeading: {
    marginBottom: '5px',
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
});

class PersonalInfoTab extends React.Component {
  constructor(props) {
    super(props);
    const { name, email, mobile } = JSON.parse(
      localStorage.getItem('loggedUser'),
    );
    this.state = {
      name,
      email,
      phoneNumber: mobile,
      nameErr: false,
      nameErrorText: '',
      emailErr: false,
      emailErrorText: '',
    };
  }

  render() {
    const { classes } = this.props;
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    const updateUserEmail = async value => {
      if (value) {
        if (value === user.email) {
          return;
        }
        if (
          value.match(
            '^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
          )
        ) {
          const res = await axios.post(`${API_URL}/user/updateEmail`, {
            email: this.state.email,
            username: user.username,
          });
          if (res.data.status === 1) {
            user.email = value;
            const updateUser = JSON.stringify(user);
            localStorage.setItem('loggedUser', updateUser);
            this.props.notify('Email successfully updated', 'success');
            window.location.reload();
          } else {
            this.props.notify('Error while updating email', 'error');
          }
        } else {
          this.setState({
            emailErr: true,
            emailErrorText: 'Please enter a valid email',
          });
        }
      } else {
        this.setState({
          emailErr: true,
          emailErrorText: 'Please enter a valid email',
        });
      }
    };
    return (
      <div>
        <div className={classes.personalInfoContainer}>
          <span style={{ fontWeight: '600' }}>Personal Info</span>
          <div className={classes.formContainer}>
            <div className={classes.formFields}>
              <span className={classes.fieldHeading}>Name</span>
              <FormControl variant="outlined">
                <OutlinedInput
                  id="name"
                  disabled
                  error={this.state.nameErr}
                  type="text"
                  className={classes.inputField}
                  value={this.state.name}
                  labelWidth={0}
                />
                <span className={classes.errorText}>
                  {this.state.nameErrorText}
                </span>
              </FormControl>
            </div>
            <div className={classes.formFields}>
              <span className={classes.fieldHeading}>Email</span>
              <FormControl variant="outlined">
                <OutlinedInput
                  id="email"
                  type="text"
                  value={this.state.email}
                  error={this.state.emailErr}
                  helperText={this.state.emailErrorText}
                  className={classes.inputField}
                  onChange={e =>
                    this.setState({
                      email: e.target.value,
                      emailErr: false,
                      emailErrorText: '',
                    })
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <Button
                        onClick={() => updateUserEmail(this.state.email)}
                        size="small"
                        className={classes.updateButton}
                      >
                        Update
                      </Button>
                    </InputAdornment>
                  }
                  labelWidth={0}
                />
                <span className={classes.errorText}>
                  {this.state.emailErrorText}
                </span>
              </FormControl>
            </div>
            <div className={classes.formFields}>
              <span className={classes.fieldHeading}>Phone Number</span>
              <FormControl variant="outlined">
                <OutlinedInput
                  id="mobileNumber"
                  type="text"
                  disabled
                  className={classes.inputField}
                  value={this.state.phoneNumber}
                  labelWidth={0}
                />
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PersonalInfoTab);
