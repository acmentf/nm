<template>
  <div class="csgo-fx" v-if="analyseInfo.history_battle_gkd">
    <!-- 战队比分 -->
    <div class="gloab-score">
      <!-- 主队 -->
      <div class="home-team">
        <my-image v-model="analyseInfo.history_battle_gkd.team_home.team_img"></my-image>
        <p>
          {{
          analyseInfo.history_battle_gkd.team_home.team_short_name
          }}
        </p>
      </div>
      <span class="home-score score">
        {{
        analyseInfo.history_battle_gkd.total_home
        }}
      </span>
      <span class="line"></span>
      <span class="away-score score">
        {{
        analyseInfo.history_battle_gkd.total_away
        }}
      </span>
      <!-- 客队 -->
      <div class="away-team">
        <my-image v-model="analyseInfo.history_battle_gkd.team_away.team_img"></my-image>
        <p>
          {{
          analyseInfo.history_battle_gkd.team_away.team_short_name
          }}
        </p>
      </div>
    </div>

    <div class="module">
      <module-title>历史交手数据</module-title>
      <div class="module-content">
        <row-bar
          :dataList="renderDataList(analyseInfo.history_battle_gkd.history_gkd)"
          :height="16"
          :marginBottom="6"
          bgcolor="#fff"
        />
      </div>
    </div>
    <div class="module">
      <module-title>历史交手详情</module-title>
      <div class="pick-detail">
        <TiTable :tableData="history_tableData" :columns="history_columns" />
      </div>
    </div>
    <div class="module">
      <module-title>近期数据统计</module-title>
      <div class="module-content">
        <row-bar
          :dataList="renderDataList(analyseInfo.near_battle_gkd.history_gkd)"
          :height="16"
          :marginBottom="6"
          bgcolor="#fff"
        />
      </div>
    </div>
    <div class="module">
      <module-title>近期数据详情</module-title>
      <div class="pick-detail">
        <TiTable titleBgColor="#2AB7CA" :tableData="match_tableData" :columns="match_columns" />
      </div>
    </div>
  </div>
</template>

<script>
import Module from "@c/Module";
import TiTable from "@c/TiTable";
import { mapState } from "vuex";
import RowBar from "../../components/RowBar";
import ModuleTitle from "@c/ModuleTitle";
export default {
  name: "CSGOFx",
  components: { Module, TiTable, RowBar, ModuleTitle },
  data() {
    return {
      game_id: this.$route.meta.game_id,
      match_id: this.$route.query.match_id,
      history_columns: [],
      history_tableData: [],
      match_columns: [],
      match_tableData: []
    };
  },
  methods: {
    historyMatchInfo(_data) {
      //历史交手详细情数据赋值
      if (!_data) return;

      // LOL_historyMatchInfo_title   {"icon", "name", "胜/负", "比分", "-", "一血/先五杀", "-", "先十杀", "一塔/首小龙", "-", "首大龙", "游戏时间"}
      // DOTA2_historyMatchInfo_title {"icon", "name", "胜/负", "比分", "-", "一血/先五杀", "-", "先十杀", "一塔", "游戏时间"}
      // CSGO_historyMatchInfo_title  {"icon", "name", "胜/负", "比分", "-", "地图",       "R1", "R16", "先五/先十", "-"}
      //         0       1       2       3     4     5            6     7      8         9

      var RuleArr = {
        LOL: {
          merge: [0, 3, 5, 8],
          image: [2, 5, 7, 8, 10]
        },
        DOTA2: {
          merge: [0, 3, 5],
          image: [2, 5, 7, 8]
        },
        CSGO: {
          merge: [0, 3, 8],
          image: [2, 6, 7, 8]
        }
      };

      var _rule = RuleArr[this.game_id];

      // console.log('_rule.merge',_rule.merge);

      var h_columns = [];
      var h_tableData = [];

      h_columns = [
        {
          field: "0", //field: index,
          title: `
        <div style="display: flex;align-items:center;">
            <img src="${_data.img_url}"
            style="width:30px;height:30px;object-fit:cover;" onerror="this.src='/images/team.png';this.onerror=null" />
            <span style="line-height:30px;margin:0 5px;color:#fff;">VS</span>
            <img src="${_data.img_url_away}"
            style="width:30px;height:30px;object-fit:cover;" onerror="this.src='/images/team.png';this.onerror=null" />
        </div>
        `,
          width: 110,
          titleAlign: "center",
          columnAlign: "center",
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            if (rowData.__tableTrBg) {
              return `<div style="display: flex;align-items:center;"> 
                <img src="${_data.img_url}"
            style="width:30px;height:30px;object-fit:cover;" onerror="this.src='/images/team.png';this.onerror=null" />
            <span style="line-height:30px;margin:0 5px;color:#fff;">VS</span>
            <img src="${_data.img_url_away}"
            style="width:30px;height:30px;object-fit:cover;" onerror="this.src='/images/team.png';this.onerror=null" />
            </div>
        `;
            } else if (typeof rowData[field] == "object") {
              var _htm = `
                <p style="color:#878FA2;line-height: 14px;padding-top:7px;
                text-align: left;
                overflow: hidden;
                font-size: 12px;
                width:120px;
                white-space: nowrap;
                text-overflow: ellipsis;">${rowData[field][0]}<br/>${rowData[field][1]}</p>
                `;
              return _htm;
            }
            return rowData[field];
          },
          isResize: true,
          isFrozen: true
        }
      ];

      for (let index = 2; index < _data.title.length; index++) {
        const element = {
          field: index,
          title: `<span style="color:#fff">${_data.title[index]}</span>`,
          width: 75,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            //   console.log("index:" + rowIndex, +field, rowData);

            if (_rule.image.indexOf(field) > -1) {
              var _list = [].concat(rowData[field]);
              var _img = "";
              console.log("index:" + rowIndex, "field:" + field, rowData);
              var _size = field == 2 ? 18 : 15;
              _list.forEach(item => {
                _img += `<img src="${item}" style="width:${_size}px;max-height:${_size}px;" onerror="this.src='/images/null.png';this.onerror=null">`;
              });
              return _img;
            } else if (typeof rowData[field] == "object") {
              var v1 = rowData[field][0] * 1;
              var v2 = rowData[field][1] * 1;
              var _css1 = 'style="color:#2AB7CA;font-weight:bold"';
              var _css2 = 'style="color:#F35463;font-weight:bold"';
              return `<span ${_css1}>${v1}</span>:<span ${_css2}>${v2}</span>`;
            }
            return rowData[field];
          }
        };
        if (index == 2) {
          element.width = 40;
          element.isFrozen = true;
        }
        if (_rule.merge.map(item => item + 1).indexOf(index) < 0)
          h_columns.push(element);
      }

      // console.log("h_columns..", h_columns);

      if (_data.value) {
        _data.value.forEach(element => {
          //   console.log("element", element);
          var _arr = {};
          for (let index = 0; index < element.length; index++) {
            // console.log(element[index]);
            if (_rule.merge.indexOf(index) > -1) {
              _arr[index] = [element[index], element[index + 1]];
            } else if (_rule.merge.map(item => item + 1).indexOf(index) > -1) {
            } else {
              _arr[index] = element[index];
            }
          } //END for
          //   console.log("________Arr", _arr);
          h_tableData.push(_arr);
        });
      }

      // console.log("h_tableData _000000000", h_tableData);

      // 历史交手详细情数据赋值
      this.history_columns = h_columns;
      this.history_tableData = h_tableData;

      //END
    },
    nearBattleList(_data) {
      //近期详细情数据
      if (!_data) return;
      var RuleArr = {
        LOL: {
          merge: [0, 2, 5, 7, 10],
          image: [4, 7, 9, 10, 12]
        },
        DOTA2: {
          merge: [0, 2, 5, 7],
          image: [4, 7, 9, 10]
        },
        CSGO: {
          merge: [0, 2, 5, 10],
          image: [4, 8, 9, 10]
        }
      };
      var _rule = RuleArr[this.game_id];
      // console.log("近期详细情数据", _rule);

      var n_columns = [];
      var n_tableData = [];

      var _home = _data.home;
      var _away = _data.away;
      var _homeName = _home.title[1];
      var _homeIcon = _home.title[0]; //_home.img_url;

      var _awayName = _away.title[1];
      var _awayIcon = _away.title[0]; //_away.img_url;

      n_columns = [
        {
          field: "0",
          title: `<div style="display: flex;align-items:center;">
            <img src="${_homeIcon}"
            style="width:30px;height:30px;object-fit:cover;float:left;margin-right:5px" onerror="this.src='/images/team.png';this.onerror=null"/>
            <span style="width:45px;line-height:30px;text-align:left;display:inline-block;overflow: hidden;white-space:nowrap;text-overflow: ellipsis;color:#fff;">${_homeName}</span></div>
        `,
          width: 90, // 120,
          titleAlign: "center",
          columnAlign: "center",
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            if (rowData.__tableTrBg) {
              var _pics = rowData[field][0];
              var _name = rowData[field][1];
              return `<div style="display: flex;align-items:center;height:40px;">
                <img src="${_pics}"
            style="width:30px;height:30px;object-fit:cover;float:left;margin-right:5px" onerror="this.src='/images/team.png';this.onerror=null" />
            <span style="width:70px;line-height:40px;text-align:left;display:inline-block;overflow: hidden;white-space:nowrap;text-overflow: ellipsis;color:#fff;">${_name}</span></div>`;
            } else if (typeof rowData[field] == "object") {
              var _htm = `
                <p style="color:#878FA2;line-height:14px;padding-top:7px;
                text-align: left;
                overflow: hidden;
                font-size: 12px;
                width:120px;
                white-space: nowrap;
                text-overflow: ellipsis;">${rowData[field][0]}<br/>${rowData[field][1]}</p>
                `;
              return _htm;
            }
            return rowData[field];
          },
          isResize: true,
          isFrozen: true
        },
        {
          field: "2",
          title: `<span style="color:#fff">对战战队</span>`,
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            if (rowData.__tableTrBg) {
              return rowData[field];
            } else if (typeof rowData[field] == "object") {
              var _pic = rowData[field][0];
              var _name = rowData[field][1];

              return `<div style="
                transform: scale(0.7);
                width:80px;
                transform-origin: 0 5px;"><img src="${_pic}"
                                style="width:30px;height:30px;object-fit:cover;margin-top:-12px" onerror="this.src='/images/team.png';this.onerror=null" /><p style="line-height:20px;
                margin-top: -10px;
                text-align: center;
                overflow: hidden;
                font-size: 12px;
                white-space: nowrap;
                text-overflow: ellipsis;">${_name}</p></div>`;
            }

            return rowData[field];
          },
          isResize: true,
          isFrozen: true
        }
      ];

      for (let index = 4; index < _home.title.length; index++) {
        const element = {
          field: index,
          title: `<span style="color:#fff">${_home.title[index]}</span>`,
          width: 75,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            //   console.log("index:" + rowIndex,'field:'+ field, rowData);
            if (rowData.__tableTrBg) {
            } else if (_rule.image.indexOf(field) > -1) {
              var _list = [].concat(rowData[field]);
              var _img = "";
              var _size = field == 4 ? 18 : 15;
              _list.forEach(item => {
                _img += `<img src="${item}" style="width:${_size}px;max-height:${_size}px;" onerror="this.src='/images/null.png';this.onerror=null">`;
              });
              return _img;
            } else if (typeof rowData[field] == "object") {
              var v1 = rowData[field][0] * 1;
              var v2 = rowData[field][1] * 1;
            
              var _css2 = 'style="color:#999";font-weight:bold"';
              var _css1 = rowData.listType
                ? 'style="color:#F35463;font-weight:bold"'
                : 'style="color:#2AB7CA;font-weight:bold"';

              return `<span ${_css1}>${v1}</span>:<span ${_css2}>${v2}</span>`;
            } else if (field == 13) {
              // console.log("realFormatSecond", field, rowData[field]);
              // return _this.$realFormatSecond(
              //     rowData[field] * 1
              // );
            }
            return rowData[field];
          }
        };
        if (_rule.merge.map(item => item + 1).indexOf(index) < 0)
          n_columns.push(element);
      }

      // console.log("n_columns", n_columns);

      if (_home.value) {
        //   _home.value = _home.value.slice(0, 5);
        _home.value.forEach(element => {
          // console.log("element", element);
          var _arr = { listType: 0 };
          for (let index = 0; index < element.length; index++) {
            // console.log(element[index]);
            if (_rule.merge.indexOf(index) > -1) {
              _arr[index] = [element[index], element[index + 1]];
            } else if (_rule.merge.map(item => item + 1).indexOf(index) > -1) {
            } else {
              _arr[index] = element[index];
            }
          } //END for
          //   console.log("________Arr", _arr);
          n_tableData.push(_arr);
        });
      }

      var _awayTitle = {
        0: [_awayIcon, _awayName],
        2: _away.title[2],
        __tableTrBg: "red"
      };
      for (let index = 4; index < _away.title.length; index++) {
        const element = {};
        element[index] = _away.title[index];
        if (_rule.merge.map(item => item + 1).indexOf(index) < 0)
          _awayTitle[index] = _away.title[index];
      }

      if (_away.value && _away.value.length) {
        n_tableData.push(_awayTitle);
        //   _away.value = _away.value.slice(0, 5);
        _away.value.forEach(element => {
          // console.log("element", element);
          var _arr = { listType: 1 };
          for (let index = 0; index < element.length; index++) {
            // console.log(element[index]);
            if (_rule.merge.indexOf(index) > -1) {
              _arr[index] = [element[index], element[index + 1]];
            } else if (_rule.merge.map(item => item + 1).indexOf(index) > -1) {
            } else {
              _arr[index] = element[index];
            }
          } //END for
          //   console.log("________Arr", _arr);
          n_tableData.push(_arr);
        });
      }

      // console.log("n_tableData::", n_tableData);

      // 近期详细情数据赋值
      this.match_columns = n_columns;
      this.match_tableData = n_tableData;
    },
    formatData(analyseData) {
      if (!analyseData) return;
      analyseData.history_match_info &&
        this.historyMatchInfo(analyseData.history_match_info);
      analyseData.near_battle_list &&
        this.nearBattleList(analyseData.near_battle_list);
    },
    renderDataList(list) {
      let datalist = [];
      list.forEach(item => {
        datalist.push({
          attr_away: item.attr_away,
          attr_home: item.attr_home,
          attr_name: item.attr_name,
          attr_total: item.attr_total,
          dw: "%"
        });
      });
      return datalist;
    }
  },
  computed: {
    ...mapState({
      analyseInfo: function(state) {
        this.formatData(state.matchDetail.analyseInfo);
        return state.matchDetail.analyseInfo;
      }
    })
  },
  mounted() {},
  created() {
    this.$store.dispatch("matchDetail/_getMatchDetailAnalyse", {
      match_id: Number(this.match_id),
      game_id: this.game_id
    });
  }
};
</script>

<style lang="scss" scoped>
.csgo-fx {
  //   padding: 0 15px;
  .moudle {
    padding: 0 15px;
    &.pick-detail {
      padding-right: 0;
    }
  }
  .gloab-score {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    padding: 14px 0;
    & > div {
      text-align: center;
      &.home-team {
        margin-right: 22px;
        p {
          font-size: 11px;
          font-weight: bold;
          line-height: 16px;
          color: #333;
          opacity: 1;
          margin-top: 7px;
        }
      }
      &.away-team {
        margin-left: 22px;
        p {
          font-size: 11px;
          font-family: PingFang SC;
          font-weight: bold;
          line-height: 16px;
          color: #333;

          opacity: 1;
          margin-top: 7px;
        }
      }
      & > img {
        width: 44px;
        height: 44px;
      }
    }
    & > .score {
      font-size: 28px;
      color: #2AB7CA;
      &.away-score {
        color: #F35463;
      }
      &.lost {
        color: #999;
      }
    }
    .line {
      width: 16px;
      height: 3px;
      background: #999;
      margin: 0 23px;
    }
  }
  .module-content {
    background: #fff;
    padding: 10px 15px;
  }
}
</style>
