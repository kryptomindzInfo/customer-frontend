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
import makeSelectContactPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

// import Button from 'components/Button';
import ActionBar from 'components/ActionBar';

import MainHeader from '../MainHeader';
import Card from 'components/Card';
import CardEwalletSendMoneyPayBills from 'components/CardEwalletSendMoneyPayBills';
import { withStyles, Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData(7896543290, 'Hatim', 'Pay Now'),
  createData(7896543290, 'Hatim', 'Pay Now'),
  // createData('Eclair', 262, 16.0, 24, 6.0),
  // createData('Cupcake', 305, 3.7, 67, 4.3),
  // createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class ContactPage extends Component {
  // useInjectReducer({ key: 'contactPage', reducer });
  // useInjectSaga({ key: 'contactPage', saga });
  constructor(props) {
    super(props);
    this.state = {
      // balance: 0,
      sendMoneyPopup: false,
      addContactPopup: false,
    };
  }

  showSendMoneyPopup = () => {
    this.setState({ sendMoneyPopup: true });
  };
  closeSendMoneyPopup = () => {
    this.setState({ sendMoneyPopup: false });
  };

  showAddContactPopup = () => {
    this.setState({ addContactPopup: true });
  };
  closeAddContactPopup = () => {
    this.setState({ addContactPopup: false });
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Helmet>
          <title>Contacts</title>
          <meta name="description" content="Description of ContactPage" />
        </Helmet>
        <MainHeader />

        <Grid container>
          <Grid item md={3} sm={12} xs={12} style={{ margin: '1% 0 0 4%' }}>
            {' '}
            {/*  parent 1  */}
            <Grid
              className={classes.gridCardEwalletSendMoney}
              item
              md={12}
              sm={12}
              xs={12}
              style={{ marginBottom: '2rem' }}
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
          <Grid item md={8} xs={12}>
            {' '}
            {/*  parent 2  */}
            <Grid
              className={classes.gridSearchBarContactList}
              item
              md={12}
              sm={12}
              xs={12}
            >
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

                <button
                  onClick={this.showAddContactPopup}
                  className={`${'addBankButton'} `}
                >
                  Add Contact
                </button>
              </ActionBar>

              <Grid
                className={classes.recentActivitiesTable}
                item
                md={10}
                sm={12}
                xs={12}
              >
                <Typography
                  style={{ margin: '3% 3%', paddingTop: '2%' }}
                  variant="h5"
                >
                  Contacts List
                  <Typography
                    style={{ color: 'grey', margin: '0% 0% 1% 1%' }}
                    variant="body1"
                  >
                    Your family & friends
                  </Typography>
                </Typography>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Number</TableCell>
                      <TableCell align="right">Name</TableCell>
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
                        <TableCell
                          onClick={this.showSendMoneyPopup}
                          align="right"
                          style={{ color: '#417505', fontWeight: 600 }}
                        >
                          {row.fat}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <button
                  style={{ marginTop: '10px' }}
                  className={`${'addBankButton'} `}
                >
                  View All
                </button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {this.state.sendMoneyPopup ? (
          <Popup close={this.closeSendMoneyPopup.bind(this)}>
            <div
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: '1.5rem',
                paddingBottom: '1rem',
              }}
            >
              Transfer the Amount
            </div>

            <Formik
              initialValues={{
                mobileNumber: 77777777777,
                amount: '',
                note: '',
                balance: 0,
              }}
              onSubmit={async values => {
                try {
                  // const res = await axios('api end point', values);
                  // console.log(res);
                  history.push('/dashboard');
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
                              label="Mobile Number"
                              placeholder="Mobile Number"
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              name="mobileNumber"
                              values={props.values.mobileNumber}
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
                                onClick={() => window.open('/termsConditions')}
                              >
                                {' '}
                                Term & Conditions
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

        {this.state.addContactPopup ? (
          <Popup close={this.closeAddContactPopup.bind(this)}>
            <div
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: '1.5rem',
                paddingBottom: '1rem',
              }}
            >
              Add a contact
            </div>

            <Formik
              initialValues={{
                name: '',
                mobileNumber: 77777777777,
                amount: '',
                note: '',
                balance: 0,
              }}
              onSubmit={async values => {
                try {
                  // const res = await axios('api end point', values);
                  // console.log(res);
                  history.push('/dashboard');
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
                              label="Name"
                              placeholder="Name"
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              name="name"
                              values={props.values.name}
                            />
                          </Col>
                          <Col md={12} sm={12} xs={12}>
                            <label />
                            <TextField
                              label="Mobile Number"
                              placeholder="Mobile Number"
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              name="mobileNumber"
                              values={props.values.mobileNumber}
                            />
                          </Col>

                          <Col md={12} sm={12} xs={12}>
                            <Button
                              variant="contained"
                              type="submit"
                              disabled={isSubmitting}
                              className={classes.addMyFriendButton}
                            >
                              Add my friend
                            </Button>
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

// ContactPage.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//   contactPage: makeSelectContactPage(),
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

export default withStyles(styles)(ContactPage);
