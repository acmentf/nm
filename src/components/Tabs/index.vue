<!--
  功能：
  作者：tangfeng
  邮箱：acmentf@163.com
  时间：2020年11月02日 15:46:49
-->
<template>
  <div class="tabs-container">
    <van-tabs background="#6521D7" line-height="0" class="tab-list" :swipe-threshold="6" :style="{height: $store.state.common.mainHeight+'px'}">
      <van-tab v-for="item in tabsList" :title="item.name" :key="item.id">
        <div class="content">
          <slot :name="item.ui_type"></slot>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "Tabs",
  // 组件参数 接收来自父组件的数据
  props: {
    tabsList: {
      type: Array,
      default: () => []
    }
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
     
    };
  },
  // 计算属性
  computed: {},
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
  created() {
   
  },
  /**
   * 在挂载开始之前被调用：相关的 render 函数首次被调用。
   */
  beforeMount() {},
  mounted() {
    setTimeout(()=>{
      console.log(this.$store.state.common.mainHeight)
    },0)
  }
};
</script> 

<style  lang='scss'>
.tabs-container {
  & > .tab-list {
    display: flex;
    flex-direction: column;
    & > .van-tabs__wrap {
      margin-bottom:0;
      .van-tab--active {
        & > span {
          padding: 4px 16px;
          background: #fff;
          border-radius: 20px;
          font-weight: bold;
          color:#6521D7;
        }
      }
    }
    & > .van-tabs__content{
      flex:1;
      overflow-y: auto;
      &>div{
        height:100%;
      }
    }
    .van-tabs__nav--line{
      padding-bottom: 0;
    }
    .van-tabs__line{
      bottom:8px;
    }
  }
  .content {
    height:100%;
  }
}
</style>
