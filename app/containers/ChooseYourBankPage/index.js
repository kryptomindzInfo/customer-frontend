/**
 *
 * ChooseYourBankPage
 *
 */

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import HeaderChooseYourBank from '../../components/HeaderChooseYourBank';
import { Grid, Typography, withStyles } from '@material-ui/core';
import axios from 'axios';
import { API_URL, STATIC_URL } from '../App/constants';
import history from '../../utils/history';

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
    cursor: 'pointer',
  },
  nameOfBank: {
    paddingBottom: '13%',
    textDecoration: 'none',
  },
});

const ChooseYourBankPage = props => {
  // useInjectReducer({ key: 'chooseYourBankPage', reducer });
  // useInjectSaga({ key: 'chooseYourBankPage', saga });
  const { classes } = props;
  const val = '';
  useEffect(() => {
    fetchBanks()
    .then(res => {
      setState({
        listOfBanks: res.data.banks,
      })
    }).catch();
  },[val]);

  const [state, setState] = useState({
    listOfBanks: [],
  });

  const token = localStorage.getItem('customerLogged');
  const fetchBanks = async () => {
    try {
      const res = await axios.post(`${API_URL}/user/getBanks`, {
        token,
      });
      if (res.status === 200) {
        return res;
      }
      return null;
    } catch (err) {
      throw err;
    }
  };

  const saveBank = async bank => {
    try {
      const res = await axios.post(`${API_URL}/user/assignBank`, {
        bank, token,
      });
      if (res.status === 200) {
        history.push('/upload-documents');
      } else {
        props.notify('Error while saving the bank', 'error');
        throw res.data.error;
      }
    } catch (err) {
      props.notify(err, 'error');
    }
  };
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
            <Grid
              container
              style={{ maxWidth: '100%', margin: '0 auto' }}
              justify="center"
            >
              {state.listOfBanks.map((lob, i) => (
                <Grid md={3} sm={6} xs={12} key={i}>
                  <img className={classes.bankIcons}  onClick={() => saveBank(lob)} src={`${STATIC_URL}/${lob.logo}`} />
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
};

// ChooseYourBankPage.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//   chooseYourBankPage: makeSelectChooseYourBankPage(),
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

export default withStyles(styles)(ChooseYourBankPage);
