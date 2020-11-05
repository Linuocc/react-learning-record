import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

class Write extends PureComponent {
  render() {
    const {loginStatus} = this.props;
    
    if (loginStatus) {
      return (
        <div>
          写文章页面
        </div>
      )
    } else {
      return <Redirect to='/login'/>
    }
    
    
  }
  
}

export default connect(
  state => ({
    loginStatus: state.getIn(['login', 'login'])
  }),
  dispatch => ({})
)(Write);