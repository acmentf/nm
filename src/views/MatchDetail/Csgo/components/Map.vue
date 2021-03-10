<template>
  <div class="map">
    <div class="team-name flex">
      <div class="home">
        <span class="name">{{team_home.team_short_name}}</span>
        <MyImage v-model="team_home.team_img" size="26" :type="1" />
      </div>
      <span class="vs">VS</span>
      <div class="away">
        <MyImage v-model="team_away.team_img" size="26" :type="1" />
        <span class="name">{{team_away.team_short_name}}</span>
      </div>
    </div>

    <ul class="map-list">
      <li :class="item.actived?'actived':''" v-for="(item,index) in mapList" :key="index">
        <div class="map-pic" @click="toggle_data(item)" :class="renderBg(item)">
          <img :src="item.cover" alt width="100%" />
          <span class="home-win">
            <span>{{item.home.win_rate}}%</span>&nbsp;
            <span>{{item.home.round_num}}场</span>
          </span>
          <span class="b-p-home" v-if="state==3">
            <img
              src="../images/b-blue.png"
              alt
              width="14"
              height="15"
              v-if="item.bp_data=='B_Home'"
            />
            <img
              src="../images/p-blue.png"
              alt
              width="14"
              height="15"
              v-if="item.bp_data=='P_Home'"
            />
            <img src="../images/r.png" alt width="14" height="15" v-if="item.bp_data=='R_'" />
          </span>
          <span class="map-name-wrapper">
            <p class="map-name">{{item.map_name}}</p>
            <img
              src="../images/bottom.png"
              alt
              width="12"
              class="jt"
              :class="item.actived?'open':''"
            />
          </span>
          <span class="b-p-away" v-if="state==3">
            <img
              src="../images/b-red.png"
              alt
              width="14"
              height="15"
              v-show="item.bp_data=='B_Away'"
            />
            <img
              src="../images/p-red.png"
              alt
              width="14"
              height="15"
              v-show="item.bp_data=='P_Away'"
            />
          </span>
          <span class="away-win">
            <span>{{item.away.win_rate}}%</span>&nbsp;
            <span>{{item.away.round_num}}场</span>
          </span>
        </div>
        <!-- 数据列表 -->
        <div class="data">
          <RowBar :dataList="renderDataList(item)" :marginBottom="10" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import RowBar from "../../components/RowBar";
export default {
  name: "Index",
  components: { RowBar },
  data() {
    return {
      url: "111",
      actived: false
    };
  },
  methods: {
    toggle_data(item) {
      item.actived = !item.actived;
    },
    renderDataList(item) {
      console.log(item,'item')
      return [
        {
          attr_away: item.away.t_win_rate,
          attr_home: item.home.t_win_rate,
          attr_name: "T胜率",
          attr_total: 100,
          dw: "%"
        },
        {
          attr_away: item.away.ct_win_rate,
          attr_home: item.home.ct_win_rate,
          attr_name: "CT胜率",
          attr_total: 100,
          dw: "%"
        }
        // {
        //   attr_away: 11.8,
        //   attr_home: 54,
        //   attr_name: "T胜率",
        //   attr_total: 100,
        //   dw: "%"
        // },
        // {
        //   attr_away: 11.8,
        //   attr_home: 11.8,
        //   attr_name: "CT胜率",
        //   attr_total: 100,
        //   dw: "%"
        // }
      ];
    },
    renderBg(item) {
      if (item.bp_data === "B_Away" || item.bp_data === "B_Home") {
        return "b";
      } else if (item.bp_data === "R_") {
        return "r";
      } else {
        return "p";
      }
    }
  },
  computed: {
    ...mapState({
      mapList: state => state.matchDetail.mapList||[],
      team_away: state => state.matchDetail.team_away||{},
      team_home: state => state.matchDetail.team_home||{},
      state: state => state.matchDetail.state
    })
  },
  created() {
    this.$store.dispatch("matchDetail/_getMap");
  }
};
</script>

<style lang="scss" scoped>
.map {
  .team-name {
    padding: 16px 0;
    margin: 10px 0;
    background: #fff;
    color: #333;
    font-weight: bold;
    .vs {
      font-size: 16px;
      color: #999;
      padding: 0 26px;
      font-weight: bold;
    }
    .name {
      font-size: 12px;
      font-weight: bold;
    }
    .home {
      flex: 1;
      text-align: right;
      .name {
        margin-right: 5px;
      }
    }
    .away {
      flex: 1;
      .name {
        margin-left: 5px;
      }
    }
  }
  .map-list {
    & > li {
      position: relative;
      box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
      opacity: 1;

      height: 66px;
      overflow: hidden;
      transition: height 0.1s ease-in-out;
     
      &.actived {
        height: 124px;
      }
      .map-pic {
        position: relative;
        z-index: 1111;
        display: flex;
        background: #000;
        background-size: 100% 100%;
        justify-content: space-between;
        align-items: center;
        height: 66px;
        padding: 0 10px;
        overflow: hidden;
        & > img {
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
        }
        &.b:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0px;
          right: 0px;
          background: rgba(0, 0, 0, 0.6);
          height: 100%;
          z-index: 11;
        }
        &.p:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0px;
          right: 0px;
          background: rgba(38, 85, 193, 0.4);
          height: 100%;
          z-index: 11;
        }
        &.r:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0px;
          right: 0px;
          background: rgba(101, 239, 118, 0.2);
          height: 100%;
          z-index: 11;
        }
        .home-win {
          padding: 0 12px;
          position: relative;
          z-index: 111;
          width: 92px;
          height: 18px;
          color: #ffffff;
          background: #2AB7CA;
          opacity: 1;
          border-radius: 9px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          & > span:first-child {
            margin-right: 5px;
          }
        }

        .away-win {
          position: relative;
          padding: 0 12px;
          z-index: 111;
          width: 92px;
          height: 18px;
          background: #F35463;
          color: #ffffff;
          opacity: 1;
          border-radius: 9px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          & > span:first-child {
            margin-right: 5px;
          }
        }
        .map-name-wrapper {
          position: relative;
          z-index: 111;
          text-align: center;
          font-size: 12px;

          .map-name {
            margin-bottom: 2px;
            color: #ffffff;
          }
          .jt {
            transform: rotate(360deg);
            transition: all 0.1s ease-in-out;
            &.open {
              transform: rotate(180deg);
            }
          }
        }
      }
      .data {
        width: 100%;
        height: 58px;
        background: #fff;
        padding: 0 10px;
        width: 100%;
        display: flex;
        align-items: center;
        & > div {
          flex: 1;
        }
      }
    }
    .b-p-home {
      position: absolute;
      z-index: 111111;
      left: 110px;
    }
    .b-p-away {
      position: absolute;
      z-index: 111111;
      right: 110px;
    }
  }
}
</style>
