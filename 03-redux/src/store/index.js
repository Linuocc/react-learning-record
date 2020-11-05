import {createStore, applyMiddleware} from "redux";
import reducer from "./reducer";
import createSagaMiddleware from 'redux-saga';
import TodoSagas from './sagas';
import {composeWithDevTools} from 'redux-devtools-extension'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(TodoSagas);

export default store;