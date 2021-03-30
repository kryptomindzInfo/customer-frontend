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
import ListAltIcon from '@material-ui/icons/ListAlt';
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
import CustomButton from '../../components/Button';
import Popup from 'components/Popup';
import { Formik, useField, Form } from 'formik';
import { object, string, number, email, boolean } from 'yup';
import { API_URL, STATIC_URL, CURRENCY } from 'containers/App/constants';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CardEwalletSendMoneyPayBills from 'components/CardEwalletSendMoneyPayBills';
import CardDownloadOurApp from 'components/CardDownloadOurApp';
import PayBillPopup from './PayBillPopup';
import ConfirmPaymentPopup from './ConfirmPaymentPopup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import MainHeader from '../MainHeader';
import PayBillsInvoiceDetails from './PayBillsInvoiceDetails';
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
  active: {
    backgroundColor: '#f5a623',
    border: '1px solid #417505',
    marginBottom: '3%',
    marginTop: '3%',
    width: '100%',
    fontSize: '10px',
    color: "#ffffff",
    '&:hover': {
      backgroundColor: '#f5a623',
    },
  },
  inactive: {
    border: '1px solid #417505',
    backgroundColor: "#ffffff",
    fontSize: '10px',
    marginBottom: '3%',
    width: '100%',
    marginTop: '3%',
    color: '#417505',
    '&:hover': {
      backgroundColor: "#ffffff",
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
      paidInvoices: [],
      filteredInvoice: {},
      loading: false,
      payBillsPopup: false,
      toggleButton: "pending",
      confirmationPopup: false,
      feeList: [],
      penaltyList: [],
      selectedInvoices: [],
      filteredPenalty: "",
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

  handleView = (_id, penalty) => {
    const tempInvoice = this.state.invoiceDetails.filter(i => {
      if (i._id == _id) {
        return i;
      }
    });
    this.setState({ filteredInvoice: tempInvoice[0], filteredPenalty: penalty });

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
      .catch(error => { });

    // this.setState({ viewBillPopup: true });

    setTimeout(() => {
      this.setState({ viewBillPopup: true });
    }, 2000);

    // setTimeout = () => {
    //   this.setState({ viewBillPopup: true }), 3000;
    // };
  };

  onPayBillsPopupClose = () => {
    this.setState({ payBillsPopup: false });
  };

  showConfirmationPopup = _id => {
    this.setState({ confirmationPopup: true });
  };

  onConfirmationPopupClose = () => {
    this.setState({ confirmationPopup: false });
  };

  payBill = (ids) => {
    const { id } = this.props.match.params;
    let API = '';
    if (this.state.dataMerchantList.bank_id === bankID) {
      API = 'user/payInvoice';
    } else {
      API = 'user/interBank/payInvoice';
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

  getParticularMerchantData = async (id) => {
    try {
      const res = await axios.post(`${API_URL}/user/getMerchantDetails`, {
        merchant_id: id,
      });
      console.log(res);
      if (res.status === 200) {
        if (res.data.status === 0) {
          return { list: [] };
        } else {
          return {
            list: res.data.invoices.filter(i => i.paid === 0),
            paidlist: res.data.invoices.filter(i => i.paid === 1),
            merchant: res.data.merchant,
          };
        }
      }
    } catch (err) {
      return { list: [] };
    }
  };

  getPenaltyRule = async (id) => {
    try {
      const res = await axios.post(`${API_URL}/user/getMerchantPenaltyRule`, {
        merchant_id: id,
      });
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
      toast.error('Something went wrong');
      return { rule: {}, loading: false };
    }
  };

  calculatePenalty = async (rule, list) => {
    const penaltylist = list.map(async invoice => {
      if (invoice.amount < 0) {
        return (0);
      }
      const datesplit = invoice.due_date.split("/");
      const dueDate = new Date(datesplit[2], datesplit[1] - 1, datesplit[0]);
      if (currentDate <= dueDate) {
        return (0);
      } else {
        // To calculate the time difference of two dates 
        var Difference_In_Time = currentDate.getTime() - dueDate.getTime(); 
        // To calculate the no. of days between two dates 
        var Difference_In_Days = Math.trunc(Difference_In_Time / (1000 * 3600 * 24));    
        return ((rule.fixed_amount + (invoice.amount*rule.percentage)/100)*Difference_In_Days.toFixed(2));
      }
    });
    const result = await Promise.all(penaltylist);
    return (result);
  }

  getFeeList = async (res, penaltylist) => {
    if (res.length > 0) {
      const feelist = res.map(async (invoice, index) => {
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
      const result = await Promise.all(feelist);
      return { loading: false, result: result };
    }
  };

  togglePaidInvoice = async () => {
    if (this.state.toggleButton !== 'paid') {
      await  this.setState({ toggleButton: 'paid' });;
    }
  };

  togglePendingInvoice = async () => {
    if (this.state.toggleButton !== 'pending') {
      await  this.setState({ toggleButton: 'pending' });;
    }
  };

  componentWillMount = async() => {
    const { id } = this.props.match.params;
    const { notify } = this.props.location;
    this.setState({ loading: true });
    const res1= await this.getPenaltyRule(id);
    const res2= await this.getParticularMerchantData(id);
    this.setState({ invoiceDetails: res2.list });
    this.setState({ dataMerchantList: res2.merchant });
    this.setState({ paidInvoices: res2.paidlist });
    if (res2.list.length > 0){
      const res3 = await this.calculatePenalty(res1.rule,res2.list);
      this.setState({ penaltyList: res3 });
      const res4 = await this.getFeeList(res2.list,res3);
      this.setState({ feeList: res4.result });
      this.setState({ loading: res4.loading });
    } else {
      this.setState({ loading: false });
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
    if (e.target.checked) {
      if (invoice.has_counter_invoice === true) {
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
        this.setState({ buttonLoading: false });
      }
    } else {
      if (invoice.has_counter_invoice === true) {
        const counterInvoice = this.state.invoiceDetails.filter((val) => val.number === `${invoice.number}C`);
        const data = await this.checkFee({
          merchant_id: invoice.merchant_id,
          amount: this.state.totalAmount - invoice.amount - counterInvoice[0].amount - this.state.penaltyList[index],
        });
        this.setState({ totalFee: data.fee });
        const updatedList = this.state.selectedInvoices.filter((val) => val.id !== invoice._id && val.id !== counterInvoice[0]._id);
        this.setState({ selectedInvoices: updatedList });
        const updatedTotalAmount = this.state.totalAmount - invoice.amount - counterInvoice[0].amount - this.state.penaltyList[index];
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
        const updatedTotalAmount = this.state.totalAmount - invoice.amount - this.state.penaltyList[index];
        this.setState({ totalAmount: updatedTotalAmount });
        this.setState({ buttonLoading: false });
      }
    }
  };

  getPendingInvoices = () => 
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
      {/* <TableCell component="th" scope="row">
        {row.mobile ? row.mobile : '-'}
      </TableCell> */}
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
        {this.state.penaltyList[index].toFixed(2) }
      </TableCell>
      <TableCell component="th" scope="row">
        {/* {row.amount} */}
        {this.state.feeList[index] > 0 ? this.state.feeList[index].toFixed(2) : 'NA' }
      </TableCell>
      <TableCell component="th" scope="row">
        {/* {row.amount} */}
        {this.state.feeList[index]+row.amount+this.state.penaltyList[index] > 0 ? (this.state.feeList[index]+row.amount+this.state.penaltyList[index]).toFixed(2) : 'NA'}
      </TableCell>

      <TableCell
        style={{ color: '#417505', fontWeight: 600 }}
        onClick={() => this.handleView(row._id,this.state.penaltyList[index])}
        align="right"
      >
        View
      </TableCell>
    </TableRow>
  ));

  getPaidInvoices = () => 
    this.state.paidInvoices.map((row, index) => (
      <TableRow key={row._id}>
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
        {row.penalty ? row.penalty : '-'}
      </TableCell>
    </TableRow>
  ));
  

  getInvoiceItems = invoice => {
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
      return <Loader fullPage />;
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
              <Typography
                className={classes.amountReceivedMessage}
                variant="h4"
              >
                <img
                  src={`${STATIC_URL}${this.state.dataMerchantList.logo}`}
                  style={{ width: '4rem', borderRadius: 20 }}
                />
                <span style={{ marginLeft: "2%" }}>{this.state.dataMerchantList.name}</span>

                <Typography style={{ paddingTop: 5,marginTop: 12 }} variant="subtitle2">
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
                    Bills List
                    <Row style={{marginTop:'12px'}}>
                      <Col cW="20%">
                        <Button
                          className={this.state.toggleButton === 'pending' ? classes.active : classes.inactive}
                          onClick={this.togglePendingInvoice}
                          marginRight="5px"
                          padding="5px"
                        >
                          Pending Invoices
                        </Button>
                      </Col>
                      <Col cW="20%">
                        <Button
                          className={this.state.toggleButton === 'paid' ? classes.active : classes.inactive}
                          onClick={this.togglePaidInvoice}
                          marginLeft="20px"
                        >
                          Paid Invoices
                        </Button>
                      </Col>
                      <Col cW="60%"></Col>
                    </Row>
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
                    <Table className={classes.table}>
                      {this.state.toggleButton === 'pending' ? (
                         <TableHead>
                         <TableRow>
                           <TableCell></TableCell>
                           <TableCell>Name</TableCell>
                           {/* <TableCell>Mobile No.</TableCell> */}
                           <TableCell>Due Date</TableCell>
                           <TableCell>Bill No.</TableCell>
                           <TableCell>Amount</TableCell>
                           <TableCell>Penalty</TableCell>
                           <TableCell>Fees</TableCell>
                           <TableCell>Total Amount</TableCell>
                           <TableCell align="left" />
                         </TableRow>
                       </TableHead>
                      ):(
                        <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Mobile No.</TableCell>
                          <TableCell>Due Date</TableCell>
                          <TableCell>Bill No.</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Penalty</TableCell>
                        </TableRow>
                      </TableHead>
                      )}
                      {this.state.toggleButton === 'pending' ? (
                      <TableBody>
                        {this.state.invoiceDetails != undefined &&
                        this.state.invoiceDetails != null ? (
                          this.getPendingInvoices()
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
                      ):(
                        <TableBody>
                        {this.state.paidInvoices != undefined &&
                          this.state.paidInvoices != null ? (
                            this.getPaidInvoices()
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
                      )}
                    </Table>
                  )}
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
                          `Collect Amount ${this.state.totalAmount.toFixed(2)} + Fee ${this.state.totalFee.toFixed(2)} = Total ${(this.state.totalAmount + this.state.totalFee).toFixed(2)} and Pay Bill`
                        )}
                      </Button>
                    ):null}
                  <Button
                    onClick={() => {
                      this.setState({ payBillsPopup: true });
                    }}
                    className={classes.signUpButton}
                    style={{ width: '20%' }}
                  >
                    Pay Other Bill
                  </Button>
                </div>
              </Grid>
            </Grid>
            </Grid>
          </Grid>
        {this.state.viewBillPopup ? (
          <Popup accentedH1 bigBody close={this.closeViewBillPopup}>
            <PayBillsInvoiceDetails
              merchantId={this.state.filteredInvoice.merchant_id}
              showOTPPopup={values => {
                this.payBill(values);
              }}
              penalty={this.state.filteredPenalty}
              close={this.closeViewBillPopup}
              invoice={this.state.filteredInvoice}
              merchant={this.state.dataMerchantList}
            />
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
        ) : null}
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
