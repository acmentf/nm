<!--
  功能：主体内容组件
  作者：tangfeng
  邮箱：acmentf@163.com
  时间：2020年11月02日 15:55:01
-->
<template>
  <div class="container">
    <div class="header-box">
       <slot name="header"> </slot>
    </div>
    <div class="section-box" ref="content-box">
      <slot name="section"></slot>
    </div>
    <div class="zw"></div>
    <div class="footer-container">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import MainTabs from "@c/MainTabs";
export default {
  // 组件名称
  name: "container",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {MainTabs},
  // 组件状态值
  data() {
    return {};
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
  created() {},
  /**
   * 在挂载开始之前被调用：相关的 render 函数首次被调用。
   */
  beforeMount() {},
  mounted() {
   //获取主内容高度
   const height =  this.$refs['content-box'].clientHeight;
   this.$store.state.common.contentHeight = height;
  },
};
</script> 

<style scoped lang='scss'>
.container {
  overflow-y: hidden;
  height:100vh;
  display: flex;
  flex-direction: column;
  .section-box{
    flex:1;
  }
  .zw{
    height:59px;
  }
  .footer-container{
   position: fixed;
   width:100%;
   z-index: 1111;
   bottom:0;
   left:0;
  }
}
</style>
