<!--
 * @Author: FeikeQ
 * @Date: 2021-01-04 16:53:11
 * @LastEditTime: 2021-03-06 10:45:16
 * @LastEditors: Please set LastEditors
 * @FilePath: /ti-wap/src/views/League/components/Data.vue
 * @Description: 
-->
<template>
  <div class="league-data">
    <van-tabs
      class="main-tabs"
      animated
      id="league-data-wrapper"
      v-if="notEmpty"
      change_bak="tabChange"
      background="#eee"
      :line-width="0"
      @rendered="tabChange"
    >
      <van-tab v-for="(item, index) in tabList" :name="index" :title="item.lable" :key="index">
        <div class="content">
          <div
          
            v-if="tabData[item.type] && tabData[item.type].length"
          >
            <TiTable
              v-if="item.type != 'maps'"
              :alt="'top-list-'+item.type"
              :tableData="tabData[item.type]"
              :columns="tabColumn[item.type]"
            />
            <Maps v-if="item.type == 'maps'" :data="tabData[item.type]" />
          </div>
          <div v-else>
            <Empty EmptyType="2">暂无{{item.lable}}数据</Empty>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import TiTable from "@c/TiTable";
import Maps from "./Maps";
import Empty from "@c/Empty";
export default {
  name: "league-data",
  components: { Empty, TiTable, Maps },
  props: ["game"],
  methods: {
    tabChange(index, title) {
      // console.log("加载数据.......",index, title);
      this.$store.dispatch("leagueDetail/_getLeagueRankList", {
        id: this.tabList[index].id,
        type: this.tabList[index].type
      });
    }
  },
  data() {
    var formatter = function(rowData, rowIndex, pagingIndex, field) {
      if (typeof rowData[field] == "object") {
        var _type = rowData[field].type;
        if (_type == "logo") {
          return `<span >
          <img style="width:14px;max-height:14px;" src="${rowData[field][_type]}" onerror="this.src='/images/team.png';this.onerror=null" />
          ${rowData[field].value}
          </span>`;
        } else if (_type == "kda") {
          return `<p style="margin-top:5px;line-height:15px;">${rowData[field].value}<br/><span style="font-size: 8px;color: #8A8A8A;">${rowData[field][_type]}</p>`;
        } else if (_type == "legend") {
          return `<p style="margin-top:5px;line-height:15px;">${rowData[field].value}%</p>
          <p style="width:100%;height:6px;background:#D8D8D8;border-radius:3px;margin-top:6px;line-height: 0;text-align:left;"><span style="background: linear-gradient(127deg, #2936F4 0%, #1D6CDD 100%);display:inline-block;width:${rowData[field].value}%;height:6px;border-radius:3px;"></span></p>`;
        } else if (_type == "unit") {
          return `${rowData[field].value}${rowData[field][_type]}`;
        }
      }
      return rowData[field];
    };

    var _tabList = [
      {
        lable: "战队榜",
        type: "team",
        id: 1 // 1战队 2选手 3英雄  4地图
      },
      {
        lable: "选手榜",
        type: "player",
        id: 2
      }
    ];

    if (this.game === "CSGO") {
      _tabList.push({
        lable: "地图榜",
        type: "maps",
        id: 4
      });
    } else {
      _tabList.push({
        lable: "英雄榜",
        type: "hero",
        id: 3
      });
    }
    return {
      notEmpty: 1,
      tabList: _tabList,
      tabData3: {
        team: [
          {
            rank: 1,
            team: {
              type: "logo",
              value: "Quandr",
              logo: "http://ti-img.inkr.xyz/storage/lol_local/team/lt_25089.png"
            },
            session: 20,
            kda: {
              type: "kda",
              value: "6.6",
              kda: "10.2/12.8/11.4"
            },
            winner: {
              type: "legend",
              value: "80.2"
            },
            blood: {
              type: "unit",
              value: "80.2",
              unit: "%"
            },
            penta: "80.2%",
            deca: "80.2%",
            duration: {
              type: "unit",
              value: "29:22",
              unit: "′"
            }
          },
          {
            rank: 2,
            team: {
              type: "logo",
              value: "Ksenger",
              logo: "http://ti-img.inkr.xyz/storage/lol_local/team/lt_25022.png"
            },
            session: 100,
            kda: {
              type: "kda",
              value: "6.6",
              kda: "10.2/12.8/11.4"
            },
            winner: {
              type: "legend",
              value: "20.6"
            }
          },
          {
            rank: 3,
            team: {
              type: "logo",
              value: "中国队",
              logo: "http://ti-img.inkr.xyz/storage/lol_local/team/lt_25107.png"
            },
            session: 44,
            kda: {
              type: "kda",
              value: "6.6",
              kda: "10.2/12.8/11.4"
            },
            winner: {
              type: "legend",
              value: "50"
            }
          },
          {
            rank: 4,
            team: {
              type: "logo",
              value: "The Longlong Name hahahahah",
              logo: "http://ti-img.inkr.xyz/storage/lol_local/team/lt_25089.png"
            },
            session: 900,
            kda: {
              type: "kda",
              value: "6.6",
              kda: "10.2/12.8/11.4"
            },
            winner: {
              type: "legend",
              value: "18"
            }
          }
        ],
        player: [],
        hero: [],
        maps: []
      },
     
    };
  },
  computed: {
    ...mapGetters({
      tabData: "leagueDetail/get_leagueTabData",
      tabColumn: "leagueDetail/get_leagueTabColumn"
    })
  },

  created() {
    //debug;
    // this.tabColumn.player = this.tabColumn.team;
    // this.tabColumn.hero = this.tabColumn.team;
    // this.tabColumn.maps = this.tabColumn.team;
    // this.tabData.player = this.tabData.team;
    // this.tabData.hero = this.tabData.team;
    // this.tabData.maps = this.tabData.team;
  }
};
</script>

<style lang="less">
.league-data {
  color: #bcbcbc;
  height: 100%;
  #league-data-wrapper {
    .van-tab {
      font-size: 12px;
    }

    .van-tab--active {
      & > span {
        font-size: 12px;
      }
    }
    .content {
      overflow-y: auto;
      height: 100%;
    }
    .van-tabs__wrap {
      height: 36px !important;
      box-shadow: none;
    }
  }
  .table-title {
    .v-table-sort-icon {
      margin-left: 0;
      margin-top: 6px;
    }
  }
  .v-table-body-cell {
    font-size: 14px;
  }
}
</style>