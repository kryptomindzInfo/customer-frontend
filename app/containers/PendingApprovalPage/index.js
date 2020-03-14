/**
 *
 * PendingApprovalPage
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
import makeSelectPendingApprovalPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import axios from 'axios';
import UploadArea from 'components/UploadArea';

import history from 'utils/history';

import { API_URL, STATIC_URL, CONTRACT_URL } from '../App/constants';

import HeaderChooseYourBank from '../../components/HeaderChooseYourBank';
import { Typography, Grid, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import MainHeader from '../MainHeader';
import Loader from 'components/Loader';


const styles = theme => ({
  uploadDocumentsTitle: {
    paddingTop: '8%',
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
  uploadedFiles: {
    width: '100px',
    margin: '10px auto',
  },
  uploadedFilesImg: {
    width: '100%',
    height: 'auto'
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

class PendingApprovalPage extends Component {
  // useInjectReducer({ key: 'uploadDocumentsPage', reducer });
  // useInjectSaga({ key: 'uploadDocumentsPage', saga });

  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      pdfIcon: 'main/pdf-icon.png',
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
 
     var  method = 'ipfsUpload';
     this.setState({
       pdfIcon: 'main/loading.gif'
     });

    axios
      .post(`${API_URL}/${method}?token=`, formData, config)
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            let files = this.state.documents;
            files.push(res.data.name);

            this.setState({
              documents: files,
              pdfIcon: 'main/pdf-icon.png'
            });
          }
        } else {
          throw res.data.error;
        }
      })
      .catch(err => {
        this.setState({
          pdfIcon: 'main/pdf-icon.png'
        });
        this.props.notify(err.response ? err.response.data.error : err.toString(), 'error');
      });
  }

  saveDocuments = event => {
    event.preventDefault();
    const mobile = localStorage.getItem("customerMobile");
    if (!this.state.documents ||this.state.documents.length <= 0) {
      this.props.notify('You need to upload a document', 'error');
    } else {
      axios
      .post(`${API_URL}/saveUserDocuments`, {
        mobile: mobile,
        documents: this.state.documents
      })
      .then(res => {
        console.log(res.data);
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
           // history.push('/pending-approval');
          }
        } else {
          throw res.data.error;
        }
      })
      .catch(err => {
        this.setState({
          pdfIcon: 'main/pdf-icon.png'
        });
        this.props.notify(err.response ? err.response.data.error : err.toString(), 'error');
      });
      
    }
  };

  render() {
    const { classes } = this.props;
    const dis = this;
    return (
      <div>
        <Helmet>
          <title>Upload Documents</title>
          <meta
            name="description"
            content="Description of PendingApprovalPage"
          />
        </Helmet>
        <HeaderChooseYourBank />
        <Typography className={classes.uploadDocumentsTitle} variant="h4">
          Your account has been submitted for approval!
        </Typography>
      </div>
    );
  }
}

// PendingApprovalPage.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//   uploadDocumentsPage: makeSelectPendingApprovalPage(),
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

export default withStyles(styles)(PendingApprovalPage);
