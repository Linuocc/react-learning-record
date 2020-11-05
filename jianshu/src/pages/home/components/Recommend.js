import React, {PureComponent} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

class Recommend extends PureComponent {
  render() {
    return (
      <RecommendWrapper>
        {
          this.props.list.map(item=>{
            return (
              <RecommendItem key={item.get('id')} imgUrl={item.get('imgUrl')}/>
            )
          })
        }
      </RecommendWrapper>
    )
  }
}

const RecommendWrapper = styled.div`
  margin:30px 0;
  width:280px;
  
`;
const RecommendItem = styled.div`
  width:280px;
  height:50px;
  background:url(${(props) => props.imgUrl});
  background-size: contain;
`;

export default connect(
  state=>({
    list:state.getIn(['home','recommendList'])
  }),
  dispatch=>({})
)(Recommend);