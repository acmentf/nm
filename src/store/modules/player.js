

import * as api from '@/api/player'
const getDefaultState = () => {
  return {
    game_id: '',
    team_id: '',
    player_id: '',
    select_type: 2, //查询 类别
    playerTopDetail: {},
    select_type_list: [],
    select_value_list: [],
    select_times: [],
    select_tournaments: [],
    sub_type: "",
    baseDataInfo: {},
    role_history: [],
    match_list: [],
    weapen:[]
  }
}
// initial state
const state = getDefaultState()
const player = {
  namespaced: true, // 注意 模块化管理数据请不要忘了命名空间的开启
  state: state,
  actions: {
    //获取联赛tab数据
    async _getPlayerDetailTop({ state, dispatch }, { game_id, team_id, player_id }) {
      const data = await api.getPlayerDetailTop({
        game_id,
        team_id,
        player_id
      })
      let { player_nl, select_list } = data;
      state.game_id = game_id;
      state.team_id = team_id;
      state.player_id = player_id;
      state.playerTopDetail = player_nl;
      let select_times = [], select_tournaments = [], select_type_list = [];
      if (select_list.times) {
        select_list.times.forEach(item => {
          select_times.push({
            lable: item.name,
            id: item.ivalue
          })
        })
      }
      if (select_list.tournaments) {
        select_list.tournaments.forEach(item => {
          select_tournaments.push({
            lable: item.name,
            id: item.ivalue
          })
        })
      }
      if (select_list.titels) {
        select_list.titels.forEach(item => {
          select_type_list.push({
            lable: item.name,
            id: item.ivalue
          })
        })
      }
      state.select_type_list = select_type_list;
      state.select_times = select_times;
      state.select_tournaments = select_tournaments;
      //初始值
      state.select_type = select_type_list[0].id;
      if (state.select_type === 1) {
        state.sub_type = select_tournaments[0].id;
      }else{
        state.sub_type = select_times[0].id;
      }
      dispatch('_getPlayerDetail')
    },
    //重置第二个下拉框数据
    resetThirdSelectList({ state, dispatch }, { select_type }) {
      state.select_type = select_type;
      if (select_type === 0) {
        state.sub_type = state.select_tournaments[0].id;
      } else {
        state.sub_type = state.select_times[0].id;
      }
      dispatch('_getPlayerDetail')
    },
    //获取主内容数据
    async _getPlayerDetail({ state }) {
      let { game_id, team_id, player_id, select_type, sub_type } = state
      const data = await api.getPlayerDetail({
        game_id,
        team_id,
        player_id,
        type: select_type,
        sub_type
      })
      state.baseDataInfo = data.player_stat;
      state.role_history = data.role_history;
      state.weapen = data.weapen ? data.weapen : []
      let match_list = data.match_list ? data.match_list:[];
      match_list.forEach(item => item.actived = false)
      state.match_list = match_list;
      console.log('match_list',match_list)
    }
  },
  mutations: {

  },
  getters: {
    get_Select_list(state) {
      if (state.select_type === 1) {
        return state.select_tournaments
      } else {
        return state.select_times
      }
    }
  }
}
export default player