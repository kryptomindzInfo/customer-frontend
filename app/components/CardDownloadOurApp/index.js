/**
 *
 * CardDownloadOurApp
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Grid } from '@material-ui/core';
import { withStyles, Typography } from '@material-ui/core';

import appStore from 'images/appStore.png';
import GooglePlayLogo from 'images/GooglePlayLogo.png';

const styles = theme => ({
  mainContainer: {
    // paddingLeft: '11%',
    textAlign: 'center',
    borderRadius: '7px',
    paddingRight: '0%',
    background: 'white',
    boxShadow: '0 4px 9px 0 rgba(0, 0, 0, 0.02)',
    [theme.breakpoints.down('sm')]: {
      // paddingRight: '4%',
      margin: '0 auto',
      maxWidth: '70%',
      textAlign: 'center',
    },
  },
  cardDownloadOurAppTitle: {
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
          <a href="https://www.apple.com/in/ios/app-store/">
            <img className={classes.appStoreLogo} src={appStore} />
          </a>
          <br />
          <a>
            <img className={classes.appStoreLogo} src={GooglePlayLogo} />
          </a>
        </Grid>
      </Grid>
    </div>
  );
}

CardDownloadOurApp.propTypes = {};

export default withStyles(styles)(CardDownloadOurApp);
