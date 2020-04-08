/**
 *
 * MainHeader
 *
 */

import React from 'react';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import history from '../../utils/history';

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
    marginRight: '120px',
    marginLeft: '20px',
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
    justifyContent: 'flex-start',
    flexGrow: '1',
  },
  eventLink: {
    marginRight: 24,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  title: {
    color: 'white',
  },
  sectionDesktop: {
    display: 'flex',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
});

const MainHeader = props => {
  const { classes } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const onLogoutClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.headerMainContainer}>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <div className={classes.sectionDesktop} />
          <Typography
            // variant="h4"
            color="inherit"
            className={classes.headerTitleEwallet}
          >
            E-WALLET
          </Typography>
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
                Contacts
              </Typography>
            </Link>
            <Link
              to="/bill-payments-merchants"
              style={{ textDecoration: 'none' }}
            >
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              className="material-icons fl"
              style={{ marginRight: '10px', display: 'flex', color: '#fff' }}
            >
              settings
            </div>

            <Typography
              variant="subtitle1"
              color="inherit"
              className={classes.headerLogout}
            >
              Welcome Hatim
            </Typography>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link to="/profile" style={{ textDecoration: 'none' }}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </Link>
              <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default withStyles(styles)(MainHeader);
