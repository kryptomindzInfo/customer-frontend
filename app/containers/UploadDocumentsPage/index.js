/**
 *
 * UploadDocumentsPage
 *
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';

import history from 'utils/history';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import UploadArea from '../../components/UploadArea';
import DocImage from '../../images/file-document-outline.png';
import { API_URL, CONTRACT_URL } from '../App/constants';
import pdfFileIcon from '../../images/pdf_icon.png';
import documentFileIcon from '../../images/document_icon.png';

import HeaderChooseYourBank from '../../components/HeaderChooseYourBank';

const styles = theme => ({
  uploadDocumentsTitle: {
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
  mainContainer: {
    paddingTop: '2%',
  },
  signInButton: {
    // margin: theme.spacing.unit,
    background: theme.palette.primary.main,
    // marginLeft: theme.spacing.unit,
    marginTop: '10%',
    color: theme.palette.white,
    fontSize: '19px',
    height: '3rem',
    width: '50%',
    '&:hover': {
      background: theme.palette.primary.hover,
    },
  },
  uploadAreaGrid: {
    [theme.breakpoints.down('sm')]: {
      paddingRight: '3%',
      // paddingBottom: '11%',
      margin: '0 auto',
      textAlign: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      // paddingLeft: '5%',
      // paddingBottom: '11%',
      paddingRight: '0',

      margin: '0 auto',
      textAlign: 'center',
    },
  },
  fileUploadDescription: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    lineHeight: '9px',
    fontFamily: 'Helvetica',
    fontSize: '14px',
  },
  skipButton: {
    marginRight: '20 px',
    marginTop: '10%',
    width: '200px',
    color: theme.palette.primary.light,
    fontSize: '19px',
    height: '3rem',
  },
});

class UploadDocumentsPage extends Component {
  // useInjectReducer({ key: 'uploadDocumentsPage', reducer });
  // useInjectSaga({ key: 'uploadDocumentsPage', saga });

  constructor(props) {
    super(props);
    this.state = {
      document1: '',
      fileHashes: [],
      notification: '',
    };
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    // this.success = this.success.bind(this);
    // this.error = this.error.bind(this);
    // this.warn = this.warn.bind(this);
  }

  triggerBrowse = inp => {
    const input = document.getElementById(inp);
    input.click();
  };

  getImages = () => {
    const hashList = [];
    console.log(this.state.fileHashes)
    console.log(CONTRACT_URL)

    this.state.fileHashes.forEach((hash, i) => {
      hashList.push(

        <Paper
          elevation={0}
          style={{
            marginTop: '15px',
            backgroundColor: ""
          }}
        >
          <center>

            <a target="_blank" href={`${CONTRACT_URL}${hash.hash}`}>
              <img src={documentFileIcon}
                width="50"
                height="50"


              />

              <br />
              <span style={{ marginTop: '50px' }}>{hash.name}</span>
            </a>
          </center>


          {/* <object
            key={i}
            color="primary"
            data={`${CONTRACT_URL}${hash.hash}`}
            alt=""
            width="300"
            height="200"


          /> */}
        </Paper >,
      );
    });
    return hashList;
  };

  onChange(e) {
    if (e.target.files !== undefined) {
      Object.values(e.target.files).map(file => {
        this.fileUpload(file, e.target.getAttribute('data-key'));
      });
    }
  }

  fileUpload(file, key) {
    const doc = {};
    doc.name = file.name;
    doc.type = file.type;
    const formData = new FormData();
    //  formData.append('token',token);
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    let method = 'fileUpload';

    if (key === 'contract') {
      method = 'ipfsUpload';
    }

    const token = localStorage.getItem('customerLogged');

    axios
      .post(`${API_URL}/${method}?token=${token}`, formData, config)
      .then(res => {
        if (res.status === 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            doc.hash = res.data.hash;
            this.setState((prevState, props) => ({
              [key]: res.data.name,
              fileHashes: [...prevState.fileHashes, doc],
            }));
          }
        } else {
          throw res.data.error;
        }
      })
      .catch(err => {
        this.setState({
          notification: err.response ? err.response.data.error : err.toString(),
        });
        this.error();
      });
  }

  saveDocuments = event => {
    event.preventDefault();
    if (this.state.document1 == null || this.state.document1 == '') {
      this.setState(
        {
          notification: 'You need to upload a contract',
        },
        // () => {
        //   this.error();
        // },
      );
    } else {
      history.push('/dashboard');
    }
  };

  addHashes(list) {
    const data = {};
    const controller = 'saveUploadedDocsHash';
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    data.username = user.username;
    if (list.length > 0) {
      data.hashes = list;
    }
    axios
      .post(`${API_URL}/user/${controller}`, data)
      .then(res => {
        if (res.status === 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            this.setState((prevState, props) => ({
              fileHashes: [],
            }));
            user.status = 3;
            localStorage.setItem('loggedUser', JSON.stringify(user));
            history.push('/user-verification');
          }
        } else {
          throw res.data.error;
        }
      })
      .catch(err => {
        this.setState({
          notification: err.response ? err.response.data.error : err.toString(),
        });
        this.error();
      });
  }

  skipUpload = () => {
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    axios
      .post(`${API_URL}/user/skipDocsUpload`, user.username)
      .then(res => {
        if (res.data.status === 1) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            this.setState(() => ({
              fileHashes: [],
            }));
            user.status = 4;
            localStorage.setItem('loggedUser', JSON.stringify(user));
            history.push('/user-verification');
          }
        } else {
          throw res.data.error;
        }
      })
      .catch(err => {
        this.setState({
          notification: err.response ? err.response.data.error : err.toString(),
        });
        this.error();
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Helmet>
          <title>Upload Required Documents</title>
          <meta
            name="description"
            content="Description of UploadDocumentsPage"
          />
        </Helmet>
        <HeaderChooseYourBank />
        <Typography className={classes.uploadDocumentsTitle} variant="h4">
          Upload Documents
        </Typography>
        <Grid container className={classes.mainContainer}>
          <Grid item md={4} sm={6} xs={12}>
            <Typography style={{ paddingLeft: '7%' }} variant="h6">
              Please upload the following documents:
            </Typography>
            <ol style={{ paddingLeft: '11%', paddingBottom: '11%' }}>
              <li>National Id</li>
              <li>Passport</li>
              <li>Driving Lisence</li>
            </ol>
          </Grid>
          <Grid item className={classes.uploadAreaGrid} md={4} sm={6} xs={11}>
            <form onSubmit={this.saveDocuments}>
              <UploadArea>
                {this.state.document1 ? (
                  <a
                    className="uploadedImg"
                    href={CONTRACT_URL + this.state.document1}
                    target="_BLANK"
                  />
                ) : (
                    ' '
                  )}
                <div
                  className="uploadTrigger"
                  onClick={() => this.triggerBrowse('contract')}
                >
                  <input
                    type="file"
                    id="contract"
                    onChange={this.onChange}
                    data-key="contract"
                    multiple
                    accept=".pdf,.docs,.png,.jpeg"
                  />
                  {!this.state.document1 ? (
                    <i
                      style={{ color: '#417505', marginBottom: '20px' }}
                      className="material-icons"
                    >
                      cloud_upload
                    </i>
                  ) : (
                      ' '
                    )}

                  <label>
                    {!this.state.document1 ? (
                      // <FormattedMessage {...messages.popup10} />
                      <div className={classes.fileUploadDescription}>
                        <span>Drag and drop here </span>
                        <br />
                        <span>or</span>
                        <br />
                        <span style={{ color: '#417505' }}>browse</span>
                      </div>
                    ) : (
                        <span />
                      )}
                  </label>
                </div>
              </UploadArea>
              <Grid
                container
                justify="space-evenly"
                alignItems="center"
                direction="row"
              >
                <Button
                  disabled={this.state.fileHashes.length === 0}
                  variant="contained"
                  type="submit"
                  onClick={() => this.addHashes(this.state.fileHashes)}
                  // disabled={isSubmitting}
                  className={classes.signInButton}
                >
                  SAVE
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  onClick={() => this.skipUpload()}
                  className={classes.skipButton}
                >
                  Skip
                </Button>
              </Grid>
            </form>
          </Grid>
          <Grid
            md={4}
            sm={6}
            xs={11}
            container
            justify="center"
            alignItems="center"
            direction="column"

          >
            {this.getImages()}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(UploadDocumentsPage);
