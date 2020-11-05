import axios from 'axios';
import * as constants from './constants'

const changeHomeData = (result) => ({
  type: constants.CHANGE_HOME_DATA,
  topicList: result.topicList,
  articleList: result.articleList,
  recommendList: result.recommendList
});

const addHomeList = (result) => ({
  type: constants.ADD_ARTICLE_LIST,
  list: result
});

export const getHomeInfo = () => {
  return (dispatch) => {
    axios.get('/api/home.json').then(res => {
      dispatch(changeHomeData(res.data.data));
    })
  }
};

export const getMoreList = () => {
  return (dispatch) => {
    axios.get('/api/list.json').then(res => {
      dispatch(addHomeList(res.data.data));
    })
  }
};

export const toggleTopShow = (show)=>({
  type:constants.TOGGLE_SCROLL_TOP,
  show
});