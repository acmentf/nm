/*
 * @Author: FeikeQ
 * @Date: 2021-03-03 10:29:27
 * @LastEditTime: 2021-03-04 16:22:11
 * @LastEditors: FeikeQ
 * @FilePath: /nami-wap/src/store/index.js
 * @Description: 
 */
import Vue from 'vue'
import Vuex from 'vuex'

// import createPersistedState from 'vuex-persistedstate'
// import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)
Vue.config.devtools = true

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage
// })
// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)
// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  //plugins: [vuexLocal.plugin]
})

export default store
