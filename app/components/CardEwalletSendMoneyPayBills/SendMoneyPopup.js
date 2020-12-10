import React, { Fragment, useEffect } from 'react';
import Button from '@material-ui/core/Button';
// import Button from 'components/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { FormControlLabel, Grid, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { Form, Formik, useField } from 'formik';
import * as Yup from 'yup';
import { boolean } from 'yup';
import axios from 'axios';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import MuiCheckbox from '@material-ui/core/Checkbox/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { API_URL, CURRENCY } from '../../containers/App/constants';
import Blur from '../Blur';
import CountrySelectBox from '../Selectors/CountrySelectBox';
import TypeSelectBox from '../Selectors/TypeSelectBox';

const dialogTilteStyles = () => ({
  root: {
    margin: 0,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'orange',
  },
  closeButton: {
    position: 'absolute',
    color: 'white',
  },
});

const DialogTitle = withStyles(dialogTilteStyles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const dialogStyles = () => ({
  paper: {
    borderRadius: '20px',
    minHeight: '92%',
    maxHeight: '92%',
    minWidth: '60%',
    maxWidth: '60%',
  },
  toWalletPaper: {
    borderRadius: '20px',
    minHeight: '80%',
    maxHeight: '80%',
    minWidth: '70%',
    maxWidth: '70%',
  },
});

const verifyDialogStyles = () => ({
  paper: {
    minHeight: '50%',
    maxHeight: '50%',
    minWidth: '50%',
    maxWidth: '50%',
  },
});

const VerifyDialogModal = withStyles(verifyDialogStyles)(Dialog);
const DialogModal = withStyles(dialogStyles)(Dialog);

export const Checkbox = ({ ...props }) => {
  const [field] = useField(props.name);

  return (
    <MuiCheckbox
      {...field}
      style={{
        color: 'rgb(53, 153, 51)',
        '&$checked': {
          color: 'rgb(53, 153, 51)',
        },
      }}
      checked={field.value}
    />
  );
};

const dialogContentStyles = makeStyles(theme => ({
  '@global': {
    'MuiOutlinedInput-input': {
      padding: '12.5px 10px 12.5px 10px',
    },
  },
  dialogNonWallet: {
    paddingTop: '5%',
  },
  dialogGridLeft: {
    marginTop: '5%',
    paddingTop: '5%',
    paddingBottom: '2%',
    paddingLeft: '10%',
    paddingRight: '2%',
  },
  dialogGridRight: {
    paddingTop: '5%',
    paddingBottom: '2%',
    paddingRight: '10%',
    paddingLeft: '2%',
    marginRight: '5px',
  },
  dialogTextFieldGrid: {
    paddingLeft: '1%',
    paddingRight: '1%',
    paddingBottom: '1%',
  },
  dialogTextField: {
    paddingLeft: '1%',
    paddingRight: '1%',
  },
  dialogTextFieldGridErrorText: {
    color: 'red',
    fontSize: '10px',
  },
  dialogTextFieldFullRow: {
    padding: '0.5%',
    marginBottom: '5px',
  },
  dialogSubHeader: {
    paddingBottom: '2%',
    paddingRight: '3%',
    paddingLeft: '3%',
  },
  dialogButton: {
    padding: '2%',
  },
  dialogPaper: {
    color: 'grey',
    padding: '2%',
    height: '80%',
    width: '95%',
  },
  noteTextField: {
    height: '70px',
  },
  toggleButtonGroup: {
    color: 'green',
    marginTop: '10px',
  },
  toggleButton: {
    width: '150px',
    background: '#1a841b',
    color: '#fff',
    '&:hover': {
      background: '#1a841b',
      color: '#fff',
    },
  },
  toggleButtonDisabled: {
    color: '#1a841b',
    border: '1px solid #1a841b',
  },
  otpTextField: {
    margin: '80px',
    marginTop: '150px',
    marginBottom: '5px',
  },
  resendText: {
    fontSize: '12px',
    marginRight: '80px',
    marginLeft: '80px',
    marginBottom: '10px',
  },
  proceedButton: {
    paddingTop: '1%',
    paddingBottom: '1%',
  },
  inputFeedback: {
    color: 'red',
    marginBottom: '.5rem',
    fontSize: '11px',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    fontWeight: '600',
    fontSize: '14px',
  },
}));

const SendMoneyPopup = props => {
  const classes = dialogContentStyles();
  const [open, setOpen] = React.useState(props.open);
  const [verifyPopup, setVerifyPopup] = React.useState(false);
  const [isWallet, setIsWallet] = React.useState(true);
  const [format, setFormat] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [popupLoading, setPopupLoading] = React.useState(true);
  const [fee, setFee] = React.useState(0);
  const [interbank, setInterBank] = React.useState(true);
  const [amount, setAmount] = React.useState('');
  const [isValidFee, setIsValidFee] = React.useState(false);
  const [walletUserName, setWalletUserName] = React.useState('');
  const [otpnumber, setotpnumber] = React.useState("")
  const [verifyotpbutton, setverifyotpbutton] = React.useState(false)

  const getFeeWithDummyValue = async transType => {
    let trans_type = '';
    if (transType === 'Wallet To Wallet') {
      trans_type = 'Wallet to Wallet'
    } else {
      trans_type = 'Wallet to Non Wallet'
    }
    try {
      const res = await axios.post(`${API_URL}/user/checkFee`, {
        amount: 45,
        trans_type,
      });
      if (res.data.status === 1) {
        setIsValidFee(true);
        setPopupLoading(false);
      } else {
        setPopupLoading(false);
        setIsValidFee(false);
        props.notify(res.data.message, 'error');
      }
    } catch (e) {
      console.log('fwfwfwwf');
      setPopupLoading(false);
      setIsValidFee(false);
      props.notify(error.response.data.error, 'error');
    }
  };

  useEffect(() => {
    console.log(popupLoading);
    getFeeWithDummyValue('Non Wallet To Wallet');
  }, [isValidFee]);

  const getUser = value => {
    if (value) {
      if (value.length === 10) {
        return new Promise((resolve, reject) => {
          axios
            .post(`${API_URL}/user/getUser`, {
              mobile: value,
            })
            .then(res => {
              if (res.data.error || res.data.user.status !== 1) {
                setWalletUserName('');
                resolve(false);
                return false;
              }
              setWalletUserName(res.data.user.name);
              resolve(true);
              return true;
            })
            .catch(err => {
              setWalletUserName('');
              resolve(false);
              return false;
            });
        });
      }
      return false;
    }
    return false;
  };

  const getFee = (amount) => {
    let method = '';
    let type = '';
    let trans_type = '';
    if (isWallet) {
      if (interbank) {
        method = 'interBank/checkFee'
        type = 'IBWNW'
      } else {
        method = 'checkFee';
        trans_type = 'Wallet to Non Wallet'
      }
    } else {
      if (interbank) {
        method = 'interBank/checkFee'
        type = 'IBWW'
      } else {
        method = 'checkFee';
        trans_type = 'Wallet to Wallet'
      }
    }
    if (amount) {
      axios
        .post(`${API_URL}/user/${method}`, {
          amount,
          type,
          trans_type,
        })
        .then(res => {
          if (res.data.error) {
            setFee(0);
            setIsValidFee(false);
            props.notify(res.data.error, 'error');
          }
          if (res.data.status === 1) {
            setFee(res.data.fee);
            setIsValidFee(true);
          }
        })
        .catch(error => {
          setPopupLoading(false);
          setIsValidFee(false);
          setFee(0);
          props.notify(error.response.data.error, 'error');
        });
    }
  };

  const handleFeeTypeChange = (inter, amount) => {
    setAmount(amount);
    setInterBank(inter);
  };

  const handleClose = () => {
    props.onClose();
    setOpen(false);
  };

  const handleOnProceedClick = () => {
    setVerifyPopup(true);
    handleClose();
  };

  const handleVerifyClose = () => {
    setVerifyPopup(false);
  };

  const handleOnchange = (e, value) => {
    setFormat(value);
    if (value === 'wallet') {
      getFeeWithDummyValue('Wallet To Wallet');
      setFee(0);
      setIsWallet(false);
    }
    if (value === 'nonWallet') {
      getFeeWithDummyValue('Non Wallet To Wallet');
      setFee(0);
      setIsWallet(true);
    }
  };

  useEffect(() => {
    getFee(amount);
  }, [interbank]);

  const totalfuction = (values) => {
    console.log(values.sending_amount)
    if (values.sending_amount != "") {
      let getfees = parseInt(fee.toFixed(2))
      let getamount = parseInt((values.sending_amount - fee).toFixed(2))
      let gettotal = parseInt((values.sending_amount + fee).toFixed(2))
      return `Collect ${gettotal}`
      // return `Amount ${getamount} + Fees ${getfees} = Total ${gettotal}`
    }

  }



  const { mobile } = JSON.parse(localStorage.getItem('loggedUser'));
  // console.log(fee)
  return (
    <Fragment>
      <DialogModal
        maxWidth="lg"
        fullWidth
        open={props.open}
        onClose={handleClose}
        disableBackdropClick
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          style={{ fontWeight: '600' }}
          id="customized-dialog-title"
        // onClose={handleClose}
        >
          <div>
            <span>Send Money</span>
          </div>
          <div>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Grid xs={12} md={12} container direction="column" alignItems="center">
          <Grid item>
            <ToggleButtonGroup
              className={classes.toggleButtonGroup}
              size="small"
              value="center"
              onChange={handleOnchange}
              exclusive
            >
              <ToggleButton
                key={2}
                value="wallet"
                className={
                  !isWallet
                    ? classes.toggleButton
                    : classes.toggleButtonDisabled
                }
              >
                To Wallet
              </ToggleButton>
              <ToggleButton
                key={1}
                value="nonWallet"
                className={
                  isWallet ? classes.toggleButton : classes.toggleButtonDisabled
                }
              >
                To Non Wallet
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        {popupLoading ? (
          <CircularProgress
            size={40}
            thickness={5}
            color="primary"
            style={{ position: 'absolute', bottom: '50%', left: '50%' }}
          />
        ) : isWallet ? (
          <Blur isValidFee={isValidFee}>
            <Formik
              initialValues={{
                note: '',
                ccode: '+221',
                withoutID: false,
                requireOTP: false,
                receiverMobile: '',
                receiverGivenName: '',
                receiverFamilyName: '',
                receiverAddress: '',
                receiverState: '',
                receiverZip: '',
                receiverCountry: 'Senegal',
                receiverEmail: '',
                receiverIdentificationCountry: 'Senegal',
                acceptedTerms: false,
                receiverIdentificationType: '',
                receiverIdentificationNumber: '',
                receiverIdentificationValidTill: '',
                sending_amount: '',
                isInclusive: false,
                interbank: true,
              }}
              onSubmit={async values => {
                setLoading(true);
                try {
                  let API = "";
                  if (values.interbank) {
                    API = 'user/interBank/sendMoneyToNonWallet';
                  } else {
                    API = 'user/sendMoneyToNonWallet';
                  }
                  const res = await axios.post(
                    `${API_URL}/${API}`,
                    values,
                  );
                  console.log(res)
                  console.log(res.status)
                  if (res.status === 200) {
                    if (res.data.status === 0) {
                      props.notify(res.data.message, 'error');
                    } else {
                      props.notify('Transaction Successful!', 'success');
                      setLoading(false);
                      window.location = "/dashboard"
                      handleClose();
                    }
                  } else {
                    props.notify(res.data.error, 'error');
                  }
                  setLoading(false);
                } catch (err) {
                  props.notify("Something went wrong", 'error');
                  setLoading(false);
                }
              }}
              validationSchema={Yup.object().shape({
                receiverMobile: Yup.string()
                  .matches(
                    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                    'Mobile no must be valid',
                  )
                  .required('Mobile no is required'),
                receiverIdentificationCountry: Yup.string().required(
                  'Country is required',
                ),
                receiverEmail: Yup.string()
                  .email('Email is invalid')
                  .required('Email is required'),
                receiverFamilyName: Yup.string()
                  .required('Family Name is required'),
                receiverGivenName: Yup.string()
                  .required('Given Name is required'),
                receiverIdentificationType: Yup.string().required(
                  'Type is required',
                ),
                receiverIdentificationNumber: Yup.number().required(
                  'Number no is required',
                ),
                receiverIdentificationValidTill: Yup.string().required(
                  'Date is required',
                ),
                sending_amount: Yup.number().required('Amount is required'),
                acceptedTerms: boolean().oneOf(
                  [true],
                  'You must accept the terms and conditions.',
                ),
              })}
            >
              {formikProps => {
                const {
                  values,
                  touched,
                  errors,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                } = formikProps;

                const handleDateChange = (date, field) => {
                  const formattedDate = new Date(date).toLocaleDateString();
                  setFieldValue(field, formattedDate, true);
                };

                const countryChange = event => {
                  const { value, name } = event.target;
                  const { title } = event.target.options[
                    event.target.selectedIndex
                  ];
                  if (name === 'receiverCountry') {
                    setFieldValue('ccode', title, true);
                  }
                  setFieldValue(name, value, true);
                };

                const receiverIdentificationTypeChange = event => {
                  const { value } = event.target;
                  setFieldValue('receiverIdentificationType', value, true);
                };

                return (
                  <Form onSubmit={handleSubmit}>
                    <Grid container direction="row">
                      <Grid item md={6} xs={12}>
                        <Grid
                          container
                          direction="column"
                          className={classes.dialogGridLeft}
                        >
                          <Grid
                            container
                            direction="row"
                            alignItems="flex-start"
                          >
                            <Grid
                              item
                              xs={2}
                              className={classes.dialogTextFieldGrid}
                            >
                              <TextField
                                size="small"
                                id="form-phone-pre"
                                label={values.ccode}
                                className={classes.formField}
                                variant="outlined"
                                name="ccode"
                                type="text"
                                disabled
                              />
                            </Grid>
                            <Grid
                              item
                              xs={10}
                              className={classes.dialogTextFieldGrid}
                            >
                              <TextField
                                disabled={!isValidFee}
                                size="small"
                                autoFocus
                                error={
                                  errors.receiverMobile &&
                                  touched.receiverMobile
                                }
                                name="receiverMobile"
                                id="form-phone"
                                label="Phone No"
                                fullWidth
                                placeholder=""
                                variant="outlined"
                                type="text"
                                value={values.receiverMobile}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={classes.dialogTextFieldGrid}
                                helperText={
                                  errors.receiverMobile &&
                                    touched.receiverMobile
                                    ? errors.receiverMobile
                                    : ''
                                }
                              />
                            </Grid>
                          </Grid>

                          <Grid
                            container
                            direction="row"
                            alignItems="flex-start"
                          >
                            <Grid
                              item
                              xs={6}
                              className={classes.dialogTextFieldGrid}
                            >
                              <TextField
                                disabled={!isValidFee}
                                size="small"
                                name="receiverGivenName"
                                id="form-given-name"
                                label="Given Name"
                                fullWidth
                                placeholder=""
                                variant="outlined"
                                type="text"
                                value={values.receiverGivenName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                // className={classes.dialogTextFieldGrid}
                                className={classes.dialogTextFieldGridFullRow}

                                error={
                                  errors.receiverGivenName &&
                                  touched.receiverGivenName
                                }
                                helperText={
                                  errors.receiverGivenName &&
                                    touched.receiverGivenName
                                    ? errors.receiverGivenName
                                    : ''
                                }

                              />
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              className={classes.dialogTextFieldGrid}
                            >
                              <TextField
                                disabled={!isValidFee}
                                size="small"
                                name="receiverFamilyName"
                                id="form-family-name"
                                label="Family Name"
                                fullWidth
                                placeholder=""
                                variant="outlined"
                                type="text"
                                value={values.receiverFamilyName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                // className={classes.dialogTextFieldGrid}
                                className={classes.dialogTextFieldGridFullRow}

                                error={
                                  errors.receiverFamilyName &&
                                  touched.receiverFamilyName
                                }
                                helperText={
                                  errors.receiverFamilyName &&
                                    touched.receiverFamilyName
                                    ? errors.receiverFamilyName
                                    : ''
                                }
                              />
                            </Grid>
                          </Grid>

                          <Grid
                            container
                            direction="row"
                            alignItems="flex-start"
                          >
                            <Grid
                              item
                              xs={12}
                              md={12}
                              className={classes.dialogTextFieldGrid}
                            >
                              <TextField
                                disabled={!isValidFee}
                                size="small"
                                name="receiverAddress"
                                id="form-address"
                                label="Address"
                                fullWidth
                                placeholder=""
                                variant="outlined"
                                type="text"
                                value={values.receiverAddress}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={classes.dialogTextFieldFullRow}
                              />
                            </Grid>
                          </Grid>

                          <Grid
                            container
                            direction="row"
                            alignItems="flex-start"
                          >
                            <Grid
                              item
                              xs={6}
                              className={classes.dialogTextFieldGrid}
                            >
                              <TextField
                                disabled={!isValidFee}
                                size="small"
                                name="receiverState"
                                id="form-state"
                                label="State"
                                fullWidth
                                placeholder=""
                                variant="outlined"
                                type="text"
                                value={values.receiverState}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={classes.dialogTextField}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              className={classes.dialogTextFieldGrid}
                            >
                              <TextField
                                disabled={!isValidFee}
                                size="small"
                                name="receiverZip"
                                id="form-zip"
                                label="Zip Code"
                                fullWidth
                                placeholder=""
                                variant="outlined"
                                type="text"
                                value={values.receiverZip}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={classes.dialogTextField}
                              />
                            </Grid>
                          </Grid>

                          <Grid
                            container
                            direction="row"
                            alignItems="flex-start"
                          >
                            <Grid
                              item
                              xs={6}
                              className={classes.dialogTextFieldGrid}
                            >
                              <CountrySelectBox
                                disabled={!isValidFee}
                                size="small"
                                label="Country"
                                fullWidth
                                type="text"
                                name="receiverCountry"
                                id="form-country"
                                placeholder=""
                                onBlur={handleBlur}
                                value={values.receiverCountry}
                                onChange={countryChange}
                                data-change="ccode"
                                className={classes.dialogTextField}
                                required
                              />
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              className={classes.dialogTextFieldGrid}
                            >
                              <TextField
                                disabled={!isValidFee}
                                size="small"
                                name="receiverEmail"
                                id="form-email"
                                label="Email"
                                fullWidth
                                placeholder=""
                                variant="outlined"
                                type="email"
                                value={values.receiverEmail}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={classes.dialogTextFieldGrid}
                                error={
                                  errors.receiverEmail && touched.receiverEmail
                                }
                                helperText={
                                  errors.receiverEmail && touched.receiverEmail
                                    ? errors.receiverEmail
                                    : ''
                                }
                              />
                            </Grid>
                          </Grid>

                          <Grid
                            item
                            direction="column"
                            alignItems="flex-start"
                            style={{
                              marginTop: '15px',
                            }}
                          >
                            <Grid
                              item
                              style={{
                                paddingBottom: '0px',
                                marginBottom: '',
                              }}
                              className={classes.dialogTextFieldGrid}
                            >
                              <FormControlLabel
                                style={{
                                  color: '#9ea0a5',
                                }}
                                control={
                                  <Checkbox
                                    disabled={!isValidFee}
                                    name="withoutID"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{
                                      color: 'rgb(53, 153, 51)',
                                      '&$checked': {
                                        color: 'rgb(53, 153, 51)',
                                      },
                                    }}
                                  />
                                }
                                label={
                                  <Typography variant="caption">
                                    Require Id
                                  </Typography>
                                }
                              />
                            </Grid>

                            <Grid item className={classes.dialogTextFieldGrid}>
                              <FormControlLabel
                                style={{
                                  color: '#9ea0a5',
                                }}
                                control={
                                  <Checkbox
                                    disabled={!isValidFee}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{
                                      color: 'rgb(53, 153, 51)',
                                      '&$checked': {
                                        color: 'rgb(53, 153, 51)',
                                      },
                                    }}
                                    name="requireOTP"
                                  />
                                }
                                label={
                                  <Typography variant="caption">
                                    Require OTP authentication
                                  </Typography>
                                }
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <Grid
                          container
                          direction="column"
                          className={classes.dialogGridRight}
                        >
                          <Typography
                            variant="h5"
                            className={classes.dialogSubHeader}
                          >
                            Receiver Identification
                          </Typography>

                          <Grid
                            container
                            direction="row"
                            alignItems="flex-start"
                          >
                            <Grid
                              item
                              xs={6}
                              className={classes.dialogTextFieldGrid}
                            >
                              <CountrySelectBox
                                disabled={!isValidFee}
                                size="small"
                                label="Country"
                                fullWidth
                                type="text"
                                name="receiverIdentificationCountry"
                                placeholder=""
                                id="form-identification-country"
                                onBlur={handleBlur}
                                value={values.receiverIdentificationCountry}
                                onChange={countryChange}
                                className={classes.dialogTextField}
                                required
                              />
                              <Typography
                                style={{
                                  fontSize: '10px',
                                  color: 'red',
                                  paddingLeft: '5px',
                                  paddingBottom: '5px',
                                }}
                              >
                                {errors.receiverIdentificationCountry &&
                                  touched.receiverIdentificationCountry
                                  ? errors.receiverIdentificationCountry
                                  : ''}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              className={classes.dialogTextFieldGrid}
                            >
                              <TypeSelectBox
                                type="text"
                                disabled={!isValidFee}
                                size="small"
                                id="form-fidentification-type"
                                label="Type"
                                fullWidth
                                placeholder=""
                                name="receiverIdentificationType"
                                onBlur={handleBlur}
                                className={classes.dialogTextField}
                                value={values.receiverIdentificationType}
                                onChange={receiverIdentificationTypeChange}
                                required
                              />
                              {errors.receiverIdentificationType &&
                                touched.receiverIdentificationType ? (
                                  <div
                                    style={{
                                      fontSize: '10px',
                                      color: 'red',
                                      paddingLeft: '5px',
                                      paddingBottom: '5px',
                                    }}
                                  >
                                    {errors.receiverIdentificationType}
                                  </div>
                                ) : (
                                  ''
                                )}
                            </Grid>
                          </Grid>

                          <Grid
                            container
                            direction="row"
                            alignItems="flex-start"
                          >
                            <Grid
                              item
                              xs={6}
                              className={classes.dialogTextFieldGrid}
                            >
                              <TextField
                                disabled={!isValidFee}
                                size="small"
                                name="receiverIdentificationNumber"
                                id="form-identification-number"
                                label="Number"
                                fullWidth
                                placeholder=""
                                variant="outlined"
                                type="number"
                                value={values.receiverIdentificationNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={classes.dialogTextFieldGrid}
                                error={
                                  errors.receiverIdentificationNumber &&
                                  touched.receiverIdentificationNumber
                                }
                                helperText={
                                  errors.receiverIdentificationNumber &&
                                    touched.receiverIdentificationNumber
                                    ? errors.receiverIdentificationNumber
                                    : ''
                                }
                              />
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              className={classes.dialogTextFieldGrid}
                            >
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                  id="date-picker-dialog"
                                  label="Valid Till"
                                  size="small"
                                  fullWidth
                                  disabled={!isValidFee}
                                  inputVariant="outlined"
                                  format="dd/MM/yyyy"
                                  minDate={new Date()}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  value={values.receiverIdentificationValidTill}
                                  onChange={date =>
                                    handleDateChange(
                                      date,
                                      'receiverIdentificationValidTill',
                                    )
                                  }
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                  error={
                                    errors.receiverIdentificationValidTill &&
                                    touched.receiverIdentificationValidTill
                                  }
                                  helperText={
                                    errors.receiverIdentificationValidTill &&
                                      touched.receiverIdentificationValidTill
                                      ? errors.receiverIdentificationValidTill
                                      : ''
                                  }
                                />
                              </MuiPickersUtilsProvider>
                            </Grid>
                          </Grid>

                          <Grid
                            container
                            direction="row"
                            alignItems="flex-start"
                          >
                            <Grid
                              item
                              xs={2}
                              className={classes.dialogTextFieldGrid}
                            >
                              <TextField
                                size="small"
                                id="form-amount-pre"
                                label="XOF"
                                variant="outlined"
                                type="text"
                                disabled
                              />
                            </Grid>
                            <Grid
                              item
                              xs={10}
                              className={classes.dialogTextFieldGrid}
                            >
                              <TextField
                                disabled={!isValidFee}
                                size="small"
                                name="sending_amount"
                                id="form-sending-amount"
                                label="Amount"
                                fullWidth
                                placeholder=""
                                variant="outlined"
                                type="number"
                                value={values.sending_amount}
                                onChange={handleChange}
                                onBlur={e => {
                                  handleBlur(e);
                                  getFee(
                                    values.sending_amount
                                  );
                                }}
                                className={classes.dialogTextFieldGridFullRow}
                                error={
                                  errors.sending_amount &&
                                  touched.sending_amount
                                }
                                helperText={
                                  errors.sending_amount &&
                                    touched.sending_amount
                                    ? errors.sending_amount
                                    : ''
                                }
                              />
                            </Grid>
                            <Typography
                              style={{
                                color: 'rgb(53, 153, 51)',
                                fontSize: '12px',
                                marginLeft: '1%',
                                marginBottom: '2%',
                              }}
                            >
                              {CURRENCY} {fee.toFixed(2)} will be charged as fee and{' '}
                              {CURRENCY}{' '}
                              {!values.isInclusive
                                ? values.sending_amount
                                  ? values.sending_amount
                                  : 0
                                : values.sending_amount
                                  ? values.sending_amount - fee
                                  : 0}{' '}
                              will be sent to the receiver
                            </Typography>
                          </Grid>

                          <Grid
                            container
                            direction="row"
                            alignItems="flex-start"
                          >
                            <Grid
                              item
                              xs={12}
                              alignItems="center"
                              className={classes.dialogTextFieldGrid}
                            >
                              <TextField
                                disabled={!isValidFee}
                                size="small"
                                name="note"
                                id="form-note"
                                fullWidth
                                placeholder="Note"
                                variant="outlined"
                                multiline
                                rows="3"
                                type="text"
                                value={values.note}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            direction="column"
                            alignItems="flex-start"
                            style={{ marginBottom: '', marginLeft: '1%' }}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="isInclusive"
                                  style={{
                                    color: 'rgb(53, 153, 51)',
                                    '&$checked': {
                                      color: 'rgb(53, 153, 51)',
                                    },
                                  }}
                                />
                              }
                              label={
                                <Typography variant="caption">
                                  Sender pays transaction fees
                                </Typography>
                              }
                            />
                          </Grid>
                          <Grid
                            item
                            direction="column"
                            alignItems="flex-start"
                            style={{ marginBottom: '', marginLeft: '1%' }}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="interbank"
                                  onChange={handleFeeTypeChange(values.interbank, values.sending_amount)}
                                  style={{
                                    color: 'rgb(53, 153, 51)',
                                    '&$checked': {
                                      color: 'rgb(53, 153, 51)',
                                    },
                                  }}
                                />
                              }
                              label={
                                <Typography variant="caption">
                                  Receiver can recieve from any bank
                                </Typography>
                              }
                            />
                          </Grid>
                          <Grid
                            item
                            direction="column"
                            alignItems="flex-start"
                            className={classes.dialogTextFieldGrid}
                          >
                            <FormControlLabel
                              onChange={handleChange}
                              required
                              onBlur={handleBlur}
                              style={{
                                color: '#9ea0a5',
                              }}
                              control={
                                <Checkbox
                                  disabled={!isValidFee}
                                  name="acceptedTerms"
                                />
                              }
                              name="acceptedTerms"
                              label={
                                <Typography variant="caption">
                                  I have read the{' '}
                                  <Link style={{ color: '#56575a' }}>
                                    <u>terms and conditions.</u>
                                  </Link>
                                </Typography>
                              }
                            />
                            {errors.acceptedTerms && touched.acceptedTerms ? (
                              <div className={classes.inputFeedback}>
                                {errors.acceptedTerms}
                              </div>
                            ) : (
                                ''
                              )}


                          </Grid>
                          <Typography
                            style={{
                              color: 'rgb(53, 153, 51)',
                              fontSize: '15px',
                              marginLeft: '1%',
                              marginBottom: '2%',
                            }}
                          >
                            {/* {totalfuction(values)} */}
                            {/* Fees  {CURRENCY} {fee.toFixed(2)} + Amount{' '}
                            {CURRENCY}{' '}
                            {!values.isInclusive
                              ? values.sending_amount
                                ? values.sending_amount
                                : 0
                              : values.sending_amount
                                ? values.sending_amount - fee
                                : 0}{' '}
                              = Total {fee} +  {!values.isInclusive
                              ? values.sending_amount
                                ? values.sending_amount
                                : 0
                              : values.sending_amount
                                ? values.sending_amount - fee
                                : 0}{' '} */}
                          </Typography>
                          <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                            className={classes.dialogTextFieldGrid}
                          >
                            <Button
                              type="submit"
                              fullWidth
                              className={classes.proceedButton}
                              variant="contained"
                              color="primary"
                              disableElevation
                              onClick={handleSubmit}
                              disabled={
                                isSubmitting ||
                                !isValidFee ||
                                !values.acceptedTerms
                              }
                            >
                              {loading ? (
                                <CircularProgress
                                  size={40}
                                  thickness={5}
                                  color="primary"
                                />
                              ) : (
                                  // <Typography variant="h6">Proceed</Typography>
                                  <Typography variant="h6">{totalfuction(values)} Proceed</Typography>
                                )}
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </Blur>
        ) : (
              <Blur isValidFee={isValidFee}>
                <Formik
                  enableReinitialize
                  initialValues={{
                    note: '',
                    receiverMobile: '',
                    sending_amount: '',
                    isInclusive: false,
                    acceptedTerms: false,
                    interbank: true,
                  }}
                  onSubmit={async values => {
                    setLoading(true);
                    let API = "";
                    if (values.interbank) {
                      API = 'user/interBank/sendMoneyToWallet';
                    } else {
                      API = 'user/sendMoneyToWallet';
                    }
                    try {
                      const res = await axios.post(
                        `${API_URL}/${API}`,
                        values,
                      );
                      if (res.status === 200) {
                        if (res.data.status === 0) {
                          props.notify(res.data.message, 'error');
                        } else {
                          props.notify('Transaction Successful!', 'success');
                          setLoading(false);
                          window.location = "/dashboard"
                          handleClose();
                          //   handleOnProceedClick();
                        }
                      } else {
                        props.notify(res.data.error, 'error');
                      }
                      setLoading(false);
                    } catch (err) {
                      props.notify('Something went wrong', 'error');
                      setLoading(false);
                    }
                  }}
                  validationSchema={Yup.object().shape({
                    receiverMobile: Yup.string()
                      .min(10, 'number should be atleast 10 digits')
                      .max(10, 'number cannot exceed 10 digits')
                      .matches(
                        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                        'Mobile no must be valid',
                      )
                      .required('Mobile no is required')
                      .test(
                        'match',
                        'Cannot transfer money to your own wallet.',
                        receiverMobile => receiverMobile !== mobile,
                      )
                      .test(
                        'WalletCheck',
                        'Wallet for this number does not exist!',
                        value => getUser(value),
                      ),
                    sending_amount: Yup.number().required('Amount is required'),

                    acceptedTerms: boolean().oneOf(
                      [true],
                      'You must accept the terms and conditions.',
                    ),
                  })}
                >
                  {formikProps => {
                    const {
                      values,
                      touched,
                      errors,
                      isSubmitting,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                    } = formikProps;
                    return (
                      <Form>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justify="center"
                        >
                          <Grid item md={6} xs={12}>
                            <Grid
                              container
                              direction="column"
                              spacing={2}
                              style={{ marginTop: '10%' }}
                            >
                              <Grid
                                container
                                direction="row"
                                alignItems="flex-start"
                              >
                                <Grid
                                  item
                                  xs={2}
                                  className={classes.dialogTextFieldGrid}
                                >
                                  <TextField
                                    size="small"
                                    id="form-phone-pre"
                                    label="+91"
                                    variant="outlined"
                                    type="text"
                                    disabled
                                  />
                                </Grid>
                                <Grid
                                  item
                                  xs={10}
                                  className={classes.dialogTextFieldGrid}
                                >
                                  <TextField
                                    disabled={!isValidFee}
                                    size="small"
                                    error={
                                      errors.receiverMobile &&
                                      touched.receiverMobile
                                    }
                                    name="receiverMobile"
                                    id="form-phone"
                                    label="Phone No"
                                    fullWidth
                                    placeholder=""
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <span
                                            style={{
                                              color: '#417505',
                                              fontSize: '13px',
                                              fontWeight: '600',
                                            }}
                                          >
                                            {walletUserName}
                                          </span>
                                        </InputAdornment>
                                      ),
                                    }}
                                    variant="outlined"
                                    type="text"
                                    value={values.receiverMobile}
                                    onChange={e => {
                                      handleChange(e);
                                      setWalletUserName('');
                                    }}
                                    onBlur={e => {
                                      handleBlur(e);
                                      // getUser(values.receiverMobile);
                                    }}
                                    className={classes.dialogTextFieldGrid}
                                    helperText={
                                      errors.receiverMobile &&
                                        touched.receiverMobile
                                        ? errors.receiverMobile
                                        : ''
                                    }
                                  />
                                </Grid>
                              </Grid>

                              <Grid
                                container
                                direction="row"
                                alignItems="flex-start"
                              >
                                <Grid
                                  item
                                  xs={2}
                                  className={classes.dialogTextFieldGrid}
                                >
                                  <TextField
                                    size="small"
                                    id="form-amount-pre"
                                    label="XOF"
                                    variant="outlined"
                                    type="text"
                                    disabled
                                  />
                                </Grid>
                                <Grid
                                  item
                                  xs={10}
                                  className={classes.dialogTextFieldGrid}
                                >
                                  <TextField
                                    disabled={!isValidFee}
                                    size="small"
                                    name="sending_amount"
                                    id="form-sending-amount"
                                    label="Amount"
                                    fullWidth
                                    placeholder=""
                                    variant="outlined"
                                    type="number"
                                    value={values.sending_amount}
                                    onChange={e => {
                                      handleChange(e);
                                    }}
                                    onBlur={e => {
                                      handleBlur(e);
                                      getFee(
                                        values.sending_amount
                                      );
                                    }}
                                    className={classes.dialogTextFieldGridFullRow}
                                    error={
                                      errors.sending_amount &&
                                      touched.sending_amount
                                    }
                                    helperText={
                                      errors.sending_amount &&
                                        touched.sending_amount
                                        ? errors.sending_amount
                                        : ''
                                    }
                                  />
                                </Grid>
                                <Typography
                                  style={{
                                    color: 'rgb(53, 153, 51)',
                                    // marginBottom: '10px',
                                    marginLeft: '10px',
                                    fontSize: '15px',
                                  }}
                                >
                                  Wallet Balance: {CURRENCY}{' '}
                                  {props.balance - values.sending_amount}
                                  <br />
                                  {/* <br /> */}
                                  <span
                                    style={{
                                      color: 'rgb(53, 153, 51)',
                                      fontSize: '15px',
                                    }}
                                  >
                                    {CURRENCY} {fee.toFixed(2)} will be charged as fee and{' '}
                                    {CURRENCY}{' '}
                                    {!values.isInclusive
                                      ? values.sending_amount
                                        ? values.sending_amount
                                        : '0'
                                      : values.sending_amount
                                        ? values.sending_amount - fee
                                        : '0'}{' '}
                                will be sent to the receiver
                              </span>
                                </Typography>
                              </Grid>

                              <Grid
                                container
                                direction="row"
                                alignItems="flex-start"
                              >
                                <Grid
                                  item
                                  xs={12}
                                  className={classes.dialogTextFieldGrid}
                                >
                                  <TextField
                                    disabled={!isValidFee}
                                    size="small"
                                    name="note"
                                    id="form-note"
                                    fullWidth
                                    placeholder="Note"
                                    variant="outlined"
                                    multiline
                                    rows="4"
                                    type="text"
                                    value={values.note}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </Grid>
                              </Grid>
                              <div style={{ marginBottom: '' }}>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name="interbank"
                                      onChange={handleFeeTypeChange(values.interbank, values.sending_amount)}
                                      style={{
                                        color: 'rgb(53, 153, 51)',
                                        '&$checked': {
                                          color: 'rgb(53, 153, 51)',
                                        },
                                      }}
                                    />
                                  }
                                  label={
                                    <Typography variant="caption">
                                      Receiver can recieve from any bank
                                </Typography>
                                  }
                                />
                              </div>
                              <div>
                                <FormControlLabel
                                  control={<Checkbox name="acceptedTerms" />}
                                  label={
                                    <Typography variant="caption">
                                      I have read the <u> terms and conditions </u>
                                    </Typography>
                                  }
                                />
                                {errors.acceptedTerms && touched.acceptedTerms ? (
                                  <div className={classes.inputFeedback}>
                                    {errors.acceptedTerms}
                                  </div>
                                ) : (
                                    ''
                                  )}
                              </div>
                              <br />
                              <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                                className={classes.dialogTextFieldGrid}
                              >
                                <Button
                                  type="submit"
                                  fullWidth
                                  onClick={handleSubmit}
                                  className={classes.proceedButton}
                                  variant="contained"
                                  color="primary"
                                  disableElevation
                                  disabled={
                                    isSubmitting ||
                                    !isValidFee ||
                                    walletUserName === '' ||
                                    !values.acceptedTerms
                                  }
                                >
                                  {loading ? (
                                    <CircularProgress
                                      size={40}
                                      thickness={5}
                                      color="primary"
                                    />
                                  ) : (
                                      <Typography variant="h6">{totalfuction(values)} Proceed</Typography>
                                    )}
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Form>
                    );
                  }}
                </Formik>
              </Blur>
            )}
      </DialogModal>

      {/* verification popup */}

      <VerifyDialogModal
        open={verifyPopup}
        onClose={handleVerifyClose}
        disableEscapeKeyDown
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleVerifyClose}>
          Verify OTP
        </DialogTitle>
        <form autoComplete="on">
          <Grid container md={12} xs={12} justify="center" alignItems="center">
            <TextField
              disabled={!isValidFee}
              size="small"
              id="form-given-name"
              label="Enter Your OTP"
              placeholder="OTP"
              fullWidth
              variant="outlined"
              type="password"
              className={classes.otpTextField}
              onChange={(e) => {
                setotpnumber(e.target.value)
              }}
            />
          </Grid>
          <Grid container justify="flex-end">
            <Typography className={classes.resendText}>Resend OTP?</Typography>
          </Grid>
          <Grid container xs={12} md={12} justify="center" alignItems="center">
            <Button variant="contained" color="primary" disableElevation onClick={() => {
              setverifyotpbutton(true)
            }}>
              Verify OTP
            </Button>
          </Grid>
        </form>
      </VerifyDialogModal>
    </Fragment>
  );
};

export default SendMoneyPopup;
