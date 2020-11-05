import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {GlobalStyle} from "./style";
import {IconFont} from './statics/iconfont/iconfont';

ReactDOM.render(
  <React.Fragment>
    <App/>
    <GlobalStyle/>
    <IconFont/>
  </React.Fragment>,
  document.getElementById('root')
);
