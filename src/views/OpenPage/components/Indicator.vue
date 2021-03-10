<!--
  功能：自定义指示器
  作者：tangfeng
  邮箱：acmentf@163.com
  时间：2020年10月31日 17:30:09
-->
<template>
  <div class="my-indicator">
    <ul>
      
      <!-- <li class="actived"></li> -->
      <li v-for="(item,index) in count" :key="index" :class="index==currentIndex?'actived':''"></li>
    </ul>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "my_indicator",
  // 组件参数 接收来自父组件的数据
  props: ["count", "currentIndex"],
  // 局部注册的组件
  components: {},
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
  mounted() {},
};
</script> 

<style scoped lang='scss'>
.my-indicator {
  & > ul {
    display: flex;
    justify-content: center;
    & > li {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #fff;
      opacity: 0.5;
      margin: 0 10px;
      &.actived {
        opacity: 1;
      }
    }
  }
}
</style>
