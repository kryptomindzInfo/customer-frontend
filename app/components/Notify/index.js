import React, { Component, forwardRef, useRef, useImperativeHandle } from "react";
import styled from 'styled-components';
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


const LinkWrap = styled.span`
  display:inline-block;
  color: ${props => props.theme.primary};
  cursor:pointer;
  float: ${props => props.float ? props.float: 'none'};
  &:hover {
    color: #6cc0e5;
  }
`;

// class Notify extends Component {
//     constructor() {
//     super();
//     this.state = {
//       notification: '',
//     };
//     this.error = this.error.bind(this);
//   }
//   error = txt => toast.error(txt);

//   render() {
//     return (
//         null
//     );
//   }
// }

const  Notify = forwardRef((props, ref) => {

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(ref, () => ({

    notify(txt, type) {
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
    }

  }));

  return null;
});

export default Notify;
