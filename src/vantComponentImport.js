/*
 * @Author: TangFeng
 * @Date: 2020-12-04 09:06:33
 * @LastEditTime: 2021-01-04 17:16:01
 * @LastEditors: FeikeQ
 * @FilePath: /ti-wap/src/vantComponentImport.js
 * @Description: 
 */
import {
  List,
  PullRefresh,
  Toast,
  Tab, Tabs,
  Dialog,
  Switch,
  Image as VanImage,
  Tabbar, TabbarItem,
  Popup,
  ActionSheet,
  Overlay
} from 'vant';
import Vue from 'vue';
Vue
  .use(List)
  .use(Toast)
  .use(PullRefresh)
  .use(Tab)
  .use(Tabs)
  .use(Dialog)
  .use(VanImage)
  .use(Tabbar)
  .use(Popup)
  .use(TabbarItem).use(ActionSheet)
  .use(TabbarItem)
  .use(Switch).use(Overlay)
  ;
Toast.setDefaultOptions({ duration: 1500 });
Vue.prototype.$toast = Toast;

