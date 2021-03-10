<!--
  功能：队员详情
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2021年01月12日 17:17:35
-->
<template>
  <!-- 队员详情 -->
  <div class="player-detail">
    <app-nav>
      <span slot="title">队员详情</span>
    </app-nav>
    <div class="player-content">
      <div class="player-info">
        <div class="avatar-wrapper">
          <van-image :src="playerTopDetail.player_img" class="avatar-pic" round>
            <template v-slot:error>
              <img src="@/assets/images/player.png" alt width="70" />
            </template>
          </van-image>
          <img
            :src="playerTopDetail.position_img"
            alt
            class="position-pic"
            v-if="playerTopDetail.position_img"
          />
        </div>
        <div class="info-item">
          <span>{{playerTopDetail.player_conutry_name | ellipsis(4)}}</span>
          <p>国家</p>
        </div>
        <div class="info-item">
          <span>{{playerTopDetail.player_team_name |ellipsis(4)}}</span>
          <p>队伍</p>
        </div>
        <div class="info-item">
          <span>{{playerTopDetail.player_name|ellipsis(4)}}</span>
          <p>昵称</p>
        </div>
      </div>
      <div class="handler-select">
        <my-select
          :options="select_type_list"
          v-model="optionId"
          class="select-1"
          placeholder="请选择"
          @change="change"
        ></my-select>
        <my-select
          :options="selectList2"
          v-model="$store.state.player.sub_type"
          class="select-2"
          @change="thirdChange"
        ></my-select>
      </div>
      <div class="module" v-if="baseDataInfo.draw_item.length">
        <module-title>基础数据</module-title>
        <div class="base-content">
          <div class="pie-list" v-if="baseDataInfo.draw_circle">
            <div class="pie-wrap" v-for="(item,index) in baseDataInfo.draw_circle" :key="index">
              <div class="pie-canvas">
                <Pie v-model="item.value" />
                <span class="pie-data">{{item.value}}%</span>
              </div>
              <p class="pie-title">{{item.name}}</p>
            </div>
          </div>
          <div class="base-data-detail" v-if="baseDataInfo.kda">
            <div class="kda">
              <p class="kad-title">{{baseDataInfo.kda.name}}</p>
              <p class="row-bar-title">{{renderKda(baseDataInfo.kda.value)}}</p>
              <row-bar
                :list="baseDataInfo.kda.value"
                :type="!baseDataInfo.kda.value.length ? 'default':''"
              ></row-bar>
            </div>
            <div class="kda win-rate" v-if="game_id!=='CSGO'">
              <p class="kad-title">{{baseDataInfo.win_lost.name}}</p>
              <row-bar :list="baseDataInfo.win_lost.value" type="default"></row-bar>
            </div>
            <ul class="data-list">
              <li v-for="(item,index) in baseDataInfo.draw_item" :key="index">
                <div class="lable">
                  {{item.name.split('#')[0]}}
                  <span class="info">{{item.name.split('#')[1]}}</span>
                </div>
                <div class="data">
                  <span>{{item.value.split('#')[0]}}</span>
                  <span class="info">{{item.value.split('#')[1]}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="module" v-if="game_id==='CSGO' && weapen.length">
        <module-title>常用武器</module-title>
        <ul class="arms-list">
          <li class="header">
            <span class="title">排名</span>
            <span class="title">武器</span>
            <span class="title">击杀数</span>
            <span class="title">击杀占比</span>
          </li>
          <li v-for="(item,index) in weapen" :key="index">
            <span>{{index+1}}</span>
            <span class="avatar">
              <van-image :src="item.weapon_img">
                <template v-slot:error>
                  <img src="@/assets/images/equip.png" alt width="30" />
                </template>
              </van-image>
              <p>{{item.weapon_name | ellipsis(6)}}</p>
            </span>
            <span>{{item.weapon_kill}}</span>
            <span>{{item.weapon_rate}}</span>
          </li>
        </ul>
      </div>
      <div class="module" v-if="game_id==='CSGO' && match_list.length">
        <module-title>比赛记录</module-title>
        <div class="match-content" v-for="(item,index) in match_list" :key="index">
          <div class="title">
            <span class="date flex">{{item.group_time_str}}</span>
            <span class="league-name">{{item.group_tournament_name}}</span>
          </div>
          <ul class="match-lists">
            <li class="match-item" v-for="(_item,_index) in item.group_item" :key="_index">
              <div class="match-item-title" @click="item.actived = !item.actived">
                <div class="start-time flex">{{$format(_item.base.match_time,'hh:mm')}}</div>
                <div class="teams">
                  <div class="home">
                    <div class="team-name">{{_item.base.home.team_short_name}}</div>
                    <van-image :src="_item.base.home.team_img" class="team-pic">
                      <template v-slot:error>
                        <img src="@/assets/images/team.png" alt width="19" />
                      </template>
                    </van-image>
                  </div>
                  <div class="score flex">
                    <span class="home-score">{{_item.global_score_home}}</span>
                    <span class="vs">-</span>
                    <span class="away-score">{{_item.global_score_away}}</span>
                  </div>
                  <div class="away">
                    <van-image :src="_item.base.away.team_img" class="team-pic">
                      <template v-slot:error>
                        <img src="@/assets/images/team.png" alt width="19" />
                      </template>
                    </van-image>
                    <div class="team-name">{{_item.base.away.team_short_name}}</div>
                  </div>
                </div>
                <i class="arrow-top-down" :class="item.actived?'actived':''"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- lol,dota2 -->
      <div class="module" v-if="game_id!=='CSGO'">
        <module-title>常用英雄</module-title>
        <ul class="arms-list">
          <li class="header">
            <span class="title">出场次数</span>
            <span class="title">英雄</span>
            <span class="title">胜率</span>
          </li>
          <li v-for="(item,index) in role_history" :key="index">
            <span class="enter">{{item.enter}}</span>
            <span class="avatar">
              <van-image :src="item.role_img_url" round>
                <template v-slot:error>
                  <img src="@/assets/images/hero.png" alt width="30" />
                </template>
              </van-image>
              <p>{{item.role_name}}</p>
            </span>
            <span>
              <div>
                {{item.win_rate}}&nbsp;
                <p class="info">{{item.win}}胜{{item.lose}}负</p>
              </div>
            </span>
          </li>
        </ul>
      </div>
      <div class="module" v-if="game_id!=='CSGO'">
        <module-title>比赛记录</module-title>
        <div class="match-content" v-for="(item,index) in match_list" :key="index">
          <div class="title">
            <span class="date flex">{{item.group_time_str}}</span>
            <span class="league-name">{{item.group_tournament_name}}</span>
          </div>

          <ul class="match-lists">
            <li class="match-item" v-for="(_item,_index) in item.group_item" :key="_index">
              <div class="match-item-title" @click="item.actived = !item.actived">
                <div class="start-time flex">{{$format(_item.base.match_time,'hh:mm')}}</div>
                <div class="teams">
                  <div class="home">
                    <div class="team-name">{{_item.base.home.team_short_name}}</div>
                    <van-image :src="_item.base.home.team_img" class="team-pic">
                      <template v-slot:error>
                        <img src="@/assets/images/team.png" alt width="19" />
                      </template>
                    </van-image>
                  </div>
                  <div class="score flex">
                    <span class="home-score">{{_item.global_score_home}}</span>
                    <span class="vs">-</span>
                    <span class="away-score">{{_item.global_score_away}}</span>
                  </div>
                  <div class="away">
                    <van-image :src="_item.base.away.team_img" class="team-pic">
                      <template v-slot:error>
                        <img src="@/assets/images/team.png" alt width="19" />
                      </template>
                    </van-image>
                    <div class="team-name">{{_item.base.away.team_short_name}}</div>
                  </div>
                </div>
                <i class="arrow-top-down" :class="item.actived?'actived':''"></i>
              </div>
              <ul class="set-list" :class="item.actived ? 'actived':''">
                <li
                  class="set-item"
                  v-for="(__item,__index) in _item.info"
                  :key="__index"
                  @click="matchDetail(__item)"
                >
                  <div class="set-count">
                    <span
                      class="win-lost flex"
                      :class="__item.win ? '':'lost'"
                    >{{__item.win?'胜利':'失败'}}</span>
                    <p>{{__item.title}}</p>
                  </div>
                  <div class="list-content empty">
                    <div class="detail-data">
                      <div class="hero-box">
                        <van-image :src="__item[game_key].role_img_url" class="hero-pic">
                          <template v-slot:error>
                            <img src="@/assets/images/hero_.png" alt width="40" />
                          </template>
                        </van-image>
                        <span class="level">{{__item[game_key].level}}</span>
                      </div>
                      <div class="detail">
                        <p class="hero-name">{{__item[game_key].role_name}}</p>
                        <div class="bottom">
                          <ul class="skill">
                            <li v-for="(k,j) in __item[game_key].spells" :key="j">
                              <van-image :src="k" class="hero-pic">
                                <template v-slot:error>
                                  <img src="@/assets/images/null.png" alt width="20" />
                                </template>
                              </van-image>
                            </li>
                          </ul>
                          <ul class="equit">
                            <li v-for="(k,j) in __item[game_key].play_equip_imgs" :key="j">
                              <van-image :src="k" class="equit-pic">
                                <template v-slot:error>
                                  <img src="@/assets/images/equip.png" alt width="20" />
                                </template>
                              </van-image>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="top">
                      <div class="kda">{{__item[game_key].kda}}</div>
                      <div
                        class="data"
                      >{{__item[game_key].kill}}/{{__item[game_key].die}}/{{__item[game_key].assists}}</div>
                    </div>
                    <row-bar
                      :list="[__item[game_key].kill,__item[game_key].die,__item[game_key].assists]"
                    ></row-bar>
                  </div>
                  <div class="item-right empty">
                    <i class="arrow-right"></i>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppNav from "@c/AppNav";
import MySelect from "@c/Select";
import Module from "@c/Module";
import Pie from "./components/Pie";
import RowBar from "./components/RowBar";
import ModuleTitle from "@c/ModuleTitle";
import { mapState, mapGetters } from "vuex";
export default {
  name: "player-detail",
  components: { AppNav, MySelect, Module, Pie, RowBar, ModuleTitle },
  data() {
    return {
      optionId2: "",
      list: [
        {
          actived: false
        },
        {
          actived: false
        }
      ],
      list_2: [
        {
          actived: false
        },
        {
          actived: false
        }
      ],
      rowBarList: [1, 2, 3],
      game_key: "lol"
    };
  },
  computed: {
    ...mapState({
      playerTopDetail: state => state.player.playerTopDetail,
      game_id: state => state.player.game_id,
      baseDataInfo: state => state.player.baseDataInfo,
      role_history: state => state.player.role_history,
      match_list: state => state.player.match_list,
      optionId: state => state.player.select_type,
      select_type_list: state => state.player.select_type_list,
      weapen: state => state.player.weapen
    }),
    ...mapGetters({
      selectList2: "player/get_Select_list"
    })
  },
  watch: {},
  methods: {
    init_data() {
      let { game_id, team_id, player_id } = this.$route.query;
      switch (game_id) {
        case "LOL":
          this.game_key = "lol";
          break;
        case "DOTA2":
          this.game_key = "dota_2";
          break;
        case "CSGO":
          this.game_key = "csgo";
          break;
      }
      this.$store.dispatch("player/_getPlayerDetailTop", {
        game_id,
        team_id: Number(team_id),
        player_id: Number(player_id)
      });
    },
    renderKda(list) {
      return list.join("/");
    },
    change(lable, id) {
      this.$store.dispatch("player/resetThirdSelectList", {
        select_type: id
      });
    },
    thirdChange(lable, id) {
      this.$store.state.player.sub_type = id;
      this.$store.dispatch("player/_getPlayerDetail");
    },
    matchDetail({ match_id, box_num }) {
      this.$router.push({
        path: `/match-detail/${this.$route.query.game_id}`,
        query: {
          match_id,
          round: box_num
        }
      });
    }
  },
  created() {
    this.init_data();
  },
  mounted() {}
};
</script>
<style lang='scss' >
.player-detail {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .player-content {
    flex: 1;
    overflow-y: auto;

    padding-bottom: 10px;
    .player-info {
      display: flex;
      background: #fff;
      font-size: 14px;
      height: 130px;
      align-items: center;
      padding-left: 32px;
      margin-top: 10px;
      .avatar-wrapper {
        position: relative;
        .avatar-pic {
          width: 70px;
          max-block-size: 70px;
        }
        .position-pic {
          width: 28px;
          position: absolute;
          height: 28px;
          bottom: -14px;
          right: 0;
        }
      }

      .info-item,
      .info-item-first {
        flex: 1;
        text-align: center;
        color: #333;
        & > span {
          font-size: 14px;
          line-height: 14px;
        }
        & > p {
          color: #999;
          margin-top: 10px;
          font-size: 12px;
        }
      }
    }
    .handler-select {
      padding: 14px 15px;
      background: #fff;
      display: flex;
      .select-1 {
        width: 80px;
        min-height: 24px;
      }
      .select-2 {
        flex: 1;
        margin-left: 15px;
        min-height: 24px;
      }
    }
    .base-content {
      background: #fff;
      padding: 27px 15px 17px 15px;
      .pie-list {
        display: flex;
        .pie-wrap {
          flex: 1;
          .pie-canvas {
            position: relative;
            .pie {
              margin: 0 auto;
            }
            .pie-data {
              color: #4D8AF5;
              font-size: 15px;
              position: absolute;
              font-weight: 600;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
          .pie-title {
            text-align: center;
            color: #333;
            font-size: 13px;
            margin-top: 5px;
          }
        }
      }
      .base-data-detail {
        margin-top: 14px;
        .kda {
          .kad-title {
            font-size: 15px;
            color: #333;
          }
          .row-bar-title {
            font-size: 11px;
            color: #999;
            margin: 2px 0 4px 0;
          }
          &.win-rate {
            & > p {
              margin: 8px 0 6px 0;
            }
          }
        }
        .data-list {
          margin-top: 12px;
          & > li {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
            font-size: 12px;
            color: #fff;
            &:last-child {
              margin-bottom: 0;
            }
            .data {
              font-size: 16px;
            }
            .lable,
            .data {
              display: flex;
              align-items: center;
              color: #333;
              .info {
                color: #6b7183;
                font-size: 10px;
                padding-left: 2px;
              }
            }
          }
        }
      }
    }
    .arms-list {
      background: #fff;
      border-radius: 2px;
      padding: 20px 0 14px 0;
      & > li {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        &.header {
          margin-bottom: 18px;
        }
        & > span {
          font-size: 12px;
          color: #666;
          flex: 1;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          &.avatar {
            justify-content: left;
            color: #333;
          }
          .info {
            font-size: 10px;
            color: #999;
          }
          &.title {
            font-size: 10px;
          }
          .van-image {
            width: 30px;
            height: 30px;
            margin-right: 10px;
          }
          & > div {
            color: #333;
          }
        }
        &.header > span {
          color: #999;
        }
      }
    }
    .match-content {
      background: #fff;
      padding: 20px 10px;
      margin-bottom: 10px;
      .item-right {
        width: 92px;
        display: flex;
        align-items: center;
        display: flex;
        padding-left: 8px;
        justify-content: center;
        position: relative;
        .arrow-right {
          position: absolute;
          right: 0px;
          width: 8px;
          height: 8px;
          background: url("./images/arrow-right.png") no-repeat 0 0;
          background-size: 100% 100%;
        }
        &.empty {
          width: 8px;
        }
        & > div {
          flex: 1;
          color: #fff;
          font-size: 12px;
          div.name {
            font-size: 10px;
            color: #999;
            margin-top: 6px;
          }
        }
      }
      .title {
        display: flex;
        align-items: center;
        padding-bottom: 4px;
        .date {
          width: 54px;
          height: 18px;
          font-size: 11px;
          color: #fff;
          border-radius: 11px;
          background: #6521d7;
        }
        .league-name {
          font-size: 11px;
          color: #333;
          padding-left: 5px;
        }
      }
      .match-lists {
        margin-top: 20px;
        .match-item {
          margin-top: 16px;
          position: relative;
        }
        .match-item-title {
          height: 20px;
          display: flex;

          align-items: center;
          .arrow-top-down {
            position: absolute;
            right: 19px;
            width: 8px;
            height: 8px;
            background: url("./images/arrow-top-down.png") no-repeat 0 0;
            background-size: 100% 100%;
            transform: rotate(180deg);
            transition: all 0.1s ease-in-out;
            &.actived {
              transform: rotate(360deg);
            }
          }
          .teams {
            flex: 1;
            display: flex;
            justify-content: center;
            .score {
              width: 46px;
              & > span {
                font-size: 13px;
                color: #999;
                &.vs {
                  padding: 0 3px;
                }
                &.home-score {
                  color: #4D8AF5;
                }
                &.away-score {
                  color: #f35463;
                }
              }
            }
            .team-pic {
              width: 20px;
              height: 20px;
            }
            .team-name {
              font-size: 13px;
              color: #666;
            }
            .home {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              .team-name {
                margin-right: 5px;
              }
            }
            .away {
              flex: 1;
              display: flex;
              align-items: center;
              .team-name {
                margin-left: 5px;
              }
            }
          }
          .start-time {
            position: absolute;
            font-size: 10px;
            color: #999;
            padding-left: 14px;
          }
        }
        .set-list {
          height: 0;
          overflow: hidden;
          transition: height 0.5s ease-in-out;
          &.actived {
            height: auto;
          }
          & > li {
            margin-top: 14px;
            display: flex;
            justify-content: space-between;
            .set-count {
              display: flex;
              flex-direction: column;
              justify-content: center;
              text-align: center;
              margin-left: 14px;
              .win-lost {
                width: 30px;
                height: 14px;
                font-size: 9px;
                color: #fff;
                text-align: center;
                border-radius: 7px;
                background: #fea900;
                margin: 0 auto;
                margin-bottom: 2px;
                &.lost {
                  background: rgba(255, 255, 255, 0.5);
                }
              }
              & > p {
                color: #999;
                font-size: 9px;
              }
            }
            .achievements {
              display: flex;
              align-items: center;
              flex: 1;
              justify-content: center;
              & > span {
                width: 12px;
                height: 12px;
                background: #4D8AF5;
                margin: 0 4px;
                &:first-child {
                  margin-left: 0;
                }
              }
            }
            .list-content {
              border-right: 1px solid #0a1331;
              flex: 1;
              padding-right: 8px;
              padding-left: 8px;
              &.empty {
                border-right: none;
                padding-right: 14px;
              }
              .top {
                display: flex;
                justify-content: space-between;
                margin-bottom: 2px;
                .kda {
                  color: #fff;
                  font-size: 12px;
                }
                .data {
                  font-size: 10px;
                  color: #999;
                }
              }
              .bottom {
                font-size: 12px;
                color: #999;
                margin-top: 2px;
              }
              .detail-data {
                margin-bottom: 5px;
                display: flex;
                .hero-box {
                  position: relative;
                  width: 40px;
                  height: 40px;
                  .van-image {
                    width: 40px;
                    height: 40px;
                  }
                  .level {
                    position: absolute;
                    width: 18px;
                    height: 14px;
                    background: #050a19;
                    border-radius: 0px 4px 0px 4px;
                    bottom: 0;
                    left: 0;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 10px;
                  }
                }
                .detail {
                  margin-left: 8px;
                  flex: 1;
                  color: #333;
                  font-size: 12px;
                  .bottom {
                    display: flex;
                    & > ul {
                      &.skill {
                        margin-right: 6px;
                      }
                      display: flex;
                      li {
                        width: 20px;
                        margin-right: 4px;
                        .van-image {
                          width: 20px;
                          height: 20px;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>