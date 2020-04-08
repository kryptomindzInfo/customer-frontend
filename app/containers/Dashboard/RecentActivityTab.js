import React, { Fragment, useEffect, useState } from 'react';
import { Button, Grid, makeStyles, Paper, Tab, Tabs, Typography, withStyles } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';
import { API_URL } from '../App/constants';

const DashBoardTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#417505',
    },
  },
})(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const DashboardTab = withStyles(theme => ({
  root: {
    color: '#417505',
    textAlign: 'center',
    width: '50%',
    textTransform: 'none',
    fontSize: 21,
    outline: 0,
    fontWeight: theme.typography.fontWeightBold,
  },
  selected: {
    '&$selected': {
      outline: 0,
      border: 'none',
    },
  },
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(() => ({
  paper: {
    padding: '2%',
    width: '100%',
  },
  allTab: {
    textAlign: 'center',
    width: '10%',
  },
  tab: {
    textAlign: 'center',
    width: '50%',
  },
  rowField: {
    padding: '2%',
  },
  rowFieldMiddle: {
    paddingLeft: '10%',
  },
}));

const getTransactionHistory = async () => {
  try {
    const controller = 'getTransactionHistory';
    const values = localStorage.getItem('customerLogged');

    const res = await axios.post(`${API_URL}/user/${controller}`, {
      token: values,
    });
    if (res.status === 200) {
      if (res.data.error) {
        throw res.data.error;
      } else {
        return res.data.history;
      }
    } else {
      throw res.data.error;
    }
  } catch (err) {
    throw err;
  }
};

export default () => {
  const classes = useStyles();
  let rows = [];
  useEffect(() => {
    getTransactionHistory()
      .then(r => {
        rows = r;
        return rows;
      })
      .catch(error => {
        console.log(error);
      });
  }, rows);
  const [fullRow, setRow] = useState(rows);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        setRow(rows);
        break;
      case 1:
        setRow(rows.filter(row => row.action === 'TRANSFERED'));
        break;
      case 2:
        setRow(rows.filter(row => row.action === 'RECIEVED'));
        break;
      default:
        setRow(rows);
    }
    setValue(newValue);
  };

  return (
    <Fragment>
      <Grid
        container
        justify="flex-start"
        alignItems="flex-start"
        className={classes.paper}
      >
        <Grid
          item
          xl={1}
          lg={1}
          md={4}
          sm={4}
          xs={12}
          justify="flex-start"
          alignItems="flex-start"
        >
          <Icon
            fontSize="large"
            style={{
              color: 'green',
              fontSize: 50,
            }}
          >
            playlist_add_check
          </Icon>
        </Grid>
        <Grid
          column
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Typography variant="h5" style={{ textAlign: 'start' }}>
            Recent Activity
          </Typography>
          <Typography
            variant="subtitle1"
            styles={{ textAlign: 'start', color: '#9ea0a5' }}
          >
            E-wallet activity
          </Typography>
        </Grid>
      </Grid>
      <DashBoardTabs
        variant="scrollable"
        scrollButtons="auto"
        onChange={handleChange}
        value={value}
      >
        <DashboardTab label="All" className={classes.allTab} />
        <DashboardTab label="Payment Sent" className={classes.tab} />
        <DashboardTab label="Payment Recieved" className={classes.tab} />
      </DashBoardTabs>
      <Grid
        container
        xs={12}
        alignItems="center"
        justify="center"
        className={classes.paper}
      >
        {fullRow.slice(0, 5).map(row => (
          <Paper className={classes.paper} elevation={0} key={row.id}>
            <Grid container spacing={2} alignItems="center" justify="center">
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                className={classes.rowField}
              >
                <Typography variant="subtitle1" styles={{ textAlign: 'start' }}>
                  {row.date}
                </Typography>
                <Typography variant="subtitle1">{row.time}</Typography>
              </Grid>
              <Grid
                item
                xl={2}
                lg={2}
                md={4}
                sm={4}
                xs={12}
                justify="flex-start"
                alignItems="flex-start"
                className={classes.rowField}
              >
                <Typography variant="subtitle1">{row.id}</Typography>
              </Grid>
              <Grid
                item
                xl={5}
                lg={5}
                md={4}
                sm={4}
                xs={12}
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                className={classes.rowField}
              >
                <Typography variant="h6">
                  {row.action} {row.keyword} {row.to}
                </Typography>
                <Typography
                  color="primary"
                  variant="subtitle1"
                  styles={{ textAlign: 'start' }}
                >
                  {row.status}
                </Typography>
              </Grid>
              <Grid
                item
                xl={2}
                lg={2}
                md={4}
                sm={4}
                xs={12}
                justify="flex-start"
                alignItems="flex-start"
                className={classes.rowField}
              >
                <Typography variant="subtitle1">{row.source}</Typography>
              </Grid>
              <Grid
                item
                xl={1}
                lg={1}
                md={4}
                sm={4}
                xs={12}
                justify="flex-start"
                alignItems="flex-start"
                className={classes.rowField}
              >
                <Typography variant="h6">${row.amount}</Typography>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Grid>
      <Grid
        container
        justify="flex-end"
        alignItems="flex-end"
        className={classes.paper}
      >
        <Button color="primary" size="large">
          <Typography variant="h6">Pagination</Typography>
        </Button>
      </Grid>
    </Fragment>
  );
};
