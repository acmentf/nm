<template>
  <div class="app-nav">
    <i class="back-icon" @click="callBack"></i>
    <div class="team-name">
      <slot name="title"></slot>
    </div>
    <span class="handler" @click="sure">
      <slot name="handler"></slot>
    </span>
  </div>
</template>

<script>
import router from "@/router";
export default {
  props: {
    callBack: {
      type: Function,
      default: () => {
        router.go(-1);
      }
    },
    sure: {
      type: Function,
      default: () => {}
    }
  },
  name: "app-nav",
  components: {},
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
.app-nav {
  background: transparent;
  display: flex;
  align-items: center;
  height: 52px;
  padding: 0 15px;
  position: relative;
  justify-content: center;
  .team-name {
    font-size: 16px;
    color: #fff;
  }
  .back-icon {
    width: 18px;
    height: 18px;
    background: url("../../assets/images/arrow-left.png") no-repeat 0 0;
    background-size: 100% 100%;
    position: absolute;
    left: 25px;
  }
  .handler {
    position: absolute;
    right: 15px;
    color: #fff;
  }
}
</style>