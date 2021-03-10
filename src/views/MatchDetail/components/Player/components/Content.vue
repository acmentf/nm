<template>
  <div class="palyer-content">
    <div class="top-wrapper">
      <div class="home-team flex">
        <my-image v-model="player.player_base.team_home.team_img" class="team-icon" size="24"></my-image>
        <span class="team-name">{{player.player_base.team_home.team_short_name}}</span>
      </div>
      <div class="away-team flex">
        <span class="team-name">{{player.player_base.team_away.team_short_name}}</span>
        <my-image v-model="player.player_base.team_away.team_img" class="team-icon" size="24"></my-image>
      </div>
    </div>
    <div class="middle-wrapper">
      <!-- 主队选手数据 -->
      <div class="home-team-player" style="text-align:center">
        <!-- <img :src="player.player_base.player_home.player_logo" alt class="player-icon" /> -->
        <my-image
          v-model="player.player_base.player_home.player_logo"
          class="player-icon"
          size="35"
        ></my-image>
        <p
          class="player-name home"
          style="text-align:left"
        >{{player.player_base.player_home.player_name_en | ellipsis(12)}}</p>
      </div>
      <!-- 图型数据 -->
      <div class="map flex">
        <div class="home-player-sl">
          <span>{{player.player_base.player_home.win_rate}}%</span>
          <div class="sl-count">
            <span>
              <img src="@/assets/images/win_red.png" alt class="win-home icon-win-lost" />
              <span class="js">{{player.player_base.player_home.win}}</span>
            </span>
            <span>
              <img src="@/assets/images/lose.png" alt class="lost-home icon-win-lost" />
              <span class="js">{{player.player_base.player_home.lost}}</span>
            </span>
          </div>
        </div>
        <div class="pie">
          <Pie title="胜率" :rates="renderWinRates" />
        </div>
        <div class="away-player-sl">
          <span>{{player.player_base.player_away.win_rate}}%</span>
          <div class="sl-count">
            <span>
              <img src="@/assets/images/win_blue.png" alt class="win-away icon-win-lost" />
              <span class="js">{{player.player_base.player_away.win}}</span>
            </span>
            <span>
              <img src="@/assets/images/lose.png" alt class="lost-away icon-win-lost" />
              <span class="js">{{player.player_base.player_away.lost}}</span>
            </span>
          </div>
        </div>
      </div>
      <!-- 客队选手数据 -->
      <div class="away-team-player" style="text-align:center">
        <my-image
          v-model="player.player_base.player_away.player_logo"
          class="player-icon"
          size="35"
        ></my-image>
        <p
          class="player-name away"
        >{{player.player_base.player_away.player_name_en | ellipsis(12) }}</p>
      </div>
    </div>
    <div class="bottom-wrapper">
      <RowBar :dataList="renderDataList" :marginBottom="6" />
      <div class="role_history kda" style="padding-top:5px;">
        <div class="home-history">
          <span
            class="history-span"
            v-for="(item,index) in player.role_history.player_home.slice(0,3)"
            :key="index"
          >
            <my-image v-model="item.role_img_url" class="history-icon" size="22"></my-image>
          </span>
        </div>
        <span class="bewtten">常用英雄</span>
        <div class="away-history">
          <span
            class="history-span"
            v-for="(item,index) in player.role_history.player_away.slice(0,3)"
            :key="index"
          >
            <my-image v-model="item.role_img_url" class="history-icon" size="22"></my-image>
          </span>
        </div>
      </div>
      <div class="role_history kda">
        <div class="sf">
          <span
            v-for="(item,index) in player.role_history.player_home.slice(0,3)"
            :key="index"
            class="history-span"
          >{{item.win_rate}}</span>
        </div>
        <span class="bewtten">胜负</span>
        <div class="sf">
          <span
            v-for="(item,index) in player.role_history.player_away.slice(0,3)"
            :key="index"
            class="history-span"
          >{{item.win_rate}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pie from "./Pie.vue";
import RowBar from "../../RowBar";
export default {
  name: "palyer-content",
  components: { Pie, RowBar },
  props: ["player"],
  data() {
    return {
      dataLable: ["KDA", "参战率", "分均补刀", "分均输出", "分均经济"]
    };
  },
  computed: {
    renderWinRates() {
      return [
        { value: this.player.player_base.player_away.win_rate }, // 客队
        { value: this.player.player_base.player_home.win_rate, name: "胜率" } // 主对
      ];
    },
    renderDataList() {
      let pair_attr = this.player.pair_attr;
      let dataList = [];
      pair_attr.forEach((item, index) => {
        dataList.push({
          attr_away: item.attr_away,
          attr_home: item.attr_home,
          attr_name: item.attr_name,
          attr_total: item.attr_total,
          tip_away: item.attr_label_away,
          tip_home: item.attr_label_Home,
          dw: index == 1 ? "%" : ""
        });
      });
      return dataList;
    },
    onRefresh() {}
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.palyer-content {
  background: #fff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  opacity: 1;

  padding: 10px;
  .top-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .team-icon {
      margin-right: 2px;
    }
    .team-name {
      font-size: 12px;
      color: #333;
    }
    .away-team {
      .team-icon {
        margin-left: 2px;
      }
    }
    .filter {
      color: #333;
    }
    .down {
      display: inline-block;
      position: relative;
      &:after {
        content: "";
        border-top: solid 6px #333;
        border-right: solid 6px transparent;
        border-left: solid 6px transparent;
        width: 0;
        height: 0;
        position: absolute;
        top: -2px;
        left: 8px;
      }
    }
  }
  .middle-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 8px 0 8px 0;
    position: relative;
   
    .map {
      flex: 1;
      color:#333;
    }
    .pie {
      position: relative;
    }
    .home-player-sl {
      text-align: right;
      flex: 1;
    }
    .away-player-sl {
      flex: 1;
    }
    .player-name {
      font-weight: bold;
      color: #333;
      font-size: 12px;
      line-height: 17px;
      position: absolute;
      top: 0px;
      width: 100px;
      text-align: right;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &.home {
        left: 0;
      }
      &.away {
        right: 0;
      }
    }
    .player-icon {
      width: 35px;
      height: 35px;
      object-fit: cover;
      border-radius: 50%;
      margin-top: 20px;
    }
    .icon-win-lost {
      width: 12px;
      height: 12px;
      display: inline-block;
      text-align: center;
      line-height: 12px;
      font-size: 8px;
      border-radius: 50%;
      margin: 0 2px;
      &.win-home {
        background: linear-gradient(137deg, #6a20ff 0%, #5370fe 100%);
      }
      &.lost-home,
      &.lost-away {
        background: #cccccc;
        color: #4f505f;
      }
      &.win-away {
        background: linear-gradient(134deg, #F35463 0%, #dd6efe 100%);
      }
    }
    .sl-count {
      padding-top: 8px;
      img {
        vertical-align: top;
      }
    }
    .js {
      font-size: 12px;
      color: #333;
    }
    .sl-count {
      & > :first-child {
        margin-right: 8px;
      }
    }
  }
  .bottom-wrapper {
    .kda {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #333;
      & > div {
        flex: 1;
      }
      .bewtten {
        width: 57px;
        text-align: center;
        font-size: 12px;
        color: #666;
      }
      .history-icon {
        width: 22px;
        height: 22px;
        object-fit: cover;
        border-radius: 50%;
      }
      .history-span {
        width: 40px;
        display: inline-block;
        text-align: center;
      }
    }
  }
}
</style>
