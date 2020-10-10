/**
 *
 * BillPaymentsBillList
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import history from 'utils/history';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ActionBar from 'components/ActionBar';
import Loader from '../../components/Loader';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Popup from 'components/Popup';
import { Formik, useField, Form } from 'formik';
import { object, string, number, email, boolean } from 'yup';
import { API_URL, STATIC_URL, CURRENCY } from 'containers/App/constants';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CardEwalletSendMoneyPayBills from 'components/CardEwalletSendMoneyPayBills';
import CardDownloadOurApp from 'components/CardDownloadOurApp';
import PayBillPopup  from './PayBillPopup';
import ConfirmPaymentPopup from './ConfirmPaymentPopup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import MainHeader from '../MainHeader';
import FormGroup from '../../components/FormGroup';
import Col from '../../components/Col';
import Row from '../../components/Row';
import makeSelectBillPaymentsBillList from './selectors';
toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

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
    wordBreak: 'initial',
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
    width: '88%',
    '&:hover': {
      background: theme.palette.primary.hover,
    },
    // paddingBottom: 0
  },
});
const currentDate = new Date();
const bankID = localStorage.getItem('bankId');

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

class BillPaymentsBillList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewBillPopup: false,
      notification: '',
      dataMerchantList: {},
      checkMerchantFee: {},
      invoiceDetails: [],
      filteredInvoice: {},
      loading: false,
      payBillsPopup: false,
      confirmationPopup: false,
      feeList: [],
      penaltyList: [],
      selectedInvoices: [],
      totalAmount: 0,
      totalFee: 0,
      buttonLoading: false,
    };
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.warn = this.warn.bind(this);

    // this.closePopup = this.closePopup.bind(this);
  }

  success = () => toast.success(this.state.notification);

  error = () => toast.error(this.state.notification);

  warn = () => toast.warn(this.state.notification);

  handleView = _id => {
    const tempInvoice = this.state.invoiceDetails.filter(i => {
      if (i._id == _id) {
        return i;
      }
    });
    this.setState({ filteredInvoice: tempInvoice[0] });

    axios
      .post(`${API_URL}/user/checkMerchantFee`, {
        merchant_id: tempInvoice[0].merchant_id,
        amount: tempInvoice[0].amount,
      })
      .then(res => {
        if (res.data.status === 1) {
          this.setState({ checkMerchantFee: res.data });
        }
      })
      .catch(error => {});

    // this.setState({ viewBillPopup: true });

    setTimeout(() => {
      this.setState({ viewBillPopup: true });
    }, 2000);

    // setTimeout = () => {
    //   this.setState({ viewBillPopup: true }), 3000;
    // };
  };

  onPayBillsPopupClose = () => {
    this.setState({payBillsPopup:false });
  };

  showConfirmationPopup = _id => {
    this.setState({ confirmationPopup: true });
  };

  onConfirmationPopupClose = () => {
    this.setState({confirmationPopup: false });
  };

  payBill = (ids) => {
    const { id } = this.props.match.params;
    let API = '';
    console.log(this.state.dataMerchantList.bank_id,bankID);
    if (this.state.dataMerchantList.bank_id === bankID) {
      API = '/user/payInvoice';
    } else {
      API = '/user/interBank/payInvoice';
    }
    axios
      .post(`${API_URL}/${API}`, {
        invoices: ids,
        merchant_id: id,
      })
      .then(res => {
        this.setState({ notification: res.data.message });

        if (res.data.status === 1) {
          history.push('/dashboard');
          this.success();
        } else {
          this.error();
        }
      })
      .catch(error => {
        console.log(error);
      });

    this.setState({ viewBillPopup: false });
  };

  showViewBillPopup = _id => {
    this.setState({ viewBillPopup: true });
  };

  closeViewBillPopup = () => {
    this.setState({ viewBillPopup: false });
  };

  getParticularMerchantData = async(id) => {
    try {
      const res = await axios.post(`${API_URL}/user/getMerchantDetails`, {
        merchant_id: id,
      });
      if (res.status === 200) {
        if (res.data.status === 0) {
          return {list: []};
        } else {
          return {list: res.data.invoices.filter(i => i.paid === 0), merchant: res.data.merchant};
        }
      }
    } catch (err) {
      return {list: []};
    }
  };

  getPenaltyRule = async (id) => {
    try {
      const res = await axios.post(`${API_URL}/user/getMerchantPenaltyRule`, {
        merchant_id: id,
      });
      console.log(res);
      if (res.status === 200) {
        if (res.data.status === 0) {
          toast.error(res.data.message);
          return { rule: {}, loading: false };
        }
        return { rule: res.data.rule, loading: false };
      }
      toast.error(res.data.message);
      return { rule: {}, loading: false };
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
      return { rule: {}, loading: false };
    }
  };

  calculatePenalty = async(rule,list) => {
    const penaltylist = list.map(async invoice => {
      if (invoice.amount < 0) {
        return (0);
      }
      const datesplit = invoice.due_date.split("/");
      const dueDate = new Date(datesplit[0],datesplit[1],datesplit[2]);
      if (currentDate <= dueDate) {
        return (0);
    } else {
      if(rule.type === 'once') {
        return (rule.fixed_amount + (invoice.amount*rule.percentage)/100);
      } else {
        // To calculate the time difference of two dates 
        var Difference_In_Time = currentDate.getTime() - dueDate.getTime(); 
        // To calculate the no. of days between two dates 
        var Difference_In_Days = Math.trunc(Difference_In_Time / (1000 * 3600 * 24)); 
        console.log(currentDate,dueDate,Difference_In_Days);     
        return ((rule.fixed_amount + (invoice.amount*rule.percentage)/100)*Difference_In_Days.toFixed(2));
      }
    }
  });
  const result= await Promise.all(penaltylist);
  return(result);
  }

  getFeeList = async(res, penaltylist) => {
    if (res.length>0) {
      const feelist = res.map(async (invoice,index) => {
        if (invoice.amount < 0) {
          const data = await this.checkFee({
            merchant_id: invoice.merchant_id,
            amount: invoice.amount * -1,
          });
          return (-data.fee);
        } else {
          const data = await this.checkFee({
            merchant_id: invoice.merchant_id,
            amount: invoice.amount + penaltylist[index],
          });
          return (data.fee);
        }
      })
      const result= await Promise.all(feelist);
      return {loading: false, result: result};
    }
  };

  componentWillMount = async() => {
    const { id } = this.props.match.params;
    const { notify } = this.props.location;
    this.setState({ loading: true });
    const res1= await this.getPenaltyRule(id);
    console.log(res1);
    const res2= await this.getParticularMerchantData(id);
    console.log(res2);
    this.setState({ invoiceDetails: res2.list });
    this.setState({ dataMerchantList: res2.merchant });
    console.log(res2);
    if (res2.list.length > 0){
      const res3 = await this.calculatePenalty(res1.rule,res2.list);
      this.setState({ penaltyList: res3 });
      console.log(res3);
      const res4 = await this.getFeeList(res2.list,res3);
      this.setState({ feeList: res4.result });
      this.setState({ loading: res4.loading });
    } else {
      this.setState({ loading: false});
    }
  };

  checkFee = async payload => {
    try {
      const res = await axios.post(`${API_URL}/user/checkMerchantFee`, {
        ...payload,
      });
      if (res.status === 200) {
        if (res.data.status === 0) {
          toast.error(res.data.message);
          return { fee: {}, loading: false };
        }
        return { fee: res.data.fee, loading: false };
      }
      toast.error(res.data.message);
      return { fee: {}, loading: false };
    } catch (err) {
      toast.error('Something went wrong');
      return { fee: {}, loading: false };
    }
  };

  handleCheckboxClick = async (e, invoice, index) => {
    this.setState({ buttonLoading: true });
    if(e.target.checked) {
      if(invoice.has_counter_invoice === true){
        const counterInvoice = this.state.invoiceDetails.filter((val) => val.number === `${invoice.number}C`);
        const data = await this.checkFee({
          merchant_id: invoice.merchant_id,
          amount: this.state.totalAmount + invoice.amount + counterInvoice[0].amount + this.state.penaltyList[index],
        });
        const obj1 = {
          id: invoice._id,
          penalty: this.state.penaltyList[index],
        }
        const obj2 = {
          id: counterInvoice[0]._id,
          penalty: 0,
        }
        const updatedTotalAmount = this.state.totalAmount + invoice.amount + counterInvoice[0].amount + this.state.penaltyList[index];
        this.setState({ totalAmount: updatedTotalAmount });
        this.setState({ totalFee: data.fee });
        const updatedList = [...this.state.selectedInvoices];
        updatedList.push(obj1);
        updatedList.push(obj2);
        this.setState({selectedInvoices: updatedList});
        console.log(this.state.selectedInvoices);
        this.setState({ buttonLoading: false });
      } else {
        const data = await this.checkFee({
          merchant_id: invoice.merchant_id,
          amount: this.state.totalAmount + invoice.amount + this.state.penaltyList[index],
        });
        const updatedTotalAmount = this.state.totalAmount + invoice.amount + this.state.penaltyList[index];
        this.setState({ totalAmount: updatedTotalAmount });
        this.setState({ totalFee: data.fee });
        const obj1 = {
          id: invoice._id,
          penalty: this.state.penaltyList[index],
        }
        const updatedList = [...this.state.selectedInvoices];
        updatedList.push(obj1);
        this.setState({selectedInvoices: updatedList});
        console.log(this.state.selectedInvoices);
        this.setState({ buttonLoading: false });
      }
    } else {
      if(invoice.has_counter_invoice === true) {
        const counterInvoice = this.state.invoiceDetails.filter((val) => val.number === `${invoice.number}C`);
        const data = await this.checkFee({
          merchant_id: invoice.merchant_id,
          amount: this.state.totalAmount - invoice.amount - counterInvoice[0].amount - this.state.penaltyList[index],
        });
        this.setState({ totalFee: data.fee });
        const updatedList = this.state.selectedInvoices.filter((val) => val.id !== invoice._id  &&  val.id !== counterInvoice[0]._id);
        this.setState({selectedInvoices: updatedList });
        const updatedTotalAmount = this.state.totalAmount - invoice.amount - counterInvoice[0].amount - this.state.penaltyList[index];
        console.log(this.state.selectedInvoices);
        this.setState({ totalAmount: updatedTotalAmount });
        this.setState({ buttonLoading: false });
      } else {
        const data = await this.checkFee({
          merchant_id: invoice.merchant_id,
          amount: this.state.totalAmount - invoice.amount - this.state.penaltyList[index],
        });
        this.setState({ totalFee: data.fee });
        const updatedList = this.state.selectedInvoices.filter((val) => val.id !== invoice._id);
        this.setState({selectedInvoices: updatedList });
        console.log(this.state.selectedInvoices);
        const updatedTotalAmount = this.state.totalAmount - invoice.amount - this.state.penaltyList[index];
        this.setState({ totalAmount: updatedTotalAmount });
        this.setState({ buttonLoading: false });
      }
    }
  };

  getInvoiceItems = invoice => {
    console.log(invoice);
    invoice.items.map(item => (
      <TableRow key={item._id}>
        <TableCell component="th" scope="row">
          {item.item_desc.name}
        </TableCell>
        <TableCell component="th" scope="row">
          {item.item_desc.code}
        </TableCell>
        <TableCell component="th" scope="row">
          {item.item_desc.denomination}
        </TableCell>
        <TableCell component="th" scope="row">
          {item.item_desc.unit_of_measure}
        </TableCell>
        <TableCell component="th" scope="row">
          {item.item_desc.unit_price}
        </TableCell>
      </TableRow>
    ));
  };

  render() {
    const { classes } = this.props;

    if (this.state.dataMerchantList === undefined) {
      return console.log('loading');
    }

    if (this.state.loading === true) {
      return <Loader fullPage/>;
    }

    return (
      <div>
        <Helmet>
          <title>Bill List</title>
          <meta
            name="description"
            content="Description of BillPaymentsBillList"
          />
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
              <Typography
                className={classes.amountReceivedMessage}
                variant="h5"
              >
                {this.state.dataMerchantList.name}

                <Typography style={{ paddingTop: 5 }} variant="subtitle2">
                  {this.state.dataMerchantList.description}
                </Typography>
              </Typography>
              <Grid
                item
                className={classes.gridCardEwalletSendMoney}
                md={12}
                sm={12}
                xs={6}
              >
                <div className={classes.recentActivitiesTable}>
                  <Typography
                    style={{ margin: '0% 3% 0 3%', paddingTop: '2%' }}
                    variant="h5"
                  >
                    Bills List
                    <Typography
                      style={{ color: 'grey', margin: '0% 0% 1% 1%' }}
                      variant="body1"
                    >
                      {/* Pay bills safely */}
                    </Typography>
                  </Typography>

                  {this.state.dataMerchantList != undefined &&
                  this.state.dataMerchantList == null ? (
                    <Typography
                      style={{ color: 'grey', margin: '0% 0% 1% 1%' }}
                      variant="body1"
                    >
                      No details present
                    </Typography>
                  ) : (
                    <div>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Mobile No.</TableCell>
                          <TableCell>Due Date</TableCell>
                          <TableCell>Bill No.</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Penalty</TableCell>
                          <TableCell>Fees</TableCell>
                          <TableCell>Amount with Fees</TableCell>
                          <TableCell align="left" />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.invoiceDetails != undefined &&
                        this.state.invoiceDetails != null ? (
                          this.state.invoiceDetails.map((row, index) => (
                              <TableRow key={row._id}>
                              <TableCell component="th" scope="row">
                                {row.is_counter ? (
                                  <div>
                                    {this.state.selectedInvoices.map(a => a.id).includes(row._id) ? (
                                      <FormGroup>
                                        <input
                                          type="checkbox"
                                          checked
                                          value={row._id}>
                                        </input>
                                      </FormGroup>
                                    ) : (
                                      <FormGroup>
                                        <input
                                          type="checkbox"
                                          disabled
                                          value={row._id}>
                                        </input>
                                      </FormGroup>
                                    )}
                                  </div>
                                ) : (
                                  <FormGroup onChange={(e) => this.handleCheckboxClick(e, row, index)}>
                                    <input
                                      type="checkbox"
                                      value={row._id}>
                                    </input>
                                  </FormGroup>
                                )}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row.name ? row.name : '-'}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row.mobile ? row.mobile : '-'}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row.due_date ? row.due_date : '-'}
                                {/* {row.bill_date} */}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {/* {row.number} */}

                                {row.number ? row.number : '-'}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {/* {row.amount} */}
                                {row.amount ? row.amount : '-'}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {/* {row.amount} */}
                                {this.state.penaltyList[index] }
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {/* {row.amount} */}
                                {this.state.feeList[index] > 0 ? this.state.feeList[index] : 'NA' }
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {/* {row.amount} */}
                                {this.state.feeList[index]+row.amount+this.state.penaltyList[index] > 0 ? this.state.feeList[index]+row.amount+this.state.penaltyList[index] : 'NA'}
                              </TableCell>

                              <TableCell
                                style={{ color: '#417505', fontWeight: 600 }}
                                onClick={() => this.handleView(row._id)}
                                align="right"
                              >
                                View
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <Typography
                            variant="body1"
                            style={{ padding: '1rem', width: '100%' }}
                            align="center"
                          >
                            Invoice details will be displayed here...
                          </Typography>
                        )}
                      </TableBody>
                    </Table>
                    {this.state.totalAmount > 0 ? (
                      <Button
                        // onClick={() => this.payBill(this.state.selectedInvoices)}
                        onClick={() => this.showConfirmationPopup()}
                        className={classes.signUpButton}
                        style={{width:'100%'}}
                      >
                        {this.state.buttonLoading ? (
                          <Loader />
                        ) : (
                          `Collect Amount ${this.state.totalAmount} + Fee ${this.state.totalFee} = Total ${this.state.totalAmount+this.state.totalFee} and Pay Bill`
                        )}
                      </Button>
                    ) : (
                      null
                    )}
                  </div>
                  )}
                    <Button 
                      onClick={() => {
                        this.setState({payBillsPopup:true});
                      }}
                      className={classes.signUpButton}
                      style={{width:'20%'}}
                    >
                      Pay Other Bill
                    </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {this.state.viewBillPopup ? (
          <Popup bigBody close={this.closeViewBillPopup.bind(this)}>
            <div
              style={{
                // color: 'black',
                textAlign: 'center',
                fontSize: '1.5rem',
                paddingBottom: '1rem',
              }}
            >
              Pay Bill
            </div>
            <div>
              <Grid container style={{ padding: '2rem' }}>
                <Grid item xs={2}>
                  <Typography align="left">Invoice No.</Typography>
                  <Typography align="left">Name</Typography>
                  <Typography align="left">Mobile</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography color="primary" align="left">
                    {this.state.filteredInvoice.number
                      ? this.state.filteredInvoice.number
                      : '-'}
                  </Typography>
                  <Typography color="primary" align="left">
                    {this.state.filteredInvoice.name
                      ? this.state.filteredInvoice.name
                      : '-'}
                  </Typography>
                  <Typography color="primary" align="left">
                    {this.state.filteredInvoice.mobile
                      ? this.state.filteredInvoice.mobile
                      : '-'}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="left">Due Date</Typography>
                  <Typography align="left">Bill Date</Typography>
                  <Typography align="left">Bill Period</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography color="primary" align="left">
                    {this.state.filteredInvoice.due_date
                      ? this.state.filteredInvoice.due_date
                      : '-'}
                  </Typography>
                  <Typography color="primary" align="left">
                    {this.state.filteredInvoice.bill_date
                      ? this.state.filteredInvoice.bill_date
                      : '-'}
                  </Typography>
                  <Typography color="primary" align="left">
                    {this.state.filteredInvoice.bill_period
                      ? this.state.filteredInvoice.bill_period.period_name
                      : '-'}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="left">Amount</Typography>
                  <Typography align="left">fee</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography color="primary" align="left">
                    {this.state.filteredInvoice.amount
                      ? this.state.filteredInvoice.amount
                      : '-'}
                  </Typography>
                  <Typography color="primary" align="left">
                    {this.state.checkMerchantFee.fee
                      ? this.state.checkMerchantFee.fee
                      : '-'}
                  </Typography>
                </Grid>
              </Grid>
              <Table marginTop="34px" smallTd>
                <TableHead>
                  <TableRow>
                    <TableCell>{`  `}Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Denomination</TableCell>
                    <TableCell>Unit of measure</TableCell>
                    <TableCell>Unit price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.filteredInvoice &&
                  this.state.filteredInvoice.items.length > 0
                    ? this.state.filteredInvoice.items.map(item => (
                        <TableRow key={item._id}>
                        <TableCell component="th" scope="row">
                          {item.item_desc.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item.item_desc.description}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {item.item_desc.denomination}
                        </TableCell>
                          <TableCell component="th" scope="row">
                          {item.item_desc.unit_of_measure}
                          </TableCell>
                        <TableCell component="th" scope="row">
                            {item.item_desc.unit_price}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item.quantity}
                          </TableCell>
                        <TableCell component="th" scope="row">
                            {item.total_amount}
                        </TableCell>
                        </TableRow>
                    ))
                    : null}
                </TableBody>
              </Table>
            </div>
              {this.state.filteredInvoice.amount &&
              this.state.checkMerchantFee.fee
                ? (<Button
                variant="contained"
                type="submit"
                onClick={() => this.payBill([this.state.filteredInvoice._id])}
                // disabled={isSubmitting}
                className={classes.signUpButton}
              >
                Pay XOF{' '}
                    { this.state.checkMerchantFee.fee +
                    this.state.filteredInvoice.amount}
              </Button>
                ): <h5>Can't process transaction right now </h5>}

          </Popup>
        ) : null}
        {this.state.payBillsPopup ? (
          <PayBillPopup
            close={() => this.onPayBillsPopupClose()}
            merchant={this.state.dataMerchantList}
          />
        ) : (
        ''
        )}
        {this.state.confirmationPopup ? (
          <ConfirmPaymentPopup
            close={() => this.onConfirmationPopupClose()}
            pay={() => this.payBill(this.state.selectedInvoices)}
          />
        ):null}
      </div>
    );
  }
}

BillPaymentsBillList.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  billPaymentsBillList: makeSelectBillPaymentsBillList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withStyles(styles)(BillPaymentsBillList));
