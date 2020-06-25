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
    width: '100%',
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
    };
  }

  showViewBillPopup = () => {
    this.setState({ viewBillPopup: true });
  };
  closeViewBillPopup = () => {
    this.setState({ viewBillPopup: false });
  };

  componentDidMount = () => {
    this.props.dispatch(getAllMerchantsList());
  };
  render() {
    const { classes } = this.props;

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
                Merchant 1
                <Typography variant="subtitle2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
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
                  {/* <a  href="/contact">
                    <i className="material-icons">arrow_back</i>
                  </a> */}
                  <Typography
                    style={{ margin: '0% 3% 0 3%', paddingTop: '2%' }}
                    variant="h5"
                  >
                    Merchant List
                    <Typography
                      style={{ color: 'grey', margin: '0% 0% 1% 1%' }}
                      variant="body1"
                    >
                      Pay bills safely
                    </Typography>
                  </Typography>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell />
                        <TableCell align="left" />
                        <TableCell align="right" />
                        <TableCell align="right" />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map(row => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>

                          <TableCell align="right">{row.calories}</TableCell>
                          <TableCell align="right">{row.fat}</TableCell>
                          <TableCell
                            style={{ color: '#417505', fontWeight: 600 }}
                            onClick={this.showViewBillPopup}
                            align="right"
                          >
                            {row.carbs}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {this.state.viewBillPopup ? (
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

export default withStyles(styles)(BillPaymentsBillList);
