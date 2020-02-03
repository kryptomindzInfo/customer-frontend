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
    paddingTop: '18px',
    paddingBottom: '15px',
    boxShadow: '0 0px 12px 0 rgba(0, 0, 0, 0.02)',
    // fontFamily: 'Montserrat'
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
    textAlign: 'right ',
    paddingRight: '10%',

    [theme.breakpoints.down('xs')]: {
      textAlign: 'right ',
      paddingRight: '10%',
    },
  },
  welcomeUsername: {
    textAlign: 'right',
    color: 'white',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'right ',
      paddingRight: '6%',
    },
  },
  headerTitleEwallet: {
    paddingLeft: '6%',
    flexGrow: 1,
    // fontSize: '1em',
    fontSize: '24px',
    fontWeight: 600,
    color: 'white',
  },
});
function HeaderChooseYourBank(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid container className={classes.headerMainContainer}>
        <Grid item md={6} sm={6} xs={6}>
          <Typography
            // variant="h4"
            color="inherit"
            className={classes.headerTitleEwallet}
          >
            E-WALLET
          </Typography>
        </Grid>
        <Grid item md={6} sm={6} xs={6}>
          <Grid
            container
            className={classes.headerTitleWelcome}
            justify="flex-end"
          >
            <Grid item item md={4} sm={1} />
            <Grid className={classes.headerWelcome} item md={4} sm={6}>
              <Typography
                variant="h6"
                color="inherit"
                className={classes.welcomeUsername}
              >
                Welcome Username
              </Typography>
            </Grid>
            <Grid className={classes.headerLogout} item md={4} sm={5} xs={6}>
              <H2>LOGOUT</H2>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

// HeaderChooseYourBank.propTypes = {};

export default withStyles(styles)(HeaderChooseYourBank);
