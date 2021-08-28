import storage from './storage'

export default function parseAuthToken() {

  const token = storage.get('authToken');

  if (!token) { return "" }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  const tokenParsed = JSON.parse(window.atob(base64));
  const userId = tokenParsed._id;
  return userId
}