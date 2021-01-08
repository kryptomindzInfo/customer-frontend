/**
 *
 * ProfileTab
 *
 */

import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PersonalInfoTab from './PersonalInfoTab';
import DocumentsTab from './DocumentsTab';
import ChangePasswordTab from './ChangePasswordTab';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
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
    console.log(this.props.notify)
    let component;
    switch (this.props.tabInfo) {
      case 'personalInfo':
        component = <PersonalInfoTab notify={this.props.notify} />;
        break;
      case 'security':
        component = <ChangePasswordTab notify={this.props.notify} />;
        break;
      case 'documents':
        component = <DocumentsTab notify={this.props.notify} />;
        break;
      default:
        component = <PersonalInfoTab notify={this.props.notify} />;
    }
    return <div>{component}</div>;
  }
}

export default withStyles(styles)(ProfileTab);
