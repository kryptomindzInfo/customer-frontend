/**
 *
 * CardDownloadOurApp
 *
 */

import React from 'react';
import { Grid, Link, Typography, withStyles } from '@material-ui/core';

import appStore from 'images/appStore.png';
import GooglePlayLogo from 'images/GooglePlayLogo.png';
import Paper from '@material-ui/core/Paper';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const styles = theme => ({
  mainContainer: {
    // paddingLeft: '11%',
    textAlign: 'center',

    borderRadius: '7px',
    paddingRight: '0%',
    background: 'white',
    boxShadow: '0 4px 9px 0 rgba(0, 0, 0, 0.02)',
    // marginLeft: '15%',

    [theme.breakpoints.down('sm')]: {
      // paddingRight: '4%',
      margin: '0 auto',
      maxWidth: '50%',
      textAlign: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      // paddingRight: '4%',
      margin: '0 auto',
      maxWidth: '100%',
      textAlign: 'center',
    },
  },
  cardDownloadOurAppTitle: {
    paddingTop: '4%',
    paddingBottom: '5%',
  },
  cardDownloadOurAppSubTitle: {
    color: '#9ea0a5',
    paddingTop: '4%',
    paddingBottom: '5%',
  },
  appStoreLogo: {
    width: '96px',
    padding: '15px 0px 15px 0px',
  },
});

function CardDownloadOurApp(props) {
  const { classes } = props;
  return (
    <Paper elevation={0}>
      <Grid
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.mainContainer}
      >
        <Typography className={classes.cardDownloadOurAppTitle} variant="h5">
          Download Our App
        </Typography>
        <Typography
          className={classes.cardDownloadOurAppSubTitle}
          variant="headline"
        >
          Send and receive money through your mobile
        </Typography>
        <br />
        <Link
          onClick={() => window.open('https://www.apple.com/in/ios/app-store/')}
        >
          <img className={classes.appStoreLogo} src={appStore} alt={appStore} />
        </Link>
        <br />
        <Link
          onClick={() => window.open('https://play.google.com/store?hl=en')}
        >
          <img
            className={classes.appStoreLogo}
            src={GooglePlayLogo}
            alt={GooglePlayLogo}
          />
        </Link>
      </Grid>
    </Paper>
  );
}

CardDownloadOurApp.propTypes = {};

export default withStyles(styles)(CardDownloadOurApp);
