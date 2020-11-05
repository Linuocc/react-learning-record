import React, {Component} from 'react';
import 'antd/dist/antd.css';
import store from "./store";
import {getInputChangeAction, getAddItemAction, getDeleteItemAction,initListAction,getInitList} from './store/actionCreator'
import TodoListUI from "./TodoListUI";

class TodoList extends Component {
  
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    store.subscribe(this.handleStoreChange);
  }
  
  componentDidMount() {
    store.dispatch(getInitList());
    // new Promise((resolve, reject) => {
    //   resolve(["hello", "linuocc", "spider"])
    // }).then(res => {
    //   store.dispatch(initListAction(res))
    // })
  }
  
  handleStoreChange() {
    this.setState(store.getState());
  }
  
  render() {
    return (
      <TodoListUI
        inputValue={this.state.inputValue}
        handleInputChange={this.handleInputChange}
        handleBtnClick={this.handleBtnClick}
        list={this.state.list}
        handleItemDelete={this.handleItemDelete}
      />
    )
  }
  
  handleInputChange(e) {
    store.dispatch(getInputChangeAction(e.target.value));
  }
  
  handleBtnClick() {
    store.dispatch(getAddItemAction());
  }
  
  handleItemDelete(index) {
    store.dispatch(getDeleteItemAction(index));
  }
  
  
}

export default TodoList;
