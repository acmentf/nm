<!--
  功能：比赛首页
  作者：tangfeng
  邮箱：acmentf@163.com
  时间：2020年10月31日 16:44:59
-->
<template>
  <div class="home-wrapper">
    <container>
      <div slot="header" v-show="contentType!=='my'">
        <Tabs />
      </div>
      <div slot="section" v-if="$store.state.common.game_id">
        <div class="main-content">
          <MatchList v-show="contentType==='matchList'" />
          <LeagueList v-show="contentType==='leagueList'" />
          <TeamList v-show="contentType==='teamList'" />
          <My v-if="contentType==='my'"/>
        </div>
      </div>
      <div slot="footer">
        <MyTabbar />
      </div>
    </container>
    <DownLoad />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Container from "./compoents/Container";
import MyTabbar from "./compoents/Tabbar";
import Tabs from "./compoents/Tab";
import DownLoad from "@c/DownLoad";
import MatchList from "@/views/MatchList";
import LeagueList from "@/views/League";
import TeamList from "@/views/Team";
import My from "@/views/Me";
export default {
  // 组件名称
  name: "match-index",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {
    Container,
    MyTabbar,
    Tabs,
    DownLoad,
    MatchList,
    LeagueList,
    TeamList,
    My
  },
  // 组件状态值
  data() {
    return {
      active: 0
    };
  },
  // 计算属性
  computed: {
    ...mapState({
      contentType: state => state.common.contentType
    })
  },
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    // _getGroupData() {
    //   getGroupData({
    //     type: "0",
    //     subtype: "main"
    //   }).then(res => {
    //     console.log(res)
    //   });
    // }
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 在实例初始化之后，组件属性计算之前，如data属性等
   */
  beforeCreate() {},
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {
    //this._getGroupData();
  },
  /**
   * 在挂载开始之前被调用：相关的 render 函数首次被调用。
   */
  beforeMount() {},
  mounted() {}
};
</script> 

<style scoped lang='scss'>
.header-content {
  padding-bottom: 10;
}
.fade-enter {
  visibility: hidden;
  opacity: 0;
}
.fade-leave-to {
  display: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-to,
.fade-leave {
  visibility: visible;
  opacity: 1;
  display: none;
}
</style>
