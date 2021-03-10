<!--
  功能：隐私协议
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2021年01月07日 18:34:12
-->
<template>
  <div class="file">
    <div v-html="$store.state.common.privacyAgreement"></div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {
   
  }
};
</script>
<style lang='scss' scoped>
.file {
  color: #333333;
  padding: 0 15px;
}
</style>