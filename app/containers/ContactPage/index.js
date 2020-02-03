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

import Button from 'components/Button';
import ActionBar from 'components/ActionBar';

import MainHeader from '../MainHeader';
import Card from 'components/Card';
import CardEwalletSendMoneyPayBills from 'components/CardEwalletSendMoneyPayBills';
import { withStyles, Grid, Typography } from '@material-ui/core';

import axisBankLogo from 'images/axis-bank-logo.jpg';
import CardDownloadOurApp from '../../components/CardDownloadOurApp';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
  gridSearchBarContactList:
  {
    margin: '3% 2% 0% 2%',
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
  table: {
    minWidth: 700,
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

class ContactPage extends Component {
  // useInjectReducer({ key: 'contactPage', reducer });
  // useInjectSaga({ key: 'contactPage', saga });
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Helmet>
          <title>ContactPage</title>
          <meta name="description" content="Description of ContactPage" />
        </Helmet>
        <MainHeader />

        <Grid container>
          {/* <Grid item md={1}></Grid> */}
          <Grid item md={3} sm={12} xs={12}>
            <Grid
              className={classes.gridCardEwalletSendMoney}
              item
              md={12}
              sm={12}
              xs={12}
              style={{marginBottom: '2rem'}}
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
          <Grid item md={9} xs={12}>
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
                style={{ display: 'flex', justifyContent: 'space-around' }}
              >
                <div className="iconedInput fl">
                  <i className="material-icons">search</i>
                  <input type="text" placeholder="Search" />
                </div>

                <button className={`${'addBankButton'} `}>Add Contact</button>
              </ActionBar>

              <Grid
                className={classes.recentActivitiesTable}
                item
                md={12}
                sm={12}
                xs={12}
              >
                <Typography style={{ margin: '3% 3%' }} variant="h5">
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
                <button
                  style={{ marginTop: '10px' }}
                  className={`${'addBankButton'} `}
                >
                  View All
                </button>

                {/* <span style={{textAlign: 'right', paddingTop: '4px'}}>View All</span> */}
              </Grid>
            </Grid>
          </Grid>

          {/* </Grid> */}

          {/* <Grid container> */}
        </Grid>
        {/* </Grid> */}
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
