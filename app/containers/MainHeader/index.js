/**
 *
 * MainHeader
 *
 */

 import React, { Fragment, useEffect, useState } from 'react';
 import { withStyles } from '@material-ui/core/styles'
 import IconButton from '@material-ui/core/IconButton';
 import NotificationIcon from '@material-ui/icons/Notifications';
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
     marginRight: '50px',
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
   const logoofbank = JSON.parse(localStorage.getItem('bank')).logo;
   const bankname = JSON.parse(localStorage.getItem('bank')).name;
   const val = '';
 
 
 
 
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
           <img src={`${STATIC_URL}${logoofbank}`} width="50px" height="50px"/>
           <Typography
             // variant="h4"
             color="inherit"
             className={classes.headerTitleEwallet}
           >
             {bankname}
 
           </Typography>
           
 
           <div className={`headerLink ${classes.headerLink}`}>
             <Link to="/dashboard" style={{ textDecoration: 'none' }}>
               <Typography
                 className={`${classes.title} ${classes.eventLink}`}
                 variant="subtitle1"
                 style={{borderBottom: props.active==='dashboard' ? '1px solid white' : '0'}}
                 // color="inherit"
                 noWrap
               >
                 Dashboard
               </Typography>
             </Link>
             {/* <Link to="/contact" style={{ textDecoration: 'none' }}>
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
                 Pay Bills
               </Typography>
             </Link>
              */}
             <Link
               to="/reports"
               style={{ textDecoration: 'none' }}
             >
             <Typography
               className={`${classes.title} ${classes.eventLink}`}
               variant="subtitle1"
               style={{borderBottom: props.active==='report' ? '1px solid white' : '0'}}
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
               className="material-icons fl"
               style={{ marginRight: '10px', display: 'flex', color: '#fff' }}
             >
               <NotificationIcon />
             </div>
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
               style={{ backgroundColor: "", width: "", marginTop:'50px' }}
             >
               {/* <h2 style={{ marginLeft: "20px", marginRight: "20px" }}>hello</h2> */}
               <div style={{ width: "100px"}}>
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
