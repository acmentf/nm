//import * as api from '@/api/equity'
import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);
import * as api from '@/api/match'
const state = {
  navTabsList: [],
  matchTypeList: [],
  game_id: '',
  match_ids: '',
  isLoading: false,
  game_status: 4,
  actived: 0,
  isFocus: false,
  timer: null,
  game_day: "",//日期 默认今天的数据
  collectionIdArray: localStorage.getItem('ids') ? JSON.parse(localStorage.getItem('ids')) : [],
  matchStateList: [
    { lable: '全部', id: 4, list: [], listShow: true },
    { lable: '进行中', id: 2, list: [], listShow: true },
    { lable: '赛程', id: 1, list: [], listShow: true },
    { lable: '赛果', id: 3, list: [], listShow: true }],
  filterSwitch: false,
  isFilter: false,
  tournament_ids: '',
  //联赛列表（筛选）
  leagueList: []
}
const matchList = {
  namespaced: true, // 注意 模块化管理数据请不要忘了命名空间的开启
  state: state,
  actions: {
    //获取底部导航栏列表
    async _getNavTabsList({ commit, state }) {
      let data = await api.getGroupData({
        type: "0",
        subtype: "main"
      })
      commit('SET_NAV_TABS_LIST', data.tbls[0].tbl)
    },
    //获取比赛列表数据
    async _getMatchList({ state, rootState }) {
      state.isFilter = false;
      let { game_status, game_day, game_id } = state;
      let _data = await api.getMatchList({
        game_id,
        match_ids: state.isFocus ? state.collectionIdArray.join(',') : "",
        game_status,
        game_day
      })
      state.matchStateList = [
        { lable: '全部', id: 4, list: [], listShow: true },
        { lable: '进行中', id: 2, list: [], listShow: true },
        { lable: '赛程', id: 1, list: [], listShow: true },
        { lable: '赛果', id: 3, list: [], listShow: true },
      ]
      switch (game_status) {
        case 4:
          state.matchStateList[0].list = _data.list ? _data.list : []
        case 2:
          state.matchStateList[1].list = _data.list ? _data.list : []
        case 1:
          state.matchStateList[2].list = _data.list ? _data.list : []
        case 3:
          state.matchStateList[3].list = _data.list ? _data.list : []
      }

      setTimeout(() => { state.isLoading = false }, 1000)

    },
    //条件筛选后查询列表数据
    _filterMatchList({ state, dispatch }, tournament_ids) {
      state.isFilter = true;
      state.tournament_ids = tournament_ids;
      state.filterSwitch = false;
      if (state.isFocus) {
        dispatch('renderReusltMatchList', state.matchStateList[4])
        return;
      }
      switch (state.game_status) {
        case 4:
          dispatch('renderReusltMatchList', state.matchStateList[0]);
          break;
        case 2:
          dispatch('renderReusltMatchList', state.matchStateList[1]);
          break;
        case 1:
          dispatch('renderReusltMatchList', state.matchStateList[2]);
          break;
        case 3:
          dispatch('renderReusltMatchList', state.matchStateList[3]);
          break;
      }
    },
    renderReusltMatchList({ state }, List) {
      let flag = false;
      List.list.forEach(item => {
        let _flag = false;
        item.group_item.map(_item => {
          _item.show = state.tournament_ids.indexOf(_item.base.tournament_id) > -1;
          if (_item.show) {
            flag = true
            _flag = true
          }
        })
        item.isShow = _flag;
      })
      List.listShow = flag;
    
    },
    //关注
    setCollectionIdArray({ commit, state }, id) {
      let ids = localStorage.getItem('ids') ? JSON.parse(localStorage.getItem('ids')) : []
      //获取下表
      let index = ids.findIndex(item => item == id);
      if (index > -1) {
        ids.splice(index, 1);
        Toast({
          message: '已取消关注',
          position: 'bottom',
        });
      } else {
        ids.push(id)
        Toast({
          message: '已关注',
          position: 'bottom',
        });
      }
      localStorage.setItem('ids', JSON.stringify(ids));
      state.collectionIdArray = ids;
    },
    async _leagueList({ commit, state, dispatch }) {
      let { game_status, isFocus, isFilter } = state;

      if (!isFilter) {
        if (isFocus) {
          dispatch('renderFilterList', state.matchStateList[4].list)
          return;
        }
        switch (game_status) {
          case 4:
            dispatch('renderFilterList', state.matchStateList[0].list);
            break;
          case 2:
            dispatch('renderFilterList', state.matchStateList[1].list);
            break;
          case 1:
            dispatch('renderFilterList', state.matchStateList[2].list);
            break;
          case 3:
            dispatch('renderFilterList', state.matchStateList[3].list);
            break;
        }
      }

    },
    renderFilterList({ state }, list) {

      let matchList = [], leagueList = {}, leagueListArray = [];
      list.forEach(item => matchList.push(...item.group_item))
      matchList.forEach(item => {
        let name = item.base.tournament_name;
        let id = item.base.tournament_id;
        let status = item.base.status_id;
        if (leagueList[id]) {
          leagueList[id] = {
            total: leagueList[id].total + 1,
            name: name,
            now: status == 2 ? leagueList[id].now + 1 : leagueList[id].now,
            id: id,
            selected: true
          }
        } else {
          leagueList[id] = {
            total: 1,
            name: name,
            now: status == 2 ? 1 : 0,
            id: id,
            selected: true
          }
        }
      })
      for (let i in leagueList) {
        leagueListArray.push(leagueList[i])
      }
      state.leagueList = leagueListArray;
    }
  },
  mutations: {
    SET_NAV_TABS_LIST: (state, data) => {

      state.navTabsList = data
    }
  },
  getters: {
    get_actived(state) {
      if (state.game_status == 1) {
        return 0
      } else {
        return 6
      }
    }
  },

}
export default matchList