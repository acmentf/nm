<template>
  <div class="app-title" :style="{marginTop: titleH + 'px'}" :class="isBorderBottom? 'border-bottom':''">
    <span class="title">{{title}}</span>
    <i class="iconfont icon-back-page" @click="back" v-if="isBack"></i>
    <div class="handler-name" :style="{color:handlerColor}" @click="handlerCallBack">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { goBackNative } from "@/utils/utils";
export default {
  props: {
    title: {
      type: String,
      default: "标题",
    },
    isBackReact: {
      type: Boolean,
      default: false,
    },
    titleH: {
      type: Number,
      default: 0,
    },
    isBack: {
      type: Boolean,
      default: true,
    },
    clickCallback: {
      type: Function,
      default: () => {},
    },
    handlerColor: {
      type: String,
      default: "#244B84",
    },
    handlerCallBack: {
      type: Function,
      default: () => {},
    },
    isBorderBottom: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    back() {
      if (this.isBackReact) {
        goBackNative();
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.app-title {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  //background: #fff;
  position: relative;
  color: #333;
  &.border-bottom {
    border-bottom: 1px solid #e5e5e5;
  }
  & > .title {
    font-size: 18px;
  }
  .icon-back-page {
    position: absolute;
    left: 10px;
    top: 50%;
    font-size: 24px !important;
    color: #333;
    transform: translate(0, -50%);
  }
  .handler-name {
    position: absolute;
    right: 17px;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 15px;
  }
}
</style>