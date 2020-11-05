import React, {PureComponent} from 'react';
import {
  HomeWrapper,
  HomeLeft,
  HomeRight,
  BackTop
} from './style';
import Topic from "./components/Topic";
import List from "./components/List";
import Recommend from "./components/Recommend";
import Writer from "./components/Writer";
import {connect} from "react-redux";
import {actionCreators} from './store'

class Home extends PureComponent {
  
  
  
  
  handleScrollTop() {
    window.scrollTo(0, 0);
  }
  
  render() {
    return (
      <HomeWrapper>
        <HomeLeft>
          <img
            alt=''
            className='banner-img'
            src="https://img.zcool.cn/community/01c0ad5f607c0911013e31875ce668.jpg@1280w_1l_2o_100sh.jpg"
          />
          <Topic></Topic>
          <List></List>
        </HomeLeft>
        <HomeRight>
          <Recommend></Recommend>
          <Writer></Writer>
        </HomeRight>
        {
          this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>
            顶部
          </BackTop> : null
        }
      
      </HomeWrapper>
    )
  }
  
  componentDidMount() {
    this.props.changeHomeData();
    this.bindEvents()
  }
  
  bindEvents() {
    window.addEventListener('scroll', this.props.changeScrollTopShow)
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.props.changeScrollTopShow)
  }
}

export default connect(
  state => ({
    showScroll: state.getIn(['home', 'showScroll'])
  }),
  dispatch => ({
    changeHomeData(action) {
      dispatch(actionCreators.getHomeInfo())
    },
    changeScrollTopShow() {
      if (document.documentElement.scrollTop > 300) {
        dispatch(actionCreators.toggleTopShow(true))
      } else {
        dispatch(actionCreators.toggleTopShow(false))
      }
    }
  })
)(Home);