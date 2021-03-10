<!--
 * @Author: FeikeQ
 * @Date: 2021-01-15 18:24:53
 * @LastEditTime: 2021-01-20 18:05:21
 * @LastEditors: FeikeQ
 * @FilePath: /ti-wap/src/views/League/index.vue
 * @Description: 
-->
<template>
  <div class="league-wrapper">
    <!-- 列表容器 -->
    <div v-for="(item,index) in containerList" :key="index">
      <van-tabs
        v-model="tabList.active"
        class="main-tabs"
        :swipe-threshold="5"
        line-width="20px"
        :style="{height:height}"
        @change="change"
        v-if="$store.state.common.game_id === item.game_id"
      >
        <van-tab v-for="(item,index) in tabList.list" :title="item.lable" :key="index">
          <div class="content" style="min-height:82vh">
            <List />
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import List from "./components/List";
import { mapGetters, mapState } from "vuex";
export default {
  components: { List },
  data() {
    return {
      isLoading: false,
      height: 0
    };
  },
  computed: {
    ...mapGetters({
      tabList: "league/get_leagueTabsList"
    }),
    ...mapState({
      game_id: state => state.league.game_id,
      containerList: state => state.league.containerList
    })
  },
  methods: {
    change(index, title) {
      this.$store.state.league.page_status = this.tabList.list[index].id;
    }
  },
  created() {
    this.$nextTick(() => {
      this.height = this.$store.state.common.contentHeight + "px";
      this.$store.dispatch("league/_getLeagueTabsList");
    });
  },
  mounted() {}
};
</script>

<style lang="scss" >
.league-wrapper {
  .van-tabs {
    display: flex;
    flex-direction: column;
    .van-tabs__line {
      background: #6521D7;
    
    }
    .van-tabs__wrap {
      height: 44px !important;
      padding: 0 12px;
      box-sizing: none;
    }
    .van-tab {
      font-size: 13px;
    }
    .van-tab--active {
      & > span {
        color: #6521d7;
        font-size: 13px;
      }
    }

    .van-tabs__content {
      flex: 1;
      overflow-y: auto;
      .content {
        padding: 10px 0px;
        height: 100%;
      }
    }
  }
 
}
</style>