import React, {Component, Fragment} from "react";
import TodoItem from "./TodoItem";
import './style.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      inputValue: '',
      list: []
    }
  }
  
  
  
  render() {
    
    return (
      <Fragment>
        <label htmlFor='insertArea'>输入内容</label>
        <input
          id='insertArea'
          className='input'
          value={this.state.inputValue}
          onChange={e => this.handleInputChange(e)}
        />
        <button onClick={event => this.handleBtnClick(event)}>提交</button>
        <ul>
          {
            this.getTodoItem()
          }
        </ul>
      
      </Fragment>
    )
  }
  
  
  getTodoItem() {
    return this.state.list.map((item, index) => {
      return (
        <TodoItem content={item} index={index} deleteItem={(e) => this.handleBtnDelete(e)} key={index}/>
      )
    })
  }
  
  handleInputChange(event) {
    const value = event.target.value
    this.setState( {
        inputValue: value
      
    })
  }
  
  handleBtnClick() {
    this.setState((prevState) => {
      return {
        list: [prevState.inputValue, ...prevState.list],
        inputValue: ''
      }
    })
  }
  
  handleBtnDelete(index) {
    this.setState((prevState) => {
      const list = prevState.list;
      list.splice(index, 1);
      return {
        list
      }
    })
  }
}


export default TodoList;