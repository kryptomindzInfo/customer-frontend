import React, {  useEffect, useState } from 'react';
import Button from 'components/Button';
import Row from 'components/Row';
import Col from 'components/Col'
import FormGroup from 'components/FormGroup';
import Loader from 'components/Loader';
import Card from 'components/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { STATIC_URL } from '../App/constants';
import { checkCashierFee, getPenaltyRule } from './api/CashierMerchantAPI';
import { isEmpty } from 'lodash';

const PayBillsInvoiceList = props => {
  const { merchant } = props;
  const currentDate = new Date(); 
  const [isLoading, setLoading] = useState(true);
  const [isButtonLoading, setButtonLoading] = useState(false);
  const [selectedInvoiceList, setSelectedInvoiceList] = useState([]);
  const [totalFee, setTotalFee] = useState(0);
  const [feeList, setFeeList] = useState([]);
  const [penaltyList, setPenaltyList] = useState([]);
  const [penaltyRule, setPenaltyRule] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [invoiceList, setInvoiceList] = useState(
    props.invoiceList.filter(i => i.paid === 0),
  );
  const handleCheckboxClick = async (e, invoice, index) => {
    setButtonLoading(true);
    if(e.target.checked) {
      if(invoice.has_counter_invoice === true){
        const counterInvoice = invoiceList.filter((val) => val.number === `${invoice.number}C`);
        setTotalAmount(totalAmount + invoice.amount + counterInvoice[0].amount + penaltyList[index]);
        const data = await checkCashierFee({
          merchant_id: merchant._id,
          amount: totalAmount + invoice.amount + counterInvoice[0].amount + penaltyList[index],
        });
        setTotalFee(data.fee);
        const obj1 = {
          id: invoice._id,
          penalty: penaltyList[index],
        }
        const obj2 = {
          id: counterInvoice[0]._id,
          penalty: 0,
        }
        const list = [...selectedInvoiceList];
        list.push(obj1);
        list.push(obj2);
        setSelectedInvoiceList(list);
        setButtonLoading(false);
      } else {
        setTotalAmount(totalAmount + invoice.amount + penaltyList[index]);
        const data = await checkCashierFee({
          merchant_id: merchant._id,
          amount: totalAmount + invoice.amount + penaltyList[index],
        });
        setTotalFee(data.fee);
        const obj1 = {
          id: invoice._id,
          penalty: penaltyList[index],
        }
        const list = [...selectedInvoiceList];
        list.push(obj1);
        setSelectedInvoiceList(list);
        setButtonLoading(false);
      }
    } else {
      if(invoice.has_counter_invoice === true){
        const counterInvoice = invoiceList.filter((val) => val.number === `${invoice.number}C`);
        const data = await checkCashierFee({
          merchant_id: merchant._id,
          amount: totalAmount - invoice.amount - counterInvoice[0].amount - penaltyList[index],
        });
        setTotalFee(data.fee);
        const list = selectedInvoiceList.filter((val) => val.id !== invoice._id &&  val.id !== counterInvoice[0]._id);
        setSelectedInvoiceList(list);
        setTotalAmount(totalAmount-invoice.amount-counterInvoice[0].amount - penaltyList[index]);
        setButtonLoading(false);
      } else {
        const data = await checkCashierFee({
          merchant_id: merchant._id,
          amount: totalAmount - invoice.amount - penaltyList[index],
        });
        setTotalFee(data.fee);
        const list = selectedInvoiceList.filter((val) => val.id !== invoice._id);
        setSelectedInvoiceList(list);
        setTotalAmount(totalAmount- invoice.amount - penaltyList[index]);
        setButtonLoading(false);
      }
    }
  };

  const handleMultipleInvoiceSubmit = () => {
    const obj = {
      invoices : selectedInvoiceList,
      merchant_id : merchant._id,
    }
    props.showOTPPopup(obj);
  };
  
  const getInvoiceList = () =>
    invoiceList.map((row,index) => (
      <TableRow key={row._id}>
        <TableCell component="th" scope="row">
          {row.is_counter ? (
            <div>
              {selectedInvoiceList.map(a => a.id).includes(row._id) ? (
                <FormGroup>
                  <input
                    type="checkbox"
                    checked
                    value={row._id}>
                  </input>
                </FormGroup>
              ) : (
                <FormGroup>
                  <input
                    type="checkbox"
                    disabled
                    value={row._id}>
                  </input>
                </FormGroup>
              )}
            </div>
          ) : (
            <FormGroup onChange={(e) => handleCheckboxClick(e, row, index)}>
              <input
                type="checkbox"
                value={row._id}>
              </input>
            </FormGroup>
          )}
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name ? row.name : '-'}
          </TableCell>
          <TableCell component="th" scope="row">
            {row.mobile ? row.mobile : '-'}
          </TableCell>
          <TableCell component="th" scope="row">
            {row.due_date ? row.due_date : '-'}
            {/* {row.bill_date} */}
          </TableCell>
          <TableCell component="th" scope="row">
            {/* {row.number} */}
            {row.number ? row.number : '-'}
          </TableCell>
          <TableCell component="th" scope="row">
            {/* {row.amount} */}
            {row.amount ? row.amount : '-'}
          </TableCell>
          <TableCell component="th" scope="row">
            {/* {row.amount} */}
            {penaltyList[index] }
          </TableCell>
          <TableCell component="th" scope="row">
            {/* {row.amount} */}
            {feeList[index] > 0 ? feeList[index] : 'NA' }
          </TableCell>
          <TableCell component="th" scope="row">
            {/* {row.amount} */}
            {feeList[index]+row.amount + penaltyList[index] > 0 ? feeList[index]+row.amount + penaltyList[index] : 'NA'}
          </TableCell>
          <TableCell
            style={{ color: '#417505', fontWeight: 600 }}
            onClick={() => props.setEditingInvoice(row)}
            align="right"
          >
            View
          </TableCell>
        </TableRow>
    ));

  const fetchfee = async(penaltylist) => {
    const feelist = invoiceList.map(async (invoice,index) => {
      if (invoice.amount + penaltylist[index] < 0) {
        const data = await checkCashierFee({
          merchant_id: merchant._id,
          amount: invoice.amount * -1,
        });
        return (-data.fee);
      } else {
        const data = await checkCashierFee({
          merchant_id: merchant._id,
          amount: invoice.amount + penaltylist[index],
        });
        return (data.fee);
      }
    })
    const result= await Promise.all(feelist);
    return({res:result, loading:false});
  }

  const calculatePenalty = async(rule) => {
    const penaltylist = invoiceList.map(async invoice => {
      if (invoice.amount < 0) {
        return (0);
      }
      const datesplit = invoice.due_date.split("/");
      const dueDate = new Date(datesplit[2],datesplit[1]-1,datesplit[0]);
      if (currentDate <= dueDate) {
          return (0);
      } else {
        if(rule.type === 'once') {
          return (rule.fixed_amount + (invoice.amount*rule.percentage)/100);
        } else {
          // To calculate the time difference of two dates 
          var Difference_In_Time = currentDate.getTime() - dueDate.getTime(); 
          // To calculate the no. of days between two dates 
          var Difference_In_Days = Math.trunc(Difference_In_Time / (1000 * 3600 * 24)); 
          console.log(currentDate,dueDate,Difference_In_Days);     
          return ((rule.fixed_amount + (invoice.amount*rule.percentage)/100)*Difference_In_Days.toFixed(2));
        }
      }
    });
    const result= await Promise.all(penaltylist);
    return(result);
  };

  const fetchPenaltyRule = async() => {
    const data = await getPenaltyRule({
      merchant_id: merchant._id,
    });
    return(data.rule);
  }

  useEffect(() => {
    setLoading(true);
    const getRule = async() => {
      const res1= await fetchPenaltyRule();
      const res2= await calculatePenalty(res1);
      setPenaltyList(res2);
      const res3= await fetchfee(res2);
      setFeeList(res3.res);
      setLoading(res3.loading);
    }
    getRule();
    }, []); // Or [] if effect doesn't need props or state
  
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <Card>
        <div className="cardHeader">
          <div className="cardHeaderLeft">
            <img
              src={`${STATIC_URL}${merchant.logo}`}
              alt=""
              style={{ height: '60px', width: '60px', paddingRight: '10px' }}
            />
          </div>
          <div className="cardHeaderRight">
            <h4 style={{ color: 'green' }}>{merchant.name}</h4>
            <p>{merchant.description}</p>
          </div>
        </div>
        <div />
        <Table marginTop="34px" smallTd style={{wordBreak: 'initial'}}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Mobile No.</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Bill No.</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Penalty</TableCell>
              <TableCell>Fees</TableCell>
              <TableCell>Amount with Fees</TableCell>
              <TableCell align="left" />
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceList && invoiceList.length > 0 ? getInvoiceList() : null}
          </TableBody>
        </Table>
        <FormGroup>
          {totalAmount > 0 ? (
            <Button onClick={handleMultipleInvoiceSubmit} filledBtn>
              {isButtonLoading ? (
                <Loader />
              ) : (
                `Collect Amount ${totalAmount} + Fee ${totalFee.toFixed(2)} = Total ${totalAmount+totalFee} and Pay Bill`
              )}
            </Button>
          ) : (
            null
          )}
        </FormGroup>
      </Card>
    </div>
  );
};


export default PayBillsInvoiceList;
