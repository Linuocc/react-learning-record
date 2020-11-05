import React, {PureComponent} from 'react';
import {CSSTransition} from 'react-transition-group';
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoList,
  SearchInfoItem,
  Addition,
  Button,
  SearchWrapper
} from "./style";
import {connect} from 'react-redux';
import {actionCreators} from './store';
import {Link} from 'react-router-dom';
import {actionCreators as loginActionCreators} from "../../pages/login/store";

class Header extends PureComponent {
  
  getListArea() {
    const {focused, list, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePage} = this.props;
    const jsList = list.toJS();
    const pageList = [];
    if (jsList.length) {
      for (let i = (page - 1) * 10; i < page * 10; i++) {
        pageList.push(
          <SearchInfoItem key={jsList[i]}>{jsList[i]}</SearchInfoItem>
        );
      }
    }
    if (focused || mouseIn) {
      return (
        <SearchInfo
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch onClick={_ => handleChangePage(page, totalPage, this.spinIcon)}>
              <i ref={(icon) => {
                this.spinIcon = icon
              }} className='iconfont spin'>&#xe851;</i>
              换一批
            </SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            {
              pageList
            }
          </SearchInfoList>
        </SearchInfo>
      )
    } else {
      return null;
    }
  }
  
  render() {
    const {focused, handleInputFocus, handleInputBlur, list, login, logout} = this.props;
    return (
      <div style={{borderBottom: "1px solid #f0f0f0"}}>
        <HeaderWrapper>
          <Link to="/">
            <Logo/>
          </Link>
          <Nav>
            <NavItem className='left active'>首页</NavItem>
            <NavItem className='left'>下载App</NavItem>
            {
              login ?
                <NavItem onClick={logout} className='right'>退出</NavItem> :
                <Link to='/login'><NavItem className='right'>登录</NavItem></Link>
            }
            
            <NavItem className='right'>
              <i className='iconfont'>&#xe636;</i>
            </NavItem>
            <SearchWrapper>
              <CSSTransition
                timeout={200}
                in={focused}
                classNames="slide"
              >
                <NavSearch
                  className={focused ? "focused" : ""}
                  onFocus={_ => handleInputFocus(list)}
                  onBlur={handleInputBlur}
                />
              </CSSTransition>
              <i className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}
              >&#xe614;</i>
              {
                this.getListArea()
              }
            </SearchWrapper>
          </Nav>
          <Addition>
            <Link to='/write'>
              <Button className='write'>
                <i className='iconfont'>&#xe708;</i>
                写文章
              </Button>
            </Link>
            <Button className='reg'>注册</Button>
          </Addition>
        </HeaderWrapper>
      </div>
    );
  }
  
}


export default connect(
  (state) => ({
    focused: state.get('header').get('focused'),
    list: state.get('header').get('list'),
    page: state.get('header').get('page'),
    totalPage: state.get('header').get('totalPage'),
    mouseIn: state.get('header').get('mouseIn'),
    login: state.getIn(['login', 'login'])
  }),
  (dispatch) => ({
    handleInputFocus(list) {
      if (list.size === 0) dispatch(actionCreators.getList());
      dispatch(actionCreators.searchFocus());
    },
    handleInputBlur() {
      dispatch(actionCreators.searchBlur());
    },
    handleMouseEnter() {
      dispatch(actionCreators.mouseEnter())
    },
    handleMouseLeave() {
      dispatch(actionCreators.mouseLeave())
    },
    handleChangePage(page, totalPage, spin) {
      let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
      if (originAngle) {
        originAngle = parseInt(originAngle, 10);
      } else {
        originAngle = 0;
      }
      spin.style.transform = `rotate(${originAngle + 360}deg)`;
      if (page < totalPage) {
        dispatch(actionCreators.changePage(page + 1));
      } else {
        dispatch(actionCreators.changePage(1))
      }
      
    },
    logout() {
      dispatch(loginActionCreators.logout())
    }
  })
)(Header);