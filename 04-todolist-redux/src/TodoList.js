import React from 'react';

import {connect} from "react-redux";
const TodoList = (props)=>{
  const {inputValue,handleInputChange,handleClick,list} = props;
  return (
    <div>
      <div>
        <input value={inputValue} onChange={handleInputChange}/>
        <button onClick={handleClick}>提交</button>
      </div>
      <ul>
        {
          list.map((item,index)=>{
            return <li key={index}>{item}</li>
          })
        }
      </ul>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list:state.list
  }
}

const mapDispatchProps = (dispatch) => {
  return {
    handleInputChange(e) {
      dispatch({
        type: "change_input_value",
        value: e.target.value
      })
    },
    handleClick(){
      dispatch({
        type:"add_item"
      })
    }
  }
}


export default connect(mapStateToProps, mapDispatchProps)(TodoList);
