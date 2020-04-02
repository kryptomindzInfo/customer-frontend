/**
 *
 * ProfilePage
 *
 */

import React from 'react';

import { withStyles } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';
import HeaderChooseYourBank from '../../components/HeaderChooseYourBank';
import userIcon from '../../images/user-icon.png';
import documentIcon from '../../images/file-document-outline.png';

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
    marginRight: '30px',
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
    alignItems: 'center',
    border: 'solid 1px #e9eff4',
    backgroundColor: '#ffffff',
  },

  settingTabIcon: {
    marginRight: '20px', marginLeft: '20px',
  },
});

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (<div>
      <HeaderChooseYourBank/>
      <div className={classes.container}>
        <div className={classes.leftPanel}>
          <span>Settings</span>
          <div>
            <Paper className={classes.settingButton}>
              <span className={classes.settingTabIcon}><img width='25px' height='20px' src={userIcon}/></span>
              <span>Personal Info</span>
            </Paper>
            <Paper className={classes.settingButton}>
              <span className={classes.settingTabIcon}><img width='25px' height='20px' src={documentIcon}/></span>
              <span>Log in and Security</span>
            </Paper>
            <Paper className={classes.settingButton}>
              <span className={classes.settingTabIcon}><img width='25px' height='20px' src={documentIcon}/></span>
              <span>Documents</span>
            </Paper>
          </div>
        </div>
        <div className={classes.rightPanel}>
        </div>
        <div/>
      </div>
    </div>);
  }
}

export default withStyles(styles)(ProfilePage);
