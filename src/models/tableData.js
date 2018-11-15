import { routerRedux } from 'dva/router';
import { getUrl, postUrl, putUrl, deleteUrl } from '../services/api';

export default {
  namespace: 'tableData',
  state: {
    pageData: {},
    formData: {},
    status: {},
    message: ''
  },

  effects: {
    *list({ path, payload, callback }, { call, put }) {
      const response = yield call(postUrl, path, payload);
      const res = {
        ...response,
        pageSize: payload.page.pageSize,
        pageNo: payload.page.pageNo
      };
      yield put({
        type: 'loadPage',
        payload: res
      });
      if (callback) callback();
    },
    *getDataForAdd({ path, payload, callback }, { call, put }) {
      const response = yield call(postUrl, path, payload);
      yield put({
        type: 'loadForm',
        payload: response
      });
      if (callback) callback();
    },
    *initOptions({ path, payload, callback }, { call, put }) {
      const response = yield call(postUrl, path, payload);

      if (callback) callback(response);
    },
    *add({ path, payload, callback }, { call, put }) {
      const response = yield call(postUrl, path, payload);
      // 返回list列表
      yield put({
        type: 'loadResponse',
        payload: response
      });
      if (callback) callback();
    },
    *getDataForUpdate({ path, payload, callback }, { call, put }) {
      const response = yield call(postUrl, path, payload);
      yield put({
        type: 'loadForm',
        payload: response
      });
      if (callback) callback();
    },
    *update({ path, payload, callback }, { call, put }) {
      const response = yield call(postUrl, path, payload);
      yield put({
        type: 'loadResponse',
        payload: response
      });
      if (callback) callback();
    },
    *remove({ path, payload, callback }, { call, put }) {
      const response = yield call(postUrl, path, payload);
      yield put({
        type: 'loadResponse',
        payload: response
      });
      if (callback) callback();
    },
    *select({ path, payload }, { call, put }) {
      yield put({
        type: 'loadSelect',
        payload
      });
    },
    *goUrl({ path, payload }, { call, put }) {
      yield put(routerRedux.push(path));
      yield put({
        type: 'loadForm',
        payload: { data: payload }
      });
    }
  },

  reducers: {
    loadPage(state, action) {
      const list = action.payload.data ? action.payload.data.rows : [];
      const total = action.payload.data ? action.payload.data.total : 0;
      const myState = {
        ...state,
        pageData: {
          list,
          pagination: {
            total,
            pageSize: action.payload.pageSize,
            current: action.payload.pageNo
          }
        },
        status: action.payload.status,
        message: ''
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
      const myState = {
        ...state,
        formData,
        status: action.payload.status,
        message: action.payload.message
      };
      return myState;
    },
    loadResponse(state, action) {
      const myState = {
        ...state,
        status: action.payload.status,
        message: action.payload.message
      };
      return myState;
    },
    loadSelect(state, action) {
      //公用model，传入为string或object
      let lastFormData; let myFormData;
      if (typeof state.formData === 'string') {
        lastFormData = state.formData;
        myFormData = {
          lastFormData,
          ...action.payload
        };
      } else {
        myFormData = {
          ...state.formData,
          ...action.payload
        };
      }
      const myState = {
        ...state,
        formData: myFormData
      };
      return myState;
    }
  }
};
