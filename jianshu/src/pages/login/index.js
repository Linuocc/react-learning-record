import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {
  LoginWrapper,
  LoginBox,
  Input,
  Button
} from './style';
import {actionCreators} from './store'
import {Redirect} from 'react-router-dom'

class Login extends PureComponent {
  render() {
    const {loginStatus} = this.props;
    
    if (loginStatus) {
      return <Redirect to='/'/>
    } else {
      return (
        <LoginWrapper>
          <LoginBox>
            <Input placeholder="账号" ref={(input) => {
              this.account = input
            }}/>
            <Input placeholder="密码" type='password' ref={(input) => {
              this.password = input
            }}/>
            <Button onClick={() => this.props.login(this.account, this.password)}>登录</Button>
          </LoginBox>
        </LoginWrapper>
      )
    }
    
    
  }
  
}

export default connect(
  state => ({
    loginStatus: state.getIn(['login', 'login'])
  }),
  dispatch => ({
    login(accountElem, passwordElem) {
      dispatch(actionCreators.login(accountElem.value, passwordElem.value))
    }
  })
)(Login);