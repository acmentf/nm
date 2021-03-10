<template>
  <!-- ios引导界面 -->
  <div class="yd">
    <van-icon name="close" class="close-pic" size="32" @click="$router.go(-1)" />
    <img src="http://ti-img.inkr.xyz/storage/wap/yd.png" alt width="100%" />
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.close-pic {
  position: fixed;
  top: 10px;
  right: 10px;
  color: #000;
}
</style>
