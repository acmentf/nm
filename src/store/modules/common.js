import * as api from '@/api/match'
import * as commonApi from '@/api/common'
import { Toast } from 'vant';
import Vue from 'vue';
Vue.use(Toast);
const state = {
  //界面底部tab列表数据
  navTabsList: [],
  //比赛状态 列表（静态数据）
  matchTabsList: [],//比赛类型数据
  isLoading: false,
  contentHeight: 0,//主内容高度
  dateList: [],
  resultsDate: [],
  scheduleDate: [],
  isShow: false, //日历显示隐藏
  searchDate: '',
  matchDetailTabsList: [],//比赛详情tabs数据
  TabbarActive: 0,
  actived: 0,
  download_show: true,
  game_id: '',
  match_Id: '',
  token: sessionStorage.getItem('TOKEN'),
  company_info: {}, //公司简介
  invitePic: '',//邀请好友图片
  serviceTerms: '',//服务条款
  privacyAgreement: '',//隐私协议
  privacyAgreementCut: '',//隐私协议精简版
  codeUrl: '',//二维码内置链接
  contentType:'matchList'//模块名称
}
const common = {
  namespaced: true, // 注意 模块化管理数据请不要忘了命名空间的开启
  state: state,
  actions: {
    //获取主页面底部tab数据
    async _getNavTabsList({ commit, state }) {
      let data = await api.getGroupData({
        type: "0",
        subtype: "main"
      })
      state.navTabsList = data.tbls[0].tbl
    },
    //获取主界面头部游戏类别tab数据（LOL,DOTA2,COSO）
    async _getMatchTypeTabsList({ state,rootState }) {
      let data = await api.getGroupData({
        type: "2",
        subtype: "menu1"
      })
      state.matchTabsList = data.tbls[0].tbl;
     
      //获取 初始化游戏类别 
      state.game_id = state.matchTabsList[0].name;
      rootState.league.game_id = state.matchTabsList[0].name;
      rootState.matchList.game_id = state.matchTabsList[0].name;
    },
    //获取比赛详情 tab数据
    async _getTabsList({state}, { subtype, type}) {
      let data = await api.getGroupData({
        type,
        subtype,
      })
      state.matchDetailTabsList = data.tbls[0].tbl;
    },
    getRound({ commit, state }) {
      state.actived = 2;
    },
    //获取系统时间 
    async _getSystemTime({ commit, state, rootState }, type) {
      let data = await commonApi.getSystemTime(type)
      let { Results, Schedule } = data.info;
      Results.push()
      Schedule.push()
      state.resultsDate = Results;
      state.scheduleDate = Schedule;
      //初始化为今天
      rootState.matchList.game_day = Schedule[0].ymd_str
    },
    //获取验证码
    async _getCode({ state }, { mobile, type, stk }) {
      let data = await api.getGroupData({
        type,
        mobile,
        stk
      })
      console.log('data', data)
    },
    //获取公共数据
    async _getPublicData({ state }) {
      let parmars = {
        1: 'invitePic',
        3: 'company_info',
        5: 'serviceTerms',
        6: 'privacyAgreement',
        7: 'codeUrl',
        8: 'privacyAgreementCut'
      }
      let data = await commonApi.getPublicData({
        type: '1,2,3,4,5,6,7,8'
      })
      for (let i in parmars) {
        state[parmars[i]] = data[i]
      }
    },
    //关注 添加/取消
    async _toggleFoucs({ state }, playload) {
      let { game_id, type, op_type, id_list } = playload;
      await commonApi.toggleFoucs({
        game_id, type, op_type, id_list
      })
    },
    // 关注查询
    async _findIsFocus({ state }, playload) {
      let { game_id, type, id_list } = playload;
      let data = await commonApi.toggleFoucs({
        game_id, type, op_type: 3, id_list
      })
      return data
    }
  },
  mutations: {

  },
}
export default common