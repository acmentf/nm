<template>
  <div class="match-detail">
    <!-- 直播区域 -->
    <div class="live-session">
      <div class="star-btn">
        <Star
          ico="follow"
          v-model="is_focus"
          :parmars="{game_id,type:'0',id_list:match_id}"
          @change="change"
          type="2"
        />
      </div>
      <TiBanner :game="$route.name" />
    </div>
    <!-- 详情主内容区域 -->
    <div class="main-session" ref="main-session">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import TiBanner from "./components/TiBanner";
import Star from "@c/Star";
import { mapState } from "vuex";
export default {
  name: "Index",
  // 局部注册的组件
  components: { TiBanner, Star },
  data() {
    return {
      is_focus: false,
      game_id: "",
      match_id: ""
    };
  },
  computed: {},
  methods: {
    //获取tabs数据
    _getTabsData() {
      this.$store.dispatch("common/_getTabsList", {
        subtype: this.$route.meta.menuId,
        type: "1",
        tabType: 2
      });
    },
    async isFocusFn() {
      let { result } = await this.$store.dispatch("common/_findIsFocus", {
        id_list: this.$route.query.match_id,
        game_id: this.$route.meta.game_id,
        type: "0"
      });
      this.is_focus = result;
    },
    change(match_id) {
      this.$store.dispatch("matchList/_getMatchList")
    }
  },
  created() {
   
    this.$store.dispatch("matchDetail/resetState");
    this.game_id = this.$route.meta.game_id;
    this.match_id = this.$route.query.match_id;
    this.$store.state.matchDetail.game_id = this.game_id;
    this.$store.state.matchDetail.match_id = 1 * this.match_id;
    this._getTabsData();
    //查询是否关注
    this.isFocusFn();
  },
  mounted() {
    this.$store.state.common.mainHeight = this.$refs[
      "main-session"
    ].clientHeight;
  }
};
</script>

<style lang="scss" scoped>
.match-detail {
  color: #333;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .main-session {
    height: 0;
    flex-grow: 2;
    overflow-y: auto;
    & > div {
      height: 100%;
      display: flex;
      flex-direction: column;
      .fixedContent {
        flex: 1;
        overflow-y: auto;
       
        & > .van-tabs {
          width: 100%;
          margin-top:10px;
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          .van-tabs__content {
            flex: 1;
            overflow-y: auto;
          }
        }
      }
    }
  
  }
  .live-session {
    .star-btn {
      position: fixed;
      right: 26px;
      top: 15px;
      z-index: 1111;
    }
  }
}
</style>
