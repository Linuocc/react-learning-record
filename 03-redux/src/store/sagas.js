import {takeEvery, put} from 'redux-saga/effects';
import {GET_INIT_LIST} from './actionTypes';
import {initListAction} from "./actionCreator";

function* getInitList() {
  try {
    const res = yield new Promise((resolve, reject) => {
      resolve(["hello", "linuocc", "spider"])
    });
    yield put(initListAction(res))
  } catch (err) {
    console.log(err)
  }
  
}

function* Sagas() {
  yield takeEvery(GET_INIT_LIST, getInitList);
}

export default Sagas;