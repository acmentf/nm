<!--
 * @Author: FeikeQ
 * @Date: 2021-01-04 15:01:18
 * @LastEditTime: 2021-02-01 15:16:49
 * @LastEditors: FeikeQ
 * @FilePath: /ti-wap/src/views/League/detail.vue
 * @Description: 
-->

<template>
  <div class="league-detail">
    <app-nav>
      <span slot="title">联赛详情</span>
    </app-nav>
    <!-- 联赛概述 -->
    <div class="league-summary">
      <my-image v-model="summary.logo" class="league-icon" :type="6"></my-image>
      <div class="league-summary-list">
        <div class="league-summary-content">
          <h3>{{summary.name}}</h3>
          <p>{{summary.time}}</p>
          <div class="info">
            <p class="red">
              <img src="./images/cup.png" />
              <span>{{summary.bonus || '0'}}</span>
            </p>
            <p class="blue">
              <img src="./images/loca.png" />
              <span>{{summary.location ||'_'}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 联赛详情数据 -->
    <div class="league-detail-content">
      <van-tabs class="main-tabs" background="#fff" line-width="20px" :swipe-threshold="4">
        <van-tab
          v-for="(item, index) in tabsList"
          :title="item.name"
          :name="item.ui_type"
          :key="index"
        >
          <div
            class="tab-content"
            :ui_type="item.ui_type"
            :alt_league_id="league_id + '|' + game_id"
          >
            <league-promoted v-if="item.ui_type=='END36'" :game="game_id" :id="league_id"></league-promoted>
            <league-match v-if="item.ui_type=='END37'" :game="game_id"></league-match>
            <league-team v-if="item.ui_type=='END38'" :game="game_id"></league-team>
            <league-data v-if="item.ui_type=='END39'" :game="game_id" :id="league_id"></league-data>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import NavComponent from "./components/Nav";
import LeaguePromoted from "./components/Promoted";
import LeagueMatch from "./components/Match";
import LeagueTeam from "./components/Team";
import LeagueData from "./components/Data";
import AppNav from "@c/AppNav";
export default {
  name: "league-detail",
  components: {
    NavComponent,
    LeaguePromoted,
    LeagueMatch,
    LeagueTeam,
    LeagueData,
    AppNav
  },
  data() {
    return {
      is_focus: false
    };
  },
  computed: {
    ...mapState({
      game_id: state => state.leagueDetail.game_id,
      league_id: state => state.leagueDetail.league_id
    }),

    ...mapState({
      summary: state => state.leagueDetail.summary,
      tabsList: state => state.leagueDetail.tabsList
    })
    // ...mapGetters({
    //   summary: "leagueDetail/_getLeagueSummary"
    // }),
  },
  watch: {},
  methods: {},
  created() {
    this.$store.state.leagueDetail.league_id = this.$route.query.tid * 1;
    this.$store.state.leagueDetail.game_id = this.$route.query.game_id;
    this.$store.dispatch("leagueDetail/_getLeagueSummary");
    this.$store.dispatch("leagueDetail/_getModelGroupData"); //获取联赛详细模块的tab分类分栏数据
  },
  mounted() {}
};
</script>
<style lang='scss' >
.league-detail {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .league-summary {
    height: 86px;
    background: #fff;
    display: flex;
    align-items: center;
    padding-left: 25px;
    margin: 10px 0;
    & > .league-icon {
      // border-radius: 10px;
      margin-right: 10px;
      object-fit: contain;
      width: 66px;
      height: 66px;
    }
    .league-summary-list {
      display: flex;
      flex: 1;
      color: #333;
      position: relative;
      align-items: center;
      .league-summary-content {
        flex: 1;
        h3 {
          font-size: 13px;
          line-height: 18px;
        }
        & > p {
          font-size: 11px;
          font-weight: 400;
          line-height: 16px;
          color: #999;
        }
        .info {
          flex: 1;
          display: flex;
          align-items: center;
          color: #fff;
          width: 100%;
          p {
            font-size: 10px;
            line-height: 14px;
            color: #fbb13c;
            display: flex;
            align-items: center;
            &.blue {
              color: #666;
              margin-left: 20px;
            }
            img {
              width: 12px;
              margin-right: 2px;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
  .league-detail-content {
    // margin-top: 10px;
    flex: 1;
    overflow: hidden;
    .tab-content {
      // margin-top: 16px;
      height: 100%;
      overflow-y: auto;
    }
    .main-tabs {
      height: 100%;
      display: flex;
      flex-direction: column;
      .van-tabs__wrap {
        height: 44px !important;
        overflow: inherit;
      }
      .van-tabs__nav--line{
        line-height: 12px;
        padding-bottom:0;
      }
      .van-tabs__line{
        bottom:0.2rem;
      }
      .van-tabs__content {
        flex: 1;
        overflow-y: auto;
      }
      .van-tabs__nav {
        z-index: 11;
      }
    }
  }
}
</style>