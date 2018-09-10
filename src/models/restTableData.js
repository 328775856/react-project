import { routerRedux } from 'dva/router';
import { getUrl, postUrl, putUrl, deleteUrl } from '../services/api';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Table
  } from 'antd';
export default {
  namespace: 'restTableData',
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
    *getById({ path, payload, callback }, { call, put }) {
      const response = yield call(getUrl, path, payload);
      yield put({
        type: 'loadForm',
        payload: response,
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
      const response = yield call(putUrl, path, payload);
      yield put({
        type: 'loadResponse',
        payload: response,
      });
      if (callback) callback();
    },
    *delete({ path, payload, callback }, { call, put }) {
      const response = yield call(deleteUrl, path, payload);
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
    *initOption({ path, payload, optionKey, callback }, { call, put }) {
      const response = yield call(postUrl, path, payload);
      yield put({
        type: 'loadOption',
        payload: response,
        optionKey: optionKey,
      });
      if (callback) callback();
    },
    *initOptionElement({ path, payload, option, callback }, { call, put }) {
      const response = yield call(postUrl, path, payload);
      yield put({
        type: 'loadOptionElement',
        payload: response,
        option: option,
      });
      if (callback) callback();
    },
    *goUrl({ path, payload }, { call, put }) {
      yield put(routerRedux.push(path));
      yield put({
        type: 'loadForm',
        payload: { data: payload },
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
    loadOption(state, action) {
      let myState = {
        ...state,
      };
      if (action.payload.success) {
        myState[action.optionKey] = action.payload.data.rows;
      }
      return myState;
    },
    loadOptionElement(state, action) {
      let myState = {
        ...state,
      };
      if (action.payload.success) {
        let options = action.payload.data.rows.map(item => <Select.Option key={item[action.option.key]}>{item[action.option.value]}</Select.Option>);
        myState[action.option.optionKey] = options;
      }
      return myState;
    },
  },
};
