<template>
  <div class="lol" ref="lol">
    <!-- {{tabList}} -->
    <van-tabs
      class="content-tabs"
      background="#6521D7"
      swipeable
      line-width="20px"
      :swipe-threshold="6"
      @click="ContentTabs_Click"
    >
      <VanTab
        v-for="(item, index) in tabList"
        :title="item.name"
        :name="item.ui_type"
        :key="index"
        :disabled="item.disabled"
      />
    </van-tabs>
    <!-- 失活的组件将会被缓存！-->
    <keep-alive>
      <component v-bind:is="currentTabComponent"></component>
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Live from "./components/Live";
import Analyse from "./components/Analyse";
import Lineup from "./components/Lineup";
import Player from "../components/Player";
import Chat from "./components/Chat";

export default {
  name: "LOL",
  // 局部注册的组件
  components: { Live, Analyse, Lineup, Player, Chat },
  methods: {
    ContentTabs_Click(name, title) {
      this.currentTabComponent = this.tab_ui_type[name];
    }
  },
  data() {
    return {
      tab2List: [
        { name: "直播", ui_type: "live" },
        // { name: "聊天", ui_type:'chat',disabled:true },
        { name: "阵容", ui_type: "lineup" },
        { name: "选手", ui_type: "player" },
        { name: "分析", ui_type: "analyse" }
      ],
      currentTabComponent: "live",
      tab_ui_type: {
        END6: "live",
        END7: "chat",
        END8: "lineup",
        END9: "player",
        END10: "analyse"
      }
    };
  },

  computed: {
    ...mapState({
      tabList: state => state.common.matchDetailTabsList
    })
  },
  mounted() {}
};
</script>

<style lang="scss" >
/* 菜单选项卡样式 */
.lol {
  height: 100%;
  display: flex;
  flex-direction: column;
  .content-tabs .van-tab--active {
    & > span {
      text-align: center;
      width: 65px;
      padding: 4px 12px;
      background: #fff;
      border-radius: 20px;
      font-weight: bold;
      color: #6521d7;
    }
  }
  .content-tabs .van-tabs__wrap {
    //margin-bottom: 10px;
  }
}
.fixedContent {
  flex: 1;
  overflow-y: auto;
  margin-top:10px;
  & > .van-tabs {
    height: 100%;
    display: flex;
    width: 100%;
    flex-direction: column;
    overflow-y: auto;
    .van-tabs__content {
      flex: 1;
      overflow-y: auto;
    }
  }
}
</style>