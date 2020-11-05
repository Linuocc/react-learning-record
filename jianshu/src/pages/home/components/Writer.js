import React, {PureComponent} from 'react';
import styled from 'styled-components';

class Writer extends PureComponent {
  render() {
    return (
      <WriterWrapper>
        writer
      </WriterWrapper>
    )
  }
}
const WriterWrapper = styled.div`
  width:278px;
  border:1px solid #dcdcdc;
  border-radius:3px;
  height:300px;
  line-height:300px;
  text-align:center;
`;


export default Writer;