/**
 *
 * MainHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMainHeader from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Grid } from '@material-ui/core';
import H2 from 'components/H2';
import { withStyles } from '@material-ui/core';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  headerMainContainer: {
    background: theme.palette.hGradient,
  },
  headerTitleEwallet: {
    paddingLeft: '6%',
  },
  headerTitleWelcome: {
    textAlign: 'right ',
  },
  headerWelcome: {
    fontSize: '1em',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  headerLogout: {
    textAlign: 'center ',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'right ',
      paddingRight: '6%',
    },
  },
});

const MainHeader = props => {
  // useInjectReducer({ key: 'mainHeader', reducer });
  // useInjectSaga({ key: 'mainHeader', saga });
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container className={classes.headerMainContainer}>
        <Grid item md={6} sm={6} xs={6}>
          <H2 className={classes.headerTitleEwallet}>E-WALLET</H2>
        </Grid>
        <Grid item md={6} sm={6} xs={6}>
          <Grid
            container
            className={classes.headerTitleWelcome}
            justify="flex-end"
          >
            {/* <Grid className={classes.headerWelcome} item md={6} sm={6}>
              <H2>Welcome Username</H2>
            </Grid> */}
            <Grid className={classes.headerLogout} item md={6} sm={12} xs={12}>
              <H2>Welcome Username</H2>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <FormattedMessage {...messages.header} /> */}
    </div>
  );
}

// MainHeader.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//   mainHeader: makeSelectMainHeader(),
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

export default withStyles(styles)(MainHeader);
