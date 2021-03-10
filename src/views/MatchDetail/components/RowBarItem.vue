<!--
  横向柱状图组件
-->
<template>
  <div class="row-bar">
    <div class="title">
      <span class="title-left">{{content.title_left}}</span>
      <span class="title-right">{{content.title_right}}</span>
    </div>
    <div class="row-content">
      <p :style="{background:bgColor,width:content.value+'%'}"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: () => ({
        value: 0,
        title_left: "0/0",
        title_right: "80%"
      })
    },
    // 每行下边距
    marginBottom: {
      type: String | Number,
      default: 6
    },
    // 行高
    height: {
      type: Number,
      default: 16
    },
    // 背景色
    bgColor: {
      type: String,
      default: "#2AB7CA"
    },
    //组件通用单位
    unit: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    // getPercentage(number, total) {
    //   var _val = (number / total) * 100;
    //   if (_val) return _val + "%";
    //   return "null";
    // },
    // getUval(str, dw) {
    //   var _str = str;
    //   if (_str) {
    //     _str += dw || this.unit;
    //     return _str;
    //   }
    //   return "0";
    // }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.row-bar {
  width: 100%;
  height: 16px;
  .title{
    display: flex;
    justify-content: space-between;
    margin-bottom:2px;
    color:#999;
    font-size:11px;
    &>.title-right{
      color:#333;
    }
  }
  .row-content {
    width: 100%;
    background: #EEEEEE;
    display: flex;
    justify-content:flex-end;
    &>p{
      height:16px;

    }
  }
}
</style>
