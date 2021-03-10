<template>
  <div class="wrapper">
    <div class="title">
      <span>排名</span>
      <div>
        <span>战队</span>
      </div>
      <span>国家/地区</span>
      <span>积分</span>
    </div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" @load="onLoad">
        <ul
          class="list"
          v-if="teamList[game_id+'_'+ page_status] && teamList[game_id+'_'+ page_status].length"
        >
          <li
            v-for="(item,index) in teamList[game_id+'_'+ page_status]"
            :key="game_id+index"
            @click="detail(item.team_id)"
          >
            <Item :list="item" :index="index+1" />
          </li>
        </ul>
        <Empty EmptyType="2" v-else>暂无战队数据</Empty>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import Item from "./Item";
import Empty from "@c/Empty";
import { mapState, mapGetters } from "vuex";
export default {
  components: { Item, Empty },
  data() {
    return {
      loading: true,
      finished: false,
      refreshing: false
    };
  },
  methods: {
    async onLoad() {
      var searchKey = this.game_id + "_" + this.page_status;
      if (this.refreshing) {
        this.$store.state.team.searchForm[searchKey].page = 1;
        this.$store.state.team.searchForm[searchKey].total = 0;
      }
      await this.$store.dispatch(
        "team/_getIFAppUIBattleTeamList",
        this.refreshing
      );
      this.refreshing = false;
      this.loading = false;
      if (this.teamList[searchKey].length >= this.searchForm[searchKey].total) {
        this.finished = true;
      }
    },
    initialization() {
      var searchKey = this.game_id + "_" + this.page_status;
      this.loading = true; //下拉加载中
      this.finished = false; //下拉结束
      if (this.loading) {
        this.onLoad();
      }
    },
    onRefresh() {
      setTimeout(() => {
        // 清空列表数据
        this.finished = false;
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        this.onLoad();
      }, 500);
    },
    detail(team_id) {
      this.$router.push({
        path: "/team-detail",
        query: { game_id: this.game_id, team_id, t: new Date().getTime() }
      });
    }
  },
  mounted() {
    this.initialization();
  },
  created() {
    //
  },

  computed: {
    ...mapState({
      game_id: state => state.team.game_id,
      page_status: state => state.team.page_status,
      teamList: state => state.team.teamList,
      searchForm: state => state.team.searchForm
    }),
    ...mapGetters({
      list: "team/get_teamList"
    })
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
}
.title {
  padding: 5px 0 13px 0;
  display: flex;
  justify-content: flex-start;
  & > div {
    flex: 1;
    color: #aaa;
    padding-left: 40px;
  }
  & > span {
    color: #aaa;
    padding: 0 10px;
  }
}
.list {
  min-height: 82vh;
  & > li {
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
  }
}
</style>
