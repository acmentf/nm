<!--
  功能：战队详情
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2020年12月21日 13:39:18
-->
<template>
  <div class="team-detail">
    <app-nav>
      <span slot="title">{{teamDetailTopData.team_name}}</span>
      <!-- <Star slot="handler"/> -->
    </app-nav>
    <!-- 战队概述 -->
    <div class="team-summary">
      <van-image :src="teamDetailTopData.team_logo" class="team-icon">
        <template v-slot:error>
          <img src="@/assets/images/team.png" alt />
        </template>
      </van-image>
      <div class="team-summary-list">
        <p>
          <span class="label">世界排名</span>
          <span>{{teamDetailTopData.world_rank}}</span>
        </p>
        <p>
          <span class="label">所在地区</span>
          <span>{{teamDetailTopData.country_name}}</span>
        </p>
      </div>
      <div class="team-summary-list last-child">
        <p>
          <span class="label">地区排名</span>
          <span>{{teamDetailTopData.region_rank}}</span>
        </p>
        <p>
          <span class="label">成立时间</span>
          <span>{{teamDetailTopData.create_time}}</span>
        </p>
      </div>
    </div>
    <!-- 战队详情数据 -->
    <div class="team-detail-content">
      <van-tabs class="main-tabs" background="#fff" line-width="20px" :swipe-threshold="3">
        <van-tab
          v-for="(item, index) in tabsList"
          :title="item.name"
          :name="item.ui_type"
          :key="index"
        >
          <div class="tab-content">
            <team-data v-if="item.ui_type===1" class="data"></team-data>
            <team-match v-if="item.ui_type===2"></team-match>
            <team-means v-if="item.ui_type===3"></team-means>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import AppNav from "@c/AppNav";
import { mapState } from "vuex";
import TeamData from "./components/Data";
import TeamMatch from "./components/Match";
import TeamMeans from "./components/Means";

export default {
  name: "team-detail",
  components: { TeamData, TeamMatch, TeamMeans, AppNav },
  data() {
    return {
      src: ""
    };
  },
  computed: {
    ...mapState({
      tabsList: state => state.teamDetail.tabsList,
      teamDetailTopData: state => state.teamDetail.teamDetailTopData
    })
  },
  watch: {},
  methods: {
    //战队详情-顶部 战队简讯
    _getTeamDetailTop() {
      this.$store.state.teamDetail.game_id = this.$route.query.game_id;
      this.$store.state.teamDetail.team_id = Number(this.$route.query.team_id);
      this.$store.dispatch("teamDetail/_getTeamDetailTop");
    }
  },
  created() {
    this._getTeamDetailTop();
  },
  mounted() {}
};
</script>
<style lang='scss' >
.team-detail {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .team-summary {
    margin: 10px 0;
    height: 84px;
    background: #fff;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
    opacity: 1;
    display: flex;
    align-items: center;
    padding-left: 10px;
    & > .team-icon {
      margin-right: 15px;
      width: 58px;
    }
    .team-summary-list {
      height: 58px;
      display: flex;
      flex-direction: column;
      &.last-child {
        flex: 1;
        padding-left: 24px;
      }
      & > p {
        flex: 1;
        display: flex;
        align-items: center;
        color: #333;
        .label {
          font-size: 12px;
          color: #999;
          margin-right: 5px;
        }
      }
    }
  }
  .team-detail-content {
    flex: 1;
    overflow-y: auto;
    .tab-content {
      & > div {
      
        &.data {
          margin: 0;
        }
      }
    }
    .main-tabs {
      height: 100%;
      display: flex;
      flex-direction: column;
      .van-tabs__wrap {
        height: 44px !important;
        overflow: inherit;
      
      }
      .van-tabs__content {
        flex: 1;
        overflow-y: auto;
      }
      .van-tabs__nav {
        z-index: 11;
      }
      .van-tabs__nav--line{
        padding-bottom:0;
      }
      .van-tabs__line{
        bottom:10px;
      }
    }
  }
}
</style>