import React, { useEffect } from 'react';
import Popup from 'components/Popup';
import Button from '../../components/Button'

function ConfirmPaymentPopup(props) {
  
    useEffect(() => {
    }, []);
  
    return (
      <Popup close={props.close}>
        <div
          style={{
            textAlign: 'center',
            fontSize: '1.5rem',
            paddingBottom: '1rem',
          }}
        >
          Confirm Payment
        </div>
        <div
        style={{
          padding: '5px',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 2,
          display: 'flexrow',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '40px',
          }}
        >
          <Button
            width="50px"
            marginRight="10px"
            style={{
                background:'green',
                color:'white',
            }}
            onClick={() => props.pay()}
          >
            <span>Yes</span>
          </Button>
          <Button
            width="50px"
            style={{
                background:'#cc8819',
                color:'white',
                marginLeft:'10px',
            }}
            onClick={() => props.close()}
          >
            <span>Cancel</span>
          </Button>
        </div>
      </div>
      </Popup>
    );
  }
  
  export default ConfirmPaymentPopup;