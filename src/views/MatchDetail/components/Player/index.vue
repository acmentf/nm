<template>
  <div class="player fixedContent">
    <van-tabs v-model="active" animated :swipe-threshold="6" line-width="20px" v-if="!isEmpty"  class="main-tabs">
      <van-tab v-for="(item,index) in positionList" :title="item.position_name" :key="index">
        <div class="content">
          <Content :player="item.data" />
        </div>
      </van-tab>
    </van-tabs>
    <div v-else>
      <Empty EmptyType="2">暂无选手数据</Empty>
    </div>
  </div>
</template>

<script>
import Content from "./components/Content";
import { mapGetters, mapState } from "vuex";
import Empty from "@c/Empty";
export default {
  components: { Content, Empty },
  data() {
    return {
      active: 0,
      game_id: 0,
      match_id: ""
    };
  },
  methods: {
    _getMatchDetailPlayerInfo() {
      this.game_id = this.$route.meta.game_id;
      this.match_id = this.$route.query.match_id;
      this.$store.dispatch("matchDetail/_getMatchDetailPlayerInfo", {
        game_id: this.game_id,
        match_id: Number(this.match_id)
      });
    }
  },
  computed: {
    ...mapGetters({
      positionList: "matchDetail/getPlayerList"
    }),
    ...mapState({
      isEmpty: state => state.matchDetail.isEmpty
    })
  },
  created() {
    this._getMatchDetailPlayerInfo();
  },
  mounted() {}
};
</script>

<style lang="scss" >
.player {
  & > .van-tabs {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    .van-tabs__content {
      flex: 1;
      overflow-y: auto;
    }
    .van-tabs__line {
      background: #6521d7;
    }
    .van-tabs__wrap {
      padding: 0 12px;
      box-sizing: none;
      margin-bottom: 10px;
    }
    .van-tab--active {
      & > span {
        background: transparent;
        box-shadow: none;
      }
    }
    .van-tabs__nav {
      background: transparent;
    }
  }
  .content {
   
  }
}
</style>