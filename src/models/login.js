import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { postUrl, getUrl } from '../services/api';
import { setAuthority, setToken } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { getPageQuery } from '../utils/utils';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    message: ''
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(postUrl, '/user/login', payload);
      console.log(response, '123');
      yield put({
        type: 'setStatus',
        payload: response
      });
      // Login successfully
      if (response.status === 200) {
        yield put({
          type: 'setInfo',
          payload: response
        });
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },
    *logout(_, { put }) {
      yield put({
        type: 'setInfo',
        payload: {
          status: false,
          currentAuthority: 'guest'
        }
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href
          })
        })
      );
    }
  },

  reducers: {
    setInfo(state, { payload }) {
      setAuthority(payload);
      setToken(payload);
      return {
        ...state
      };
    },
    setStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        message: payload.message
      };
    }
  }
};
