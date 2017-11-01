const POST = 'POST';
const PATCH = 'PATCH';
const DELETE = 'DELETE';

export const fetchOption = (headers, method='POST', body=null) => {
  const opt = {headers, method}
  if (body !== null) {
    opt.body = body;
  }
  return opt;
}

export const getToken = () => {
  // return st_storage.isLoggedIn() ? st_storage.getUser().token : null;
  return '';
}

export const fetchHeader = (token=null) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  if (token === null) {
    token = getToken();
  }

  if (token !== null) {
    headers.append('X-Authorization', token)
  }
  return headers;
}

export const postOption = (headers, body) => ({
  headers,
  method: POST,
  body
});

export const patchOption = (headers, body) => ({
  headers,
  method: PATCH,
  body
});

export const deleteOption = (headers) => ({
  headers,
  method: DELETE
})

export const fetchResponseResolve = (response) => {
  const json = response.json();
    if(response.ok) {
      return json;
    } else {
      return json.then(resolve => Promise.reject(resolve));
    }
}

export const fetchResponseReject = (error) => {
  console.log('An error occured.', error);
  return Promise.reject(error);  
}

export const fetchPromise = (url, option) => (
  fetch(url, option)
  .then(fetchResponseResolve, fetchResponseReject)
)
