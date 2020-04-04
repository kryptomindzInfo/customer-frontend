import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

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
    minWidth: '80%',
    maxWidth: '80%',
  },
});

const verifyDialogStyles = theme => ({
  paper: {
    minHeight: '60%',
    maxHeight: '90%',
    minWidth: '35%',
    maxWidth: '80%',
  },
});

const VerifyDialogModal = withStyles(verifyDialogStyles)(Dialog);
const DialogModal = withStyles(dialogStyles)(Dialog);

const dialogContentStyles = makeStyles(theme => ({
  dialogGridLeft: {
    paddingTop: '5%',
    paddingBottom: '2%',
    paddingLeft: '10%',
    paddingRight: '2%',
  },
  dialogGridRight: {
    paddingTop: '5%',
    paddingBottom: '2%',
    paddingRight: '2%',
    paddingLeft: '2%',
  },
  dialogTextFieldGrid: {
    paddingBottom: '4%',
  },
  dialogTextField: {
    width: '48%',
    paddingLeft: '1%',
    paddingRight: '1%',
  },
  dialogTextFieldFullRow: {
    paddingLeft: '1%',
    paddingRight: '1%',
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
    height: '70%',
    width: '90%',
  },
  noteTextField: {
    height: '70px',
  },
  toggleButtonGroup: {
    marginTop: '30px',
  },
  toggleButton: {
    width: '150px',
    background: '#1a841b',
    color: '#fff',
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
    marginRight: '80px',
    marginLeft: '80px',
    marginTop: '30px',
    marginBottom: '150px',
  },
}));

export default function SendMoneyPopup(props) {
  const classes = dialogContentStyles();
  const [open, setOpen] = React.useState(props.open);
  const [verifyPopup, setVerifyPopup] = React.useState(false);

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

  return (
    <div>
      <DialogModal
        maxWidth="md"
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
        <form autoComplete="on">
          <Grid container xs={12} spacing={3}>
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
                  exclusive
                >
                  <ToggleButton
                    className={classes.toggleButton}
                    key={1}
                    value="left"
                  >
                    To Wallet
                  </ToggleButton>
                  ,
                  <ToggleButton
                    className={classes.toggleButton}
                    key={2}
                    value="center"
                  >
                    To Non Wallet
                  </ToggleButton>
                  ,
                </ToggleButtonGroup>
              </Grid>
            </Grid>
            <Grid
              container
              md={6}
              xs={12}
              spacing={2}
              className={classes.dialogGridLeft}
            >
              <Grid>
                <Grid container xs={12} direction="row" alignItems="center">
                  <Grid
                    container
                    xs={2}
                    direction="row"
                    alignItems="center"
                    className={classes.dialogTextFieldGrid}
                  >
                    <TextField
                      autoFocus
                      id="form-phone"
                      label="+91"
                      variant="outlined"
                      type="text"
                      disabled
                      labelWidth={0}
                      className={classes.dialogTextFieldFullRow}
                    />
                  </Grid>
                  <Grid
                    container
                    xs={10}
                    direction="row"
                    alignItems="center"
                    className={classes.dialogTextFieldGrid}
                  >
                    <TextField
                      autoFocus
                      required
                      id="form-phone"
                      label="Mobile Number"
                      labelWidth={0}
                      fullWidth
                      placeholder=""
                      variant="outlined"
                      type="number"
                      className={classes.dialogTextFieldFullRow}
                    />
                  </Grid>
                </Grid>
                <Grid container xs={12} direction="row" alignItems="center">
                  <Grid
                    container
                    xs={6}
                    direction="row"
                    alignItems="center"
                    className={classes.dialogTextFieldGrid}
                  >
                    <TextField
                      autoFocus
                      required
                      id="form-phone"
                      label="Given Name"
                      fullWidth
                      placeholder=""
                      variant="outlined"
                      type="text"
                      labelWidth={0}
                      className={classes.dialogTextFieldFullRow}
                    />
                  </Grid>
                  <Grid
                    container
                    xs={6}
                    direction="row"
                    alignItems="center"
                    className={classes.dialogTextFieldGrid}
                  >
                    <TextField
                      autoFocus
                      required
                      id="form-phone"
                      label="Family Name"
                      fullWidth
                      placeholder=""
                      variant="outlined"
                      type="text"
                      labelWidth={0}
                      className={classes.dialogTextFieldFullRow}
                    />
                  </Grid>
                </Grid>

                <Grid
                  container
                  xs={12}
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  className={classes.dialogTextFieldGrid}
                >
                  <TextField
                    id="form-address"
                    label="Address"
                    placeholder=""
                    multiline
                    fullWidth
                    variant="outlined"
                    className={classes.dialogTextFieldFullRow}
                  />
                </Grid>
                <Grid
                  container
                  xs={12}
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  className={classes.dialogTextFieldGrid}
                >
                  <TextField
                    id="form-state"
                    label="State"
                    placeholder=""
                    variant="outlined"
                    type="text"
                    className={classes.dialogTextField}
                  />
                  <TextField
                    id="form-zip"
                    label="Zip Code"
                    placeholder=""
                    variant="outlined"
                    type="text"
                    className={classes.dialogTextField}
                  />
                </Grid>
                <Grid
                  container
                  xs={12}
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  className={classes.dialogTextFieldGrid}
                >
                  <TextField
                    required
                    id="form-country"
                    label="Country"
                    placeholder=""
                    variant="outlined"
                    type="text"
                    className={classes.dialogTextField}
                  />
                  <TextField
                    id="form-zip"
                    label="Email"
                    placeholder=""
                    variant="outlined"
                    type="text"
                    className={classes.dialogTextField}
                  />
                </Grid>
                <Grid
                  container
                  xs={12}
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  className={classes.dialogTextFieldGrid}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{
                          color: 'rgb(53, 153, 51)',
                          '&$checked': {
                            color: 'rgb(53, 153, 51)',
                          },
                        }}
                        name="jason"
                      />
                    }
                    label="Require ID"
                  />
                </Grid>
                <Grid
                  container
                  xs={12}
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  className={classes.dialogTextFieldGrid}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{
                          color: 'rgb(53, 153, 51)',
                          '&$checked': {
                            color: 'rgb(53, 153, 51)',
                          },
                        }}
                        name="gilad"
                      />
                    }
                    label="Require OTP authentication"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              xs={12}
              md={6}
              spacing={2}
              alignItems="center"
              justify="center"
              className={classes.dialogGridRight}
            >
              <Grid>
                <Typography variant="h5" className={classes.dialogSubHeader}>
                  Reciever's Identification
                </Typography>
                <Grid
                  container
                  xs={12}
                  md={12}
                  justify="space-between"
                  className={classes.dialogTextFieldGrid}
                >
                  <TextField
                    required
                    id="form-country"
                    label="Country"
                    placeholder=""
                    variant="outlined"
                    type="text"
                    className={classes.dialogTextField}
                  />
                  <TextField
                    id="form-zip"
                    label="Email"
                    placeholder=""
                    variant="outlined"
                    type="text"
                    className={classes.dialogTextField}
                  />
                </Grid>
                <Grid
                  container
                  xs={12}
                  direction="row"
                  justify="space-between"
                  className={classes.dialogTextFieldGrid}
                >
                  <TextField
                    required
                    id="form-country"
                    label="Country"
                    placeholder="Number"
                    variant="outlined"
                    type="text"
                    className={classes.dialogTextField}
                  />
                  <TextField
                    id="form-zip"
                    label="Valid Till"
                    placeholder=""
                    variant="outlined"
                    type="text"
                    className={classes.dialogTextField}
                  />
                </Grid>
                <Grid container xs={12} direction="row" alignItems="center">
                  <Grid
                    container
                    xs={4}
                    direction="row"
                    alignItems="center"
                    className={classes.dialogTextFieldGrid}
                  >
                    <TextField
                      autoFocus
                      required
                      id="form-phone"
                      label=""
                      fullWidth
                      placeholder="XOF"
                      variant="outlined"
                      type="text"
                      disabled
                      labelWidth={0}
                      className={classes.dialogTextFieldFullRow}
                    />
                  </Grid>
                  <Grid
                    container
                    xs={8}
                    direction="row"
                    alignItems="center"
                    className={classes.dialogTextFieldGrid}
                  >
                    <TextField
                      autoFocus
                      required
                      id="form-phone"
                      label="Amount"
                      labelWidth={0}
                      fullWidth
                      placeholder=""
                      variant="outlined"
                      type="number"
                      className={classes.dialogTextFieldFullRow}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  md={12}
                  xs={12}
                  direction="row"
                  alignItems="center"
                  className={classes.dialogTextFieldGrid}
                >
                  <TextField
                    autoFocus
                    required
                    id="form-phone"
                    label=""
                    labelWidth={0}
                    fullWidth
                    placeholder="Note"
                    variant="outlined"
                    multiline
                    rows="4"
                    type="text"
                  />
                </Grid>
                <Typography
                  style={{
                    color: 'rgb(53, 153, 51)',
                    marginBottom: '10px',
                    fontSize: '10px',
                  }}
                >
                  Total Fee $200 will be charged
                </Typography>
                <Grid
                  container
                  xs={12}
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  className={classes.dialogTextFieldGrid}
                >
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
                  xs={12}
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  className={classes.dialogTextFieldGrid}
                >
                  <Button
                    fullWidth
                    className={classes.proceedButton}
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={handleOnProceedClick}
                  >
                    Proceed
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
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
              required
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
              className={classes.proceedButton}
              color="primary"
              disableElevation
            >
              Verify OTP
            </Button>
          </Grid>
        </form>
      </VerifyDialogModal>
    </div>
  );
}
