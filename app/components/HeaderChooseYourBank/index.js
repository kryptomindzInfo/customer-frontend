/**
 *
 * HeaderChooseYourBank
 *
 */

import React from 'react';
import {withStyles}  from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import history from '../../utils/history';

// import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  headerMainContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    background: theme.palette.hGradient,
  },
  leftContent: {
    display: 'flex',
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

const HeaderChooseYourBank = props => {
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

  const { name } = JSON.parse(localStorage.getItem('loggedUser'));

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.headerMainContainer}>
          <div className={classes.leftContent}>
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
          </div>
          <div
            style={{
              display: 'flex',
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
              Welcome {name}
            </Typography>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default withStyles(styles)(HeaderChooseYourBank);
