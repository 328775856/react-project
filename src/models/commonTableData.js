import { routerRedux } from 'dva/router';
import { getUrl, postUrl, putUrl, deleteUrl } from '../services/api';
export default {
  namespace: 'commonTableData',
  state: {
    pageData: {},
    formData: {},
    status: {},
    message: '',
  },

  effects: {
    *list({ path, payload, callback }, { call, put }) {
      const response = yield call(postUrl, path, payload);
      let res = {
        ...response,
        pageSize: payload.page.pageSize,
        pageNo: payload.page.pageNo,
      };
      yield put({
        type: 'loadPage',
        payload: res,
      });
      if (callback) callback();
    },
    *getDataForAdd({ path, payload, callback }, { call, put }) {
      const response = yield call(postUrl, path, payload);
      yield put({
        type: 'loadForm',
        payload: response,
      });
      if (callback) callback();
    },
    *initOptions({ path, payload, callback }, { call, put }) {
      const response = yield call(postUrl, path, payload);

      if (callback) callback(response);
    },
    *add({ path, payload, callback }, { call, put }) {
      const response = yield call(postUrl, path, payload);
      //返回list列表
      yield put({
        type: 'loadResponse',
        payload: response,
      });
      if (callback) callback();
    },
    *getDataForUpdate({ path, payload, callback }, { call, put }) {
      const response = yield call(postUrl, path, payload);
      yield put({
        type: 'loadForm',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ path, payload, callback }, { call, put }) {
      const response = yield call(postUrl, path, payload);
      yield put({
        type: 'loadResponse',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ path, payload, callback }, { call, put }) {
      const response = yield call(postUrl, path, payload);
      yield put({
        type: 'loadResponse',
        payload: response,
      });
      if (callback) callback();
    },
    *select({ path, payload }, { call, put }) {
      yield put({
        type: 'loadSelect',
        payload: payload,
      });
    },
    *goUrl({ path, payload }, { call, put }) {
      yield put(routerRedux.push(path));
      yield put({
        type: 'loadForm',
        payload: { data: payload },
      });
    },
    *clear({ path, payload }, { call, put }) {
      yield put({
        type: 'clear',
        payload: payload,
      });
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
    loadResponse(state, action) {
      let myState = {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
      };
      return myState;
    },
    loadSelect(state, action) {
      let myFormData = {
        ...state.formData,
        ...action.payload,
      };
      let myState = {
        ...state,
        formData: myFormData,
      };
      return myState;
    },
    clear(state, action) {
      let myFormData = {
        ...action.payload,
      };
      let myState = {
        ...state,
        formData: myFormData,
      };
      return myState;
    },
  },
};
