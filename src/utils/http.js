import Vue from "vue";
import { Toast, Indicator } from "mint-ui"; //提示
import axios from "axios";
import { baseUrl } from '../api/index';

const env = process.env.NODE_ENV;
// console.error(env == "test");


const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: baseUrl,
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    // "Content-Type": "application/json;"
    'content-type': 'application/x-www-form-urlencoded',
  },
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});
// 添加请求拦截器
service.interceptors.request.use(
  function(config) {
    // console.log(config);
    // 在发送请求之前做些什么
    // 登陆路径不刷新token
    Indicator.open({
      spinnerType: "fading-circle"
    });
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function({ status, data }) {
    Indicator.close();
    if (status === 200 && data.errno === 0) {
      return Promise.resolve(data);
    } else {
      let message = "请求失败！";
      if (data && data.error) {
        message = data.error;
      }
      Toast({
        message,
        position: "middle",
        duration: 2000
      });

      return Promise.reject(new Error(message));
    }
  },
  function(error) {
    // if (error.toString().indexOf('401')!==-1) {
    //   console.log(222);
    //   window.location.reload();
    // }
    Indicator.close();
    return Promise.reject(error);
  }
);

export default service;
