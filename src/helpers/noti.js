const ERROR_TITLE = 'Sorry - Something went wrong.';
const LOADING_TITLE = 'Loading...';
const LOADING_MSG = 'please wait';

const notiObj = (title, message, level) => ({
  title,
  message,
  level,
  position: 'tc'
})

const notiSuccess = (message) => {
  let opts = notiObj(ERROR_TITLE, message, 'success')
  opts = {
    ...opts,
    title: 'Success'
  }
  return opts;
}

const notiError = (message) => (notiObj(ERROR_TITLE, message, 'error'))

const notiLoading = () => {
  let notiOpts = notiObj(LOADING_TITLE, LOADING_MSG, 'info');
  notiOpts = {
    ...notiOpts,
    autoDismiss: false
  }
  return notiOpts;
}

export default {notiError, notiLoading, notiSuccess}
