/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

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
// const AppWrapper = styled.div`
//   max-width: calc(768px + 16px * 2);
//   margin: 0 auto;
//   display: flex;
//   min-height: 100%;
//   padding: 0 16px;
//   flex-direction: column;
// `;

export default function App() {
  const notify = (txt, type) => {
    if(txt && type){
      if(type == 'success'){
        toast.success(txt);  
      }else if(type == 'warn'){
        toast.warn(txt);
      }else if(type == 'error'){
        toast.error(txt);
      }else{
        toast(txt);
      }
    }
  };
  return (
    // <AppWrapper>
    <div>
      <Switch>
        <Route exact path="/" render={(props) => <SignInPage {...props} notify={notify} />} />
        <Route exact path="/sign-up"render={(props) => <SignUpPage {...props} notify={notify} />}  />
         <Route exact path="/sign-up-verify" render={(props) => <SignupOTP {...props} notify={notify} />}  />
        <Route exact path="/sign-in" component={SignInPage} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route
          exact
          path="/otp-forgot-password"
          component={OtpForgotPassword}
        />
        <Route exact path="/choose-bank" component={ChooseYourBankPage} />
        <Route exact path="/upload-documents" component={UploadDocumentsPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/contact" component={ContactPage} />
        <Route exact path="/bill-payments-merchants" component={BillPaymentsPage} />
        <Route exact path="/bill-list" component={BillPaymentsBillList} />

        <Route path="/features" component={FeaturePage} />
        <Route path="/termsConditions" component={TermsConditions} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>

    // </AppWrapper>
  );
}
