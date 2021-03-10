<template>
  <div class="dota2">
    <Tabs :tabsList="tabList">
      <!-- 主内容区域 -->
      <Data slot="END6" />
      <div slot="END7">聊天</div>
      <Map slot="END11" />
      <Player slot="END9" />
      <FX slot="END10" />
    </Tabs>
  </div>
</template>

<script>
import Tabs from "@c/Tabs";
import { mapState } from "vuex";
import FX from "./components/Fx.vue";
import Map from "./components/Map";
import Player from "./components/Player";
import Data from "./components/Data";
export default {
  components: { Tabs, FX, Map, Player,Data },
  name: "DOTA2",
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapState({
      tabList: state => state.common.matchDetailTabsList
    })
  },
  created(){
     //this.$store.dispatch("matchDetail/_matchDetailTop")
  }
};
</script>

<style lang="scss" scoped>
</style>
