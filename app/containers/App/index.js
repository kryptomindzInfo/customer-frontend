/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import { toast } from 'react-toastify';
import GlobalStyle from '../../global-styles';
import SignUpPage from '../SignUpPage';
import SignInPage from '../SignInPage';
import ForgotPassword from '../ForgotPassword';
import OtpForgotPassword from '../OtpForgotPassword';
import ChooseYourBankPage from '../ChooseYourBankPage';
import UploadDocumentsPage from '../UploadDocumentsPage';
import Dashboard from '../Dashboard';
import ContactPage from '../ContactPage';
import BillPaymentsPage from '../BillPaymentsPage';
import BillPaymentsBillList from '../BillPaymentsBillList';
import TermsConditions from '../../components/TermsConditions';
import SignupOTP from '../SignupOTP';
import ProfilePage from '../ProfilePage';
import { ProtectedRoute } from './ProtectedRoute';

import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import VerificationLandingPage from '../VerificationLandingPage';

toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});
// const AppWrapper = styled.div`
//   max-width: calc(768px + 16px * 2);
//   margin: 0 auto;
//   display: flex;
//   min-height: 100%;
//   padding: 0 16px;
//   flex-direction: column;
// `;

export default function App() {
  const AUTH_TOKEN = localStorage.getItem('customerLogged');
  axios.defaults.headers.common.Authorization = AUTH_TOKEN;
  const notify = (txt, type) => {
    if (txt && type) {
      if (type == 'success') {
        toast.success(txt);
      } else if (type == 'warn') {
        toast.warn(txt);
      } else if (type == 'error') {
        toast.error(txt);
      } else {
        toast(txt);
      }
    }
  };
  return (
    // <AppWrapper>
    <Fragment>
      <Switch>
        <Route
          exact
          path="/"
          render={props => <SignInPage {...props} notify={notify} />}
        />
        <Route
          exact
          path="/sign-up"
          render={props => <SignUpPage {...props} notify={notify} />}
        />
        <Route
          exact
          path="/sign-up-verify"
          render={props => <SignupOTP {...props} notify={notify} />}
        />
        <Route exact path="/sign-in" component={SignInPage} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route
          exact
          path="/otp-forgot-password"
          component={OtpForgotPassword}
        />
        <ProtectedRoute
          exact
          path="/choose-bank"
          component={ChooseYourBankPage}
        />
        <ProtectedRoute
          exact
          path="/upload-documents"
          component={UploadDocumentsPage}
        />
        <ProtectedRoute
          exact
          path="/dashboard"
          notify={notify}
          component={Dashboard}
        />
        <ProtectedRoute exact path="/contact" component={ContactPage} />
        <ProtectedRoute
          exact
          path="/bill-payments-merchants"
          component={BillPaymentsPage}
        />
        <ProtectedRoute
          exact
          path="/bill-list"
          component={BillPaymentsBillList}
        />

        <ProtectedRoute path="/features" component={FeaturePage} />
        <ProtectedRoute path="/termsConditions" component={TermsConditions} />
        <ProtectedRoute
          path="/profile"
          component={ProfilePage}
          notify={notify}
        />
        <ProtectedRoute
          exact
          path="/user-verification"
          component={VerificationLandingPage}
          notify={notify}
        />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </Fragment>
  );
}
