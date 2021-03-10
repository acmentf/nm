<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh" style="min-height:82vh">
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <ul
        class="list"
        v-if="leagueList[game_id+'_'+ page_status] && leagueList[game_id+'_'+ page_status].length"
      >
        <li
          v-for="(item,index) in leagueList[game_id+'_'+ page_status]"
          :key="game_id+index"
          @click="detail(item.tid)"
        >
          <Item :list="item" />
        </li>
      </ul>
      <Empty EmptyType="2" v-else>暂无联赛数据</Empty>
    </van-list>
  </van-pull-refresh>
</template>
<script>
import Item from "./Item";
import { mapState, mapGetters } from "vuex";
import Empty from "@c/Empty";
export default {
  components: { Item, Empty },
  data() {
    return {
      loading: true,
      finished: false,
      refreshing: false
    };
  },
  watch: {
    game_id() {
      if (!this.leagueList[this.game_id + "_" + this.page_status]) {
        this.initialization();
      }
    },
    page_status() {
      if (!this.leagueList[this.game_id + "_" + this.page_status]) {
        this.initialization();
      }
    },
    leagueList: {
      handler(val) {
        console.log("val", val);
      },
      deep: true
    }
  },
  methods: {
    async onLoad() {
      var searchKey = this.game_id + "_" + this.page_status;
      if (this.refreshing) {
        this.$store.state.league.searchForm[searchKey].page = 1;
        this.$store.state.league.searchForm[searchKey].total = 0;
      }
      await this.$store.dispatch("league/_getIFAppUITournamentList", this.refreshing);
      this.loading = false;
       this.refreshing = false;
      if (
        this.leagueList[searchKey].length >= this.searchForm[searchKey].total
      ) {
        this.finished = true;
      }
    },
    initialization() {
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
    detail(tid) {
      this.$router.push({
        path: "/league-detail",
        query: { game_id: this.game_id, tid ,t:Date.now() }
      });
    }
  },
  mounted() {
    this.initialization();
  },
  created() {
    //console.log("2323333333333333");
  },

  computed: {
    ...mapState({
      game_id: state => state.league.game_id,
      page_status: state => state.league.page_status,
      leagueList: state => state.league.leagueList,
      searchForm: state => state.league.searchForm
    }),
    ...mapGetters({
      list: "league/get_leagueList"
    })
  }
};
</script>

<style lang="scss" scoped>
.list {
  & > li {
     box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
  }
}
</style>
