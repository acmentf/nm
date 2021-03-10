<!--
  功能：顶部导航栏组件
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2020年12月21日 13:45:56
-->
<template>
<div class='nav-component'>
  <i class="back-icon" @click="$router.go(-1)"></i>
  <div class="team-name">
    <slot></slot>
  </div>
  <Star />
</div>
</template>

<script>
import Star from '@/components/Star'
export default {
name:'nav-component',
components: {Star},
data() {
return {

};
},
computed: {},
watch: {},
methods: {

},
created() {

},
mounted() {

},
}
</script>
<style lang='scss' scoped>
.nav-component{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height:24px;
  padding: 0 10px;
  .team-name{
    font-size:17px;
    color:#fff;
  }
  .back-icon{
    width: 18px;
    height:18px;
    background: url("../images/arrow-left.png") no-repeat 0 0;
    background-size:100% 100%;
  }
}
</style>