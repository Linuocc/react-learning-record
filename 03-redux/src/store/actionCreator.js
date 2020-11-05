import {CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST,GET_INIT_LIST} from "./actionTypes";
import store from "./index";

export const getInputChangeAction = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value
})

export const getAddItemAction = () => ({
  type: ADD_TODO_ITEM
})

export const getDeleteItemAction = (index) => ({
  type: DELETE_TODO_ITEM,
  index
})

export const initListAction = (data) => ({
  type: INIT_LIST,
  data
})

// export const getTodoList = () => {
//   return (dispatch) => {
//     new Promise((resolve, reject) => {
//       resolve(["hello", "linuocc", "spider"])
//     }).then(res => {
//       dispatch(initListAction(res))
//     })
//   }
// }


export const getInitList = ()=>({
  type:GET_INIT_LIST,
})