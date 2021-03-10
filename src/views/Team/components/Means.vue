<!--
  功能：战队资料
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2020年12月30日 16:20:10
-->
<template>
  <div class="team-means">
    <ul class="team-info">
      <li>
        <div class="label">
          <img src="../images/name.png" alt />
          <span>全称</span>
        </div>
        <div class="value">{{teamDetailResource.team_info.team_long_name}}</div>
      </li>
      <li>
        <div class="label">
          <img src="../images/place.png" alt />
          <span>赛区</span>
        </div>
        <div class="value">{{teamDetailResource.team_info.region_name}}</div>
      </li>
      <li>
        <div class="label">
          <img src="../images/age.png" alt />
          <span>选手年龄</span>
        </div>
        <div class="value">{{teamDetailResource.team_info.avg_age}}</div>
      </li>
      <li>
        <div class="label">
          <img src="../images/money.png" alt />
          <span>总奖金</span>
        </div>
        <div class="value total">{{teamDetailResource.team_info.total_earnings}}</div>
      </li>
    </ul>
    <module-title>赛事荣誉</module-title>
    <div class="module-content moudle">
      <span class="more" @click="lookMore">查看更多</span>
      <ul class="games-content">
        <li v-for="(item,index) in teamDetailResource.honor" :key="index">
          <div class="label">
            <img :src="item.rank_img" alt />
            <span>{{item.ranking}}</span>
          </div>
          <div class="game-name">{{item.tournament_name}}</div>
          <div class="value">{{item.get_time}}</div>
        </li>
      </ul>
    </div>
    <module-title>转会记录</module-title>
    <div class="moudle">
      <div class="more">
        <span :class="transferType==1 ? 'actived' :''" @click="toggleTranfer(1)">转入</span>
        <span :class="transferType==2 ? 'actived' :''" @click="toggleTranfer(2)">转出</span>
      </div>
      <ul v-if="transferList.length" class="transfer-content">
        <li v-for="(item,index) in transferList" :key="index">
          <div class="label">
            <van-image :src="item.image" class="player-pic">
              <template v-slot:error>
                <img src="@/assets/images/player.png" alt width="30" />
              </template>
            </van-image>
            <div class="player-info">
              <p class="player-name">{{item.name}}</p>
              <p class="position">{{item.postion_str}}</p>
            </div>
          </div>
          <div class="value">
            <p
              class="team-name"
              @click="jumperTeamDetail(item.transfer_team_id)"
            >{{item.transfer_team_name}}</p>
            <p class="time">{{item.transfer_time}}</p>
          </div>
        </li>
      </ul>
      <ul v-else class="transfer-content">
        <Empty EmptyType="2">暂无{{['','转入','转出'][transferType]}}数据</Empty>
      </ul>
    </div>
  </div>
</template>

<script>
import Module from "@/components/Module";
import { mapState } from "vuex";
import TeamMore from "../more";
import Empty from "@c/Empty";
import ModuleTitle from "@c/ModuleTitle";
export default {
  name: "team-means",
  components: { Module, TeamMore, Empty, ModuleTitle },
  data() {
    return {
      isShow: true,
      transferType: 1, //转出方式 1为转入 2位转出
      transferList: []
    };
  },
  computed: {
    ...mapState({
      teamDetailResource: state => state.teamDetail.teamDetailResource
    })
  },
  watch: {},
  methods: {
    lookMore() {
      //this.isShow = true; '/team-more'
      let { team_id, game_id } = this.$route.query;
      this.$router.push({
        path: "/team-more",
        query: { team_id, game_id }
      });
    },
    toggleTranfer(type) {
      this.transferType = type;
      if (type == 1) {
        this.transferList = this.teamDetailResource.transfer_in;
      } else {
        this.transferList = this.teamDetailResource.transfer_out;
      }
    },
    async init_date() {
      await this.$store.dispatch("teamDetail/_getTeamDetailResource");
      this.transferList = this.teamDetailResource.transfer_in;
    },
    jumperTeamDetail(team_id) {
      this.$router.push({
        path: "/team-detail",
        query: { game_id: this.$store.state.teamDetail.game_id, team_id }
      });
    }
  },

  created() {
    this.init_date();
  },
  mounted() {}
};
</script>
<style lang='scss' scoped>
.team-means {
  margin-top: 10px;
  .moudle {
    position: relative;
    .more {
      position: absolute;
      top: -25px;
      right: 10px;
      color: #999;
      & > span {
        margin-left: 10px;
        &.actived {
          color: #6521D7
        }
      }
    }
  }
  .module-content{
     .more{color:#333;}
  }
  padding-bottom: 10px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    .label {
      font-size: 12px;
      display: flex;
      color: #333;
      align-items: center;
      & > img {
        width: 18px;
        height: 18px;
        margin-right: 5px;
      }
    }
    .value {
      font-size: 12px;
      color: #666;
      &.total {
        color: #fbb13c;
        font-size: 17px;
      }
    }
  }
  .team-info {
    background: #fff;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
    opacity: 1;
    padding: 0 10px;
   
  }
  .games-content {
    min-height: 160px;
    background: #fff;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
    opacity: 1;
    padding: 0 10px;

    .game-name {
      font-size: 12px;
      font-weight: bold;
      color: #333;
    }
    .value {
      color: #999;
    }
  }
  .transfer-content {
    background: #fff;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
    opacity: 1;
    padding: 0 10px 10px 10px;
    li {
      padding-top: 10px;
      padding-bottom: 0;
      .label {
        display: flex;
        align-items: center;
        .player-pic {
          width: 30px;
          height: 30px;
          margin-right: 4px;
        }
        .player-name {
          font-size: 13px;
          font-family: PingFang SC;
          font-weight: bold;
          line-height: 18px;
          color: #333333;
        }
        .position {
          font-size: 11px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 16px;
          color: #999;
        }
      }
      .team-name {
        text-align: right;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        margin-bottom: 3px;
      }
      .time {
        font-size: 10px;
        color: #999;
      }
    }
  }
}
</style>