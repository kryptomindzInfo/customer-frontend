import React, { Component } from "react";
import styled from 'styled-components';
import history from 'utils/history';

// const LinkWrap = styled.span `
//     display:inline-block;
//     cursor:pointer;
//     float: ${props => props.float ? props.float: 'none'};
//     text-decoration:none;
//     color: ${props => props.theme.primary};
//     font-weight: bold;
//     font-size: 14px;
// `;

const LinkWrap = styled.span`
  display:inline-block;
  color: ${props => props.theme.primary};
  cursor:pointer;
  float: ${props => props.float ? props.float: 'none'};
  &:hover {
    color: #6cc0e5;
  }
`;

class A extends Component {
  goTo = (page) => {
    history.push(page);
  } 
  render() {
    return (
        <LinkWrap float={this.props.float} onClick={() => this.goTo(this.props.href)} className="pointer anchor">
            {this.props.children}
        </LinkWrap>
    );
  }
}

export default A;
