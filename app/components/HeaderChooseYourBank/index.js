/**
 *
 * HeaderChooseYourBank
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Grid } from '@material-ui/core';
import H2 from 'components/H2';
import { withStyles, Typography } from '@material-ui/core';

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
function HeaderChooseYourBank(props) {
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
            <Grid className={classes.headerWelcome} item md={6} sm={6}>
              <H2>Welcome Username</H2>
            </Grid>
            <Grid className={classes.headerLogout} item md={6} sm={6} xs={6}>
              <H2>LOGOUT</H2>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <FormattedMessage {...messages.header} /> */}
    </div>
  );
}

HeaderChooseYourBank.propTypes = {};

export default withStyles(styles)(HeaderChooseYourBank);
