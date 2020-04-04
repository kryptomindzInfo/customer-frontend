/**
 *
 * DocumentsTab
 *
 */

import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import pdfFileIcon from '../../images/pdf_icon.png';
import documentFileIcon from '../../images/document_icon.png';
import imageFileIcon from '../../images/jpg_icon.png';

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
          id: '1',
          fileName: 'contract',
          fileType: 'pdf',
        },
        {
          id: '2',
          fileName: 'Identity',
          fileType: 'pdf',
        },
        {
          id: '3',
          fileName: 'Pan',
          fileType: 'doc',
        },
      ],
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.documentContainer}>
          <span style={{ fontWeight: '600' }}>Documents</span>
          <div className={classes.documentsTab}>
            <div className={classes.documentCard}>
              <img width={60} height={70} src={pdfFileIcon} />
              <span style={{ marginTop: '20px' }}>Contract</span>
            </div>
            <div className={classes.documentCard}>
              <img width={60} height={70} src={documentFileIcon} />
              <span style={{ marginTop: '20px' }}>Agreement</span>
            </div>
            <div className={classes.documentCard}>
              <img width={60} height={70} src={imageFileIcon} />
              <span style={{ marginTop: '20px' }}>Photo</span>
            </div>
            <div className={classes.documentCard}>
              <img width={60} height={70} src={documentFileIcon} />
              <span style={{ marginTop: '20px' }}>Agreement</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DocumentsTab);
