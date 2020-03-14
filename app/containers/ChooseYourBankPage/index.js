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
import Color from 'color';

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
import axios from 'axios';
import { API_URL, STATIC_URL } from '../App/constants';
import history from 'utils/history';

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
  imgHold: {
    cursor: 'pointer',
    display: 'block',
    height: '9em',
    width: '9em',
    overflow: 'hidden',
    borderRadius: '50%',
    margin: '0 auto',
  }
});



  
class ChooseYourBankPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

 

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  selectBank = (id, the) => {
    console.log(id);
    localStorage.setItem("bankId", id);
    console.log(the);
     if(the && the != null){
        // console.log(this.props.appTheme);
         let theme = JSON.parse(the);

         let upd = {...this.props.appTheme};
         for (var t in theme) {
           // upd[t] = theme[t];
           if(t == 'hGradient'){

               upd['palette'][t] ={
                main: `linear-gradient(to right, ${theme[t]} 1%, ${
                    theme['primary']
                })`,
                hover: `linear-gradient(to right, ${theme[t]} 1%, ${
                    theme['primary']
                })`
              };
               
           }else{
           upd['palette'][t] = {
              main: theme[t],
              hover: theme[t]
            };
          }

           }
           
           this.props.setTheme(upd.palette);

           localStorage.setItem('theme', JSON.stringify(upd.palette));
         }

          window.location.href = "/upload-documents";

  }

  componentDidMount() {
    axios
      .get(`${API_URL}/getBanks`, {})
      .then(res => {
        if (res.status == 200) {
          this.setState({ banks: res.data.banks, loading:false });
        } else {
          throw res.data.error;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {

    const { loading } = this.state;
    const { classes } = this.props;
    console.log(this.props);
    if (loading) {
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
              {this.state.banks.map((lob, i) => (
                <Grid item md={3} sm={6} xs={12} key={lob._id}>
                  <div className={classes.imgHold} onClick={() => this.selectBank(lob._id, lob.theme)}>
                    <img className={classes.bankIcons} src={STATIC_URL+""+lob.logo} />
                  </div>
                  <Typography variant="h5" className={classes.nameOfBank}>
                    {lob.name}
                  </Typography>
                </Grid>
              ))}
              
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
    );
  }
}


export default withStyles(styles)(ChooseYourBankPage);