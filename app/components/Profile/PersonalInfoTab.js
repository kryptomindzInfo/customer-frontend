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
});

class PersonalInfoTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phoneNumber: '',
    };
  }

  render() {
    const { classes } = this.props;
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
                  type="text"
                  className={classes.inputField}
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                  endAdornment={
                    <InputAdornment position="end">
                      <Button size="small" className={classes.updateButton}>
                        Update
                      </Button>
                    </InputAdornment>
                  }
                  labelWidth={0}
                />
              </FormControl>
            </div>
            <div className={classes.formFields}>
              <span className={classes.fieldHeading}>Email</span>
              <FormControl variant="outlined">
                <OutlinedInput
                  id="email"
                  type="text"
                  value={this.state.email}
                  className={classes.inputField}
                  onChange={e => this.setState({ email: e.target.value })}
                  endAdornment={
                    <InputAdornment position="end">
                      <Button size="small" className={classes.updateButton}>
                        Update
                      </Button>
                    </InputAdornment>
                  }
                  labelWidth={0}
                />
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
                  value="8148248293"
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
