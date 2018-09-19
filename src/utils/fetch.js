import fetch from 'dva/fetch';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    // console.log(response.headers.get('x-pagination-page-count')); //35
    // console.log(response.headers.get('x-pagination-total-count')); //411
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, method, data) {
  if (typeof method === 'object') {
    data = method;
    method = 'GET';
  }

  const options = {
    // 发送请求
    method, // 请求方式    (可以自己添加header的参数)
    mode: 'cors', // 避免cors攻击
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: localStorage.getItem('antd-pro-user')
    },
    credentials: 'include'
  };
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}
