//import * as api from '@/api/equity'
import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);
import * as api from '@/api/match'
const getDefaultState = () => {
  return {
    game_id: "LOL",
    page_status: 0,
    page: 1,
    pageSize: 10,
    leagueList: {
    },
    searchForm: {
    },
    containerList: [
      {
        game_id: 'LOL',
        list: {}
      },
      {
        game_id: 'DOTA2',
        list: {}
      },
      {
        game_id: 'CSGO',
        list: {}
      },
    ],
    leagueTabsList: [

    ],//联赛tabs数据
  }
}
// initial state
const state = getDefaultState()
const league = {
  namespaced: true, // 注意 模块化管理数据请不要忘了命名空间的开启
  state: state,
  actions: {
    // 比赛详情-1顶部 IFAppUIDetailsTop
    renderList({ commit, state }) {

    },
    //获取联赛tab数据
    async _getLeagueTabsList() {
      const data = await api.getGroupData({
        subtype: 'menu2',
        type: '2'
      })
      let { tbl } = data.tbls[0];
      let leagueTabsList = [];
      tbl.forEach(item => {
        let list = []
        item.tblitem.forEach(_item => {
          list.push({ lable: _item.name, id: Number(_item.status), })
        })
        leagueTabsList.push({
          game_id: item.name,
          list,
          active: 0
        })
      })
      state.leagueTabsList = leagueTabsList;
    },
    async _getIFAppUITournamentList({ commit, state }, isFresh) {
      let { game_id, page_status, leagueList } = state;
      let searchKey = game_id + '_' + page_status
      if (!leagueList[searchKey]) {
        state.leagueList[searchKey] = [];
        state.searchForm[searchKey] = {
          total: 0,
          page: 1
        }
      }
      //获取当前分页页码数据
      const data = await api.getIFAppUITournamentList({
        game_id,
        page: state.searchForm[searchKey].page++,
        page_size: 20,
        page_status
      })
      //mock数据
      if (data.list) {
        if (isFresh) {
          state.leagueList[searchKey] = data.list;
        } else {
          state.leagueList[searchKey].push(...data.list);
        }
        state.searchForm[searchKey].total = data.count;
      }

    }
  },
  getters: {
    get_leagueTabsList(state) {
      for (var item of state.leagueTabsList) {
        if (item.game_id == state.game_id) {
          return item
        }
      }
      return { active: 0 }
    },
    get_leagueList(state) {
      let { game_id, page_status, leagueList } = state;
      let searchKey = game_id + '_' + page_status;
      if (leagueList[searchKey]) {
        return leagueList[searchKey]
      } else {
        return []
      }
    }

  }
}
export default league