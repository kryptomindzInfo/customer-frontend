/**
 *
 * MainHeader
 *
 */

import React, { Fragment, useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import axios from 'axios';
import { Link } from 'react-router-dom';
import history from '../../utils/history';
import { API_URL, STATIC_URL } from '../App/constants';

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
    marginLeft: '-4%',
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
  colortitle :{
color:'black',
fontWeight:600

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
  const [logoofbank, setlogoofbank] = React.useState("")
  const [bankname, setbankname] = React.useState("")
  const [selectname,setselectname] = React.useState("")
  const val = '';

  useEffect(() => {

    const id = window.location.pathname
    console.log(id)
    setselectname(id)
   
    fetchBanks()
    // 60260d450023d70007f5747b
      .then(res => {
        console.log(res)
        const { username} = JSON.parse(localStorage.getItem('loggedUser'));
        
       const bankId = localStorage.getItem('bankId')
         
          const filterlogo = res.data.banks.filter((value) => {

            return value._id == bankId
          })
          console.log(filterlogo)
          if (filterlogo.length) {
            setlogoofbank(filterlogo[0].logo)
            setbankname(filterlogo[0].name)
          }
         
         
        
        // setState({
        //   listOfBanks: res.data.banks,
        // });
      })
      .catch();
  }, [val]);


  const fetchBanks = async () => {
    try {
      const res = await axios.get(`${API_URL}/user/getBanks`);
      if (res.status === 200) {
        // setLoading(false);
        return res;
      }
      // setLoading(false);
      return null;
    } catch (err) {
      // setLoading(false);
      throw err;
    }
  };

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

  const { name, last_name } = JSON.parse(localStorage.getItem('loggedUser'));

  console.log("")
  console.log(selectname)

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
          <img src={`${STATIC_URL}${logoofbank}`} width="50px" height="50px"   style={{ marginRight: "5%",borderRadius:"50%" }} />
          <Typography
            // variant="h4"
            color="inherit"
            className={classes.headerTitleEwallet}
          >
            {/* E-WALLET */}
            {/* {bankname} */}
            {bankname.charAt(0).toUpperCase() + bankname.slice(1)}

          </Typography>
          

          <div className={`headerLink ${classes.headerLink}`}>
            <Link to="/dashboard" style={{ textDecoration: 'none' }} >
              <Typography
                className= {  selectname == "/dashboard" ? (`${classes.colortitle} ${classes.eventLink}`) : (`${classes.title} ${classes.eventLink}`)}
                variant="subtitle1"
                // color="inherit"
                noWrap
              >
                <span onClick={()=>{
                setselectname('dashboard')
              // console.log('dashboard')
            }}>Dashboard</span>
              </Typography>
            </Link>
            {/* <Link to="/contact" style={{ textDecoration: 'none' }}>
              <Typography
                className={  selectname == "/contact" ? (`${classes.colortitle} ${classes.eventLink}`) : (`${classes.title} ${classes.eventLink}`)}
                variant="subtitle1"
                // color="inherit"
                noWrap
              >
                 <span onClick={()=>{
              //  setselectname('contact')
              // console.log("contact")
            }}>Contacts</span>
              </Typography>
            </Link>
            <Link
              to="/bill-payments-merchants"
              style={{ textDecoration: 'none' }} 
            >
              <Typography
                // className={`${classes.title} ${classes.eventLink}`}
                className={  selectname == "/bill-payments-merchants" ? (`${classes.colortitle} ${classes.eventLink}`) : (`${classes.title} ${classes.eventLink}`)}
                variant="subtitle1"
                // color="inherit"
                noWrap
              >
                Pay Bills
              </Typography>
            </Link>
             */}
            <Link
              to="/reports"
              style={{ textDecoration: 'none' }}
            >
            <Typography
              className={selectname == "/reports" ? (`${classes.colortitle} ${classes.eventLink}`) : (`${classes.title} ${classes.eventLink}`)}
              variant="subtitle1"
              // color="inherit"
              noWrap
            >
              <span onClick={()=>{
                setselectname('reports')
              // console.log('dashboard')
            }}>Reports</span>
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
              Welcome {name}
            </Typography>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              // keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              style={{ backgroundColor: "", width: "" }}
            >
              {/* <h2 style={{ marginLeft: "20px", marginRight: "20px" }}>hello</h2> */}
              <div style={{ width: "100px" }}>
                <Link to="/profile" style={{ backgroundColor: '', marginLeft: "20px", marginRight: "" }}>
                  {/* <MenuItem onClick={handleClose} style={{ marginLeft: "" }}>Profile</MenuItem> */}
                  <span onClick={handleClose} style={{ marginLeft: "" }}>Profile</span>
                </Link>
                <br />
                <Link to="" style={{ textDecoration: 'none', marginLeft: "20px", marginRight: "" }}>
                  <span onClick={onLogoutClick} style={{ marginLeft: "" }}>Logout</span>
                </Link>
              </div>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default withStyles(styles)(MainHeader);
