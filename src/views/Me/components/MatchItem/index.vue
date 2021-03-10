<!--
  功能：
  作者：tangfeng
  邮箱：acmentf@163.com
  时间：2020年11月02日 17:48:37
-->
<template>
  <!-- status_id  3:已结束 | 2: 进行中 | 1：未开始  -->
  <div class="match-item">
    <div class="mounted" @click="goDetail(item_data)">
      <div class="item-top">
        <p class="match-type">{{item_data.base.tournament_name | ellipsis(15)}}</p>
        <p class="inning">
          <span>{{item_data.info.title}}</span>
          <span
            class="item"
            v-if="item_data.base.status_id==2"
          >{{Math.floor(item_data.info.live_time/60)}} '</span>
        </p>
        <p>{{item_data.base.box}}</p>
      </div>
      <div class="item-middle">
        <Star ref="star" v-model="item_data.is_focus" :parmars="{game_id:item_data.game_id,type:'0',id_list:item_data.base.match_id}" />
        <div class="team">
          <div class="home">
            <span
              class="team-name"
            >{{item_data.base.home.team_short_name | ellipsis((game_id=='CSGO')?12:5) }}</span>
            <MyImage v-model="item_data.base.home.team_img" class="team-logo" :type="1" width="16" />
            <Economic
              type="2"
              :economic="item_data.info.home.economic"
              v-show="item_data.info.home.economic"
              class="economic-left"
            />
            <span
              class="team-score"
              v-if="item_data.base.status_id ==2"
            >{{renderScore(item_data.info.home.score)}}</span>
            <span
              class="team-score"
              v-if="item_data.base.status_id ==3"
            >{{item_data.info.home.global_score}}</span>
          </div>
          <span v-if="item_data.base.status_id!==1"></span>
          <p class="vs" v-if="item_data.base.status_id ==1">VS</p>
          <div class="away">
            <span
              class="team-score"
              v-if="item_data.base.status_id ==2"
            >{{renderScore(item_data.info.away.score)}}</span>
            <span
              class="team-score"
              v-if="item_data.base.status_id ==3"
            >{{item_data.info.away.global_score}}</span>
            <MyImage v-model="item_data.base.away.team_img" class="team-logo" :type="1" width="16" />
            <span
              class="team-name"
            >{{item_data.base.away.team_short_name | ellipsis((game_id=='CSGO')?12:5)}}</span>
            <Economic
              type="1"
              :economic="item_data.info.away.economic"
              v-if="item_data.info.away.economic"
              class="economic-right"
            />
          </div>
        </div>
        <!-- 进行中 -->
        <img
          src="./icon/live.svg"
          alt
          width="14"
          height="14"
          v-if="item_data.base.status_id==2"
          style="position:relative;z-index:111"
        />
        <span v-if="item_data.base.status_id !==2" style="position:relative;z-index:111">
          <img src="./icon/LOL.svg" alt v-if="item_data.game_id=='LOL'" class="game-icon" />
          <img src="./icon/CSGO.svg" alt v-if="item_data.game_id=='CSGO'" class="game-icon" />
          <img src="./icon/DOTA2.svg" alt v-if="item_data.game_id=='DOTA2'" class="game-icon" />
        </span>
      </div>
      <div class="item-bottom">
        <span class="start-time">{{item_data.base.match_time ? $format(item_data.base.match_time,'hh:mm') :''}}</span>
        <!-- 全场比分 -->
        <div class="game-score" v-if="item_data.base.status_id==2">
          <!-- 主队数据 -->
          <div class="home-data data">
            <img :src="item" alt v-for="(item,index) in item_data.info.home.icon_list" :key="index" />
          </div>
          <span class="score">
            <!-- <span>{{item_data.info.home.global_score}}</span> -->
            <span class="global_score">全场</span>
            <!-- <span>{{item_data.info.away.global_score}}</span> -->
          </span>
          <!-- 客队数据 -->
          <div class="away-data data">
            <img :src="item" alt v-for="(item,index) in item_data.info.away.icon_list" :key="index" />
          </div>
        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Star from "@c/Star";
import Economic from "@c/Economic";
export default {
  // 组件名称
  name: "match-item",
  // 组件参数 接收来自父组件的数据
  props: {
    item_data: {
      type: Object,
      default: {}
    },
    dateStr: {
      type: String,
      default: ""
    }
  },
  // 局部注册的组件
  components: { Economic, Star },
  // 组件状态值
  data() {
    return {};
  },
  // 计算属性
  computed: {
    ...mapState({
      ids: state => state.matchList.collectionIdArray,
      game_id: state => state.matchList.game_id
    })
  },
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    goDetail(data) {
      let {game_id} = data;
      switch (game_id) {
        case "LOL":
          this.$router.push("/match-detail/LOL?match_id=" + data.base.match_id);
          break;
        case "DOTA2":
          this.$router.push("/match-detail/DOTA2?match_id=" + data.base.match_id);
          break;
        case "CSGO":
          this.$router.push("/match-detail/CSGO?match_id=" + data.base.match_id);
          break;
      }
    },
    renderMatchNum(box_num) {
      let data = [
        "",
        "第一局",
        "第二局",
        "第三局",
        "第四局",
        "第五局",
        "第六局"
      ];
      return data[box_num];
    },
    renderScore(score) {
      if (score == 0) {
        return 0;
      } else {
        return score < 10 ? "0" + score : score;
      }
    }
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 在实例初始化之后，组件属性计算之前，如data属性等
   */
  beforeCreate() {},
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {},
  /**
   * 在挂载开始之前被调用：相关的 render 函数首次被调用。
   */
  beforeMount() {},
  mounted() {}
};
</script> 

<style scoped lang='scss'>
.match-item {
  background: #fff;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
  opacity: 1;
  border-radius: 0px;
  height: 104px;
  padding: 10px 10px 15px 10px;
  color: #666;

  & > .mounted > div {
    display: flex;
    justify-content: space-between;
    position: relative;
    color: #666;
    align-items: center;
  }
  .item-top {
    font-size: 11px;
    position: relative;

    .match-type {
      color: #666;
    }
    .inning {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      color: #999;
      .item {
        padding-left: 10px;
      }
    }
  }
  .item-middle {
    display: flex;
    margin-top: 18px;
    position: relative;
    .team {
      flex: 1;
      display: flex;
      justify-content: center;
      font-size: 0;
      align-items: center;
      text-align: center;
      & > div {
        font-size: 9px;
        display: flex;

        align-items: center;
        position: relative;
        &.home {
          justify-content: flex-end;
          flex: 1;
          .team-name {
            font-size: 12px;
            color: #666;
            font-weight: bold;
            opacity: 1;
          }
          .team-logo {
            margin: 0 4px;
          }
          .team-score {
            font-size: 12px;
            font-weight: bold;
            color: #2AB7CA;
          }
          .economic-left {
            position: absolute;
            left: 10px;
          }
        }
        &.away {
          flex: 1;
          .team-name {
            font-size: 12px;
            color: #666;
            font-weight: bold;
            opacity: 1;
          }
          .team-logo {
            margin: 0 4px;
          }
          .team-score {
            font-size: 12px;
            font-weight: bold;
            color: #F35463;
          }
          .economic-right {
            position: absolute;
            right: 15px;
          }
        }
      }
      & > span {
        height: 2px;
        width: 6px;
        background: #999;
        margin: 0 4px;
      }
      .vs {
        font-size: 18px;
        font-weight: bold;
        padding: 0 10px;
      }
      // img {
      //   width: 26px;
      //   height: 26px;
      //   margin: 0 5px;
      // }
    }
  }
  .item-bottom {
    margin-top: 18px;
    font-size: 11px;
    position: relative;
    .start-time {
      color: #999;
    }
    .game-score {
      position: absolute;
      width: 100%;
      display: flex;
      align-items: center;
      position: absolute;
      flex: 1;
      top: -7px;
      & > .data {
        & > img {
          width: 12px;
          margin: 0 2px;
        }
        &.home-data {
          padding-right: 12px;
          flex: 1;
          text-align: right;
        }
        &.away-data {
          padding-left: 12px;
          flex: 1;
          text-align: left;
        }
      }
      .score {
        align-items: center;
        display: flex;
        .global_score {
          padding: 0 7px;
          color: #999;
        }
      }
    }

    .online-count {
      color: #999;
      & > i {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: url("./icon/rs.png") no-repeat 0 0;
        background-size: 100% 100%;
        margin-right: 4px;
      }
    }
  }
  .skeleton {
    padding: 10px 10px 15px 10px;
    .skeleton-top {
      background: #495a8b;
      height: 10px;
      border-radius: 10px;
    }
    .skeleton-middle {
      margin-top: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      .skeleton-middle-left {
        display: flex;
        align-items: center;
        & > span {
          background: #495a8b;
          height: 10px;
          border-radius: 10px;
          width: 45px;
        }
        & > p {
          background: #495a8b;
          height: 10px;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          margin-left: 10px;
        }
      }
      .vs {
        font-weight: bold;
        font-size: 16px;
        color: #495a8b;
        margin: 0 26px;
      }
      .skeleton-middle-right {
        display: flex;
        align-items: center;
        & > p {
          background: #495a8b;
          height: 10px;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }
        & > span {
          background: #495a8b;
          height: 10px;
          border-radius: 10px;
          width: 45px;
        }
      }
    }
    .skeleton-bottom {
      width: 130px;
      height: 10px;
      background: #495a8b;
      border-radius: 10px;
      margin: 0 auto;
      margin-top: 12px;
    }
  }
  .game-icon {
    width: 16px;
    height: 16px;
  }
}
</style>
