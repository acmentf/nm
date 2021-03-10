<!--
  功能：功能描述
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2021年02月25日 16:26:26
-->
<template>
<p class='module-title'>
  <slot></slot>
</p>
</template>

<script>

export default {
name:'module-title',
components: {},
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
.module-title{
  height:36px;
  padding-left:15px;
  display: flex;
  align-items: center;
  font-size: 11px;
  color:#AAAAAA;
}
</style>