
import * as api from '@/api/userCenter'
const state = {
  type:"0",
  userInfo:{},
  matchList:null
}
const userCenter = {
  namespaced: true, // 注意 模块化管理数据请不要忘了命名空间的开启
  state: state,
  actions: {
    //获取底部导航栏列表
    async _Login({ commit, state },{qstr,tstr}) {
      let data = await api.Login({
       type:state.type,
       qstr,
       tstr
      })
      return data;
    },
    async setUserInfo({state}) {
      let userInfo = await api.getUserInfo({
       type:state.type
      })
      state.userInfo = userInfo ? userInfo :{}
    },
  },
  mutations: {
   
  },
  getters: {
   
  },

}
export default userCenter