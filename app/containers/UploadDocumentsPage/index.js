/**
 *
 * UploadDocumentsPage
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
import makeSelectUploadDocumentsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import UploadArea from 'components/UploadArea';

import history from 'utils/history';

import { API_URL, STATIC_URL, CONTRACT_URL } from '../App/constants';

import HeaderChooseYourBank from '../../components/HeaderChooseYourBank';
import { Typography, Grid, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import MainHeader from '../MainHeader';

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
    marginBottom: '8%',
    color: theme.palette.white,
    fontSize: '19px',
    height: '3rem',
    width: '100%',
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
});

class UploadDocumentsPage extends Component {
  // useInjectReducer({ key: 'uploadDocumentsPage', reducer });
  // useInjectSaga({ key: 'uploadDocumentsPage', saga });

  constructor(props) {
    super(props);
    this.state = {
      document1: '',
      document2: '',
      document3: '',
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
  onChange(e) {
    if (e.target.files && e.target.files[0] != null) {
      this.fileUpload(e.target.files[0], e.target.getAttribute('data-key'));
    }
  }
  fileUpload(file, key) {
    const formData = new FormData();
    //  formData.append('token',token);
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    var method = 'fileUpload';

    if (key == 'contract') {
      method = 'ipfsUpload';
    }

    axios
      .post(`${API_URL}/${method}?token=${token}`, formData, config)
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            this.setState({
              [key]: res.data.name,
            });
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
      history.push('/');
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Helmet>
          <title>Upload Documents</title>
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
              <li>Document</li>
              <li>Document</li>
              <li>Document</li>
            </ol>
          </Grid>
          <Grid item className={classes.uploadAreaGrid} md={4} sm={6} xs={11}>
            <form onSubmit={this.saveDocuments}>
              <UploadArea bgImg={STATIC_URL + 'main/pdf-icon.png'}>
                {this.state.contract ? (
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
                  onClick={() => this.triggerBrowse('document1')}
                >
                  <input
                    type="file"
                    id="contract"
                    onChange={this.onChange}
                    data-key="contract"
                    accept=".pdf"
                  />
                  {!this.state.contract ? (
                    <i className="material-icons">cloud_upload</i>
                  ) : (
                    ' '
                  )}

                  <label>
                    {!this.state.document1 ? (
                      // <FormattedMessage {...messages.popup10} />
                      <span>Upload Contract</span>
                    ) : (
                      <span>Change Contract</span>
                    )}
                    *
                    <p>
                      <span style={{ color: 'red' }}>* </span>Only PDF allowed{' '}
                    </p>
                  </label>
                </div>
              </UploadArea>
              <Button
                variant="contained"
                type="submit"
                // disabled={isSubmitting}
                className={classes.signInButton}
              >
                SAVE
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

// UploadDocumentsPage.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//   uploadDocumentsPage: makeSelectUploadDocumentsPage(),
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

export default withStyles(styles)(UploadDocumentsPage);
