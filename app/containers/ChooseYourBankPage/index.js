/**
 *
 * ChooseYourBankPage
 *
 */

import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  buttonProgress: {
    color: 'green',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
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

  const [loading, setLoading] = React.useState(true);

  const fetchBanks = async () => {
    try {
      const res = await axios.get(`${API_URL}/user/getBanks`);
      if (res.status === 200) {
        setLoading(false);
        return res;
      }
      setLoading(false);
      return null;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const saveBank = async bank => {
    const { username } = JSON.parse(localStorage.getItem('loggedUser'));
    try {
      const res = await axios.post(`${API_URL}/user/assignBank`, {
        bank_id: bank._id,
      });
      console.log(res);
      if (res.data.status === 0) {
        throw res.data.message;
      } else {
        history.push('/upload-documents');
      }
    } catch (err) {
      props.notify(err, 'error');
    }
  };
  return (
    <Fragment>
      <Helmet>
        <title>Choose A Bank</title>
        <meta name="description" content="Description of ChooseYourBankPage" />
      </Helmet>
      <HeaderChooseYourBank />
      <Grid container justify="center">
        <Grid item md={12}>
          <Typography className={classes.titleChooseBank} variant="h4">
            Choose Your Bank
          </Typography>
        </Grid>
        {loading ? (
          <CircularProgress
            size={50}
            thickness={5}
            className={classes.buttonProgress}
          />
        ) : (
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
                    {lob.logo ? (
                      <Avatar
                        alt="banklogo"
                        onClick={() => saveBank(lob)}
                        // src='http://91d90ac373dc.sn.mynetname.net:30301/api/uploads/5f9171a5aaf1aa0007d83842/joy.jpg'
                        src={`${STATIC_URL}${lob.logo}`}
                        className={classes.bankIcons}
                      />
                    ) : (
                        <Avatar
                          alt="bank logo"
                          style={{
                            height: '100px',
                            width: '100px',
                            background: '#173316',
                          }}
                          onClick={() => saveBank(lob)}
                        />
                      )}
                    <Typography variant="h5" className={classes.nameOfBank}>
                      {lob.name}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
      </Grid>
    </Fragment>
  );
};

export default withStyles(styles)(ChooseYourBankPage);
