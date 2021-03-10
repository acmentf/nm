//import * as api from '@/api/equity'
import * as api from '@/api/match'
const getDefaultState = () => {
  return {
    game_id: "LOL",
    page_status: 0,
    page: 1,
    pageSize: 10,
    teamList: {
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
    teamTabsList: [
    ]
  }
}
// initial state
const state = getDefaultState()
const league = {
  namespaced: true, // 注意 模块化管理数据请不要忘了命名空间的开启
  state: state,
  actions: {
    //获取联赛tab数据
    async _getTeamTabsList() {
      const data = await api.getGroupData({
        subtype: 'menu3',
        type: '2'
      })
      let { tbl } = data.tbls[0];
      let teamTabsList = [];
      tbl.forEach(item => {
        let list = []
        item.tblitem.forEach(_item => {
          list.push({ lable: _item.name, id: Number(_item.status) })
        })
        teamTabsList.push({
          game_id: item.name,
          list,
          active: 0
        })
      })
      state.teamTabsList = teamTabsList;
    },
    async _getIFAppUIBattleTeamList({ commit, state },isFresh) {
      let { game_id, page_status, teamList, searchForm } = state;
      let searchKey = game_id + '_' + page_status
      if (!teamList[searchKey]) {
        state.teamList[searchKey] = [];
        state.searchForm[searchKey] = {
          total: 0,
          page: 1
        }
      }
      //获取当前分页页码数据
      const data = await api.getIFAppUIBattleTeamList({
        game_id,
        page: state.searchForm[searchKey].page++,
        page_size: 20,
        page_status
      })
      //mock数据
      if (data.list) {
        if(isFresh) {
          state.teamList[searchKey] = data.list;
        }else{
          state.teamList[searchKey].push(...data.list);
        }
        state.searchForm[searchKey].total = data.count;
      }

    }
  },
  getters: {
    get_teamTabsList(state) {
      for (var item of state.teamTabsList) {
        if (item.game_id == state.game_id) {
          return item
        }
      }
      return { active: 0 }
    },
    get_teamList(state) {
      let { game_id, page_status, teamList } = state;
      let searchKey = game_id + '_' + page_status;
      if (teamList[searchKey]) {
        return teamList[searchKey]
      } else {
        return []
      }
    }


  }
}
export default league