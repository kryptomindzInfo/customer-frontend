import React, { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextInput from './TextInput';
import FormGroup from './FormGroup';
import { Form, Formik } from 'formik';
import Popup from 'components/Popup';
import Button from '../../components/Button'
import axios from 'axios';
import { API_URL  } from '../App/constants';

function OtherBillPopup(props) {
  const [invoiceList, setInvoiceList] = React.useState([]);
  const [billDetails, setBillDetails] = React.useState(false);
  const [selectedInvoice, setSelectedInvoice] = React.useState();
  const [fee, setFee] = React.useState(null);



	const handleBillDetails = (invoice) => {
    axios
      .post(`${API_URL}/user/checkMerchantFee`, {
        merchant_id: props.merchantid,
        amount: invoice.amount,
      })
      .then(res => {
        if (res.data.status === 1) {
          console.log(res);
          setFee(null);
          console.log(fee);
        }
        else{
          setFee(res.data)
        }
      })
      .catch(error => {});
    setSelectedInvoice(invoice);
    setInvoiceList([]);
    setBillDetails(true);
  }

  const payBill = (id) => {
    axios
      .post(`${API_URL}/user/payInvoice`, {
        invoice_id: id,
        amount: selectedInvoice.amount,
      })
      .then(res => {
        if (res.data.status === 1) {
          history.push('/dashboard');
          this.success();
        } else {
          this.error();
        }
      })
      .catch(error => {
        console.log(error);
      });
      setBillDetails(false);
  };

  
  const getInvoiceList = () => {
    return invoiceList.map((invoice) => {
      return (
        <TableRow key={invoice._id}>
          <TableCell component="th" scope="row">
            {/* {row.name} */}
            {invoice.name ? invoice.name : '-'}
          </TableCell>
          <TableCell component="th" scope="row">
              {invoice.mobile ? invoice.mobile : '-'}
          </TableCell>
          <TableCell component="th" scope="row">
            {invoice.due_date ? invoice.due_date : '-'}
            {/* {row.bill_date} */}
          </TableCell>
          <TableCell component="th" scope="row">
            {/* {row.number} */}
            {invoice.number ? invoice.number : '-'}
          </TableCell>
          <TableCell component="th" scope="row">
            {/* {row.amount} */}
            {invoice.amount ? invoice.amount : '-'}
          </TableCell>
          <TableCell
            style={{ color: '#417505', fontWeight: 600 }}
            align="right"
            onClick={() => {
              handleBillDetails(invoice);
            }}
          >
            View
          </TableCell>
        </TableRow>
      );
    });
  };
	
  useEffect(() => {
    console.log(props.merchantid);
  }, []);

  return (
    <Popup bigBody close={props.close}>
      <div
        style={{
          textAlign: 'center',
          fontSize: '1.5rem',
          paddingBottom: '1rem',
        }}
      >
        Pay Other Bill
      </div>
      { !billDetails ? (
        <Formik
          initialValues={{
          mobile: '',
          }}
          onSubmit={async (values) => {
            console.log(values);
            axios
            .post(`${API_URL}/user/getInvoices`, {values})
            .then(res => {
              if (res.data.status === 1) {
                setInvoiceList(res.data.invoices);
              }
            })
            .catch(error => {});
          }}
        >
          {(formikProps) => {
            const {
             values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleFocus,
              setFieldValue,
            } = formikProps;

            return (
              <div>
                <Form>
                  <FormGroup>
                    <label>Mobile Number*</label>
                    <TextInput
                      type="text"
                      name="mobile"
                      onFocus={(e) => {
                        handleChange(e);
                        inputFocus(e);
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                        handleChange(e);
                        inputBlur(e);
                      }}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <Button
                    type="submit"
                    marginTop="10px"
                    style={{
                      padding: '5px',
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 500,
                    }}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={30} thickness={5} color="primary" />
                    ) : (
                      <span>
                        Get Invoices
                      </span>
                    )}
                  </Button>
                </Form>
              </div>
            );
          }}
        </Formik>
      ) : (
      <div>
      <div>
        <Grid container style={{ padding: '2rem' }}>
          <Grid item xs={2}>
            <Typography align="left">Invoice No.</Typography>
            <Typography align="left">Name</Typography>
            <Typography align="left">Mobile</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography color="primary" align="left">
              {selectedInvoice.number
                ? selectedInvoice.number
                : '-'}
            </Typography>
            <Typography color="primary" align="left">
              {selectedInvoice.name
                ? selectedInvoice.name
                : '-'}
            </Typography>
            <Typography color="primary" align="left">
              {selectedInvoice.mobile
                ? selectedInvoice.mobile
                : '-'}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography align="left">Due Date</Typography>
            <Typography align="left">Bill Date</Typography>
            <Typography align="left">Bill Period</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography color="primary" align="left">
              {selectedInvoice.due_date
                ? selectedInvoice.due_date
                : '-'}
            </Typography>
            <Typography color="primary" align="left">
              {selectedInvoice.bill_date
                ? selectedInvoice.bill_date
                : '-'}
            </Typography>
            <Typography color="primary" align="left">
              {selectedInvoice.bill_period
                ? selectedInvoice.bill_period.period_name
                : '-'}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography align="left">Amount</Typography>
            <Typography align="left">fee</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography color="primary" align="left">
              {selectedInvoice.amount
                ? selectedInvoice.amount
                : '-'}
            </Typography>
            <Typography color="primary" align="left">
            {fee === null 
                ? '-'
                : fee}
            </Typography>
          </Grid>
        </Grid>
        <Table marginTop="34px" smallTd>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Denomination</TableCell>
              <TableCell>Unit of measure</TableCell>
              <TableCell>Unit price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedInvoice &&
            selectedInvoice.items.length > 0
              ? selectedInvoice.items.map(item => (
                  <TableRow key={item._id}>
                  <TableCell component="th" scope="row">
                    {item.item_desc.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.item_desc.description}
                  </TableCell>
                  <TableCell component="th" scope="row">
                      {item.item_desc.denomination}
                  </TableCell>
                    <TableCell component="th" scope="row">
                    {item.item_desc.unit_of_measure}
                    </TableCell>
                  <TableCell component="th" scope="row">
                      {item.item_desc.unit_price}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.quantity}
                    </TableCell>
                  <TableCell component="th" scope="row">
                      {item.total_amount}
                  </TableCell>
                  </TableRow>
              ))
              : null}
          </TableBody>
        </Table>
      </div>
        {selectedInvoice.amount && fee !== null
          ? (<Button
          variant="contained"
          type="submit"
          onClick={() => payBill(selectedInvoice._id)}
          // disabled={isSubmitting}
        >
          Pay XOF{' '}
              { fee + selectedInvoice.amount}
        </Button>
          ): <h5>Can't process transaction right now </h5>}
      </div>
      )}
        {invoiceList.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Mobile No.</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Bill No.</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell align="left" />
              </TableRow>
            </TableHead> 
            <TableBody>{getInvoiceList()}</TableBody>      
          </Table>
        ) : (
          null
        )}
    </Popup>
  );
}

export default OtherBillPopup;