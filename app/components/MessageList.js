import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { API_URL, STATIC_URL } from '../containers/App/constants';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure({
    position: 'bottom-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function AlignItemsList() {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);

  const fetchBanks = async () => {
    try {
      const res = await axios.get(`${API_URL}/user/getMessages`);
      if (res.status === 200) {
        if (res.data.status === 0) {
            toast.error(res.data.message);
        } else {
            setMessages(res.data.user.messages)
        }
      }
    } catch (err) {
      throw err;
    }
  };
  const getItems = () =>
  messages.map(item => {
    const date = new Date(item.date);
    return (
        <div>
        <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={`${STATIC_URL}${item.logo}`} />
        </ListItemAvatar>
        <ListItemText
          primary={`${item.message_title} (${date.toDateString()})`}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {/* {item.from} ({date.toDateString()}) */}
                {item.from}
              </Typography>
              " -{item.message}"
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      </div>
    );
  });

  useEffect(() => {
    fetchBanks();
  }, []);

  return (
    <div>
    <Typography> <h2 style={{textAlign:'center', display: messages.length > 0 ? '': 'none' }}>My Messages</h2></Typography>
    <List className={classes.root}>
        {messages.length > 0 ? (
            getItems()
        ): ""}
    </List>
    </div>
  );
}
