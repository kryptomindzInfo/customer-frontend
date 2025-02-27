/**
 *
 * ContactPage
 *
 */

 import React, { Fragment, useEffect, useState } from 'react';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Helmet } from 'react-helmet';
import DateFnsUtils from '@date-io/date-fns';
import Button from 'components/Button';
import MainHeader from '../MainHeader';
import Card from 'components/Card';
import Table from 'components/Table';
import Loader from '../../components/Loader';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import format from 'date-fns/format';
import axios from 'axios';
import { API_URL, STATIC_URL, CURRENCY } from 'containers/App/constants';
import Row from '../../components/Row';
import Col from '../../components/Col';
import SelectInput from '../../components/SelectInput';
import FormGroup from '../../components/FormGroup';
import Container from '../../components/Container';


const bankID = localStorage.getItem('bankId');
const mobile = localStorage.getItem('mobile');
const token = localStorage.getItem('customerLogged');

const ReportPage = (props) => {
  const [startdate, setStartdate] = useState(new Date());
  const [enddate, setEnddate] = useState(new Date());
  const [transList, setTransList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [transactionType, setTransactionType ] = useState('all');
  const [merchantList, setMerchantList ] = useState([]);
  const [contactList, setContactList ] = useState([]);
  const [merchant, setMerchant ] = useState('all');
  const [contact, setContact ] = useState('all');

  const getAllMerchants = async() => {
    try{
      const res = await axios.get(`${API_URL}/user/listMerchants`);
      if (res.status === 200) {
        console.log(res);
        if (res.data.status === 0) {
          props.notify(res.data.message, 'error');
        } else {
          return ({list: res.data.list});
        }
      } else {
        props.notify(res.data.error, 'error');
      }
    } catch (err) {
      throw err;
    }
     
  };

  const getAllContacts = async() => {
    try{
      const res = await axios.get(`${API_URL}/user/getContactList`);
      if (res.status === 200) {
        console.log(res);
        if (res.data.status === 0) {
          props.notify(res.data.message, 'error');
        } else {
          return ({list: res.data.contacts.wallet});
        }
      } else {
        props.notify(res.data.error, 'error');
      }
    } catch (err) {
      throw err;
    }
     
  };


  const getTransactionHistory = async (list) => {
    try {
      const controller = 'getTransactionHistory';
      const { username } = JSON.parse(localStorage.getItem('loggedUser'));
  
      const res = await axios.get(`${API_URL}/user/${controller}`, {
        username,
      });
      if (res.status === 200) {
        if (res.data.error) {
          props.notify(res.data.error, 'error');
        } else {
          const start = new Date(startdate);
          const end = new Date(enddate);
          start.setHours(0,0,0,0);
          end.setHours(23,59,59,0);
          console.log(start);
          const datehistory = res.data.history.filter((h)=>{
            return new Date(h.Timestamp) >= start &&
            new Date(h.Timestamp) <= end &&
            h.Value.action !== 'Create';
          })
          return ({res:datehistory, loading:false});
        }
      } else {
        props.notify(res.data.error, 'error');
      }
    } catch (err) {
      throw err;
    }
  };

  const getReport = async() => {
    console.log(merchant);
    setLoading(true);
    const merchantlist = await getAllMerchants();
    const contactlist = await getAllContacts();
    setContactList(contactlist.list);
    console.log(merchantlist);
    setMerchantList(merchantlist.list);
    
    const history = await getTransactionHistory(merchantlist.list);
    if(transactionType === 'WallettoMerchant' && merchant==='all'){
      setTransList(history.res.filter(row => row.Value.tx_data[0].tx_name === 'Wallet to Merchant'));
    }else if(transactionType === 'WallettoMerchant'){
      setTransList(history.res.filter(row => row.Value.tx_data[0].tx_name === 'Wallet to Merchant' && row.Value.tx_data[0].tx_details === `Transferred to ${merchant}`));
    }else if (transactionType === 'WallettoWallet' && contact==='all'){
      setTransList(history.res.filter(row => row.Value.tx_data[0].tx_name === 'Wallet to Wallet'));
    }else if(transactionType === 'WallettoWallet'){
      setTransList(history.res.filter(row => row.Value.tx_data[0].tx_name === 'Wallet to Wallet' && row.Value.tx_data[0].tx_details === `Transferred to ${contact}`));
    }else if (transactionType === 'all'){
      setTransList(history.res);
    }else{
      setTransList([]);
    }
    setLoading(history.loading);
  };

  const getTrans = () => {
    return transList.reverse().map((trans) => {
      return (
        <tr key={trans.TxId}>
          <td>
            {`${format(new Date(trans.Timestamp), 'dd-MM-yyyy')}`}
          </td>
          <td>
            {trans.Value.tx_data[0].master_id}
          </td>
          <td>
            {trans.Value.tx_data[0].tx_details}</td>
          <td>
          Wallet to Wallet 
          </td>
          <td>{trans.Value.tx_data[0].tx_type === 'DR' ? trans.Value.tx_data[0].amount : '-'}</td>
          <td>{trans.Value.tx_data[0].tx_type === 'CR' ? trans.Value.tx_data[0].amount : '-'}</td>
          <td>{trans.Value.balance}</td>
        </tr>
      );
    });
  };

  useEffect(() => {
    getReport();
  }, []);

  if (isLoading) {
    return <Loader fullPage />;
  }

  return (

    
      <Fragment>
        <Helmet>
          <title>Reports</title>
          <meta name="description" content="Description of ContactPage" />
        </Helmet>
        <MainHeader active="report"/>
          <Container>
            <Row style={{marginBottom:"0px", marginTop:'20px'}}>
              <Col cW='40%'>
              <Card
                marginBottom="20px"
                buttonMarginTop="32px"
                smallValue
                style={{height: transactionType==='WallettoMerchant' ||transactionType==='WallettoWallet' ? '330px' : '200px'}}
              >
              <h4 style={{color:"green"}}><b>Date Range</b></h4> 
                  <Row>
                    <Col cW='48%'>
                      <FormGroup>
                        <MuiPickersUtilsProvider
                          utils={DateFnsUtils}
                        >
                        <KeyboardDatePicker
                          id="date-picker-dialog"
                          size="small"
                          fullWidth
                          maxDate={new Date(enddate)}
                          inputVariant="outlined"
                          format="dd/MM/yyyy"
                          required
                          InputLabelProps={{
                          shrink: true,
                          }}
                          value={
                            startdate
                          }
                          onChange={date =>
                          setStartdate(date)
                          }
                          KeyboardButtonProps={{
                          'aria-label': 'change date',
                                                    }}
                        />
                        </MuiPickersUtilsProvider>
                      </FormGroup>
                    </Col>
                    <Col cW='4%'> to </Col>
                    <Col cW='48%'>
                      <FormGroup>
                        <MuiPickersUtilsProvider
                          utils={DateFnsUtils}
                        >
                        <KeyboardDatePicker
                          id="date-picker-dialog"
                          size="small"
                          fullWidth
                          maxDate={new Date()}
                          inputVariant="outlined"
                          format="dd/MM/yyyy"
                          required
                          InputLabelProps={{
                          shrink: true,
                          }}
                          value={
                            enddate
                          }
                          onChange={date =>
                          setEnddate(date)
                          }
                          KeyboardButtonProps={{
                          'aria-label': 'change date',
                                                    }}
                        />
                        </MuiPickersUtilsProvider>
                      </FormGroup>
                    </Col>
                  </Row>
              <h4 style={{color:"green",marginTop:'10px'}}><b>Transaction Type</b></h4>     
                  <Row>
                    <Col cW='60%'>
                    <FormGroup>
                      <SelectInput
                       value={transactionType}
                       onChange={(event)=>{
                        setTransactionType(event.target.value);
                       }}
                      >
                        <option value={'all'}>
                         All Transactions
                        </option>
                        <option value={'WallettoWallet'}>
                          Wallet to Wallet
                        </option>
                        <option value={'WallettoNonWallet'}>
                          Wallet to Non Wallet
                        </option>
                        <option value={'NonWallettoNonWallet'}>
                          Non Wallet to Wallet
                        </option>
                        <option value={'WallettoMerchant'}>
                          Wallet to Merchant
                        </option>

                      </SelectInput>
                    </FormGroup>
                    </Col>
                    <Col cW='40%'>
                    <Button
                        style={{padding:'12px', color:'green', backgroundColor:'white', marginBottom:'14px',marginLeft:'10px'}}
                        onClick={()=>getReport()}
                      >
                        Get Report
                      </Button>
                    </Col>
                  </Row>
              {transactionType==='WallettoMerchant' ? (
                <div>
                  <h4 style={{color:"green",marginTop:'10px'}}><b>Select Merchant</b></h4>  
                  <Row>
                    <Col cW='60%'>
                    <FormGroup>
                      <SelectInput
                       value={merchant}
                       onChange={(event)=>{
                        setMerchant(event.target.value);
                       }}
                      >
                         <option  value={'all'}>
                              All
                          </option>
                        {merchantList.map((b,index) => {
                            return (
                              <option key={b._id} value={b.name}>
                                {b.name}
                              </option>
                            );
                        })}

                      </SelectInput>
                    </FormGroup>
                    </Col>
                    <Col cW='40%'>
                    </Col>
                  </Row>

                </div>
              ) : ''}
               {transactionType==='WallettoWallet' ? (
                <div>
                  <h4 style={{color:"green",marginTop:'10px'}}><b>Select Contact</b></h4>  
                  <Row>
                    <Col cW='60%'>
                    <FormGroup>
                      <SelectInput
                       value={contact}
                       onChange={(event)=>{
                        setContact(event.target.value);
                       }}
                      >
                        <option  value={'all'}>
                              All
                          </option>
                        {contactList.map((b,index) => {
                            return (
                              <option key={b._id} value={b.name}>
                                {b.name}
                              </option>
                            );
                        })}

                      </SelectInput>
                    </FormGroup>
                    </Col>
                    <Col cW='40%'>
                    </Col>
                  </Row>

                </div>
              ) : ''}
              
              </Card>
              </Col>
              <Col  cW='30%'>
              </Col>
              <Col  cW='30%'>
              </Col>
            </Row>
            <Card bigPadding style={{width:'100%'}}>
              <h3 style={{color:"green" ,textAlign:"left"}}><b>Transactions</b></h3>
        {transList && transList.length > 0 ? (
          <div>
                <Table marginTop="34px">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Transaction ID</th>
                      <th>Details</th>
                      <th>Transaction Type</th>
                      <th>Debit</th>
                      <th>Credit</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>{getTrans()}</tbody>
                </Table>
              </div>
              ) : (
                  <h3
                    style={{
                      textAlign: 'center',
                      color: 'grey',
                      height: '300px',
                    }}
                  >
                    No Transactions found
                  </h3>
                )}
        </Card>
          </Container>
        </Fragment>
    );
}


export default ReportPage;
