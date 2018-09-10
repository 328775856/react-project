import { stringify } from 'qs';
import request from '../utils/request';
import { getToken } from '../utils/authority';

export async function getUrl(path, params) {
  return request(`${path}?${stringify(params)}`, {
    method: 'GET',
    headers: {
      Authorization: getToken(),
    },
  });
}
export async function postUrl(path, params) {
  return request(path, {
    method: 'POST',
    body: params,
    headers: {
      Authorization: getToken(),
    },
  });
}
export async function putUrl(path, params) {
  return request(path, {
    method: 'PUT',
    body: params,
    headers: {
      Authorization: getToken(),
    },
  });
}
export async function deleteUrl(path, params) {
  return request(path, {
    method: 'DELETE',
    body: params,
    headers: {
      Authorization: getToken(),
    },
  });
}
