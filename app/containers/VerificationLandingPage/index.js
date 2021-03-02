/**
 *
 * VerificationLandingPage
 *
 */

import React from 'react';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import HeaderChooseYourBank from '../../components/HeaderChooseYourBank';
import verificationLogo from '../../images/verification_logo.png';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { API_URL, CURRENCY } from 'containers/App/constants';


const styles = () => ({
  root: {
    flexGrow: 1,
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

class VerificationLandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
   
  };

   checkverifiction = ()=>{
     console.log("click")
    const { username } = JSON.parse(localStorage.getItem('loggedUser'));
   
       axios.get(`${API_URL}/user/getBalance`, { username })
     .then(res=>{
       console.log(res)
       if(res.data.status == 1 ){
        this.getmessage()
          window.location = "/dashboard"
        
       }
       else{
          window.location = "/user-verification"
        
       }
     })
     .catch((error)=>{
       console.log(error)
     })

    }

     getmessage = ()=>{
      console.log("ghey")
      axios.get(`${API_URL}/user/getMessages`)
      .then(res=>{
        console.log(res)
        if(res.data.status == 1 ){
          localStorage.setItem("bankId",res.data.user.bank_id)
          
        }
        
      })
      .catch((error)=>{
        console.log(error)
      })
    }
    
    
  

  render() {
    const { classes, notify } = this.props;
    return (
      <div>
        <HeaderChooseYourBank />
        <div className={classes.container}>
          <div className={classes.leftContainer}>
            <img alt="verifyLogo" src={verificationLogo} />
          </div>
          <div className={classes.rightContainer}>
            <Typography variant="h4">
              {' '}
              Pending approval from Cashier! <br /> Please visit our nearest
              bank branch or partner
            </Typography>
          </div>
          
        </div>
        <center><Button
                  variant="contained"
                  color="primary"
                  style={{ fontSize: '5',width:"15%" }}
                    onClick={()=>{
                      this.checkverifiction()
                    }}
                  
                >
                  <Typography style={{ fontSize: '15px' }} noWrap>
                    Check Verification
                  </Typography>
                </Button></center>
      </div>
    );
  }
}

export default withStyles(styles)(VerificationLandingPage);
