import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }
  .pagination{
    display: block;
    list-style: none;
    padding: 0;
  }
  .pagination:after{
    content: '';
    display:block;
    clear:both;
  }
  .pagination li{
    float: left;
    background: #558b53;
    margin-right: 3px;
  }
  .pagination li a{

    padding: 5px 10px;
    color: #fff;
    display:block;
  }
  .pagination li.disabled{
    background: #656565;
  }
  .pagination li.active{
    background: #f5a623;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
