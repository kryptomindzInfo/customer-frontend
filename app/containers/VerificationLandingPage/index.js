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
    return (
      <div>
        <HeaderChooseYourBank />
        <div className={classes.container}>
          <div className={classes.leftContainer}>
            <img alt="verifyLogo" src={verificationLogo} />
          </div>
          <div className={classes.rightContainer}>
            <Typography variant="h4">
              {' '}
              Pending approval from Cashier! <br /> Please visit our nearest
              bank branch or partner
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(VerificationLandingPage);
