/**
 *
 * ChooseYourBankPage
 *
 */

import React,  { Component, useEffect }  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import axisBankLogo from 'images/axis-bank-logo.jpg';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectChooseYourBankPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import HeaderChooseYourBank from '../../components/HeaderChooseYourBank';
import Loader from 'components/Loader';
import { Typography, Grid, withStyles } from '@material-ui/core';
import A from 'components/A';

const styles = theme => ({
  titleChooseBank: {
    paddingTop: '2%',
    paddingBottom: '3%',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '11%',
      paddingBottom: '14%',
      textAlign: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: '11%',
      paddingBottom: '11%',
      textAlign: 'center',
    },
  },
  listOfBanks: {
    textAlign: 'center',
  },
  bankIcons: {
    height: '9rem',
  },
  nameOfBank: {
    paddingBottom: '13%',
    textDecoration: 'none',
  },
});

const listOfBanks = [
  {
    imageLink: axisBankLogo,
    bankName: 'Axis Bank',
  },
  {
    imageLink: axisBankLogo,
    bankName: 'Axis Bank',
  },
  {
    imageLink: axisBankLogo,
    bankName: 'Axis Bank',
  },
  {
    imageLink: axisBankLogo,
    bankName: 'Axis Bank',
  },
  {
    imageLink: axisBankLogo,
    bankName: 'Axis Bank',
  },
  {
    imageLink: axisBankLogo,
    bankName: 'Axis Bank',
  },
  {
    imageLink: axisBankLogo,
    bankName: 'Axis Bank',
  },
  {
    imageLink: axisBankLogo,
    bankName: 'Axis Bank',
  },
];

  
const ChooseYourBankPage = (props, state) =>{

  useInjectReducer({ key: 'chooseYourBankPage', reducer });
  //useInjectSaga({ key: 'chooseYourBankPage', saga });
  //const [state, dispatch] = useInjectReducer(chooseYourBankPageReducer);
  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    console.log(state);
  }, []);
  const { classes } = props;
  let loading = false;
  if(loading){
    return <Loader fullPage />;
  }
  return (
    <div>
      <Helmet>
        <title>Choose A Bank</title>
        <meta name="description" content="Description of ChooseYourBankPage" />
      </Helmet>
      <HeaderChooseYourBank />
      <div className="app">
        <Grid container justify="center">
          <Grid item md={12}>
            <Typography className={classes.titleChooseBank} variant="h4">
              Choose Your Bank
            </Typography>
          </Grid>
          <Grid item className={classes.listOfBanks} md={12}>
            <Grid container style={{maxWidth: '80%', margin: '0 auto'}} justify="center">
              {listOfBanks.map((lob, i) => (
                <Grid item md={3} sm={6} xs={12}>
                  <A href="/upload-documents">
                    <img className={classes.bankIcons} src={lob.imageLink} />
                  </A>
                  <Typography variant="h5" className={classes.nameOfBank}>
                    {lob.bankName}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

ChooseYourBankPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  chooseYourBankPage: makeSelectChooseYourBankPage(),
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

//export default withStyles(styles)(ChooseYourBankPage);
export default compose(
  withConnect
) (withStyles(styles)(ChooseYourBankPage));
