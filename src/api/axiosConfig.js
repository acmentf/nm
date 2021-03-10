import axios from 'axios';

const Axios = axios.create({
  baseURL:  process.env.VUE_APP_BASE_API,
  //baseURL:'http://192.168.1.17:8080',
  timeout: 10000
});
Axios.interceptors.request.use(config => {
  
  config.data = Object.assign({}, {
    t: new Date().getTime()+'',
    sign: "sdeweEFr@#$@",
    stk:sessionStorage.getItem("TOKEN")
  }, config.data)

  return config
});
//  响应拦截处理 
Axios.interceptors.response.use(res => {
  
  if(res.data.code === '0') {
    return Promise.resolve(res.data.data)
  } else {
    return Promise.reject(res.data.message)
  }
}, err => {

})


export default Axios
