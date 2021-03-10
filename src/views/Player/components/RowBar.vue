<!--
  功能：横向柱状图
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2021年01月13日 10:46:33
-->
<template>
  <div class="row-bar">
    <ul class="tow-list" v-if="list.length==2" :class="type?'default':''">
      <li
        v-for="(item,index) in list"
        :key="index"
        :style="{width:renderWidth()}"
        :class="'item'+(index+1)"
      ></li>
    </ul>
    <ul class="three-list" v-if="list.length==3" :class="type?'default':''">
      <li
        v-for="(item,index) in list"
        :key="index"
        :style="{width:renderWidth(index)}"
        :class="'item'+(index+1)"
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [4, 5]
    },
    type: {
      type: String,
      default: "" //默认底色 默认 为非黑色
    }
  },
  name: "row-bar",
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    renderWidth(type) {
      if (this.list.length == 2 || this.list.length == 1) {
        let total = Number(this.list[0]) + Number(this.list[1]);
        return (this.list[0] / total) * 100 + "%";
      } else if (this.list.length == 3) {
        let total = Number(this.list[0]) + Number(this.list[1]) + Number(this.list[2]);
        if (type == 0) {
          return (Number(this.list[0]) / total) * 100 + "%";
        }
        if (type == 1) {
          return (Number(this.list[1]) / total) * 100 + "%";
        }
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang='scss' scoped>
.row-bar {
  & > ul {
    width: 100%;
    height: 6px;
    background:#F556A6;
    border-radius: 3px;
    display: flex;
    &.tow-list {
      &.default {
        background: #EEEEEE;
      }
      .item1 {
        height: 100%;
        border-radius: 3px;
        background: #4D8AF5;
      }
      .item2 {
        height: 100%;
        border-radius: 3px;
        flex: 1;
      }
    }
    &.three-list {
      height: 6px;
      border-radius: 3px;
      overflow: hidden;
      background: #F59F66;
      &.default {
        background: #091331;
      }
      .item1 {
        height: 100%;
        background: #4D8AF5;
      }
      .item2 {
        height: 100%;
        background:#F556A6;
      }
      .item3 {
        height: 100%;
        flex: 1;
      }
    }
  }
}
</style>