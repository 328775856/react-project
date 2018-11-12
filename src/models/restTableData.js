import { routerRedux } from 'dva/router';
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
import { getUrl, postUrl, putUrl, deleteUrl } from '../services/api';

export default {
  namespace: 'restTableData',
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
    *getById({ path, payload, callback }, { call, put }) {
      const response = yield call(getUrl, path, payload);
      yield put({
        type: 'dataForm',
        payload: response
      });
      if (callback) callback();
    },
    *getDataForAdd({ path, payload, callback }, { call, put }) {
      const response = yield call(postUrl, path, payload);
      yield put({
        type: 'dataForm',
        payload: response
      });
      if (callback) callback();
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
    *getDataForUpdate({ path, payload, callback, processor }, { call, put }) {
      const response = yield call(postUrl, path, payload);
      yield put({
        type: 'dataForm',
        payload: response,
        processor
      });
      if (callback) callback();
    },
    *getData({ path, payload, callback, processor }, { call, put }) {
      const response = yield call(postUrl, path, payload);
      yield put({
        type: 'dataForm',
        payload: response,
        processor
      });
      if (callback) callback();
    },
    *getUEData({ path, payload, callback, processor }, { call, put }) {
      const response = yield call(postUrl, path, payload);
      yield put({
        type: 'loadForm',
        payload: response,
        processor
      });
      if (callback) callback();
    },
    *update({ path, payload, callback }, { call, put }) {
      const response = yield call(putUrl, path, payload);
      yield put({
        type: 'loadResponse',
        payload: response
      });
      if (callback) callback();
    },
    *delete({ path, payload, callback }, { call, put }) {
      const response = yield call(deleteUrl, path, payload);
      yield put({
        type: 'loadResponse',
        payload: JSON.parse(response)
      });
      if (callback) callback();
    },
    *select({ path, payload }, { call, put }) {
      yield put({
        type: 'loadSelect',
        payload
      });
    },
    *initOption({ path, payload, optionKey, callback }, { call, put }) {
      const response = yield call(postUrl, path, payload);
      yield put({
        type: 'loadOption',
        payload: response,
        optionKey
      });
      if (callback) callback();
    },
    *initOptions({ path, payload, callback }, { call, put }) {
      const response = yield call(postUrl, path, payload);

      if (callback) callback(response);
    },
    *initOptionElement({ path, payload, option, callback }, { call, put }) {
      const response = yield call(postUrl, path, payload);
      yield put({
        type: 'loadOptionElement',
        payload: response,
        option
      });
      if (callback) callback();
    },
    *goUrl({ path, payload }, { call, put }) {
      yield put(routerRedux.push(path));
      yield put({
        type: 'dataForm',
        payload: { data: payload }
      });
    },
    *init({ path, payload, callback }, { call, put }) {
      const response = yield call(postUrl, path, payload);
      yield put({
        type: 'dataForm',
        payload: response
      });
      if (callback) callback();
    }
  },

  reducers: {
    loadPage(state, action) {
      const myState = {
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
      return myState;
    },
    //ueditor编辑器加载时调用，一般情况使用下面dataform
    loadForm(state, action) {
      let formData = null;
      // console.log(UE);
      let ue = UE.getEditor('content');
      // console.log(action.payload.data);
      if (action.payload.data == undefined) {
        formData = {};
        ue.ready(function() {
          ue.reset();
          ue.setContent('');
        });
      } else {
        formData = action.payload.data;
        ue.ready(function() {
          // console.log(formData.content);
          ue.setContent(formData.content);
        });
      }
      if (action.processor) {
        formData = action.processor(formData, action.payload);
      }
      const myState = {
        ...state,
        formData,
        status: action.payload.status,
        message: action.payload.message
      };
      return myState;
    },
    dataForm(state, action) {
      let formData = null;
      if (action.payload.data == null) {
        formData = {};
      } else {
        formData = action.payload.data;
      }
      if (action.processor) {
        formData = action.processor(formData, action.payload);
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
    loadOption(state, action) {
      const myState = {
        ...state
      };
      if (action.payload.success) {
        myState[action.optionKey] = action.payload.data.rows;
      }
      return myState;
    },
    loadOptionElement(state, action) {
      const myState = {
        ...state
      };
      if (action.payload.success) {
        const options = action.payload.data.rows.map(item => (
          <Select.Option key={item[action.option.key]}>{item[action.option.value]}</Select.Option>
        ));
        myState[action.option.optionKey] = options;
      }
      return myState;
    }
  }
};
