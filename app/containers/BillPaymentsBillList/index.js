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
import OtherBillPopup  from './OtherBillPopup'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import MainHeader from '../MainHeader';
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

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('2 November', 444444, 'Hatim', 'View Bill'),
  createData('2 November', 444444, 'Hatim', 'View Bill'),
  // createData('Eclair', 262, 16.0, 24, 6.0),
  // createData('Cupcake', 305, 3.7, 67, 4.3),
  // createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class BillPaymentsBillList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewBillPopup: false,
      notification: '',
      dataMerchantList: {},
      checkMerchantFee: {},
      invoiceDetails: {},
      filteredInvoice: {},
      payBillsPopup: false,
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
    const tempInvoice = this.state.invoiceDetails.invoices.filter(i => {
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

  payBill = _id => {
    axios
      .post(`${API_URL}/user/payInvoice`, {
        invoice_id: _id,
        amount: this.state.filteredInvoice.amount,
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

  componentWillMount = () => {
    const { id } = this.props.match.params;
    const { notify } = this.props.location;
    this.getParticularMerchantData(id);
    this.getInvoices();
  };

  getParticularMerchantData = id => {
    const method = '';
    axios
      .post(`${API_URL}/user/getMerchantDetails`, {
        merchant_id: id,
      })
      .then(res => {
        if (res.data.status === 1) {
          this.setState({ dataMerchantList: res.data.merchant });
        }
      })
      .catch(error => {});
  };

  getInvoices = () => {
    axios
      .post(`${API_URL}/user/getInvoices`)
      .then(res => {
        if (res.data.status === 1) {
          this.setState({ invoiceDetails: res.data });
        }
      })
      .catch(error => {});
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
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Mobile No.</TableCell>
                          <TableCell>Due Date</TableCell>

                          <TableCell>Bill No.</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell align="left" />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.invoiceDetails.invoices != undefined &&
                        this.state.invoiceDetails != null ? (
                          this.state.invoiceDetails.invoices.map(row => (
                            <TableRow key={row._id}>
                              <TableCell component="th" scope="row">
                                {/* {row.name} */}
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
                    <TableCell>Name</TableCell>
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
                onClick={() => this.payBill(this.state.filteredInvoice._id)}
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
        <OtherBillPopup
          close={() => this.onPayBillsPopupClose()}
          merchantid={this.props.match.params.id}
        />
      ) : (
        ''
      )}
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
