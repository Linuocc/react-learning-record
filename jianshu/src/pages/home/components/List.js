import React, {PureComponent} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {actionCreators} from '../store';
import {Link} from 'react-router-dom';

class List extends PureComponent {
  render() {
    const {list, getMoreList} = this.props;
    return (
      <div>
        {
          list.map((item, index) => {
            return (
              <Link key={index} to={'/detail/' + item.get('id')}>
                <ListItem>
                  <img
                    className='pic'
                    src={item.get('imgUrl')}
                    alt=''
                  />
                  <ListInfo>
                    <h3 className='title'>{item.get('title')}</h3>
                    <p className='desc'>{item.get('desc')}</p>
                  </ListInfo>
                </ListItem>
              </Link>
            );
          })
        }
        <LoadMore onClick={() => getMoreList()}>
          更多文字
        </LoadMore>
      </div>
    )
  }
}


const ListItem = styled.div`
  padding:20px 0;
  border-bottom:1px solid #dcdcdc;
  overflow:hidden;
  .pic{
    width:125px;
    height:100px;
    display:block;
    float:right;
    border-radius:10px
  }
`;

const ListInfo = styled.div`
  width:500px;
  float:left;
  .title{
    line-height:27px;
    font-size:18px;
    font-weight:bold;
    color:#333;
  }
  .desc{
    line-height:24px;
    font-size:13px;
    color:#999;
  }
  
`;

const LoadMore = styled.div`
  width:100%;
  height:40px;
  line-height:40px;
  text-align:center;
  background:#a5a5a5;
  border-radius:20px;
  color:#fff;
  margin:30px 0;
  cursor:pointer;
`;


export default connect(
  state => ({
    list: state.get('home').get('articleList')
  }),
  dispatch => ({
    getMoreList() {
      dispatch(actionCreators.getMoreList())
    }
  })
)(List);