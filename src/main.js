/*
 * @Author: TangFeng
 * @Date: 2021-01-27 14:32:32
 * @LastEditTime: 2021-02-04 14:17:10
 * @LastEditors: FeikeQ
 * @FilePath: /ti-wap/src/main.js
 * @Description: 
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import * as echarts from 'echarts'
import 'lib-flexible/flexible'
import './styles/index.less'
import './vantComponentImport'
import './styles/theme.less'
import store from './store'
import filters from "@/filter"
import VConsole from 'vconsole/dist/vconsole.min.js'
import { fmoney, goResourceInfor, format, realFormatSecond } from '@/utils/utils'
import CONFIG from "./config"
import VideoPlayer from 'vue-video-player'
import Calendar from '@c/AppCalendar/install';
import MyImage from "@c/Image"
import $ from 'jquery';
// 导入 table 和 分页组件 byFeikeQ
import 'vue-easytable/libs/themes-base/index.css'
import { VTable, VPagination } from 'vue-easytable'
// 注册到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
Vue.config.devtools = true
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
Vue.use(Calendar)
// let vConsole = new VConsole()
Vue.use(MyImage);
window.$echarts = echarts;
window.$ = $;
Vue.config.productionTip = false
Vue.prototype.$fmoney = fmoney
Vue.prototype.$App = goResourceInfor
Vue.prototype.imgURL = CONFIG.imgURL
Vue.prototype.$format = format
Vue.prototype.$realFormatSecond = realFormatSecond
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
Vue.directive('clickout', {
  bind: function (el, binding, vnode) {
    function documentHandler(e) {
      if (el.contains(e.target)) {
        return false
      }
      if (binding.expression) {
        binding.value(e)
      }
    }
    el.__vueClickOut__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  unbind: function (el, binding) {
    document.removeEventListener('click', el.__vueClickOut__)
    delete el.__vueClickOut__
  }
})
Vue.directive('enterNumber', { //全局方法  限制input输入框只能输入纯数字 组件中调用如（<el-input v-enter-number v-model="number" ></el-input>）
  inserted: function (el) {
    el.addEventListener("keypress", function (e) {
      e = e || window.event;
      let charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode;
      let re = /\d/;
      if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
      }
    });
  }
});
Vue.directive('focus', { //全局方法  限制input输入框只能输入纯数字 组件中调用如（<el-input v-enter-number v-model="number" ></el-input>）
  inserted: function (el) {
    el.focus();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
