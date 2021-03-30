import React, { Fragment, useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import {makeStyles}  from '@material-ui/core/styles'
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { API_URL } from '../App/constants';

const useStyles = makeStyles(() => ({
  contactIcon: {
    width: '50px',
    height: '50px',
    cursor: 'pointer',
    color: '#fff',
    background: 'rgba(92,155,5,0.8)',
   
  },
}));

const getContactList = async notify => {
  try {
    const controller = 'getContactList';
    const res = await axios.get(`${API_URL}/user/${controller}`);
    if (res.status === 200) {
      if (res.data.error) {
        notify(res.data.error, 'error');
      } else {
        return res.data.contacts;
      }
    } else {
      notify(res.data.error, 'error');
    }
  } catch (err) {
    throw err;
  }
};

export default ({ notify }) => {
  const classes = useStyles();
  let rows = {};
  useEffect(() => {
    getContactList(notify)
      .then(r => {
        rows = r;
        setLoading(false);
        setRow(rows);
      })
      .catch(error => {
        setLoading(false);
        notify('Error while fetching contacts', 'error');
      });
  }, rows);
  const [fullRow, setRow] = useState({});
  const [loading, setLoading] = React.useState(true);

  return (
    <Fragment>
      {loading ? (
        <Grid container alignItems="center" justify="center">
          <CircularProgress size={50} thickness={5} color="primary" />
        </Grid>
      ) : (
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="flex-start"
          className={classes.paper}
        >
          {Object.values(fullRow)
            .flat()
            .slice(0, 5)
            .map(row => (
              <Fragment>
                <Grid item md={2}>
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                     style={{backgroundColor:""}}
                  >
                    <Avatar
                      alt="bank logo"
                      onClick={{}}
                      className={classes.contactIcon}
                    >
                      <Typography
                        variant="h5"
                        style={{
                          textTransform: 'capitalize',
                          fontWeight: '400',
                        }}
                      >
                        {Object.values(row.name)[0]}
                      </Typography>
                    </Avatar>
                    <Typography
                      variant="h6"
                      style={{
                        textTransform: 'capitalize',
                        fontWeight: '600',
                        paddingTop: '3%',
                      }}
                    >
                      {row.name}
                    </Typography>
                  </Grid>
                </Grid>
              </Fragment>
            ))}
          {Object.values(fullRow).flat().length > 5 ? (
            <Grid item md={2} xs={12}>
              <Grid container alignItems="flex-end" justify="flex-end">
                <Button
                  size="large"
                  variant="outlined"
                  color="primary"
                  style={{
                    borderRadius: '50%',
                    paddingTop: '20%',
                    paddingBottom: '20%',
                  }}
                >
                  See All
                </Button>
              </Grid>
            </Grid>
          ) : (
            ''
          )}
        </Grid>
      )}
    </Fragment>
  );
};
