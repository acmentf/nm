<template>
  <div class="league-wrapper">
    <div v-for="(item,index) in containerList" :key="index">
      <van-tabs
        v-model="tabList.active"
        :swipe-threshold="6"
        class="main-tabs"
        line-width="20px"
        :style="{height:height}"
        @change="change"
        v-if="$store.state.common.game_id === item.game_id"
      >
        <van-tab
          v-for="(item,index) in tabList.list"
          :title="item.lable"
          :key="game_id+page_status+index"
        >
          <div class="content" style="height:82vh">
            <List />
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import ListItem from "./components/Item";
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
      tabList: "team/get_teamTabsList"
    }),
    ...mapState({
      game_id: state => state.team.game_id,
      page_status: state => state.team.page_status,
      teamTabsList: state => state.team.teamTabsList,
      containerList: state => state.team.containerList
    })
  },
  methods: {
    change(index, title) {
      this.$store.state.team.page_status = this.tabList.list[index].id;
    }
  },
  created() {
    this.$nextTick(() => {
      this.height = this.$store.state.common.contentHeight + "px";
      this.$store.dispatch("team/_getTeamTabsList");
    });
  }
};
</script>
<style lang="scss" scoped>
.league-wrapper {
  .van-tabs {
    display: flex;
    flex-direction: column;
    .van-tabs__line {
      background: #6521D7;
      box-shadow: 0px 2px 12px rgba(20, 101, 255, 0.9);
    }
    .van-tabs__wrap {
      padding: 0 12px;
      box-sizing: none;
    }
    .van-tab {
      font-size: 14px;
    }
    .van-tab--active {
      & > span {
        font-weight: bold;
        color: #6521D7;
        font-size: 14px;
      }
    }

    .van-tabs__content {
      flex: 1;
      overflow-y: auto;
    }
  }
 
}
</style>