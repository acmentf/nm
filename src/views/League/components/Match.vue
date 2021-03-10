<!--
 * @Author: FeikeQ
 * @Date: 2021-01-04 16:52:21
 * @LastEditTime: 2021-01-25 18:12:32
 * @LastEditors: FeikeQ
 * @FilePath: /ti-wap/src/views/League/components/Match.vue
 * @Description: 
-->
<template>
  <div class="league-match">
    <div v-if="data && data.length">
      <div class="match-group" v-for="(item, index) in data" :key="index">
        <div class="title">
          <span>{{ item.date }}</span>
          <i>{{ item.info }}</i>
        </div>
        <div class="list">
          <ul v-if="item.list">
            <li v-for="(obj, i) in item.list" :key="i" @click="detail(obj.game_id, obj.match_id)">
              <p class="info">
                <span>{{ $format(obj.time, "hh:mm") }}</span>
                <i>{{ obj.rule }}</i>
              </p>
              <div class="match-row">
                <div class="auto tr">
                  <div class="icon tr">
                    <img v-if="obj.home_result" src="@/assets/images/win_red.png" />
                  </div>
                  <div class="name tr">{{ obj.home }}</div>
                </div>
                <div class="logo">
                  <MyImage v-model="obj.home_logo" :type="1" />
                </div>
                <div class="score">{{ obj.home_score }}</div>
                <div class="mid">-</div>
                <div class="score red">{{ obj.away_score }}</div>
                <div class="logo">
                  <MyImage v-model="obj.away_logo" :type="1" />
                </div>
                <div class="auto tl">
                  <div class="name tl">{{ obj.away }}</div>
                  <div class="icon tl">
                    <img v-if="obj.away_result" src="@/assets/images/win_blue.png" />
                  </div>
                </div>
                <div class="star" :alt="obj.match_id">
                  <Star
                    v-model="obj.is_focus"
                    :parmars="{
                        game_id: obj.game_id,
                        type: '0',
                        id_list: obj.match_id,
                    }"
                  />
                </div>
              </div>
              <div style="height:10px;"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Empty v-else EmptyType="1">暂无比赛相关数据</Empty>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Module from "@/components/Module";
import Star from "@/components/Star";
import Empty from "@c/Empty";
export default {
  name: "league-match",
  components: { Module, Star, Empty },
  props: {
    data_bak: {
      type: Array,
      default: () => [
        {
          date: "07-19 星期四",
          info: "淘汰赛",
          list: [
            {
              game_id: "LOL",
              match_id: "11121212",
              is_focus: true,
              time: "14:30",
              rule: "BO5",
              home: "Royal Never Give up",
              home_logo:
                "http://ti-img.inkr.xyz/storage/lol_local/team/lt_25107.png",
              home_score: 18,
              home_result: 1,
              away: "AF电俱乐部",
              away_logo:
                "http://ti-img.inkr.xyz/storage/lol_local/team/lt_25566.png",
              away_score: 4,
              away_result: 1
            },
            {
              game_id: "LOL",
              match_id: "11121213",
              is_focus: false,
              time: "17:00",
              rule: "BO3",
              home: "Royal p",
              home_logo:
                "http://ti-img.inkr.xyz/storage/lol_local/team/lt_25107.png",
              home_score: 18,
              home_result: 0,
              away: "Royal Never Give up",
              away_logo:
                "http://ti-img.inkr.xyz/storage/lol_local/team/lt_25566.png",
              away_score: 4,
              away_result: 1
            },
            {
              game_id: "LOL",
              match_id: "11121214",
              time: "14:30",
              is_focus: true,
              rule: "BO5",
              home: "Give up",
              home_logo:
                "http://ti-img.inkr.xyz/storage/lol_local/team/lt_25107.png",
              home_score: 18,
              home_result: 1,
              away: "AF电子竞技俱乐部",
              away_logo:
                "http://ti-img.inkr.xyz/storage/lol_local/team/lt_25566.png",
              away_score: 4,
              away_result: 0
            }
          ]
        },
        {
          date: "07-16 星期三",
          info: "积分赛",
          list: [
            {
              game_id: "LOL",
              match_id: "11121215",
              is_focus: false,
              time: "14:30",
              rule: "BO5",
              home: "Royal Never Give up",
              home_logo:
                "http://ti-img.inkr.xyz/storage/lol_local/team/lt_25107.png",
              home_score: 18,
              home_result: 0,
              away: "AF",
              away_logo:
                "http://ti-img.inkr.xyz/storage/lol_local/team/lt_25566.png",
              away_score: 4,
              away_result: 1
            },
            {
              game_id: "LOL",
              match_id: "11121216",
              is_focus: true,
              time: "14:30",
              rule: "BO5",
              home: "Royal Never Give up",
              home_logo:
                "http://ti-img.inkr.xyz/storage/lol_local/team/lt_25107.png",
              home_score: 18,
              home_result: 1,
              away: "AF电子竞技俱乐部",
              away_logo:
                "http://ti-img.inkr.xyz/storage/lol_local/team/lt_25566.png",
              away_score: 4,
              away_result: 0
            },
            {
              game_id: "LOL",
              match_id: "11121217",
              is_focus: false,
              time: "14:30",
              rule: "BO5",
              home: "Royal Never ",
              home_logo:
                "http://ti-img.inkr.xyz/storage/lol_local/team/lt_25107.png",
              home_score: 18,
              home_result: 1,
              away: "AF电子竞技俱乐部华中东",
              away_logo:
                "http://ti-img.inkr.xyz/storage/lol_local/team/lt_25566.png",
              away_score: 4,
              away_result: 1
            }
          ]
        }
      ]
    }
  },
  methods: {
    detail(game_id, match_id) {
      this.$router.push({
        path: "/match-detail/" + game_id,
        query: { match_id }
      });
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      data: state => state.leagueDetail.matchList
    })
  },
  created() {
    this.$store.dispatch("leagueDetail/_getLeagueMatchList");
  }
};
</script>
<style lang="less" scoped>
.league-match {
  overflow-y: auto;
  background: #fff;

  .match-group {
    .title {
      font-size: 10px;
      line-height: 14px;
      color: #aaaaaa;
      background: #eeeeee;
      height: 36px;
      display: flex;
      align-items: center;
      padding: 0 15px;
      justify-content: space-between;
      i {
        font-style: normal;
        color: #8a8a8a;
        float: right;
      }
    }
    .list {
      font-size: 12px;
      line-height: 16px;
      color: #666;
      li {
        background: #fff;
        box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
        padding: 5px 8px;
        .info {
          font-size: 10px;
          line-height: 14px;
          i {
            font-style: normal;
            float: right;
          }
        }
        .match-row {
          margin: 10px 0;
          display: flex;
          align-items: center;
          text-align: center;
          .mid {
            width: 9px;
            color: #8a8a8a;
          }
          .score {
            color: #2AB7CA;
            width: 20px;
            overflow: hidden;
            &.red {
              color: #F35463;
            }
          }

          .auto {
            width: 106px;
            display: flex;
            align-items: center;
            .name {
              max-width: 92px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              padding: 0 4px;
            }
            .icon {
              flex: 1;
              overflow: hidden;
              min-width: 14px;
              img {
                width: 14px;
                height: 14px;
                margin-top: -2px;
              }
            }
          }

          .logo {
            width: 20px;
            img {
              width: 20px;
              height: 20px;
              object-fit: cover;
            }
          }

          .star {
            flex: 1;
            text-align: right;
            height: 14px;
          }
        }
      }
    }
  }

  .tl {
    text-align: left !important;
  }
  .tr {
    text-align: right !important;
  }
}
</style>
