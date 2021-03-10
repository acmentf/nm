<!--
 * @Author: FeikeQ
 * @Date: 2021-01-04 16:52:48
 * @LastEditTime: 2021-01-28 10:27:32
 * @LastEditors: FeikeQ
 * @FilePath: /ti-wap/src/views/League/components/Team.vue
 * @Description: 
-->
<template>
  <div class="league-team">
    <div class="league-team-header">
      <span class="title">参赛战队</span>
      <div class="member-act">
        <van-switch v-model="member" size="14px" active-color="#6521D7" inactive-color="#BBBBBB" />
        <div style="margin-left: 5px;">显示队员</div>
      </div>
    </div>
    <div class="team-list" :class="member?'showmember':''">
      <ul v-if="data">
        <li v-for="(item, index) in data" :key="index" @click="detail(item.id)">
          <div class="logo-member">
            <div class="logo">
              <MyImage v-model="item.logo" :type="1" />
            </div>
            <div class="member">
              <p v-for="(obj, i) in item.member" :key="i">
                <MyImage
                  v-if="game!='CSGO'"
                  class="pos"
                  v-model="obj.position_img"
                  :type="8"
                  :placeholder="true"
                />
                <!-- <img v-if="game!='CSGO'" class="pos" :src="positionImg(obj.place,obj.position_img)" :alt="obj.position_str" :imgurl="obj.position_img" onerror="this.src='/images/null.png';this.onerror=null" /> -->
                <MyImage v-model="obj.country" :type="5" :placeholder="true" />
                <span>{{obj.name}}</span>
              </p>
            </div>
          </div>
          <div class="team-name">
            <p>{{item.name}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Module from "@/components/Module";

/*
var LOLPostionStr = []string{"", "ADC", "中单", "上单", "打野", "辅助"}
var DOTA2PostionStr = []string{"", "一号位", "二号位", "三号位", "四号位", "五号位"}
*/
const station_1 = require("../images/station_1.png");
const station_2 = require("../images/station_2.png");
const station_3 = require("../images/station_3.png");
const station_4 = require("../images/station_4.png");
const station_5 = require("../images/station_5.png");
const station_a = require("../images/station_a.png");
const station_b = require("../images/station_b.png");
const station_c = require("../images/station_c.png");
const station_d = require("../images/station_d.png");
const station_e = require("../images/station_e.png");

export default {
  name: "league-team",
  components: { Module },
  props: {
    data_bak: {
      type: Array,
      default: () => [
        {
          id: "25177",
          logo: "http://ti-img.inkr.xyz/storage/lol_local/team/lt_25107.png",
          name: "Gen电子竞技俱乐部",
          member: [
            {
              name: "NvsZZib DT",
              country:
                "http://ti-img.inkr.xyz/storage/lol_local/country/lc_1.png",
              place: 1
            },
            {
              name: "The Long gogogogogogo",
              country:
                "http://ti-img.inkr.xyz/storage/lol_local/country/lc_1.png",
              place: 2
            },
            {
              name: "CCievIKS",
              country:
                "http://ti-img.inkr.xyz/storage/lol_local/country/lc_1.png",
              place: 3
            },
            {
              name: "VVS99 DT",
              country:
                "http://ti-img.inkr.xyz/storage/lol_local/country/lc_1.png",
              place: 4
            },
            {
              name: "123 ^^^",
              country:
                "http://ti-img.inkr.xyz/storage/lol_local/country/lc_1.png",
              place: 5
            }
          ]
        },
        {
          id: "25022",
          logo: "http://ti-img.inkr.xyz/storage/lol_local/team/lt_25107.png",
          name: "NBA",
          member: [
            {
              name: "NvsZZib DT",
              country:
                "http://ti-img.inkr.xyz/storage/lol_local/country/lc_1.png",
              place: 1
            },
            {
              name: "The Long gogogogogogo",
              country:
                "http://ti-img.inkr.xyz/storage/lol_local/country/lc_1.png",
              place: 2
            },
            {
              name: "CCievIKS",
              country:
                "http://ti-img.inkr.xyz/storage/lol_local/country/lc_1.png",
              place: 3
            },
            {
              name: "VVS99 DT",
              country: "11",
              place: 4
            },
            {
              name: "123 ^^^",
              country:
                "http://ti-img.inkr.xyz/storage/lol_local/country/lc_1.png"
              // place:5,
            }
          ]
        },
        {
          id: "121212",
          logo: "http://ti-img.inkr.xyz/storage/lol_local/team/lt_25107.png",
          name: "DiwsII",
          member: [
            {
              name: "NvsZZib DT",
              country:
                "http://ti-img.inkr.xyz/storage/lol_local/country/lc_1.png",
              place: 1
            },
            {
              name: "The Long gogogogogogo",
              country:
                "http://ti-img.inkr.xyz/storage/lol_local/country/lc_1.png",
              place: 2
            },
            {
              name: "CCievIKS",
              country:
                "http://ti-img.inkr.xyz/storage/lol_local/country/lc_1.png",
              place: 3
            },
            {
              name: "VVS99 DT",
              country:
                "http://ti-img.inkr.xyz/storage/lol_local/country/lc_1.png",
              place: 4
            },
            {
              name: "123 ^^^",
              country:
                "http://ti-img.inkr.xyz/storage/lol_local/country/lc_1.png",
              place: 0
            }
          ]
        },
        {
          id: "121212",
          logo: "http://ti-img.inkr.xyz/storage/lol_local/team/lt_25107.png",
          name: "Gen电子竞技俱乐部",
          member: [
            {
              name: "NvsZZib DT",
              country:
                "http://ti-img.inkr.xyz/storage/lol_local/country/lc_1.png",
              place: 1
            },
            {
              name: "The Long gogogogogogo",
              country:
                "http://ti-img.inkr.xyz/storage/lol_local/country/lc_1.png",
              place: 2
            },
            {
              name: "CCievIKS",
              country:
                "http://ti-img.inkr.xyz/storage/lol_local/country/lc_1.png",
              place: 3
            },
            {
              name: "VVS99 DT",
              country:
                "http://ti-img.inkr.xyz/storage/lol_local/country/lc_1.png",
              place: 4
            },
            {
              name: "123 ^^^",
              country:
                "http://ti-img.inkr.xyz/storage/lol_local/country/lc_1.png",
              place: 5
            }
          ]
        },
        {
          id: "121212",
          logo: "http://ti-img.inkr.xyz/storage/lol_local/team/lt_25107.png",
          name: "Gen电子竞技俱乐部",
          member: [
            {
              name: "NvsZZib DT",
              country:
                "http://ti-img.inkr.xyz/storage/lol_local/country/lc_1.png",
              place: 1
            },
            {
              name: "The Long gogogogogogo",
              country:
                "http://ti-img.inkr.xyz/storage/lol_local/country/lc_1.png",
              place: 2
            },
            {
              name: "CCievIKS",
              country:
                "http://ti-img.inkr.xyz/storage/lol_local/country/lc_1.png",
              place: 3
            },
            {
              name: "VVS99 DT",
              country:
                "http://ti-img.inkr.xyz/storage/lol_local/country/lc_1.png",
              place: 4
            },
            {
              name: "123 ^^^",
              country:
                "http://ti-img.inkr.xyz/storage/lol_local/country/lc_1.png",
              place: 5
            }
          ]
        }
      ]
    },
    game: {
      type: [String],
      default: "DOTA2"
    }
  },
  methods: {
    detail(team_id) {
      this.$router.push({
        path: "/team-detail",
        query: { game_id: this.game, team_id, t: Date.now() }
      });
    },
    positionImg(id, url) {
      if (this.position_img_mode) return url;
      return this.position[this.game][id * 1 - 1];
    }
  },
  data() {
    return {
      member: false, //显示队员
      position_img_mode: true, // 站位图是否从网络获取
      position: {
        CSGO: [],
        LOL: [station_a, station_b, station_c, station_d, station_e],
        DOTA2: [station_1, station_2, station_3, station_4, station_5]
      }
    };
  },
  computed: {
    ...mapState({
      data: state => state.leagueDetail.teams
    })
    // ...mapGetters({
    //   data: "leagueDetail/_getLeagueTeam"
    // }),
  },
  created() {
    this.$store.dispatch("leagueDetail/_getLeagueTeam");
  }
};
</script>


<style lang="less" scoped>
.league-team {
  .league-team-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    color:#AAAAAA;
    .member-act {
      color: #ddd;
      font-size: 10px;
      display: flex;
      align-items: center;
      padding: 10px 0;
    }
  }
  .team-list {
    background: #fff;
    padding:6px;
    padding-top:10px;
    padding-bottom:4px;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 108px;
        background: #EEEEEE;
        margin: 0 6px;
        overflow: hidden;
        margin-bottom:10px;
      
        .logo-member {
          position: relative;
          width: 100%;
          height: 120px;
          & > div {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
          }
          .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: 48px;
              max-height: 48px;
              border-radius: 50%;
            }
          }

          .member {
            display: none;
            background: rgba(0, 0, 0, 0.5);
            box-shadow: 0px 2px 2px rgba(51, 51, 51, 0.2);
            padding: 8px;
            p {
              font-size: 10px;
              line-height: 14px;
              color: #fff;
              display: flex;
              align-items: center;
              width: 100%;
              margin: 0 0 4px 0;
              img {
                width: 12px;
                height: 9px;
                margin-right: 4px;
                &.pos {
                  width: 14px;
                  height: 14px;
                }
              }
              span {
                flex: 1;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
        }
        .team-name {
          height: 27px;
          background: #eee;
          color: #333;
          font-size: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin:4px;
          p {
            width: 100%;
            text-align: center;
            height: 27px;
            line-height: 30px;
            justify-content: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            background: #fff;
          }
        }
      }
    }

    &.showmember {
      ul {
        li {
          .logo-member {
            .member {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>