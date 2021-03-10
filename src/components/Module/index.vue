<!--
 * @Author: TangFeng
 * @Date: 2020-11-09 18:30:26
 * @LastEditTime: 2021-01-04 17:25:50
 * @LastEditors: FeikeQ
 * @FilePath: /ti-wap/src/components/Module/index.vue
 * @Description: 
-->
<template>
  <!-- 模块 Title -->
  <div class="moudle">
    <p class="moudle-title" v-if="title">
      <span class="line-column"></span>
      <span class="title">{{title}}</span>
    </p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Module",
  props: ["title"],
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.moudle {
  position: relative;
  .moudle-title {
    display: flex;
    padding: 10px 0 8px 0;
    align-items: center;
    width: 100%;
    & > .line-column {
      width: 2px;
      height: 14px;
      background: #6521D7;
      box-shadow: 0px 1px 3px rgba(20, 101, 255, 0.9);
      opacity: 1;
      border-radius: 4px;
    }
    & > .title {
      padding-left: 12px;
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 18px;
      color: #ffffff;
      opacity: 1;
    }
  }
}
</style>
