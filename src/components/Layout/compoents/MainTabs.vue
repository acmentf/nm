<!--
  功能：
  作者：tangfeng
  邮箱：acmentf@163.com
  时间：2020年11月02日 17:21:15
-->
<template>
  <div class="main-tabs">
    <van-tabs v-model="active" swipeable line-width="20px" :swipe-threshold="6">
      <van-tab
        v-for="(item, index) in tabList"
        :title="item.lable"
        :key="index"
      >
        <div class="match-list"></div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  // 组件名称
  name: "mainTabs",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      active: 0,
    
    };
  },
  // 计算属性
  computed: {
    ...mapState({
      tabList: state=> state.matchList.matchStateList
    })
  },
  // 侦听器
  watch: {},
  // 组件方法
  methods: {},
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
  mounted() {},
};
</script>

<style lang="scss">
.main-tabs {
  padding-top: 10px;
  .van-tabs__line {
    background: #6521D7;
  }
  .van-tabs__wrap {
    height: 24px;
  }
  .van-tab {
    font-size: 13px;
    
  }
  .van-tab--active {
    & > span {
      font-weight: bold;
      color: #6521D7;
      font-size: 13px;
    }
  }
  .match-list {
    padding: 15px;
  }
}
</style>
