/**
 *
 * VerificationLandingPage
 *
 */

import React from 'react';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import HeaderChooseYourBank from '../../components/HeaderChooseYourBank';
import verificationLogo from '../../images/verification_logo.png';

const styles = () => ({
  root: {
    flexGrow: 1,
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

class VerificationLandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, notify } = this.props;
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    return (
      <div>
        <HeaderChooseYourBank />
        <div className={classes.container}>
          <div className={classes.leftContainer}>
            <img alt="verifyLogo" src={verificationLogo} />
          </div>
          <div className={classes.rightContainer}>
            {user.status === 3 ? (
              <Typography variant="h4">
                {' '}
                Pending approval from Cashier!{' '}
              </Typography>
            ) : user.status === 4 ? (
              <Typography variant="h4">
                {' '}
                Please go to nearest branch and <br /> get your documents
                uploaded!{' '}
              </Typography>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(VerificationLandingPage);
