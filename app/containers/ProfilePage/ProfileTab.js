/**
 *
 * ProfileTab
 *
 */

import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },

  container: {
    display: 'flex', flexDirection: 'row',
  },

  leftPanel: {
    display: 'flex',
    width: '30%',
    height: '500px',
    borderRadius: '6px',
    boxShadow: '0 2px 9px 0 rgba(0, 0, 0, 0.03)',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    marginTop: '50px',
  },

  rightPanel: {
    display: 'flex',
    width: '70%',
    height: '500px',
    marginLeft: '20px',
    borderRadius: '6px',
    marginTop: '50px',
    boxShadow: '0 2px 9px 0 rgba(0, 0, 0, 0.03)',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
  },

  settingButton: {
    display: 'flex',
    width: '263px',
    height: '54px',
    borderRadius: '5px',
    marginTop: '10px',
    marginBottom: '10px',
    padding: '10px',
    border: 'solid 1px #e9eff4',
    backgroundColor: '#ffffff',
  },
});

class ProfileTab extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (<div>
      <div>
        <div className={classes.nameField}>
          <span>Name</span>
          <FormControl className={clsx(classes.margin, classes.textField)} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={<InputAdornment position='end'>
                <Button size='small' className={classes.margin}>
                  Small
                </Button>
              </InputAdornment>}
              labelWidth={70}
            />
          </FormControl>
        </div>
      </div>
    </div>);
  }
}

export default withStyles(styles)(ProfileTab);
