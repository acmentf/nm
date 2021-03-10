<!--
  功能：
  作者：tangfeng
  邮箱：acmentf@163.com
  时间：2020年11月02日 17:21:15
-->
<template>
  <div class="main-tabs">
    <van-tabs
      class="content-tabs"
      v-model="active"
      :swipe-threshold="6"
      @change="tabChange"
      :style="{ height: height }"
    >
      <van-tab v-for="(item, index) in dataList" :title="item.lable" :key="index">
        <div class="content" :style="{ height: '100%' }">
          <slot :name="'list' + index"></slot>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  // 组件名称
  name: "mainTabs",
  // 组件参数 接收来自父组件的数据
  props: ["dataList"],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      active: 0,
      height: 0,
      contentHeight: 0,
      timer: null
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    tabChange(index) {
      if (index == 2) {
        this.$store.state.matchList.actived = 0;
      }
      if (index == 3) {
        this.$store.state.matchList.actived = 6;
      }
      this.$store.state.matchList.game_status = this.dataList[index].id;
      if (index == 4) {
        this.$store.state.matchList.isFocus = true;
        this.$store.dispatch("matchList/_getMatchList");
      } else {
        this.$store.state.matchList.isFocus = false;
        this.$store.dispatch("matchList/_getMatchList");
      }
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
  created() {},
  /**
   * 在挂载开始之前被调用：相关的 render 函数首次被调用。
   */
  beforeMount() {},
  mounted() {
    this.$nextTick(() => {
      this.height = this.$store.state.common.contentHeight + "px";
    });
  },
  destroyed() {}
};
</script>

<style lang="scss">
.main-tabs {
  .van-tabs__line {
    background: #6521d7;
  }
  .van-tabs__wrap {
    height: 44px !important;
    box-sizing: none;
    background: #fff;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.05);
    z-index: 11;
  }
  .van-tabs__nav--line {
    padding-bottom: 8px;
  }
  .van-tab {
    font-size: 13px;
    color: #999;
  }
  .van-tab--active {
    & > span {
      font-weight: bold;
      color: #6521d7;
      font-size: 13px;
    }
  }
  .match-list {
    padding: 15px;
    & > li {
      padding-bottom: 10px;
    }
  }
  .content {
    padding: 0;
   
    overflow-y:auto
  }
  .zw {
    height: 80px;
  }
  .content-tabs {
    display: flex;
    flex-direction: column;
    & > .van-tabs__content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
  .van-tab__pane {
    height: 100%;
    width: 375px;
  }
}
</style>
