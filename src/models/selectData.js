import { getUrl,postUrl } from '../services/api';
export default {
  namespace: 'selectData',
  state: {
    pageData: {},
    formData: {},
    status: {},
    message: '',
  },
  effects: {
    *query({ path,payload,callback }, { call, put }) {
      const response = yield call(postUrl,path, payload);
      yield put({
        type: 'loadPage',
        payload: response,
      });
      if (callback) callback();
    },
    *init({ path,payload,callback}, { call, put }) {
      const response = yield call(postUrl,path, payload);
      yield put({
        type: 'loadForm',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    loadPage(state, action) {
      let myState = {
        ...state,
        pageData: {
          list: action.payload.data.rows,
          pagination: {
            total: action.payload.data.total,
            pageSize: action.payload.pageSize,
            current: action.payload.pageNo,
          },
        },
        status: action.payload.status,
        message: '',
      };
      return myState;

    },
    loadForm(state, action) {
      let formData = null;
      if (action.payload.data == null) {
        formData = {};
      } else {
        formData = action.payload.data;
      }
      let myState = {
        ...state,
        formData: formData,
        status: action.payload.status,
        message: action.payload.message,
      };
      return myState;


    },



  },
};
