<!--
  功能：
  作者：tangfeng
  邮箱：acmentf@163.com
  时间：2020年11月02日 15:46:49
-->
<template>
  <div class="tabs-wrapper">
    <!-- <van-tabs background="#6521D7" line-height="0" class="tab-list" @change="tab_change">
      <van-tab v-for="(item,index) in tabsList" :title="item.name" :key="index"></van-tab>
    </van-tabs>-->
    <ul class="tab-list">
      <li v-for="(item,index) in tabsList" :key="index" @click="tab_change(index,item.name)">
        <div class="item" :class="index===actived?'actived':''">{{item.name}}</div>
      </li>
    </ul>
    <img
      src="../icon/filter.svg"
      alt
      class="filter-icon"
      @click="filterFn"
      v-show="$store.state.common.contentType=='matchList'"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  // 组件名称
  name: "demo",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      routerName: "",
      game_id: "LOL",
      actived: 0
    };
  },
  watch: {
    $route(path) {
      this.routerName = path.name;
    }
  },
  // 计算属性
  computed: {
    ...mapState({
      tabsList: state => state.common.matchTabsList
    })
  },
  // 侦听器

  // 组件方法
  methods: {
    tab_change(index, title) {
      if (this.actived !== index) {
        this.actived = index;
        this.$store.state.common.game_id = title;
        this.$store.state.matchList.game_id = title;
        this.$store.state.league.game_id = title;
        this.$store.state.team.game_id = title;
        this.$store.dispatch("matchList/_getMatchList");
      }
    },
    //筛选
    filterFn() {
      this.$store.state.matchList.filterSwitch = true;
      this.$store.dispatch("matchList/_leagueList");
    }
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
    //获取主界面 游戏类别（LOL CSGO DATA2）
    this.$store.dispatch("common/_getMatchTypeTabsList");
    this.routerName = this.$route.name;
  },
  /**
   * 在挂载开始之前被调用：相关的 render 函数首次被调用。
   */
  beforeMount() {},
  mounted() {}
};
</script> 

<style  lang='scss'>
.tabs-wrapper {
  background: #6521d7;
  display: flex;
  padding: 0 14px 0 60px;
  align-items: center;
  height: 42px;
  .filter-icon {
    width: 22px;
    height: 22px;
  }

  .tab-list {
    flex: 1;
    display: flex;
    & > li {
      flex: 1;
    }
    .item {
      width: 65px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      color: #fff;
      font-size: 16px;
      &.actived {
        border-radius: 12px;
        background: #fff;
        color: #6521d7;
      }
    }
  }
  // .van-tab {
  //   & > span {
  //     display: flex;
  //     width: 65px;
  //     height: 24px;
  //     justify-content: center;
  //     align-items: center;
  //     font-size: 16px;
  //     color: #fff;
  //     font-weight: bold;
  //   }
  // }
  // .van-tab--active {
  //   & > span {
  //     display: flex;
  //     width: 65px;
  //     height: 24px;
  //     justify-content: center;
  //     align-items: center;
  //     background: #fff;
  //     border-radius: 20px;
  //     color: #6521d7;
  //   }
  // }
}
</style>
