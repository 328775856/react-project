// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  return localStorage.getItem('antd-pro-authority') || 'guest';
}
export function getToken() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  return localStorage.getItem('antd-pro-user') || '';
}

export function setAuthority(payload) {
  return localStorage.setItem('antd-pro-authority', payload.authority || 'admin');
}
export function setToken(payload) {
  return localStorage.setItem('antd-pro-user', payload.data || '');
}
