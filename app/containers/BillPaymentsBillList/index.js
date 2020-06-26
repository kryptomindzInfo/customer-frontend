/**
 *
 * BillPaymentsBillList
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
import makeSelectBillPaymentsBillList from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { getAllMerchantsList } from './actions';

import MainHeader from '../MainHeader';

import history from 'utils/history';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ActionBar from 'components/ActionBar';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Popup from 'components/Popup';

import { Formik, useField, Form } from 'formik';

import { object, string, number, email, boolean } from 'yup';

import { API_URL, STATIC_URL, CURRENCY } from 'containers/App/constants';

import { withStyles, Grid, Typography } from '@material-ui/core';

import CardEwalletSendMoneyPayBills from 'components/CardEwalletSendMoneyPayBills';
import CardDownloadOurApp from 'components/CardDownloadOurApp';

import axios from 'axios';

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
  // useInjectReducer({ key: 'billPaymentsBillList', reducer });
  // useInjectSaga({ key: 'billPaymentsBillList', saga });
  constructor(props) {
    super(props);
    this.state = {
      viewBillPopup: false,
      dataMerchantList: {},
      checkMerchantFee: {},
      invoiceDetails: {},
      filteredInvoice: {},
    };
  }

  handleView = _id => {
    console.log('_id', _id);

    const tempInvoice = this.state.invoiceDetails.invoices.filter(i => {
      if (i._id == _id) {
        return i;
      }
    });
    console.log('tempInvoice', tempInvoice[0]);
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
        console.log('res of /user/checkMerchantFee', res);
      })
      .catch(error => {});

    this.setState({ viewBillPopup: true });
  };

  payBill = _id => {
    console.log('invoice_id', _id);
    axios
      .post(`${API_URL}/user/payInvoice`, {
        invoice_id: _id,
        amount: this.state.filteredInvoice.amount,
      })
      .then(res => {
        if (res.data.status === 1) {
          this.props.location.notify(res.data.message, 'success');
          // this.setState({ checkMerchantFee: res.data });
        }
        console.log('res of /user/payInvoice', res);
      })
      .catch(error => {
        console.log(error);
      });

    this.setState({ viewBillPopup: false });
  };

  showViewBillPopup = _id => {
    console.log("merchant's _id", _id);
    this.setState({ viewBillPopup: true });
  };
  closeViewBillPopup = () => {
    this.setState({ viewBillPopup: false });
  };

  componentWillMount = () => {
    const { id } = this.props.match.params;
    const { notify } = this.props.location;
    console.log('this.props', this.props);
    console.log('this.props.location', this.props.location);
    this.getParticularMerchantData(id);
    this.getInvoices();
    // this.props.dispatch(getAllMerchantsList());
  };

  getParticularMerchantData = id => {
    console.log('_id', id);
    console.log('this.props.match.params._id', this.props.match.params.id);

    let method = '';
    axios
      .post(`${API_URL}/user/getMerchantDetails`, {
        merchant_id: id,
      })
      .then(res => {
        if (res.data.status === 1) {
          this.setState({ dataMerchantList: res.data.merchant });
        }
        console.log('res of /user/getMerchantDetails', res);
      })
      .catch(error => {});
  };

  getInvoices = () => {
    // console.log('_id', id);
    // console.log('this.props.match.params.id', this.props.match.params.id);
    axios
      .post(`${API_URL}/user/getInvoices`)
      .then(res => {
        if (res.data.status === 1) {
          this.setState({ invoiceDetails: res.data });
        }
        console.log('res of /user/getInvoices', res);
      })
      .catch(error => {});
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
              <ActionBar
                marginBottom="33px"
                inputWidth="calc(100% - 241px)"
                className="clr"
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  margin: '0 auto',
                  border: '1px solid #cbd2d6',
                }}
              >
                <div className="iconedInput fl">
                  <i className="material-icons">search</i>
                  <input type="text" placeholder="Search" />
                </div>
              </ActionBar>
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
                          <TableCell>Bill Date</TableCell>

                          <TableCell>Bill No.</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell align="left" />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {console.log(
                          'this.state.invoiceDetails',
                          this.state.invoiceDetails,
                        )}
                        {this.state.invoiceDetails.invoices != undefined &&
                        this.state.invoiceDetails != null ? (
                          this.state.invoiceDetails.invoices.map(row => (
                            <TableRow key={row._id}>
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>

                              <TableCell component="th" scope="row">
                                {row.mobile}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row.bill_date}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row.number}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row.amount}
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
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* {this.state.viewBillPopup ? (
          <Popup close={this.closeViewBillPopup.bind(this)}>
            <div
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: '1.5rem',
                paddingBottom: '1rem',
              }}
            >
              Pay Bill
            </div>

            <Formik
              initialValues={{
                mobileNumber: '',
                ID: '',
                amount: '',
                note: '',
                balance: 0,
              }}
              onSubmit={async values => {
                try {
                  // const res = await axios('api end point', values);
                  // console.log(res);
                  // close={() => this.closeViewBillPopup.bind(this)}
                  history.push('/bill-list');
                } catch (err) {}
              }}
            >
              {props => {
                const {
                  values,
                  touched,
                  errors,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                } = this.props;
                return (
                  <>
                    <Form>
                      <Container>
                        <Row>
                          <Col md={12} sm={12} xs={12}>
                            <label />
                            <TextField
                              label="ID"
                              placeholder="ID"
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              name="ID"
                              values={props.values.ID}
                            />
                          </Col>
                          <Col md={12} sm={12} xs={12}>
                            <label />
                            <TextField
                              label="Amount"
                              placeholder="Amount"
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              name="amount"
                              values={props.values.amount}
                            />
                            <Typography
                              variant="body1"
                              style={{
                                color: 'grey',
                                textAlign: 'left',
                                paddingBottom: '0.8rem',
                                paddingTop: '0.5rem',
                              }}
                            >
                              <span style={{ color: 'red' }}>* </span>
                              Total Available {CURRENCY}
                              {props.values.balance}
                            </Typography>
                          </Col>
                          <Col md={12} sm={12} xs={12}>
                            <TextField
                              name="Note"
                              label="Note"
                              placeholder="Note"
                              multiline
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              values={props.values.note}
                            />
                            <Typography
                              variant="body1"
                              style={{
                                color: 'grey',
                                textAlign: 'left',
                                paddingBottom: '0.8rem',
                                paddingTop: '0.5rem',
                              }}
                            >
                              <span style={{ color: 'red' }}>* </span>I have
                              read the{' '}
                              <a
                                style={{ textDecoration: 'underline' }}
                                onClick={() => window.open('/termsConditions')}
                              >
                                {' '}
                                Terms & Conditions
                              </a>
                            </Typography>
                            <Button
                              variant="contained"
                              type="submit"
                              disabled={isSubmitting}
                              className={classes.signUpButton}
                            >
                              Proceed
                            </Button>
                            <Typography
                              variant="body1"
                              style={{
                                color: 'grey',
                                textAlign: 'left',
                                paddingBottom: '2.5rem',
                              }}
                            >
                              <span style={{ color: 'red' }}>* </span>Total fee{' '}
                              {CURRENCY}
                              {props.values.balance} will be charged
                            </Typography>
                          </Col>
                        </Row>
                      </Container>
                    </Form>
                  </>
                );
              }}
            </Formik>
          </Popup>
        ) : null} */}

        {this.state.viewBillPopup ? (
          <Popup close={this.closeViewBillPopup.bind(this)}>
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

            <Grid container style={{ padding: '2rem' }}>
              <Grid item xs={6}>
                <Typography align="left">Invoice No.</Typography>
                <Typography align="left">Name</Typography>
                <Typography align="left">Amount</Typography>
                <Typography align="left">Due Date</Typography>
                <Typography align="left">Description</Typography>
                <Typography align="left">Mobile</Typography>
                <Typography align="left">Fee</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography color="primary" align="left">
                  {this.state.filteredInvoice.number}
                </Typography>
                <Typography color="primary" align="left">
                  {this.state.filteredInvoice.name}
                </Typography>
                <Typography color="primary" align="left">
                  {CURRENCY}
                  {this.state.filteredInvoice.amount}
                </Typography>
                <Typography color="primary" align="left">
                  {this.state.filteredInvoice.due_date}
                </Typography>
                <Typography color="primary" align="left">
                  {this.state.filteredInvoice.description}
                </Typography>
                <Typography color="primary" align="left">
                  {this.state.filteredInvoice.mobile}
                </Typography>
                <Typography color="primary" align="left">
                  {this.state.checkMerchantFee.fee}
                </Typography>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              type="submit"
              onClick={() => this.payBill(this.state.filteredInvoice._id)}
              // disabled={isSubmitting}
              className={classes.signUpButton}
            >
              Pay Bill
            </Button>
          </Popup>
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
