<template>
  <div class="dota2">
    <!-- {{tabList}} -->
    <Tabs class="content-tabs" :tabsList="tabList">
      <!-- 主内容区域 -->
      <Live slot="END6" />
      <Chat slot="END7" />
      <Lineup slot="END8" />
      <Player slot="END9" />
      <FX slot="END10" />
    </Tabs>
  </div>
</template>

<script>
// import {VTable,VPagination} from 'vue-easytable'
import Tabs from "@c/Tabs";
import { mapState } from "vuex";
import FX from "../components/Fx";
import Player from "../components/Player";
import Live from "./components/Live";
import Lineup from "./components/Lineup";
import Chat from "./components/Chat";

export default {
  components: { Tabs, FX, Player, Live, Lineup, Chat },
  name: "DOTA2",
  methods: {},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tabList: state => state.common.matchDetailTabsList
    })
  }
};
</script>

<style lang="scss" >
.dota2 {
  height: 100%;
  display: flex;
  flex-direction: column;
  .tabs-container {
    height: 100%;
  }
  .tab-list {
    height: 100%;
    display: flex;
    flex-direction: column;
    .van-tabs__content {
      flex: 1;
      overflow-y: auto;
    }
  }
}

.fixedContent {
  height: 100%;
  & > .van-tabs {
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
</style>
