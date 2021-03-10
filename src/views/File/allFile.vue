<!--
  功能：h5公用界面
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2021年02月25日 10:37:05
-->
<template>
  <div class="all-file">
    <AppNav>{{type==1?'隐私协议':'服务条款'}}</AppNav>
    <div class="popup-content">
      <privacy-agreement v-show="type==1" />
      <service-terms v-show="type==2" />
    </div>
  </div>
</template>

<script>
import AppNav from "@c/AppNav";
import PrivacyAgreement from "./privacyAgreement";
import ServiceTerms from "./serviceTerms";
export default {
  name: "all-file",
  components: { AppNav, PrivacyAgreement, ServiceTerms },
  props: {
    type: {
      type: String,
      default: 1 //隐私协议 2 服务条款
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang='scss' scoped>
</style>