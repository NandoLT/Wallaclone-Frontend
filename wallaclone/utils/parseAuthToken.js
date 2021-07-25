
export default function parseAuthToken(token) {
    if (!token) { return "" }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const tokenParsed = JSON.parse(window.atob(base64));
    const userId= tokenParsed._id;
    return userId
  }