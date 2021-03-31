/**
 *
 * BillPaymentsPage
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectBillPaymentsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import MerchantList from './MerchantList';
import Icon from '@material-ui/core/Icon';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import Button from 'components/Button';
import history from 'utils/history';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ActionBar from 'components/ActionBar';
import Loader from 'components/Loader';
import Footer from 'components/Footer';
import axios from 'axios';
import MainHeader from '../MainHeader';
import { API_URL, STATIC_URL, CURRENCY } from 'containers/App/constants';
import CardEwalletSendMoneyPayBills from 'components/CardEwalletSendMoneyPayBills';
import CardDownloadOurApp from 'components/CardDownloadOurApp';
import AddMerchantPopup from './AddMerchantPopup';

const styles = theme => ({
  gridCardEwalletSendMoney: {
    margin: '3% 2% 0% 2%',
    borderRadius: '4px',
    // border: '1px solid grey',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
      // maxWidth: '62%',
      // margin: '0 auto'
      // width: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '4% 5%',
      // maxWidth: '100%',
      // margin: '0 auto'
    },
  },
  gridMerchantDetailsBillsList: {
    margin: '0 auto',
    borderRadius: '4px',
    paddingTop: '5%',
    // border: '1px solid grey',
    [theme.breakpoints.down('sm')]: {
      margin: '3% 3%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '4% 5%',
    },
  },
  amountReceivedMessage: {
    background: 'white',
    boxShadow: '0 4px 9px 0 rgba(0, 0, 0, 0.02)',
    padding: '2%',
    borderRadius: '7px',
    border: '1px solid #cbd2d6',

    // border: '1px solid grey',
    marginBottom: '1%',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '3%',
      // width: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '3%',
    },
  },
  table: {
    minWidth: 700,
    background: 'white',
  },
  recentActivitiesTable: {
    margin: '0 auto',
    borderRadius: '4px',
    background: 'white',
    borderRadius: '7px',
    boxShadow: '0 4px 9px 0 rgba(0, 0, 0, 0.02)',
    [theme.breakpoints.down('sm')]: {
      margin: '3% 3%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '4% 5%',
    },
  },
  gridCardDownloadOurApp: {
    margin: '8% 2% 0% 2%',
    borderRadius: '4px',
    [theme.breakpoints.down('sm')]: {
      margin: '3% 3%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '4% 5%',
    },
  },
  listOfMerchantsContainer: {
    background: 'white',
    boxShadow: '0 4px 9px 0 rgba(0, 0, 0, 0.02)',
    padding: '2%',
    borderRadius: '7px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',

    marginBottom: '1%',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '3%',
      // width: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '3%',
      padding: '4%',
    },
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}


class BillPaymentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewBillPopup: false,
      popup: false,
      loading: false,
      bankLogo: JSON.parse(localStorage.getItem('bank')).logo,
      bankName: JSON.parse(localStorage.getItem('bank')).name,
      dataMerchantList: [],
      searchdataMerchantList: [],
      merchantStats:[],
    };
  }
  // useInjectReducer({ key: 'billPaymentsPage', reducer });
  // useInjectSaga({ key: 'billPaymentsPage', saga });
 

  getAllMerchants = async() => {
    try {
      const res = await axios.get(`${API_URL}/user/listMerchants`);
      if (res.data.status === 1){
        return ({result:res.data.list })
      } else {
        this.props.notify(res.data.message, 'error');
      }
    }catch (err){
      this.props.notify(err, 'error');
    }
  };

  getAddedMerchants = async() => {
    try {
      const res = await axios.get(`${API_URL}/user/listAddedMerchants`);
      if (res.data.status === 1){
        return ({result:res.data.list, loading:false })
      } else {
        this.props.notify(res.data.message, 'error');
      }
    }catch (err){
      this.props.notify(err, 'error');
    }
  };

  getMerchantStats = async(id) => {
    try {
      const res = await axios.post(`${API_URL}/user/getMerchantStats`,{merchant_id:id});
      if (res.data.status === 1){
        return ({result:res.data })
      } else {
        this.props.notify(res.data.message, 'error');
      }
    }catch (err){
      this.props.notify(err, 'error');
    }
  };

  getStatsByMerchant = async(list) => {
    const statlist = list.map(async (item) => {
        const data = await this.getMerchantStats(item._id);
        return (data);
    })
    const result= await Promise.all(statlist);
    return({res:result, loading:false});
  };

  getData = async() => {
    this.setState({ 
      loading: true,
    });
    const allmerchants = await this.getAllMerchants();
    const mymerchants = await this.getAddedMerchants();
    const merchantstats = await this.getStatsByMerchant(mymerchants.result);
    console.log(merchantstats);
    this.setState({ 
      searchdataMerchantList: allmerchants.result,
      dataMerchantList: mymerchants.result,
      merchantStats:merchantstats.res,
      loading: merchantstats.loading,
    });
  }

  componentWillMount = () => {
    this.getData();
  };

  openPopup = () => {
    this.setState({ popup: true });
  };

  closePopup = () => {
    this.setState({ popup: false });
  };


  render() {
    const { classes } = this.props;

    if (this.state.loading) {
      return <Loader fullPage />;
    }

    return (
      <div>
        <Helmet>
          <title>Bill Payments</title>
          <meta name="description" content="Description of BillPaymentsPage" />
        </Helmet>
        <MainHeader />
        <Grid container>
          <Grid item md={3} sm={12} xs={12} style={{ margin: '2% 0 0 4%' }}>
            <Grid
              item
              className={classes.gridCardEwalletSendMoney}
              md={12}
              sm={12}
              xs={12}
            >
              <CardEwalletSendMoneyPayBills />
            </Grid>
            <Grid
              className={classes.gridCardDownloadOurApp}
              item
              md={12}
              sm={12}
              xs={12}
            >
              <CardDownloadOurApp />
            </Grid>
          </Grid>

          <Grid item md={8} sm={12} xs={12}>
            <Grid
              className={classes.gridMerchantDetailsBillsList}
              item
              md={11}
              sm={12}
              xs={11}
            >
              {/* <CardEwalletSendMoneyPayBills /> */}
              {/* <Typography
                className={classes.amountReceivedMessage}
                variant="h5"
              >
                Merchant 1
                <Typography variant="subtitle2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </Typography>
              </Typography> */}
              <Grid container className={classes.listOfMerchantsContainer}
              item
              
              >
                <MerchantList notify={this.props.notify} />
              </Grid>
              <Grid
                item
                className={classes.gridCardEwalletSendMoney}
                md={12}
                sm={12}
                xs={6}
              >
                <div className={classes.recentActivitiesTable}>
                  {/* <a  href="/contact"> */}
                    
                  {/* </a>  */}
                  <Typography
                    style={{ margin: '0% 3% 0 3%', paddingTop: '2%' }}
                    variant="h5"
                  >
                      <span
                        style={{
                          backgroundColor:"green",
                          color:"white",
                          borderRadius:"50%",
                          width:'20px',
                          padding: '5px 5px 9px 5px',
                          marginRight:'8px',
                          marginTop:'8px',
                        }}>
                        <ListAltIcon
                        fontSize="large"
                      />
                      </span>
                    My Merchants
                    <Button
                      accentedOutline
                      style={{float:'right'}}
                      onClick={this.openPopup}
                    >
                        Add merchant
                    </Button>
                    {/* <Typography
                      style={{ color: 'grey', margin: '0% 0% 0% 9%' }}
                      variant="body1"
                    >
                      Pay your bills safely with us
                    </Typography> */}
                  </Typography>
                  <Table style={{marginTop:'30px'}} className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Logo</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Bills paid</TableCell>
                        <TableCell>Amount paid</TableCell>
                        <TableCell>Bills pending</TableCell>
                        <TableCell>Amount pending</TableCell>
                        <TableCell align="left">Action</TableCell>
                        {/* <TableCell align="left" /> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {console.log(
                          'this.state.dataMerchantList',
                          this.state.dataMerchantList,
                        )} */}

                      {/* {this.state.dataMerchantList.list != undefined ? this.state.dataMerchantList.list[0].name : "error"} */}
                      {this.state.dataMerchantList != undefined ? (
                        this.state.dataMerchantList.map((row, index) => (
                          <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                              <img
                                src={`${STATIC_URL}${row.logo}`}
                                style={{ width: '2rem', borderRadius: 20 }}
                              />
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {this.state.merchantStats[index].result.bill_paid}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {this.state.merchantStats[index].result.amount_paid}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {this.state.merchantStats[index].result.bill_pending}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {this.state.merchantStats[index].result.amount_pending}
                            </TableCell>

                            {/* <TableCell align="left">{row.mobile}</TableCell>
                            <TableCell align="left">{row.email}</TableCell> */}
                            <TableCell
                              style={{ color: '#417505', fontWeight: 600 }}
                              // onClick={() => this.showViewBillPopup(row._id)}
                              onClick={() =>
                                history.push({
                                  pathname: `/bill-list/${row._id}`,
                                })
                                //localStorage.setItem('merchant',row);
                              }
                              // align="right"
                            >
                              View
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                          <Grid container justify="center">
                            <Typography
                              variant="body1"
                              style={{ padding: '1rem', width: '100%' }}
                              align="center"
                            >
                              List of merchants will be displayed here...
                          </Typography>
                          </Grid>
                        )}
                    </TableBody>
                  </Table>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {this.state.popup ? (
           <AddMerchantPopup
              onClose={() => this.closePopup()}
              merchants={this.state.searchdataMerchantList}
              notify={this.props.notify}
           />
         ) : null}
        <Footer bankname={this.state.bankName} banklogo={this.state.bankLogo}/>
      </div>
     
    );
  }
}

// BillPaymentsPage.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//   billPaymentsPage: makeSelectBillPaymentsPage(),
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

export default withStyles(styles)(BillPaymentsPage);
