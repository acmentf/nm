
import * as api from '@/api/match'
import * as api_datail from '@/api/teamDetail'
const getDefaultState = () => {
  return {
    tabsList: [
      {
        name: "数据",
        ui_type: 1
      },
      {
        name: "比赛",
        ui_type: 2
      },
      {
        name: "资料",
        ui_type: 3
      }
    ],
    game_id: '',
    team_id: '',
    teamDetailTopData: {},
    //战队详情资料
    teamDetailResource: {
      team_info: {},
      honor: [],
      transfer_in: [],
      transfer_out: []
    },
    teamDetailHonor: {
      honor: []
    },
    //战队详情-数据页面
    teamDetailData: {
      hero_stat: [],
      team_stat1: [],
      team_stat2: []
    },
    //select下拉数据
    teamSelectList: {
      team_members: [],
      select_times: [],
      select_tournaments: []
    },
    select_type: 2, //查询 类别
    sub_type: '',
    match_list: []
  }
}
// initial state
const state = getDefaultState()
const teamDetail = {
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
    async _getIFAppUIBattleTeamList({ commit, state }) {
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
        page_size: 10,
        page_status
      })
      //mock数据
      if (data.list) {
        state.teamList[searchKey].push(...data.list);
        state.searchForm[searchKey].total = data.count;
      }

    },
    //获取比赛列表数据 
    async _getMatchList({ state }) {
      let { game_id, team_id } = state;
      //获取当前分页页码数据
      const data = await api_datail.getMatchList({
        game_id,
        team_id
      })
      data.match_list.map(item => item.actived = false)
      state.match_list = data.match_list
    },
    //战队简讯 
    async _getTeamDetailTop({ state }) {
      let { team_id, game_id } = state;
      const data = await api_datail.getTeamDetailTop({
        game_id,
        team_id
      })
      state.teamDetailTopData = data
    },
    //战队详情资料 getTeamDetailResource
    async _getTeamDetailResource({ state }) {
      let { team_id, game_id } = state;
      const data = await api_datail.getTeamDetailResource({
        game_id,
        team_id
      })
      state.teamDetailResource = data
    },
    //赛事荣誉（查看更多）getTeamDetailHonor
    async _getTeamDetailHonor({ state },{team_id, game_id}) {
     
      const data = await api_datail.getTeamDetailHonor({
        game_id,
        team_id
      })
      state.teamDetailHonor = data
    },
    //战队详情-数据页面 getTeamDataDetail
    async _getTeamDataDetail({ commit, state }) {
      let { team_id, game_id, sub_type, select_type } = state;
      const data = await api_datail.getTeamDataDetail({
        game_id,
        team_id,
        type: select_type,
        sub_type
      });

      if (data.team_stat2) {
        data.team_stat2  = data.team_stat2.reverse();
        // var sourceIndex = 0
        // var targetIndex = arr.length - 1
        // // 一行代码两边办事
        // // splice 将目标元素替换并将原结果扔回来赋值给它
        // arr[sourceIndex] = arr.splice(targetIndex, 1,arr[sourceIndex])[0];
        // console.log('arr',arr)
        console.log("data.team_stat2",data.team_stat2)
      }
     
      state.teamDetailData = data
    },
    //获取战队详情下拉数据 
    async _getTeamSelectList({ commit, state, dispatch }) {
      let { team_id, game_id } = state;
      const data = await api_datail.getTeamSelectList({
        game_id,
        team_id
      })
      let { team_members, select_list } = data;
      let select_times = [], select_tournaments = [];
      select_list.times.forEach(item => {
        select_times.push({
          lable: item.name,
          id: item.ivalue
        })
      })
      // select_list.tournaments.forEach(item => {
      //   select_tournaments.push({
      //     lable: item.name,
      //     id: item.ivalue
      //   })
      // })
      state.teamSelectList.team_members = team_members;
      state.teamSelectList.select_times = select_times;
      //state.teamSelectList.select_tournaments = select_tournaments;
      //设置select默认值
      state.sub_type = select_times[0].id;
    //   dispatch('_getTeamDataDetail')
    },
    //重置第二个下拉框数据
    resetThirdSelectList({ state, dispatch }, { select_type }) {
      state.select_type = select_type;
      if (select_type === 0) {
        state.sub_type = state.teamSelectList.select_tournaments[0].id;
      } else {
        state.sub_type = state.teamSelectList.select_times[0].id;
      }

      dispatch('_getTeamDataDetail')
    }
  },
  mutations: {
    // set_team_select: (state, data) => {
    //   let { team_members, select_list } = data;
    //   let select_times = [], select_tournaments = [];
    //   select_list.times.list.forEach(item => {
    //     select_times.push({
    //       lable: item.name,
    //       id: item.ivalue
    //     })
    //   })
    //   select_list.tournaments.list.forEach(item => {
    //     select_tournaments.push({
    //       lable: item.name,
    //       id: item.ivalue
    //     })
    //   })
    //   state.teamSelectList.team_members = team_members;
    //   state.teamSelectList.select_times = select_times;
    //   state.teamSelectList.select_tournaments = select_tournaments;
    //   //设置select默认值
    //   state.sub_type = select_tournaments[0].id;
    //   console.log('state', state)
    //   // this.$store.dispatch("teamDetail/_getTeamDataDetail", {
    //   //   sub_type: 10,
    //   //   type: 1
    //   // });
    // }
  },
  getters: {
    get_teamTabsList(state) {
      for (var item of state.teamTabsList) {
        if (item.game_id == state.game_id) {
          return item
        }
      }
    },
    get_teamList(state) {
      let { game_id, page_status, teamList } = state;
      let searchKey = game_id + '_' + page_status;
      if (teamList[searchKey]) {
        return teamList[searchKey]
      } else {
        return []
      }
    },
    get_team_members(state) {
      return state.teamSelectList.team_members
    },
    get_select_list(state) {
      if (state.select_type === 1) {
        return state.teamSelectList.select_tournaments;
      } else {
        return state.teamSelectList.select_times;
      }
    }
  }
}
export default teamDetail