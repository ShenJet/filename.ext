import axios from 'axios'
const NET_ERROR = '网络异常';
// import { Message } from 'element-ui';

axios.defaults.baseURL = 'http://localhost:8899';
//
axios.default.timeout = 30000;

// Add a request interceptor
axios.interceptors.request.use((config) => {
  // Do something before request is sent
  return config;
}, (error) => {

  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response) {
    console.log(error.response)
    
  } else {
    // 网络异常
    return Promise.reject(NET_ERROR);
  }
});




/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

function get(url, params = {}, resolveFn, rejectFn = () => { }) {
  axios.get(url, {
    params: params
  })
    .then(response => {
      console.log(response);

      resolveFn(response.data);
    })
    .catch(err => {
      console.log(err);
      this.$message.error(err)
      rejectFn(err)
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
function post(url, data = {}, resolveFn, rejectFn = () => { }) {
  axios.post(url, data)
    .then(response => {
      console.log('Instance then');
      resolveFn(response.data)
    })
    .catch(err => {
      this.$message.error(err)
      console.log('Instance catch', err);
      rejectFn()
    })
}
const http = {
  post: post,
  get: get,
  url: axios.defaults.baseURL
}
export default http