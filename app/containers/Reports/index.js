/**
 *
 * ContactPage
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

// import Button from 'components/Button';
import ActionBar from 'components/ActionBar';

import MainHeader from '../MainHeader';
import Card from 'components/Card';
import CardEwalletSendMoneyPayBills from 'components/CardEwalletSendMoneyPayBills';
import Loader from '../../components/Loader';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import axisBankLogo from 'images/axis-bank-logo.jpg';
import CardDownloadOurApp from '../../components/CardDownloadOurApp';

import { Formik, useField, Form } from 'formik';

import { object, string, number, email, boolean } from 'yup';

import { API_URL, STATIC_URL, CURRENCY } from 'containers/App/constants';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Popup from 'components/Popup';

const styles = theme => ({
  gridCardEwalletSendMoney: {
    margin: '9% 2% 0% 2%',
    borderRadius: '4px',
    [theme.breakpoints.down('sm')]: {
      margin: '3% 3%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '4% 5%',
    },
  },
  gridSearchBarContactList: {
    margin: '3% 2% 0% 2%',
    paddingTop: '3%',
    borderRadius: '4px',
    [theme.breakpoints.down('sm')]: {
      margin: '3% 3%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '4% 5%',
    },
  },
  gridCardDownloadOurApp: {
    margin: '0% 2% 0% 2%',
    borderRadius: '4px',
    [theme.breakpoints.down('sm')]: {
      margin: '3% 3%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '4% 5%',
    },
  },
  sendMoney: {
    padding: '6px',
    borderRadius: '2px',
    minWidth: '0 !important',
    border: 'solid 1px ${theme.palette.primary.main}',
    color: theme.palette.primary.main,
    fontSize: '11px',
    fontWeight: 'bold',
    paddingRight: '6px',
    background: '#fff',

    i: {
      marginRight: '5px',
      fontSize: '11px',
    },
  },
  recentActivitiesTable: {
    margin: '0 auto',
    borderRadius: '4px',
    background: 'white',
    borderRadius: '7px',
    boxShadow: '0 4px 9px 0 rgba(0, 0, 0, 0.02)',
    // border: '1px solid #cbd2d6',

    [theme.breakpoints.down('sm')]: {
      margin: '3% 3%',
      // width: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '4% 5%',
    },
  },
  table: {
    minWidth: 700,
  },
  textField: {
    marginBottom: '0.03375rem',
    width: '100%',
    // height: '45px'
  },
  signUpButton: {
    background: theme.palette.primary.main,
    marginBottom: '3%',
    marginTop: '3%',
    color: theme.palette.white,
    width: '100%',
    '&:hover': {
      background: theme.palette.primary.hover,
    },
  },
  addMyFriendButton: {
    background: theme.palette.primary.main,
    marginBottom: '8%',
    marginTop: '15%',
    color: theme.palette.white,
    width: '100%',
    '&:hover': {
      background: theme.palette.primary.hover,
    },
  },
});
const bankID = localStorage.getItem('bankId');
const mobile = localStorage.getItem('mobile');
const token = localStorage.getItem('customerLogged');

class ReportPage extends Component {
  // useInjectReducer({ key: 'contactPage', reducer });
  // useInjectSaga({ key: 'contactPage', saga });
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      sendMoneyPopup: false,
      bankname: '',
      sendMoneyWtW:[],
      sendMoneyNwtW:[],
    };
  }

  showSendMoneyPopup = () => {
    this.setState({ sendMoneyPopup: true });
  };
  closeSendMoneyPopup = () => {
    this.setState({ sendMoneyPopup: false });
  };
  getHistory = async() => {
    try{
      const res = await axios.post(`${API_URL}/user/getFailedTransactions`, {
        token: token,
        bank_id: bankID,
      });
      if (res.status == 200) {
        return ({
          sendMoneyWtW:res.data.transactions.filter(trans => (trans.txType === "Inter Bank Wallet To Wallet" || trans.txType === "Wallet To Wallet") && trans.state==="DONE"),
          sendMoneyNwtW:res.data.transactions.filter(trans => (trans.txType === "Inter Bank Non Wallet To Wallet" || trans.txType === "Non Wallet To Wallet") && trans.state==="DONE"),
          
        });
      }
    } catch (err){
      console.log(err);
    }
    
      
  };

  formatDate = date => {
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var isoformat = date;

    var readable = new Date(isoformat);
    var m = readable.getMonth(); // returns 6
    var d = readable.getDate(); // returns 15
    var y = readable.getFullYear();
    var h = readable.getHours();
    var mi = readable.getMinutes();
    var mlong = months[m];
    return (
      {
        date: d + ' ' + mlong + ' ' + y,
        time: h + ':' + mi,
      }
    )
  };
  fetchBanks = async () => {
    try {
      const res = await axios.get(`${API_URL}/user/getBanks`);
      if (res.status === 200) {
        console.log(res.data);
        const { username } = JSON.parse(localStorage.getItem('loggedUser'));
        const filterlogo = res.data.banks.filter((value) => {
          return value.username == username
        })
        if (filterlogo.length) {
          return filterlogo[0].name
        }
        return res;
      }
      return null;
    } catch (err) {
      // setLoading(false);
      console.log(err);
    }
  };

  componentDidMount= async() => {
    this.setState(
      {
        loading:true,
      }
    );
    const bank =await this.fetchBanks();
    const allHistory = await this.getHistory();
    console.log("jiji",allHistory.sendMoneyNwtW);
    console.log(mobile,bank);
    this.setState(
      {
        sendMoneyWtW: allHistory.sendMoneyWtW.reverse(),
        sendMoneyNwtW: allHistory.sendMoneyNwtW.reverse(),
        bankname: bank,
        loading:false,
      }
    );
    
  };

  render() {

    
    const { classes, notify } = this.props;
    if (this.state.loading === true) {
      return <Loader fullPage />;
    }
    return (
      <div>
        <Helmet>
          <title>Reports</title>
          <meta name="description" content="Description of ContactPage" />
        </Helmet>
        <MainHeader />
        {/* <Grid container style={{ background: '#fcfffc' }}> */}
        <Grid container style={{ background: '' }}>
          <Grid item md={3} sm={12} xs={12} style={{ margin: '3% 0 0 3%',backgroundColor:"" }}>
            <Grid
              className={classes.gridCardEwalletSendMoney}
              item
              md={12}
              sm={12}
              xs={12}
            >
               <CardEwalletSendMoneyPayBills notify={notify} /> 
            </Grid>
            <br/>
            <Grid
              className={classes.gridCardDownloadApp}
              item
              md={12}
              sm={12}
              xs={12}
            >
              <CardDownloadOurApp />
            </Grid>
          </Grid>
          <Grid item md={8} sm={12} xs={12} style={{margin: '3% 0 0 3%',backgroundColor:""}}>
          <Card style={{ marginTop: '37px' }}>
            <div>
                <h3 style={{color:"green"}}>Send Money</h3>
                <Table
                  marginTop="34px"
                  marginBottom="34px"
                  smallTd
                  textAlign="left"
                >
                  <TableHead>
                        <TableRow><TableCell>Date</TableCell><TableCell>Transaction ID</TableCell> <TableCell>Description</TableCell><TableCell>Transaction Type</TableCell><TableCell>Transaction Status</TableCell><TableCell>Debit</TableCell><TableCell>Credit</TableCell></TableRow>
                  </TableHead>
                      <tbody>
                      {this.state.sendMoneyWtW.length > 0
                          ? this.state.sendMoneyWtW.map( (b,i) => {
                            var fulldate = this.formatDate(b.createdAt);
                            return (
                            <tr key={i} >
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">{fulldate.date}</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">{b.childTx[0].transaction.master_code}</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">
                                  {b.childTx[0].transaction.from_name} to {b.childTx[0].transaction.to_name}
                                </div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">Cash to Cash</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">Completed</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">-</div>
                              </td>
                              <td style={{textAlign:"center"}}> 
                                <div className="labelGrey">XOF {b.childTx[0].transaction.amount}</div>
                              </td>
                            </tr>
                            )
                          })
                          : null
                        }
                    </tbody>
                </Table>
            </div>
            </Card>
            
          {/* <Card style={{ marginTop: '50px' }}>
            <div>
                <h3 style={{color:"green"}}>Revieved Money</h3>
                <Table
                  marginTop="34px"
                  marginBottom="34px"
                  smallTd
                  textAlign="left"
                >
                  <thead>
                        <tr><th>Date</th><th>Transaction ID</th> <th>Description</th><th>Transaction Type</th><th>Transaction Status</th><th>Debit</th><th>Credit</th></tr>
                      </thead>
                      <tbody>
                      {this.state.sendMoneyNwtW.length > 0
                          ? this.state.sendMoneyNwtW.map( (b,i) => {
                            var fulldate = this.formatDate(b.createdAt);
                            var child = b.childTx.filter(c=>c.transaction.to === `${mobile}@${this.state.bankname}`);
                            return (
                            <tr key={i} >
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">{fulldate.date}</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">{child[0].transaction.master_code}</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">
                                  Transfered From {child[0].transaction.from_name} to {child[0].transaction.to_name}
                                </div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">Cash to Cash</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">Completed</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">XOF {child[0].transaction.amount}</div>
                              </td>
                              <td style={{textAlign:"center"}}> 
                                <div className="labelGrey">-</div>
                              </td>
                            </tr>
                            )
                          })
                          : null
                        }
                    </tbody>
                </Table>
            </div>
            </Card>
           */}
          </Grid>
        </Grid>
        </div>
    );
    }
}

export default withStyles(styles)(ReportPage);
