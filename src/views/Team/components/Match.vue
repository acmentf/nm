<!--
  功能：战队比赛模块
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2020年12月30日 11:32:28
-->
<template>
  <div class="team-match">
    <!-- <Module
      :title="item.title_name"
      v-for="(item,index) in matchList"
      :key="index"
      :class="item.title_name ? 'first':''"
    ></Module>-->
    <div :title="item.title_name" v-for="(item,index) in matchList" :key="index" class="moudle">
      <module-title
        :class="item.title_name ? 'first':''"
        v-show="item.title_name"
      >{{item.title_name}}</module-title>
      <div class="match-content">
        <div class="title">
          <span class="date flex">{{item.group_time_str}}</span>
          <span class="league-name">{{item.group_tournament_name}}</span>
        </div>
        <ul class="match-lists">
          <li
            class="match-item"
            v-for="(_item,_index) in item.group_item"
            :key="_index"
            @click.stop="matchDetail(_item.base)"
          >
            <div class="match-item-title">
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
                <div class="vs flex" v-if="_item.base.status_id ===1">VS</div>
                <div class="score flex" v-else>
                  <span class="home-score">{{_item.global_score_home}}</span>
                  <span class="vs"> - </span>
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
              <div
                class="item-right"
                @click="item.actived = !item.actived"
               
              >
                <i class="arrow-top-down" :class="item.actived?'actived':''"  v-if="_item.base.status_id!==1"></i>
              </div>
            </div>
            <ul class="set-list" :class="item.actived ? 'actived':''">
              <li
                class="set-item"
                v-for="(__item,__index) in _item.info"
                :key="__index"
                @click.stop="matchDetail(__item,1)"
              >
                <div class="set-count">
                  <span
                    class="win-lost flex"
                    :class="__item.win_lost ? '':'lost'"
                  >{{__item.win_lost?'胜利':'失败'}}</span>
                  <p>{{__item.title}}</p>
                </div>
                <div class="achievements">
                  <van-image
                    :src="i"
                    class="achievements-pic"
                    v-for="(i,j) in __item.icon_list"
                    :key="j"
                  >
                    <template v-slot:error>
                      <img src="@/assets/images/team.png" alt width="19" />
                    </template>
                  </van-image>
                </div>
                <div class="item-right">
                  <div class="score flex">
                    <span class="home">{{__item.l_score}} </span>
                    <span class="vs">-</span>
                    <span class="away"> {{__item.r_score}}</span>
                  </div>
                  <i class="arrow-right"></i>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ModuleTitle from "@c/ModuleTitle";
import { mapState } from "vuex";
export default {
  name: "team-match",
  components: { ModuleTitle },
  data() {
    return {
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
      ]
    };
  },
  computed: {
    ...mapState({
      matchList: state => state.teamDetail.match_list
    })
  },
  watch: {},
  methods: {
    //跳转到比赛详情界面
    matchDetail(info, type) {
      let game_id = this.$route.query.game_id;
      if (type) {
        this.$router.push({
          path: `/match-detail/${game_id}`,
          query: { match_id: info.match_id, round: info.box_num }
        });
      } else {
        if (info.status_id === 1) {
          this.$router.push({
            path: `/match-detail/${game_id}`,
            query: { match_id: info.match_id }
          });
        } else {
          return false;
        }
      }
    }
  },
  created() {
    this.$store.dispatch("teamDetail/_getMatchList");
  },
  mounted() {}
};
</script>
<style lang='scss' scoped>
.team-match {
  padding-bottom: 10px;
  .moudle {
    &.first {
      margin-top: 0;
    }
    .match-content {
      background: #fff;
      padding: 20px 10px;
      box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
      .item-right {
        width: 54px;
        justify-content: flex-end;
        padding-right: 10px;
        align-items: center;
        display: flex;
        .arrow-top-down {
          display: inline-block;
          width: 8px;
          height: 8px;
          background: url("../images/arrow-top-down.png") no-repeat 0 0;
          background-size: 100% 100%;
          transform: rotate(180deg);
          transition: all 0.1s ease-in-out;
          &.actived {
            transform: rotate(360deg);
          }
        }
        .arrow-right {
          display: inline-block;
          width: 8px;
          height: 8px;
          background: url("../images/arrow-right.png") no-repeat 0 0;
          background-size: 100% 100%;
        }
        .score {
          margin-right: 8px;
          font-size: 12px;
          font-weight: bold;
          color: #999;
          .home {
            color: #2AB7CA;
          }
          .away {
            color: #F35463;
          }
          .vs {
            padding-bottom: 3px;
          }
        }
      }
      .title {
        display: flex;
        align-items: center;
        padding-bottom: 4px;
        .date {
          padding: 0 4px;
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
        }
        .match-item-title {
          height: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
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
                  color: #2AB7CA;
                }
                &.away-score {
                  color: #F35463;
                }
              }
            }
            .vs {
              font-size: 13px;
              color: #999;
              padding: 0 16px;
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
            width: 54px;
            font-size: 10px;
            color: #999;
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
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            .set-count {
              width: 54px;
              text-align: center;
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
              .achievements-pic {
                width: 12px;
                height: 12px;
                margin: 0 4px;
              }
              & > span {
                width: 12px;
                height: 12px;
                background: #2AB7CA;
                margin: 0 4px;
                &:first-child {
                  margin-left: 0;
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