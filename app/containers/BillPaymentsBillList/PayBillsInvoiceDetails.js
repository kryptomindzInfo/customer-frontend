import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from 'components/Button';
import FormGroup from 'components/FormGroup';
import Loader from 'components/Loader';
import Row from 'components/Row';
import Col from 'components/Col';
import Container from 'components/Container';
import * as Yup from 'yup';
import { correctFocus } from '../../components/handleInputFocus';
import { checkCashierFee } from './api/CashierMerchantAPI';
import { CURRENCY, STATIC_URL } from '../App/constants';

const PayBillsInvoiceDetails = props => {
  const [isLoading, setLoading] = useState(false);
  const [isDataLoading, setDataLoading] = useState(false);
  const [invoice, setInvoice] = useState(props.invoice);
  const [totalAmount, setTotalAmount] = useState(invoice.items.reduce(
    function (a, b) {
      return a + (b.quantity * b.item_desc.unit_price);
    }, 0));
  const [totalTax, setTotalTax] = useState(invoice.items.reduce(
    function (a, b) {
      return a + (b.total_amount - (b.quantity * b.item_desc.unit_price));
    }, 0));
  const [fee, setFee] = useState();
  const { merchant } = props;

  const checkFee = () => {
    checkCashierFee({
      merchant_id: props.merchantId,
      amount: invoice.amount,
    }).then(data => {
      setFee(data.fee);
    });
  };

  const getItems = () =>
    invoice.items.map(item => {
      return (
        <TableRow key={item._id}>
          <TableCell component="th" scope="row">
            {item.item_desc.name}
          </TableCell>
          <TableCell component="th" scope="row">
            {item.item_desc.description}
          </TableCell>
          <TableCell component="th" scope="row">
            {item.item_desc.code}
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
            {item.quantity * item.item_desc.unit_price}
          </TableCell>
          <TableCell component="th" scope="row">
            {item.tax_desc.value}
          </TableCell>
          <TableCell component="th" scope="row">
            {item.total_amount}
          </TableCell>
        </TableRow>
      );
    });

  const getCounterInvoiceItems = () => {
    return invoice.counter_invoices.map((item) => {
      return (
        <tr key={item._id}>
          <td>{item.number}</td>
          <td>{item.description}</td>
          <td>{item.amount}</td>
        </tr>
      );
    });
  };

  const discount = () => {
    return invoice.counter_invoices.reduce((a, b) => {
      return a + b.amount;
    }, 0);
  };

  const sumtotal = () => {
    const totaldiscount = discount();
    return totalAmount + totalTax - totaldiscount + fee;
  };

  const sumtotal2 = () => {
    return totalAmount + totalTax + fee + props.penalty;
  };

  useEffect(() => {
    setDataLoading(true);
    checkFee();
    correctFocus('update');
    setDataLoading(false);
  });
  return (
    <div>
      <Formik
        initialValues={{
          number: invoice.number || '',
          name: invoice.name || '',
          amount: invoice.amount || '',
          due_date: invoice.due_date || '',
          bill_date: invoice.bill_date || '',
          bill_period: invoice.bill_period || '',
          mobile: invoice.mobile || '',
          counter_invoices: invoice.counter_invoices || [],
        }}
        onSubmit={values => {
          const obj = {
            invoices: [{
              id: invoice._id,
              penalty: props.penalty,
            }],
            merchant_id:props.merchantId,

        }
          props.showOTPPopup(obj);
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Name is required.'),
          amount: Yup.number().required('Number is required.'),
          mobile: Yup.string()
            .min(10, 'number should be atleast 10 digits')
            .max(10, 'number cannot exceed 10 digits')
            .matches(
              /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
              'Mobile no must be valid',
            )
            .required('Mobile no is required'),
        })}
      >
        {formikProps => {
          const { values } = formikProps;
          return (
            <Form>
              <Container>
                <Row style={{ marginBottom: '20px' }}>
                  <Col
                    cW="25%"
                    className="popInfoLeft"
                    style={{ marginRight: '-110px' }}
                  >
                    <div className="cardHeaderLeft">
                      <img
                        src={`${STATIC_URL}${merchant.logo}`}
                        alt=""
                        style={{
                          height: '60px',
                          width: '60px',
                          paddingRight: '10px',
                          marginRight: '10px',
                        }}
                      />
                    </div>
                  </Col>
                  <Col cW="25%" className="popInfoRight">
                    <div className="cardHeader">
                      <div className="cardHeaderRight">
                        <h4 style={{ color: 'green' }}>{merchant.name}</h4>
                        <p>{merchant.description}</p>
                      </div>
                    </div>
                  </Col>
                  <Col cW="50%" />
                </Row>
                <Row>
                  <Col cW="33%">
                    <Row>
                      <Col className="popInfoLeft">Customer Code</Col>
                      {values.customer_code ? (
                        <Col className="popInfoRight">{values.customer_code}</Col>
                      ) : (
                          <Col className="popInfoRight">Passing by customer</Col>
                        )}
                    </Row>
                    <Row>
                      <Col className="popInfoLeft">Mobile</Col>
                      <Col className="popInfoRight">{values.mobile}</Col>
                    </Row>
                  </Col>
                  <Col cW="33%">
                    <Row>
                      <Col className="popInfoLeft">Bill No</Col>
                      <Col className="popInfoRight">{values.number}</Col>
                    </Row>
                    <Row>
                      <Col className="popInfoLeft">Bill Date</Col>
                      <Col className="popInfoRight">{values.bill_date}</Col>
                    </Row>
                  </Col>
                  <Col cW="33%">
                    <Row>
                      <Col className="popInfoLeft">Due Date</Col>
                      <Col className="popInfoRight">{values.due_date}</Col>
                    </Row>
                    <Row>
                      <Col className="popInfoLeft">Period</Col>
                      <Col className="popInfoRight">
                        {values.bill_period.period_name}
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col cW="100%">
                    <Row />
                    <Table smallTd style={{ marginTop: '34px', wordBreak: 'initial' }}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>Code</TableCell>
                          <TableCell>Unit of measure</TableCell>
                          <TableCell>Unit price</TableCell>
                          <TableCell>Quantity</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Tax %</TableCell>
                          <TableCell>Amount with tax</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {invoice.items && invoice.items.length > 0
                          ? getItems()
                          : null}
                      </TableBody>
                    </Table>
                    <Row style={{ marginTop: '8px' }}>
                      <Col cW="50%">
                      </Col>
                      <Col cW="25%"></Col>
                      <Col cW="25%">
                        <Row>
                          <Col className="popInfoLeft">Total Amount</Col>
                          <Col className="popInfoRight">{totalAmount}</Col>
                        </Row>
                        <Row>
                          <Col className="popInfoLeft">Total Tax</Col>
                          <Col className="popInfoRight">{totalTax}</Col>
                        </Row>
                        <Row>
                          <Col className="popInfoLeft">Total Fees</Col>
                          <Col className="popInfoRight">{fee}</Col>
                        </Row>
                        <Row>
                          <Col className="popInfoLeft">Penalty</Col>
                          <Col className="popInfoRight">{props.penalty.toFixed(2)}</Col>
                        </Row>
                        <Row>
                          <Col className="popInfoLeft">Sum Total</Col>
                          <Col className="popInfoRight">{sumtotal2().toFixed()}</Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
              <FormGroup>
                {isNaN(Number(fee) + Number(values.amount)) ? (
                  <h5 style={{ marginTop: '10px', textAlign: 'center' }}>
                    Can't process transaction right now
                  </h5>
                ) : (
                    <Button filledBtn>
                      {isLoading ? (
                        <Loader />
                      ) : (
                          <span>
                            Collect {CURRENCY} {sumtotal2().toFixed()} and Pay Bill
                          </span>
                        )}
                    </Button>
                  )}
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PayBillsInvoiceDetails;
