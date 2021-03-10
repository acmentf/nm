<template>
  <div class="fx">
    <module-title>历史交手统计</module-title>
    <div class="data-content">
      <row-bar :dataList="renderDataList" :height="16" :marginBottom="6" bgcolor="#0F1E45" />
    </div>
    <module-title>历史交手详情</module-title>
    <div class="data-content style-1">
      <TiTable :tableData="history_tableData" :columns="history_columns" />
    </div>
    <module-title>近期数据详情</module-title>
    <div class="data-content style-1">
      <TiTable titleBgColor="#2AB7CA" :tableData="match_tableData" :columns="match_columns" />
    </div>
  </div>
</template>

<script>
import Module from "@c/Module";
import { mapState } from "vuex";
import Bar from "./Bar";
import TiTable from "@c/TiTable";
import RowBar from "./RowBar";
import ModuleTitle from "@c/ModuleTitle";
export default {
  name: "FX",
  components: { Module, Bar, TiTable, RowBar, ModuleTitle },
  data() {
    return {
      option: {
        legend: {
          y: "bottom",
          align: "right",
          itemGap: 20, //图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
          itemWidth: 26, //图例标记的图形宽度。
          itemHeight: 6, //图例标记的图形高度。
          icon: "roundRect",
          textStyle: {
            color: "rgba(228, 228, 228, 1)"
          }
        },
        grid: {
          left: "15%",
          top: "10%"
        },
        xAxis: {
          data: ["胜率", "一血", "一塔率", "五杀率"],
          axisLine: {
            lineStyle: {
              color: "#4C95FA"
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#4C95FA"
            }
          }
        },

        yAxis: [
          {
            type: "value",
            axisLabel: {
              show: true,
              interval: "auto",
              formatter: "{value} %"
            },
            axisLine: {
              lineStyle: {
                color: "#E4E4E4"
              }
            },
            barWidth: 18,
            show: true,
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#4C95FA"],
                width: 1,
                type: "solid"
              }
            }
          }
        ],
        backgroundColor: "#0f1e45",
        series: [
          {
            name: "WE",
            type: "bar",
            data: [10, 20, 60, 50],
            color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#6527E3" }, //柱图渐变色
              { offset: 0.5, color: "#5367FE" }, //柱图渐变色
              { offset: 1, color: "#5367FE" } //柱图渐变色
            ]),
            barGap: "0%",
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#2AB7CA",
                    fontSize: 9,
                    fontWeight: 900
                  },
                  formatter: "{c}%"
                }
              }
            }
          },
          {
            name: "皇族",
            type: "bar",
            data: [60, 50, 20, 90],
            color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#F35463" }, //柱图渐变色
              { offset: 0.5, color: "#DD6EFE" }, //柱图渐变色
              { offset: 1, color: "#DD6EFE" } //柱图渐变色
            ]),
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#F35463",
                    fontSize: 9,
                    fontWeight: 900
                  },
                  formatter: "{c}%"
                }
              }
            }
          }
        ]
      },
      game_id: this.$route.meta.game_id,
      match_id: this.$route.query.match_id,

      xDataLable: ["1胜率", "2一血率"],

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
          title: _data.title[index],
          width: 75,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            //   console.log("index:" + rowIndex, +field, rowData);

            if (_rule.image.indexOf(field) > -1) {
              var _list = [].concat(rowData[field]);
              var _img = "";
              var _size = field == 2 ? 18 : 15;
              _list.forEach(item => {
                _img += `<img src="${item}" style="width:${_size}px;max-height:${_size}px;" onerror="this.src='/images/null.png';this.onerror=null">`;
              });
              return _img;
            } else if (typeof rowData[field] == "object") {
              var v1 = rowData[field][0] * 1;
              var v2 = rowData[field][1] * 1;
              var _css1 = 'style="color:#2AB7CA;font-weight:bold"';;
              var _css2 = 'style="color:#F35463;font-weight:bold"';
            
              // if (v1 > v2) {
              //   _css1 = _lColor;
              // } else if (v2 > v1) {
              //   _css2 = _lColor;
              // }
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

      // LOL_nearBattleList_title  {"icon", "name", "对战战队", "-", "胜/负", "比分", "-", "一血/先五杀", "-", "先十杀", "一塔/首小龙", "-", "首大龙", "游戏时间"}
      // DOTA2_nearBattleList_title{"icon", "name", "对战战队", "-", "胜/负", "比分", "-", "一血/先五杀", "-", "先十杀", "一塔",     "游戏时间"}
      // CSGO_nearBattleList_title {"icon", "name", "对战战队", "-", "胜/负", "比分", "-", "地图",       "R1", "R16",  "先五/先十",  "-"}
      //                               0       1       2         3      4      5     6    7            8      9        10       11      12       13
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
          title: "<span style='color:#fff'>对战战队</span>",
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
              style="width:30px;height:30px;object-fit:cover;margin-top:-12px"
              onerror="this.src='/images/team.png';
              this.onerror=null" /><p style="line-height:20px;
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
              //var _css1 = 'style="color:#8B65FF"';
              var _css2 = 'style="color:#999";font-weight:bold"';
              var _css1 = rowData.listType
                ? 'style="color:#F35463;font-weight:bold"'
                : 'style="color:#2AB7CA;font-weight:bold"';
              // if (v1 > v2) {
              //   _css1 = _lColor;
              // } else if (v2 > v1) {
              //   _css2 = _lColor;
              // }
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
    }
  },

  computed: {
    ...mapState({
      analyseInfo: function(state) {
        this.formatData(state.matchDetail.analyseInfo);
        return state.matchDetail.analyseInfo;
      }
    }),
    /*
        [
            {
                "attr_away": 0,
                "attr_home": 0,
                "attr_name": "K(hs)",
                "attr_total": 0,
                "dw": "%"
            },
            {
                "attr_away": 1,
                "attr_home": 3,
                "attr_name": "D",
                "attr_total": 4,
                "dw": "%"
            },
            {
                "attr_away": 2,
                "attr_home": 5,
                "attr_name": "A(f)",
                "attr_total": 7,
                "dw": "%"
            },
            {
                "attr_away": 33.3,
                "attr_home": 37.5,
                "attr_name": "KAST",
                "attr_total": 70.8,
                "dw": "%"
            },
            {
                "attr_away": 33.3,
                "attr_home": 37.5,
                "attr_name": "KD Diff",
                "attr_total": 70.8,
                "dw": "%"
            },
            {
                "attr_away": 0,
                "attr_home": 50,
                "attr_name": "ADR",
                "attr_total": 50,
                "dw": "%"
            },
            {
                "attr_away": 33.3,
                "attr_home": 62.5,
                "attr_name": "FK Diff",
                "attr_total": 95.8,
                "dw": "%"
            },
            {
                "attr_away": 33.3,
                "attr_home": 12.5,
                "attr_name": "Rating",
                "attr_total": 45.8,
                "dw": "%"
            }
            ]
        
        */
    renderDataList(list2) {
      let _h = this.analyseInfo.history_battle_gkd;
      if (!_h) return [];
      let list = _h.history_gkd;
      // console.log("_h_h_h",list);
      let datalist = [];
      if (!list) return datalist;
      list.forEach(item => {
        datalist.push({
          attr_away: item.attr_away,
          attr_home: item.attr_home,
          attr_name: item.attr_name,
          attr_total: item.attr_total,
          dw: "%"
        });
      });

      // console.log("datalistdatalist___",datalist);
      return datalist;
    },
    yDataList() {
      let _h = this.analyseInfo.history_battle_gkd;

      //   console.log("_h_h_h",_h);

      var _data = [
        {
          name: "[主队]",
          data: []
        },
        {
          name: "[客队]",
          data: []
        }
      ];

      // 历史交手数据 history_battle_gkd 做容错处理
      if (!_h) return _data;
      let home_data = [];
      let away_data = [];
      let team_home = _h.team_home;
      let team_away = _h.team_away;
      //   if (_h.history_gkdrwffft_home) {
      //     for (let i in _h.history_gkdrwffft_home) {
      //       if (i != "ten_kill_rate") {
      //         home_data.push(
      //           _h.history_gkdrwffft_home[i] == ""
      //             ? 0
      //             : _h.history_gkdrwffft_home[i]
      //         );
      //       }
      //     }
      //   }

      //   if (_h.history_gkdrwffft_away) {
      //     for (let i in _h.history_gkdrwffft_away) {
      //       if (i != "ten_kill_rate") {
      //         home_data.push(
      //           _h.history_gkdrwffft_away[i] == ""
      //             ? 0
      //             : _h.history_gkdrwffft_away[i]
      //         );
      //       }
      //     }
      //   }
      if (_h.history_gkd) {
        var _xDataLable = [];

        for (let i in _h.history_gkd) {
          var _val = _h.history_gkd[i];
          _xDataLable.push(_val.attr_name);
          home_data.push(_val.attr_home);
          away_data.push(_val.attr_away);
        }

        this.xDataLable = _xDataLable;

        // console.log(this.xDataLable);

        /*
         this.chartOption.xAxis.data = this.data.name;
        this.chartOption.series[0].name = this.data.team_name_home || '[主队]';
        this.chartOption.series[0].data = this.data.rccf_home;
        this.chartOption.series[1].name = this.data.team_name_away || '[客队]';
        this.chartOption.series[1].data = this.data.rccf_away;
        */
      }

      if (team_home.team_short_name) _data[0].name = team_home.team_short_name;
      _data[0].data = home_data;

      if (team_away.team_short_name) _data[1].name = team_away.team_short_name;
      _data[1].data = away_data;
      //   console.log("====dd=d==dd=d=d=d", _data);

      return _data;
    }
  },
  created() {
    this.$store.dispatch("matchDetail/_getMatchDetailAnalyse", {
      match_id: Number(this.match_id),
      game_id: this.game_id
    });
  }
};
</script>

<style lang="scss" scoped>
.fx {
  .data-table {
    background: #0f1e45;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15);
    opacity: 1;
    border-radius: 6px;
    padding: 13px 10px;
    & > li {
      display: flex;
      .team-name {
        width: 157px;
        & > img {
          width: 30px;
          margin-right: 11px;
        }
      }
      &.table-head {
        padding-bottom: 15px;
      }
      .team-title {
        flex: 1;
        display: flex;
        text-align: center;
        & > span {
          flex: 1;
        }
      }
      & > span {
        flex: 1;
        text-align: right;
      }
      &.table-body {
        padding-bottom: 10px;
        &:last-child {
          padding-bottom: 0px;
        }
        & > span {
          text-align: center;
        }
      }
    }
  }
  .history-pick-tj {
    padding-top: 7px;
    #main {
      border-radius: 6px;
      background: #0f1e45;
      overflow: hidden;
    }
  }
  .data-content {
    background: #fff;
    padding: 10px 15px;
    &.style-1 {
      padding: 0;
    }
  }
}
</style>
