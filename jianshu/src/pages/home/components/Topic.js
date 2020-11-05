import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

class Topic extends PureComponent {
  render() {
    const {list} = this.props;
    return (
      <TopicWrapper>
        {
          list.map((item) => (
              <TopicItem key={item.get('id')}>
                <img
                  className='topic-pic'
                  src={item.get('imgUrl')}
                  alt=''
                />
                {item.get('title')}
              </TopicItem>
            )
          )
        }
      
      </TopicWrapper>
    )
  }
}

const TopicWrapper = styled.div`
  padding:20px 0 10px 0;
  overflow:hidden;
  margin-left:-18px;
  border-bottom:1px solid #dcdcdc;
`;

const TopicItem = styled.div`
  float:left;
  background:#f7f7f7;
  height:32px;
  line-height:32px;
  font-size:14px;
  color:#000;
  border:1px solid #dcdcdc;
  border-radius:4px;
  padding-right:10px;
  margin-left:18px;
  margin-bottom:18px;
  overflow:hidden;
  .topic-pic{
    display:block;
    float:left;
    width:32px;
    height:32px;
    margin-right:10px;
  }
`;


export default connect(
  (state) => {
    return {
      list: state.get('home').get('topicList'),
    }
  },
  (dispatch) => {
    return {}
  }
)(Topic);