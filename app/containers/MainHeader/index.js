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

import { Link, Redirect } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMainHeader from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Grid } from '@material-ui/core';
import H2 from 'components/H2';
import { withStyles } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

// import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  headerMainContainer: {
    background: theme.palette.hGradient,
  },
  headerTitleEwallet: {
    // paddingLeft: '6%',
    flexGrow: 1,
    // fontSize: '1em',
    fontSize: '24px',
    fontWeight: 600,
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
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  headerLink: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  eventLink: {
    // fontWeight: 600,
    // display: 'block',
    marginRight: 24,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  title: {
    // display: 'none',
    // [theme.breakpoints.up('sm')]: {
    // display: 'block',
    // },
    color: 'white',
    // fontWeight: 'bold',
  },
  sectionDesktop: {
    display: 'flex',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
});

const MainHeader = props => {
  // useInjectReducer({ key: 'mainHeader', reducer });
  // useInjectSaga({ key: 'mainHeader', saga });
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.headerMainContainer}>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <div className={classes.sectionDesktop}>
              <Menu>
                <MenuItem
                // onClick={() => {
                //   history.push('/');
                //   // popupState.close();
                // }}
                >
                  HOME
                  {/* <FormattedMessage {...messages.homeButtonHeaderMessage} /> */}
                </MenuItem>

                <MenuItem
                // onClick={() => {
                //   // history.push('/about');

                //   window.open('http://www.zetfly.com');

                //   // popupState.close();
                // }}
                >
                  ABOUT US
                  {/* <FormattedMessage {...messages.aboutusButtonHeaderMessage} /> */}
                </MenuItem>
                <MenuItem
                // onClick={() => {
                //   history.push('/how-it-works');
                // popupState.close();
                // }}
                >
                  HOW IT WORKS
                  {/* <FormattedMessage {...messages.howitworksButtonHeaderMessage} /> */}
                </MenuItem>

                <MenuItem
                // onClick={popupState.close}
                // onClick={() => {
                //   window.open('https://managers.aktv.life');
                //   // popupState.close();
                // }}
                >
                  CREATE EVENT
                  {/* <FormattedMessage
                  {...messages.createEventButtonHeaderMessage} */}
                  />
                </MenuItem>
                <MenuItem
                // onClick={popupState.close}
                // onClick={() => {
                //   history.push('/events');
                //   // popupState.close();
                // }}
                >
                  BROWSE EVENT
                  {/* <FormattedMessage
                  {...messages.browseEventButtonHeaderMessage} */}
                  />
                </MenuItem>
              </Menu>
            </div>
            {/* <MenuIcon /> */}
          </IconButton>
          <div className={classes.sectionDesktop}>
            <Menu>
              <MenuItem
              // onClick={() => {
              //   history.push('/');
              //   // popupState.close();
              // }}
              >
                HOME
                {/* <FormattedMessage {...messages.homeButtonHeaderMessage} /> */}
              </MenuItem>

              <MenuItem
              // onClick={() => {
              //   // history.push('/about');

              //   window.open('http://www.zetfly.com');

              //   // popupState.close();
              // }}
              >
                ABOUT US
                {/* <FormattedMessage {...messages.aboutusButtonHeaderMessage} /> */}
              </MenuItem>
              <MenuItem
              // onClick={() => {
              //   history.push('/how-it-works');
              // popupState.close();
              // }}
              >
                HOW IT WORKS
                {/* <FormattedMessage {...messages.howitworksButtonHeaderMessage} /> */}
              </MenuItem>

              <MenuItem
              // onClick={popupState.close}
              // onClick={() => {
              //   window.open('https://managers.aktv.life');
              //   // popupState.close();
              // }}
              >
                CREATE EVENT
                {/* <FormattedMessage
                  {...messages.createEventButtonHeaderMessage} */}
                />
              </MenuItem>
              <MenuItem
              // onClick={popupState.close}
              // onClick={() => {
              //   history.push('/events');
              //   // popupState.close();
              // }}
              >
                BROWSE EVENT
                {/* <FormattedMessage
                  {...messages.browseEventButtonHeaderMessage} */}
                />
              </MenuItem>
            </Menu>
          </div>
          <Typography
            // variant="h4"
            color="inherit"
            className={classes.headerTitleEwallet}
          >
            E-WALLET
          </Typography>
          {/* <div className={classes.grow} /> */}
          <div className={`headerLink ${classes.headerLink}`}>
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
              <Typography
                className={`${classes.title} ${classes.eventLink}`}
                variant="subtitle1"
                // color="inherit"
                noWrap
              >
                Dashboard
              </Typography>
            </Link>
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <Typography
                className={`${classes.title} ${classes.eventLink}`}
                variant="subtitle1"
                // color="inherit"
                noWrap
              >
                Contact
              </Typography>
            </Link>
            <Link to="/bill-payments" style={{ textDecoration: 'none' }}>
              <Typography
                className={`${classes.title} ${classes.eventLink}`}
                variant="subtitle1"
                // color="inherit"
                noWrap
              >
                Bill Payments
              </Typography>
            </Link>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Typography
                className={`${classes.title} ${classes.eventLink}`}
                variant="subtitle1"
                // color="inherit"
                noWrap
              >
                Reports
              </Typography>
            </Link>
          </div>
          <p className="material-icons fl" style={{ paddingRight: '7px' }}>
            settings
          </p>

          <Typography
            variant="h6"
            color="inherit"
            className={classes.headerLogout}
          >
            Welcome Username
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

//   return (
//     <div className={classes.root}>
//       <Grid container className={classes.headerMainContainer}>
//         <Grid item md={6} sm={6} xs={6}>
//           <H2 className={classes.headerTitleEwallet}>E-WALLET</H2>
//         </Grid>
//         <Grid item md={6} sm={6} xs={6}>
//           <Grid
//             container
//             className={classes.headerTitleWelcome}
//             justify="flex-end"
//           >
//             <Grid className={classes.headerLogout} item md={6} sm={12} xs={12}>
//               <H2>Welcome Username</H2>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

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
