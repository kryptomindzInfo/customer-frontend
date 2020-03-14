/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React,  { useState, useEffect }from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../../global-styles';
import SignUpPage from '../SignUpPage';
import SignInPage from '../SignInPage';
import ForgotPassword from '../ForgotPassword';
import OtpForgotPassword from '../OtpForgotPassword';
import ChooseYourBankPage from '../ChooseYourBankPage';
import UploadDocumentsPage from '../UploadDocumentsPage';
import PendingApprovalPage from '../PendingApprovalPage';
import Dashboard from '../Dashboard';
import ContactPage from '../ContactPage';
import BillPaymentsPage from '../BillPaymentsPage';
import BillPaymentsBillList from '../BillPaymentsBillList';
import TermsConditions from '../../components/TermsConditions';
import SignupOTP from '../SignupOTP';
import FontFaceObserver from 'fontfaceobserver';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { green, orange } from '@material-ui/core/colors';

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
//localStorage.removeItem("theme");
let savedTheme = localStorage.getItem("theme");
savedTheme = (savedTheme) ? JSON.parse(savedTheme) : null;
// const appTheme = {
//   primary: (savedTheme && savedTheme.palette.primary) ? savedTheme.palette.primary : '#417505',
//   secondary: (savedTheme && savedTheme.palette.secondary) ? savedTheme.palette.secondary : '#6cac69',
//   accent: (savedTheme && savedTheme.accent) ? savedTheme.accent : '#f5a623',
//   danger: '#f52828',
//   light: (savedTheme && savedTheme.light) ? savedTheme.light : '#9ea0a5',
//   greyLine: '#666565 ',
//   vGradient: 'linear-gradient(to bottom, #6cac6a, #102910)',
//   hGradient: (savedTheme && savedTheme.palette.hGradient) ? savedTheme.palette.hGradient: 'linear-gradient(to right, #6cac6a 1%, #000)',
//   font: 'Roboto',
//   fontSize: '14px',
// };
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

const appTheme = createMuiTheme({
  palette: {
    primary: {
      main: (savedTheme && savedTheme.primary) ? savedTheme.primary.main : '#417505',
      hover: (savedTheme && savedTheme.primary) ? savedTheme.primary.hover: "#264503"
    },
    secondary: {
      main: (savedTheme && savedTheme.secondary) ? savedTheme.secondary.main :  '#6cac69',
      hover: (savedTheme && savedTheme.secondary) ? savedTheme.secondary.main : "#264503"
    },
    accent: {
      main: (savedTheme && savedTheme.accent) ? savedTheme.accent.main : '#f5a623',
      hover: (savedTheme && savedTheme.accent) ? savedTheme.accent.main : "#264503"
    },
    light: {
      main: (savedTheme && savedTheme.light) ? savedTheme.light.main :  '#9ea0a5',
      hover: (savedTheme && savedTheme.light) ? savedTheme.light.main : "#264503"
    },
    // greyLine: '#666565 ',
    white: 'white',
    main: '#417505',

    vGradient: 'linear-gradient(to bottom, #6cac6a, #102910)',
    hGradient: (savedTheme && savedTheme.hGradient) ? savedTheme.hGradient.main : 'linear-gradient(to right, #6cac6a 1%, #102910)',
    // font: 'Roboto',
    // fontSize: '14px',
  },
  status: {
    danger: orange,
  },
  typography: {
    color: 'white',
    fontFamily: ['Montserrat', 'sans-serif'].join(),
  },
  
});

export default function App() {
  const [theme, setTheme2] = useState(appTheme);
  // let [theme] = useState(appTheme);
  const setTheme = (the) => {
    // appTheme.palette = the.palette;
    // theme = the;
    console.log(the);

    const updthe = createMuiTheme({
      palette: the,
      status: {
        danger: orange,
      },
      typography: {
        color: 'white',
        fontFamily: ['Montserrat', 'sans-serif'].join(),
      },
     });
    
    console.log(updthe);

    setTheme2(updthe);
  }
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
    <MuiThemeProvider theme={theme}>
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
        <Route exact path="/choose-bank" render={(props) => <ChooseYourBankPage {...props} setTheme={setTheme} appTheme={theme}   notify={notify}/>}/>
        <Route exact path="/upload-documents" render={(props) => <UploadDocumentsPage {...props} notify={notify} />} />
        <Route exact path="/pending-approval" render={(props) => <PendingApprovalPage {...props} notify={notify} />} />
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
    </MuiThemeProvider>

    // </AppWrapper>
  );
}
