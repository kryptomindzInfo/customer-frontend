import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { Checkbox, FormControlLabel, Grid, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { API_URL } from '../../containers/App/constants';

const dialogTilteStyles = theme => ({
  root: {
    margin: 0,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'orange',
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
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

const dialogStyles = theme => ({
  paper: {
    minHeight: '90%',
    maxHeight: '90%',
    minWidth: '95%',
    maxWidth: '95%',
  },
});

const verifyDialogStyles = theme => ({
  paper: {
    minHeight: '50%',
    maxHeight: '50%',
    minWidth: '50%',
    maxWidth: '50%',
  },
});

const VerifyDialogModal = withStyles(verifyDialogStyles)(Dialog);
const DialogModal = withStyles(dialogStyles)(Dialog);

const dialogContentStyles = makeStyles(theme => ({
  dialogNonWallet: {
    paddingTop: '5%',
  },
  dialogGridLeft: {
    paddingTop: '15%',
    paddingBottom: '2%',
    paddingLeft: '10%',
    paddingRight: '2%',
  },
  dialogGridRight: {
    paddingTop: '7.5%',
    paddingBottom: '2%',
    paddingRight: '10%',
    paddingLeft: '2%',
    marginRight: '5px',
  },
  dialogTextFieldGrid: {
    paddingLeft: '1%',
    paddingRight: '1%',
    paddingBottom: '2%',
  },
  dialogTextField: {
    paddingLeft: '1%',
    paddingRight: '1%',
  },
  dialogTextFieldGridError: {
    border: '2px solid red',
  },
  dialogTextFieldGridErrorText: {
    color: 'red',
    fontSize: '12px',
  },
  dialogSubHeader: {
    paddingBottom: '4%',
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
    marginTop: '30px',
  },
  toggleButton: {
    width: '150px',
    background: '#1a841b',
    color: '#fff',
    '&:hover': {
      color: '#333',
    },
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
}));

export default function SendMoneyPopup(props) {
  const classes = dialogContentStyles();
  const [open, setOpen] = React.useState(props.open);
  const [verifyPopup, setVerifyPopup] = React.useState(false);
  const [isWallet, setIsWallet] = React.useState(true);
  const [format, setFormat] = React.useState(true);

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
      setIsWallet(false);
    }
    if (value === 'nonWallet') {
      setIsWallet(true);
    }
  };

  return (
    <Fragment>
      <DialogModal
        maxWidth="lg"
        fullWidth
        open={props.open}
        onClose={handleClose}
        disableEscapeKeyDown
        disableBackdropClick
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Send Money
        </DialogTitle>
        <Grid
          xs={12}
          md={12}
          container
          spacing={2}
          direction="column"
          alignItems="center"
        >
          <Grid item>
            <ToggleButtonGroup
              className={classes.toggleButtonGroup}
              size="small"
              value="center"
              onChange={handleOnchange}
              exclusive
            >
              <ToggleButton
                key={1}
                value="nonWallet"
                className={isWallet ? classes.toggleButton : ''}
              >
                To Non Wallet
              </ToggleButton>
              <ToggleButton
                key={2}
                value="wallet"
                className={!isWallet ? classes.toggleButton : ''}
              >
                To Wallet
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        {isWallet ? (
          <Formik
            initialValues={{
              note: '',
              withoutID: false,
              requireOTP: false,
              receiverMobile: '',
              receiverGivenName: '',
              receiverFamilyName: '',
              receiverAddress: '',
              receiverState: '',
              receiverZip: '',
              receiverCountry: '',
              receiverEmail: '',
              receiverIdentificationCountry: '',
              receiverIdentificationType: '',
              receiverIdentificationNumber: '',
              receiverIdentificationValidTill: '',
              sending_amount: '',
            }}
            onSubmit={async values => {
              try {
                const res = await axios.post(
                  `${API_URL}/user/sendMoneyToNonWallet`,
                  values,
                );
                if (res.status === 200) {
                  if (res.data.error) {
                    throw res.data.error;
                  } else {
                    handleOnProceedClick();
                  }
                } else {
                  throw res.data.error;
                }
              } catch (err) {
                console.log(err);
              }
            }}
            validationSchema={Yup.object().shape({
              receiverMobile: Yup.string()
                .matches(
                  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                  'Mobile no must be valid',
                )
                .required('Mobile no is required'),
              receiverGivenName: Yup.string().required(
                'Given Name is required',
              ),
              receiverFamilyName: Yup.string().required(
                'Family Name is required',
              ),
              receiverCountry: Yup.string().required('Country is required'),
              receiverEmail: Yup.string()
                .email('Email is invalid')
                .required('Email is required'),
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
                <Form onSubmit={handleSubmit}>
                  <Grid container direction="row">
                    <Grid item md={6} xs={12}>
                      <Grid
                        container
                        direction="column"
                        spacing={2}
                        className={classes.dialogGridLeft}
                      >
                        <Grid container direction="row" alignItems="flex-start">
                          <Grid
                            item
                            xs={2}
                            alignItems="center"
                            className={classes.dialogTextFieldGrid}
                          >
                            <TextField
                              autoFocus
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
                            alignItems="center"
                            className={classes.dialogTextFieldGrid}
                          >
                            <TextField
                              autoFocus
                              error={
                                errors.receiverMobile && touched.receiverMobile
                              }
                              name="receiverMobile"
                              id="form-phone"
                              label="Phone No"
                              fullWidth
                              placeholder=""
                              variant="outlined"
                              type="number"
                              value={values.receiverMobile}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={classes.dialogTextFieldGrid}
                              helperText={
                                errors.receiverMobile && touched.receiverMobile
                                  ? errors.receiverMobile
                                  : ''
                              }
                            />
                          </Grid>
                        </Grid>

                        <Grid container direction="row" alignItems="flex-start">
                          <Grid
                            item
                            xs={6}
                            alignItems="center"
                            className={classes.dialogTextFieldGrid}
                          >
                            <TextField
                              name="receiverGivenName"
                              id="form-given-name"
                              label="Given Name"
                              error={
                                errors.receiverGivenName &&
                                touched.receiverGivenName
                              }
                              fullWidth
                              placeholder=""
                              variant="outlined"
                              type="text"
                              value={values.receiverGivenName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={classes.dialogTextFieldGrid}
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
                            alignItems="center"
                            className={classes.dialogTextFieldGrid}
                          >
                            <TextField
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
                              className={classes.dialogTextFieldGrid}
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

                        <Grid container direction="row" alignItems="flex-start">
                          <Grid
                            item
                            xs={12}
                            alignItems="center"
                            className={classes.dialogTextFieldGrid}
                          >
                            <TextField
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

                        <Grid container direction="row" alignItems="flex-start">
                          <Grid
                            item
                            xs={6}
                            alignItems="center"
                            className={classes.dialogTextFieldGrid}
                          >
                            <TextField
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
                            alignItems="center"
                            className={classes.dialogTextFieldGrid}
                          >
                            <TextField
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

                        <Grid container direction="row" alignItems="flex-start">
                          <Grid
                            item
                            xs={6}
                            alignItems="center"
                            className={classes.dialogTextFieldGrid}
                          >
                            <TextField
                              name="receiverCountry"
                              id="form-country"
                              label="Country"
                              fullWidth
                              placeholder=""
                              variant="outlined"
                              type="text"
                              value={values.receiverCountry}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={classes.dialogTextFieldGrid}
                              error={
                                errors.receiverCountry &&
                                touched.receiverCountry
                              }
                              helperText={
                                errors.receiverCountry &&
                                touched.receiverCountry
                                  ? errors.receiverCountry
                                  : ''
                              }
                            />
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            alignItems="center"
                            className={classes.dialogTextFieldGrid}
                          >
                            <TextField
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
                          container
                          direction="column"
                          alignItems="flex-start"
                        >
                          <Grid item className={classes.dialogTextFieldGrid}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="withoutID"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.withoutID}
                                  style={{
                                    color: 'rgb(53, 153, 51)',
                                    '&$checked': {
                                      color: 'rgb(53, 153, 51)',
                                    },
                                  }}
                                />
                              }
                              label="Require ID"
                            />
                          </Grid>

                          <Grid item className={classes.dialogTextFieldGrid}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  style={{
                                    color: 'rgb(53, 153, 51)',
                                    '&$checked': {
                                      color: 'rgb(53, 153, 51)',
                                    },
                                  }}
                                  value={values.requireOTP}
                                  name="requireOTP"
                                />
                              }
                              label="Require OTP authentication"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Grid
                        container
                        direction="column"
                        spacing={2}
                        className={classes.dialogGridRight}
                      >
                        <Typography
                          variant="h5"
                          className={classes.dialogSubHeader}
                        >
                          Reciever's Identification
                        </Typography>

                        <Grid container direction="row" alignItems="flex-start">
                          <Grid
                            item
                            xs={6}
                            alignItems="center"
                            className={classes.dialogTextFieldGrid}
                          >
                            <TextField
                              name="receiverIdentificationCountry"
                              id="form-identification-country"
                              label="Country"
                              fullWidth
                              placeholder=""
                              variant="outlined"
                              type="text"
                              value={values.receiverIdentificationCountry}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={classes.dialogTextField}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            alignItems="center"
                            className={classes.dialogTextFieldGrid}
                          >
                            <TextField
                              name="receiverIdentificationType"
                              id="form-fidentification-type"
                              label="Type"
                              fullWidth
                              placeholder=""
                              variant="outlined"
                              type="text"
                              value={values.receiverIdentificationType}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={classes.dialogTextFieldGrid}
                              error={
                                errors.receiverIdentificationType &&
                                touched.receiverIdentificationType
                              }
                              helperText={
                                errors.receiverIdentificationType &&
                                touched.receiverIdentificationType
                                  ? errors.receiverIdentificationType
                                  : ''
                              }
                            />
                          </Grid>
                        </Grid>

                        <Grid container direction="row" alignItems="flex-start">
                          <Grid
                            item
                            xs={6}
                            alignItems="center"
                            className={classes.dialogTextFieldGrid}
                          >
                            <TextField
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
                            alignItems="center"
                            className={classes.dialogTextFieldGrid}
                          >
                            <TextField
                              name="receiverIdentificationValidTill"
                              id="form-idetification-valid-till"
                              label="Valid Till"
                              fullWidth
                              InputLabelProps={{
                                shrink: true,
                              }}
                              placeholder=""
                              variant="outlined"
                              type="date"
                              value={values.receiverIdentificationValidTill}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={classes.dialogTextFieldGrid}
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
                          </Grid>
                        </Grid>

                        <Grid container direction="row" alignItems="flex-start">
                          <Grid
                            item
                            xs={2}
                            alignItems="center"
                            className={classes.dialogTextFieldGrid}
                          >
                            <TextField
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
                            alignItems="center"
                            className={classes.dialogTextFieldGrid}
                          >
                            <TextField
                              name="sending_amount"
                              id="form-sending-amount"
                              label="Amount"
                              fullWidth
                              placeholder=""
                              variant="outlined"
                              type="number"
                              value={values.sending_amount}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={classes.dialogTextFieldGridFullRow}
                              error={
                                errors.sending_amount && touched.sending_amount
                              }
                              helperText={
                                errors.sending_amount && touched.sending_amount
                                  ? errors.sending_amount
                                  : ''
                              }
                            />
                          </Grid>
                        </Grid>

                        <Grid container direction="row" alignItems="flex-start">
                          <Grid
                            item
                            xs={12}
                            alignItems="center"
                            className={classes.dialogTextFieldGrid}
                          >
                            <TextField
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
                        <Grid
                          container
                          direction="column"
                          alignItems="flex-start"
                          className={classes.dialogTextFieldGrid}
                        >
                          <Typography
                            style={{
                              color: 'rgb(53, 153, 51)',
                              marginBottom: '10px',
                              fontSize: '10px',
                            }}
                          >
                            Total Fee $200 will be charged
                          </Typography>
                          <FormControlLabel
                            control={<Checkbox name="gilad" />}
                            label={
                              <span>
                                I have read the <u> terms and conditions </u>
                              </span>
                            }
                          />
                        </Grid>
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
                            disabled={isSubmitting}
                          >
                            Proceed
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        ) : (
          <Formik
            initialValues={{
              note: '',
              receiverMobile: '',
              sending_amount: '',
            }}
            onSubmit={async values => {
              try {
                const res = await axios.post(
                  `${API_URL}/user/sendMoneyToWallet`,
                  values,
                );
                if (res.status === 200) {
                  if (res.data.error) {
                    throw res.data.error;
                  } else {
                    handleOnProceedClick();
                  }
                } else {
                  throw res.data.error;
                }
              } catch (err) {
                console.log(err);
              }
            }}
            validationSchema={Yup.object().shape({
              receiverMobile: Yup.string()
                .matches(
                  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                  'Mobile no must be valid',
                )
                .required('Mobile no is required'),
              sending_amount: Yup.number().required('Amount is required'),
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
                        className={classes.dialogGridRight}
                      >
                        <Grid container direction="row" alignItems="flex-start">
                          <Grid
                            item
                            xs={2}
                            alignItems="center"
                            className={classes.dialogTextFieldGrid}
                          >
                            <TextField
                              autoFocus
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
                            alignItems="center"
                            className={classes.dialogTextFieldGrid}
                          >
                            <TextField
                              autoFocus
                              error={
                                errors.receiverMobile && touched.receiverMobile
                              }
                              name="receiverMobile"
                              id="form-phone"
                              label="Phone No"
                              fullWidth
                              placeholder=""
                              variant="outlined"
                              type="number"
                              value={values.receiverMobile}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={classes.dialogTextFieldGrid}
                              helperText={
                                errors.receiverMobile && touched.receiverMobile
                                  ? errors.receiverMobile
                                  : ''
                              }
                            />
                          </Grid>
                        </Grid>

                        <Grid container direction="row" alignItems="flex-start">
                          <Grid
                            item
                            xs={2}
                            alignItems="center"
                            className={classes.dialogTextFieldGrid}
                          >
                            <TextField
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
                            alignItems="center"
                            className={classes.dialogTextFieldGrid}
                          >
                            <TextField
                              name="sending_amount"
                              id="form-sending-amount"
                              label="Amount"
                              fullWidth
                              placeholder=""
                              variant="outlined"
                              type="number"
                              value={values.sending_amount}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={classes.dialogTextFieldGridFullRow}
                              error={
                                errors.sending_amount && touched.sending_amount
                              }
                              helperText={
                                errors.sending_amount && touched.sending_amount
                                  ? errors.sending_amount
                                  : ''
                              }
                            />
                          </Grid>
                          <Typography
                            style={{
                              color: 'rgb(53, 153, 51)',
                              marginBottom: '20px',
                              marginLeft: '10px',
                              fontSize: '10px',
                            }}
                          >
                            Total Amount:
                          </Typography>
                        </Grid>

                        <Grid container direction="row" alignItems="flex-start">
                          <Grid
                            item
                            xs={12}
                            alignItems="center"
                            className={classes.dialogTextFieldGrid}
                          >
                            <TextField
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
                        <Grid
                          container
                          direction="column"
                          alignItems="flex-start"
                          className={classes.dialogTextFieldGrid}
                        >
                          <Typography
                            style={{
                              color: 'rgb(53, 153, 51)',
                              marginBottom: '10px',
                              fontSize: '10px',
                            }}
                          >
                            Total Fee $200 will be charged
                          </Typography>
                          <FormControlLabel
                            control={<Checkbox name="gilad" />}
                            label={
                              <span>
                                I have read the <u> terms and conditions </u>
                              </span>
                            }
                          />
                        </Grid>
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
                            disabled={isSubmitting}
                          >
                            Proceed
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        )}
      </DialogModal>

      {/* verification popup */}

      <VerifyDialogModal
        open={verifyPopup}
        onClose={handleVerifyClose}
        disableEscapeKeyDown
        disableBackdropClick
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleVerifyClose}>
          Verify OTP
        </DialogTitle>
        <form autoComplete="on">
          <Grid container md={12} xs={12} justify="center" alignItems="center">
            <TextField
              id="form-given-name"
              label="Enter Your OTP"
              placeholder="OTP"
              fullWidth
              variant="outlined"
              type="password"
              className={classes.otpTextField}
            />
          </Grid>
          <Grid container justify="flex-end">
            <Typography className={classes.resendText}>Resend OTP?</Typography>
          </Grid>
          <Grid container xs={12} md={12} justify="center" alignItems="center">
            <Button
              variant="contained"
              fullWidth
              color="primary"
              disableElevation
            >
              Verify OTP
            </Button>
          </Grid>
        </form>
      </VerifyDialogModal>
    </Fragment>
  );
}
