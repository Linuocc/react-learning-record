# React学习记录

[TOC]

## 01-todolist



### （1）声明式开发

### （2）可以与其他框架共存

### （3）组件化

### （4）单向数据流

### （5）视图层框架

### （6）函数式编程



## 02-propTypes和defaultProps

propTypes：类型校验

defaultProps：设置默认值

```react
import React, {Component} from "react";
import PropTypes from "prop-types";//导入PropTypes

class TodoItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {content} = this.props;
    return (
      <div onClick={e=>this.handleClick(e)}>
        {content}
      </div>
    )
  }
  handleClick(){
    const {deleteItem,index} = this.props;
    deleteItem(index);
  }
}

//类型校验
TodoItem.propTypes = {
  content:PropTypes.string,//字符串类型
  deleteItem:PropTypes.func,//方法
  index:PropTypes.number.isRequired//数字类型，而且必传
}

//设置默认值
TodoItem.defaultProps = {
  test:"hello"
}

export default TodoItem;
```



官方示例

```react
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // 你可以将属性声明为 JS 原生类型，默认情况下
  // 这些属性都是可选的。
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 任何可被渲染的元素（包括数字、字符串、元素或数组）
  // (或 Fragment) 也包含这些类型。
  optionalNode: PropTypes.node,

  // 一个 React 元素。
  optionalElement: PropTypes.element,

  // 一个 React 元素类型（即，MyComponent）。
  optionalElementType: PropTypes.elementType,

  // 你也可以声明 prop 为类的实例，这里使用
  // JS 的 instanceof 操作符。
  optionalMessage: PropTypes.instanceOf(Message),

  // 你可以让你的 prop 只能是特定的值，指定它为
  // 枚举类型。
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 一个对象可以是几种类型中的任意一个类型
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // 可以指定一个数组由某一类型的元素组成
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 可以指定一个对象由某一类型的值组成
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 可以指定一个对象由特定的类型值组成
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),
  
  // An object with warnings on extra properties
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number
  }),   

  // 你可以在任何 PropTypes 属性后面加上 `isRequired` ，确保
  // 这个 prop 没有被提供时，会打印警告信息。
  requiredFunc: PropTypes.func.isRequired,

  // 任意类型的数据
  requiredAny: PropTypes.any.isRequired,

  // 你可以指定一个自定义验证器。它在验证失败时应返回一个 Error 对象。
  // 请不要使用 `console.warn` 或抛出异常，因为这在 `onOfType` 中不会起作用。
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // 你也可以提供一个自定义的 `arrayOf` 或 `objectOf` 验证器。
  // 它应该在验证失败时返回一个 Error 对象。
  // 验证器将验证数组或对象中的每个值。验证器的前两个参数
  // 第一个是数组或对象本身
  // 第二个是他们当前的键。
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```





## 03-props,state和render函数

**当前组件的state或者props发生改变时，render函数就会重新执行**

**父组件的render函数重新执行时，子组件的render函数也会重新执行**



## 04-虚拟DOM

### （1）虚拟DOM生成过程

> **JSX（模板）——>createElement——>虚拟DOM（JS对象）——>真是DOM**



### （2）虚拟DOM比较

**diff算法**

> **1.同层比较**
>
> **2.**列表渲染key值（最好不要用index做key值）





## 05-ref



### （1）第一种用法

```react
//创建ref
<input
    id='insertArea'
    className='input'
    value={this.state.inputValue}
    onChange={e => this.handleInputChange(e)}
    ref={(input) => {
    	this.input = input
    }}
/>


//使用ref
handleInputChange(event) {
    console.log(this.input)
    const value = this.input.value
    this.setState(() => {
        return {
            inputValue: value
        }
    })
}
```



### （2）第二种用法

```react
//创建ref
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    render() {
        return <div ref={this.myRef} />;
    }
}

//使用ref
const node = this.myRef.current;
```





## 06-生命周期函数



### （1）概念

> 在组件运行的，某个时候会自动执行的函数，就是生命周期函数

**render函数就是一个生命周期函数,render生命周期函数必须有**



### （2）shouldComponentUpdate

```react
shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log(nextProps,nextState,nextContext);
    return true;//这里必须返回一个boolean类型的值，表示要不要更新组件的值
}
```



### （3）componentWillUpdate

```react
//组件更新之前，他会自动执行，但是是在shouldComponentUpdate生命周期函数之后，如果shouldComponentUpdate返回true他才执行，如果返回false就不执行
componentWillUpdate(nextProps, nextState, nextContext) {
    console.log("componentWillUpdate");
}
```



### （4）componentWillReceiveProps

触发的条件：

> 1.要从父组件接收参数
>
> 2.这个组件必须之前就存在于父组件中，第一次存在的时候，不会执行

```react

componentWillReceiveProps(nextProps, nextContext) {
    console.log("componentWillReceiveProps")
}
```



### （5）componentWillUnmount

> 组件要从页面移除之前执行

```react
componentWillUnmount() {
    console.log("componentWillUnmount");
}
```



### （6）componentDidMount

> 组件挂载成功之后触发
>
> 一般把数据请求放在componentDidMount生命周期函数中



## 07-react动画

### （1）transition

> 使用css的transition属性实现动画



### （2）@keyframes

> 使用css的@keyframes实现动画，可以设置到不同的进度百分比显示效果



### （3）react-transition-group

> 使用第三方的动画库实现

**安装：**

```shell
npm i react-transition-group
```

具体使用查看官方文档



## 08-Redux

![](E:\React\Image 1.png)



### （1）创建store

> createStore：创建store

```react
import {createStore} from "redux";//引入redux
import reducer from "./reducer";//引入reducer


const store = createStore(reducer);//创建store


export default store;
```



### （2）创建reducer

> reducer可以接收state，但是绝不能修改state
>
> reducer必须是纯函数，给定固定输入，就一定会有固定输出（不能有时间相关的操作，或者异步请求），而且不能有任何副作用

```react
const defaultState = {//默认的state
  inputValue: '123',
  list: ['1','2']
};


export default (state = defaultState, action) => {//导出
  return state;
}
```



### （3）获取store

> store.getState：获取store
>
> store.subscribe：订阅store

```react
constructor(props) {
    super(props);
    this.state = store.getState();//将store的值赋值给state
   
    this.handleStoreChange = this.handleStoreChange.bind(this);
    store.subscribe(this.handleStoreChange);//订阅store的变化
}

handleStoreChange() {//store变化触发的回调
    this.setState(store.getState());//更新state的值
}
```



### （4）修改store

> store.dispatch：派发action

```react
//TodoList.js
handleInputChange(e) {
    const action = {
        type: "change_input_value",
        value: e.target.value,
    }
    store.dispatch(action);//派发数据到reducer
}
```



```react
//reducer.js
export default (state = defaultState, action) => {//action就是组件派发过来的数据

    if (action.type == 'change_input_value') {
        const newState = JSON.parse(JSON.stringify(state));//只能拷贝过来修改，不能直接修改state的值
        newState.inputValue = action.value;
        return newState;//返回新的state
    }
    return state//返回state
}
```



### （5）redux-thunk

> 用于异步数据请求



**安装**

```shell
npm i redux-thunk
```



**创建store的代码如下：**

```react
import {createStore, applyMiddleware, compose} from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension'


const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);


export default store;
```



**使用**

> store.dispatch可以接收一个方法作为参数，方法中就可以进行网络请求，方法的参数可以传递dispatch

```react
//actionCreator.js
export const getTodoList = () => {
    return (dispatch) => {
        new Promise((resolve, reject) => {
            resolve(["hello", "linuocc", "spider"])
        }).then(res => {
            dispatch(initListAction(res))
        })
    }
}
```

或者这样使用

```react
componentDidMount() {
    store.dispatch(() => {
        new Promise((resolve, reject) => {
            resolve(["hello", "linuocc", "spider"])
        }).then(res => {
            store.dispatch(initListAction(res))
        })
    });
}
```



### （6）redux-saga

> 用于异步数据请求



**sagas.js**

```react
import {takeEvery, put} from 'redux-saga/effects';
import {GET_INIT_LIST} from './actionTypes';
import {initListAction} from "./actionCreator";


//对应action的逻辑处理，必须是generator函数
function* getInitList() {
    try {
        const res = yield new Promise((resolve, reject) => {
            resolve(["hello", "linuocc", "spider"])
        });
        yield put({
            type:res
        });//put方法相当于store.dispatch
    } catch (err) {
        console.log(err)
    }

}


//导出的必须是一个generator函数
function* Sagas() {
    //takeEvery接收两个参数，第一个是action的type，第二个是对应的逻辑处理函数，也是一个generator函数
    yield takeEvery(GET_INIT_LIST, getInitList);
}

export default Sagas;
```



**store/index.js**

```react
import {createStore, applyMiddleware, compose} from "redux";
import reducer from "./reducer";
import createSagaMiddleware from 'redux-saga';
import TodoSagas from './sagas';//引入sagas.js
import {composeWithDevTools} from 'redux-devtools-extension'

//创建saga中间件
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware);
    )
);

sagaMiddleware.run(TodoSagas);//调用saga中间件的run方法，参数是sagas.js导出的generator方法

export default store;
```





### （7）redux中间件

> redux中间件是在action和store之间，redux中间件就是对dispatch的升级



### （8）react-redux

> 详细使用查看官方文档



## 09-UI组件和容器组件拆分



> 将一个react组件进行拆分，拆分成UI组件和容器组件。
>
> UI组件：只负责组件UI的展示，不做逻辑处理
>
> 容器组件：render函数只返回对应的UI组件，其他只做逻辑处理



> 示例

**TodoList.js**

```react
import React, {Component} from 'react';
import 'antd/dist/antd.css';
import store from "./store";
import {getInputChangeAction, getAddItemAction, getDeleteItemAction} from './store/actionCreator'
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

```



**TodoListUI.js**

```react
import React, {Component} from 'react';
import {Button, Input, List} from "antd";

class TodoListUI extends Component {
    render() {
        return (
            <div style={{margin: '10px'}}>
                <div>
                    <Input
                        placeholder='todo info'
                        value={this.props.inputValue}
                        style={{width: '300px', marginRight: '10px'}}
                        onChange={this.props.handleInputChange}
                        />
                    <Button type='primary' onClick={this.props.handleBtnClick}>提交</Button>
                </div>
                <List
                    style={{marginTop: '10px', width: '300px'}}
                    bordered
                    dataSource={this.props.list}
                    renderItem={(item, index) => (<List.Item onClick={_ => {
                                this.props.handleItemDelete(index)
                            }}>{item}</List.Item>)}
                    />
            </div>
        )
    }
}

export default TodoListUI;
```

> 在TodoList.js中引入了TodoListUI.js，并在render函数中使用了TodoListUI，并传入需要的属性值以及事件函数，详细的展示都在TodoListUI中进行，而全部的逻辑处理都在TodoList中进行，作用分明，有利于代码的阅读，以及后期的维护。



## 10-无状态组件

> 当一个普通的组件只有一个render函数的时候，可以用无状态组件替换普通组件，无状态组件就是一个函数，无状态组件的性能更高。
>
> UI组件一般可以用无状态组件来定义



将09节中的TodoListUI组件改写为无状态组件

```react
//TOdolistUI.js
import React from 'react';
import {Button, Input, List} from "antd";

const TodoListUI = (props) => {
    return (
        <div style={{margin: '10px'}}>
            <div>
                <Input
                    placeholder='todo info'
                    value={props.inputValue}
                    style={{width: '300px', marginRight: '10px'}}
                    onChange={props.handleInputChange}
                    />
                <Button type='primary' onClick={props.handleBtnClick}>提交</Button>
            </div>
            <List
                style={{marginTop: '10px', width: '300px'}}
                bordered
                dataSource={props.list}
                renderItem={(item, index) => (<List.Item onClick={_ => {
                            props.handleItemDelete(index)
                        }}>{item}</List.Item>)}
                />
        </div>
    )
}


export default TodoListUI;
```







## 11-简书项目实战

