/**
 *
 * ProfilePage
 *
 */

import React from 'react';

import { withStyles } from '@material-ui/core';
import HeaderChooseYourBank from '../../components/HeaderChooseYourBank';
import userIcon from '../../images/user-icon.png';
import documentIcon from '../../images/file-document-outline.png';
import ProfileTab from '../../components/Profile/ProfileTab';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  leftPanel: {
    display: 'flex',
    width: '20%%',
    height: '500px',
    borderRadius: '6px',
    marginLeft: '20px',
    padding: '20px',
    boxShadow: '0 2px 9px 0 rgba(0, 0, 0, 0.03)',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    marginTop: '50px',
  },

  rightPanel: {
    display: 'flex',
    width: '640px',
    height: '500px',
    marginLeft: '20px',
    borderRadius: '6px',
    padding: '20px',
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
    marginBottom: '20px',
    padding: '10px',
    alignItems: 'center',
    border: 'solid 1px #e9eff4',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    '&:hover': {
      background: '#6cac69',
      color: '#fff',
    },
  },

  settingTabIcon: {
    marginRight: '20px',
    marginLeft: '20px',
  },
});

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabOpen: 'personalInfo',
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <HeaderChooseYourBank />
        <div className={classes.container}>
          <div className={classes.leftPanel}>
            <span style={{ fontWeight: '600' }}>Settings</span>
            <div>
              <div
                className={classes.settingButton}
                onClick={() => this.setState({ tabOpen: 'personalInfo' })}
              >
                <span className={classes.settingTabIcon}>
                  <img width="25px" height="20px" src={userIcon} />
                </span>
                <span>Personal Info</span>
              </div>
              <div
                className={classes.settingButton}
                onClick={() => this.setState({ tabOpen: 'security' })}
              >
                <span className={classes.settingTabIcon}>
                  <img width="25px" height="20px" src={documentIcon} />
                </span>
                <span>Log in and Security</span>
              </div>
              <div
                className={classes.settingButton}
                onClick={() => this.setState({ tabOpen: 'documents' })}
              >
                <span className={classes.settingTabIcon}>
                  <img width="25px" height="20px" src={documentIcon} />
                </span>
                <span>Documents</span>
              </div>
            </div>
          </div>
          <div className={classes.rightPanel}>
            <ProfileTab tabInfo={this.state.tabOpen} />
          </div>
          <div />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ProfilePage);
