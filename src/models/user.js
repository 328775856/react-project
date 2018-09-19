import { getUrl, postUrl } from '../services/api';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {}
  },

  effects: {
    *fetch(_, { call, put }) {
      // eslint-disable-next-line no-undef
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(getUrl, '/user/getCurrentUser', {});
      console.log(response);
      if (response.status !== 200) {
        // eslint-disable-next-line no-undef
        yield put(routerRedux.push('/user/login'));
      } else {
        yield put({
          type: 'saveCurrentUser',
          payload: response.data
        });
      }
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {}
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload
        }
      };
    }
  }
};
