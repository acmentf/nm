//import * as api from '@/api/equity'
import Vue from 'vue';

import * as api from '@/api/match'
const getDefaultState = () => {
  return {
    matchDetailTop: {},
    isEmpty: false,
    tabList: [],
    tabListActiveName: 0, // 当前激活状态的选项卡
    game_id: "",
    match_id: "",
    playerInfo: { player_info: [], position_list: [] },//比赛选手详情
    round_zhCN: [
      "第一局", "第二局", "第三局", "第四局", "第五局", "第六局", "第七局", "第八局", "第九局", "第十局"
    ],
    analyseInfo: {},
    //csgo 地图列表
    mapList:[],
    // csgo 地图对战双方战队信息
    team_away:{},
    team_home:{},
    player_info_CSGO:[],
    state:0
  }
}
// initial state
const state = getDefaultState()
const matchDetail = {
  namespaced: true, // 注意 模块化管理数据请不要忘了命名空间的开启
  state: state,
  actions: {
    // 比赛详情-1顶部 IFAppUIDetailsTop
    async _matchDetailTop({ commit, state },{routeRound}) {
      console.log(routeRound !== undefined)
      let { game_id, match_id } = state;
      let data = await api.getMatchDetailsTop({ game_id, match_id });
      let { box, round } = data.mnl; //取总局数 和 当前局
      //   box =8; //debug
      box = round; // 经周总确认只有 round 数据去渲染局数 2020.12.07
      state.tabList = [];
      state.tabListActiveName = routeRound !== undefined ? (routeRound*1-1) : (round * 1 - 1);
      if (round > 0) {
        for (var index = 0; index < box; index++) {
          state.tabList.push({
            data: {},// 直播数据
            lineup: {},//阵容数据
            lable: state.round_zhCN[index] || ("第" + index + "局"),
            box_num: index + 1,
          })
        }
      } 
      state.matchDetailTop = data;
    },
    // 比赛详情 - 2直播 IFAppUILiveVideo byFeikeQ
    async _matchDetailLiveVideo({ commit, state }, { box_num, index ,callback}) {
      let { game_id, match_id } = state;
      let data = await api.getMatchDetailsLiveVideo({ game_id, match_id, box_num });
      if(state.tabList[index]) state.tabList[index].data = data;
      if(callback)callback(data);
    },
    // 比赛详情 - 4阵容 IFAppUILiveVideo byFeikeQ
    async _matchDetailBattleArray({ commit, state }, { box_num, index, callback }) {
      let { game_id, match_id } = state;
      let data = await api.getMatchDetailsBattleArray({ game_id, match_id, box_num });
      state.tabList[index].lineup = data;
      if(callback)callback(data);
    },
    //选手信息
    async _getMatchDetailPlayerInfo({ commit, state }) {
      let {game_id, match_id} = state;
      let data = await api.getMatchDetailPlayerInfo({ game_id, match_id });
      state.isEmpty = data == null ? true : false;
      if (state.isEmpty) {
        return false
      };
     
      if(game_id == 'CSGO'){
        let {team_home,team_away,player_info}  =  data;
        state.team_away = team_away;
        state.team_home = team_home;
        state.player_info_CSGO = player_info;
      }else{
        state.playerInfo = data;
      }
    },

    //分析 getMatchDetailAnalyse
    async _getMatchDetailAnalyse({ commit, state }) {
      let {game_id, match_id} = state;
      let data = await api.getMatchDetailAnalyse({ game_id, match_id });
      state.analyseInfo = data
    },
    //数据重置
    resetState({ dispatch, commit, state }) {
      Object.assign(state, getDefaultState())
    },
    //获取cs地图数据
    async _getMap({commit,state}){
      let {game_id, match_id} = state;
      let data = await api.geIFAppUIMap({game_id, match_id});
      let {map,team_away,team_home} = data;
      map.map(item=> item.actived = false)
      state.mapList = map;
      state.team_away = team_away;
      state.team_home = team_home;
      state.state = data.state
    }
  },
  mutations: {

  },
  getters: {
    getPlayerList(state) {
      let { player_info, position_list } = state.playerInfo;
      position_list.forEach((item, index) => {
        item.data = player_info[index]
      })
      return position_list
    }
  }
}
export default matchDetail