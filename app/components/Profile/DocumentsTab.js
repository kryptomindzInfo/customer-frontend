/**
 *
 * DocumentsTab
 *
 */

import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import pdfFileIcon from '../../images/pdf_icon.png';
import documentFileIcon from '../../images/document_icon.png';
import { API_URL, CONTRACT_URL } from '../../containers/App/constants';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  documentContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  documentCard: {
    display: 'flex',
    flexDirection: 'column',
    width: '178px',
    height: '150px',
    borderRadius: '5px',
    justifyContent: 'center',
    marginLeft: '20px',
    marginTop: '20px',
    alignItems: 'center',
    border: 'solid 1px #e9eff4',
    cursor: 'pointer',
    '&:hover': {
      border: 'solid 1px #4da1ff',
    },
  },
  documentsTab: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

class DocumentsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documentList: [
        {
          hash: '1',
          name: 'contract',
          type: 'application/pdf',
        },
        {
          hash: '2',
          name: 'Identity',
          type: 'application/docs',
        },
      ],
    };
  }

  componentDidMount = async () => {
    const { username } = JSON.parse(localStorage.getItem('loggedUser'));
    const res = await axios.get(`${API_URL}/user/getDetails`, { username });
    if (res.data.status === 1) {
      localStorage.setItem('loggedUser', JSON.stringify(res.data.user));
      this.setState({ documentList: res.data.user.docs_hash });
    } else {
      console.log('Error');
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.documentContainer}>
          <span style={{ fontWeight: '600' }}>Documents</span>
          <div className={classes.documentsTab}>
            {this.state.documentList.length > 0 ? (
              this.state.documentList.map((value, index) => (
                <a target="_blank" href={`${CONTRACT_URL}/${value.hash}`}>
                  <div key={index} className={classes.documentCard}>
                    <img
                      width={60}
                      height={70}
                      src={
                        value.type === 'application/pdf'
                          ? pdfFileIcon
                          : documentFileIcon
                      }
                    />
                    <span style={{ marginTop: '20px' }}>{value.name}</span>
                  </div>
                </a>
              ))
            ) : (
              <div className={classes.documentCard}>
                <span>No documents uploaded</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DocumentsTab);
