/**
 *
 * DocumentsTab
 *
 */

import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import pdfFileIcon from '../../images/pdf_icon.png';
import documentFileIcon from '../../images/document_icon.png';

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
    // const user = JSON.parse(localStorage.getItem('loggedUser'));
    // const payload = {
    //   token: user.token,
    // };
    // const res = await axios.post(`${API_URL}/user/getUser`, payload);
    // if (res.status === 200) {
    //   this.setState({ documentList: res.data.docsHash });
    // } else {
    //   console.log('Error');
    // }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.documentContainer}>
          <span style={{ fontWeight: '600' }}>Documents</span>
          <div className={classes.documentsTab}>
            {this.state.documentList.map((value, index) => (
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
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DocumentsTab);
