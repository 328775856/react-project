import { getUrl, postUrl, putUrl, deleteUrl } from '../services/api';
import request from '../utils/request';
import { getToken } from '../utils/authority';

export default {
  namespace: 'crud',
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
    *add({ path, payload, callback }, { call, put }) {
      const response = yield call(getUrl, path, payload);
      yield put({
        type: 'loadForm',
        payload: response
      });
      if (callback) callback();
    },
    *addSave({ path, payload, callback }, { call, put }) {
      const response = yield call(postUrl, path, payload);
      // 返回list列表
      yield put({
        type: 'loadResponse',
        payload: response
      });
      if (callback) callback();
    },
    *update({ path, payload, callback }, { call, put }) {
      const response = yield call(postUrl, path, payload);
      yield put({
        type: 'loadForm',
        payload: response
      });
      if (callback) callback();
    },
    *updateSave({ path, payload, callback }, { call, put }) {
      const response = yield call(putUrl, path, payload);
      yield put({
        type: 'loadResponse',
        payload: response
      });
      if (callback) callback();
    },
    *delete({ path, payload }, { call, put }) {
      const response = yield call(deleteUrl, path, payload);
      yield put({
        type: 'loadResponse',
        payload: response
      });
    },
    *batchDelete({ path, payload, callback }, { call, put }) {
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
    *selectOld({ path, payload, callback }, { call, put }) {
      const response = yield call(postUrl, path, payload);
      yield put({
        type: 'loadSelectOld',
        payload: response
      });
      if (callback) callback();
    }
  },

  reducers: {
    newAdd(state, { path, payload, callback }) {
      const response = request(path, {
        method: 'POST',
        body: payload,
        headers: {
          Authorization: getToken()
        }
      });
      // 返回list列表
      const newState = {
        ...state,
        status: response.payload.status,
        message: response.payload.message,
        formData: {}
      };
      if (callback) callback();
      return newState;
    },
    newList(state, { path, payload, callback }) {
      const response = request(path, {
        method: 'POST',
        async: false,
        body: payload,
        headers: {
          Authorization: getToken()
        }
      });

      const newState = {
        ...state,
        pageData: {
          list: response.payload.data.rows,
          pagination: {
            total: response.payload.data.rows.total,
            pageSize: 10,
            current: 1
          }
        },
        status: response.payload.status,
        message: ''
      };
      if (callback) callback();
      return newState;
    },
    loadPage(state, action) {
      const newState = {
        ...state,
        pageData: {
          list: action.payload.data.rows,
          pagination: {
            total: action.payload.data.total,
            pageSize: action.payload.pageSize,
            current: action.payload.pageNo
          }
        },
        status: action.payload.status,
        message: ''
      };
      // eslint-disable-next-line no-console
      console.log(newState);
      return newState;
    },
    loadForm(state, action) {
      const newState = {
        ...state,
        formData: JSON.parse(action.payload.data),
        status: action.payload.status,
        message: ''
      };
      return newState;
    },
    loadResponse(state, action) {
      const newState = {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        formData: {}
      };
      return newState;
    },
    loadSelect(state, action) {
      const myFormData = {
        ...state.formData,
        ...action.payload
      };
      const myState = {
        ...state,
        formData: myFormData
      };
      return myState;
    },
    uploadChange(state, action) {
      const myFormData = {
        ...state.formData,
        ...action
      };
      const myState = {
        ...state,
        formData: myFormData
      };
      return myState;
    },
    loadSelectOld(state, action) {
      const myState = {
        ...state,
        formData: action.payload.data,
        status: action.payload.status,
        message: '',
        gateClientOptions: JSON.parse(action.payload.data)
      };
      return myState;
    }
  }
};
