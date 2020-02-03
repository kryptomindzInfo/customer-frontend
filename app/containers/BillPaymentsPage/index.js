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

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectBillPaymentsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { withStyles, Grid, Typography } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ActionBar from 'components/ActionBar';

import MainHeader from '../MainHeader';

import CardEwalletSendMoneyPayBills from 'components/CardEwalletSendMoneyPayBills';
import CardDownloadOurApp from 'components/CardDownloadOurApp';

const styles = theme => ({
  gridCardEwalletSendMoney: {
    margin: '3% 2% 0% 2%',
    borderRadius: '4px',
    // border: '1px solid grey',
    [theme.breakpoints.down('sm')]: {
      margin: '3% 3%',
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
  amountReceivedMessage: {
    background: 'white',
    boxShadow: '0 4px 9px 0 rgba(0, 0, 0, 0.02)',
    padding: '2%',
    borderRadius: '7px',
    border: '1px solid grey',

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
  },
  recentActivitiesTable: {
    margin: '3% 2%',
    borderRadius: '4px',
    background: 'white',
    borderRadius: '7px',
    boxShadow: '0 4px 9px 0 rgba(0, 0, 0, 0.02)',
    [theme.breakpoints.down('sm')]: {
      margin: '3% 3%',
      // width: '50%',
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
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  // createData('Eclair', 262, 16.0, 24, 6.0),
  // createData('Cupcake', 305, 3.7, 67, 4.3),
  // createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class BillPaymentsPage extends Component {
  // useInjectReducer({ key: 'billPaymentsPage', reducer });
  // useInjectSaga({ key: 'billPaymentsPage', saga });
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Helmet>
          <title>BillPaymentsPage</title>
          <meta name="description" content="Description of BillPaymentsPage" />
        </Helmet>
        <MainHeader />
        <Grid container>
          <Grid
            item
            className={classes.gridCardEwalletSendMoney}
            md={3}
            sm={12}
            xs={12}
          >
            <CardEwalletSendMoneyPayBills />
          </Grid>
          <Grid
            className={classes.gridCardEwalletSendMoney}
            item
            md={8}
            sm={12}
            xs={11}
          >
            {/* <CardEwalletSendMoneyPayBills /> */}
            <Typography className={classes.amountReceivedMessage} variant="h5">
              Merchant 1
              <Typography variant="subtitle2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Typography>
            </Typography>
            <ActionBar
              marginBottom="33px"
              inputWidth="calc(100% - 241px)"
              className="clr"
              // style={{ display: 'flex', justifyContent: 'space-around', border: '1px solid grey' }}
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
                <Typography style={{ margin: '3% 3%' }} variant="h5">
                  Bills List
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
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Description</TableCell>
                      <TableCell align="right">Fat (g)</TableCell>
                      <TableCell align="right">Carbs (g)</TableCell>
                      <TableCell align="right">Protein (g)</TableCell>
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
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Grid>
          </Grid>
        </Grid>
        {/* </Grid> */}
        <Grid
          className={classes.gridCardDownloadOurApp}
          item
          md={3}
          sm={12}
          xs={12}
        >
          <CardDownloadOurApp />
        </Grid>
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
