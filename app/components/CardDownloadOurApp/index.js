/**
 *
 * CardDownloadOurApp
 *
 */

import React from 'react';
import { Grid, Typography, withStyles } from '@material-ui/core';

import appStore from 'images/appStore.png';
import GooglePlayLogo from 'images/GooglePlayLogo.png';
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
  appStoreLogo: {
    width: '150px',
    padding: '15px 0px 15px 0px',
  },
});

function CardDownloadOurApp(props) {
  const { classes } = props;
  return (
    <div>
      <Grid container className={classes.mainContainer}>
        <Grid item md={12} sm={12} xs={12}>
          <Typography className={classes.cardDownloadOurAppTitle} variant="h5">
            Download Our App
          </Typography>
          <Typography
            className={classes.cardDownloadOurAppSubitle}
            variant="subtitle2"
          >
            Send & receive money through your mobile
          </Typography>
          <a
            onClick={() =>
              window.open('https://www.apple.com/in/ios/app-store/')
            }
          >
            <img className={classes.appStoreLogo} src={appStore} />
          </a>
          <br />
          <a onClick={() => window.open('https://play.google.com/store?hl=en')}>
            <img className={classes.appStoreLogo} src={GooglePlayLogo} />
          </a>
        </Grid>
      </Grid>
    </div>
  );
}

CardDownloadOurApp.propTypes = {};

export default withStyles(styles)(CardDownloadOurApp);
