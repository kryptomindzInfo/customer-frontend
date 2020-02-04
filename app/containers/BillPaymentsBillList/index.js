/**
 *
 * BillPaymentsBillList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectBillPaymentsBillList from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function BillPaymentsBillList() {
  useInjectReducer({ key: 'billPaymentsBillList', reducer });
  useInjectSaga({ key: 'billPaymentsBillList', saga });

  return (
    <div>
      <Helmet>
        <title>BillPaymentsBillList</title>
        <meta
          name="description"
          content="Description of BillPaymentsBillList"
        />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

BillPaymentsBillList.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  billPaymentsBillList: makeSelectBillPaymentsBillList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(BillPaymentsBillList);
