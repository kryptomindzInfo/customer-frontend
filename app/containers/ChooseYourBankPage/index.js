/**
 *
 * ChooseYourBankPage
 *
 */

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Grid, Typography, withStyles } from '@material-ui/core';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import HeaderChooseYourBank from '../../components/HeaderChooseYourBank';
import { API_URL, STATIC_URL } from '../App/constants';
import history from '../../utils/history';

const styles = theme => ({
  titleChooseBank: {
    paddingTop: '2%',
    paddingBottom: '3%',
    textAlign: 'center',
    color: '#173316',
    fontSize: '40px',
    fontWeight: '600',
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
    marginTop: '50px',
  },
  bankIcons: {
    width: '150px',
    height: '150px',
    cursor: 'pointer',
  },
  nameOfBank: {
    paddingBottom: '13%',
    textDecoration: 'none',
    color: '#173316',
    fontSize: '40px',
    fontWeight: '600',
  },
  bankCard: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
});

const ChooseYourBankPage = props => {
  const { classes } = props;
  const val = '';
  useEffect(() => {
    fetchBanks()
      .then(res => {
        setState({
          listOfBanks: res.data.banks,
        });
      })
      .catch();
  }, [val]);

  const [state, setState] = useState({
    listOfBanks: [],
  });

  const fetchBanks = async () => {
    try {
      const res = await axios.get(`${API_URL}/user/getBanks`);
      if (res.status === 200) {
        return res;
      }
      return null;
    } catch (err) {
      throw err;
    }
  };

  const saveBank = async bank => {
    const { username } = JSON.parse(localStorage.getItem('loggedUser'));
    try {
      const res = await axios.post(`${API_URL}/user/assignBank`, {
        bank: bank.name,
      });
      if (res.data.status === 1) {
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
      <div>
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
                <Grid
                  md={2}
                  sm={6}
                  xs={12}
                  key={i}
                  className={classes.bankCard}
                >
                  <Avatar
                    alt="bank logo"
                    onClick={() => saveBank(lob)}
                    src={`${STATIC_URL}/${lob.logo}`}
                    className={classes.bankIcons}
                  />
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

export default withStyles(styles)(ChooseYourBankPage);
