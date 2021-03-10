<template>
<div class="collapse" :class="show?' show':''" >
    <div class="down" @click="collapse">
        <img src="../../images/down.png" />
    </div>
    <div class="downbox">
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
  name: "TiCollapseDOTA",
  author: "FeikeQ", // 作者
  version: "1.308.20201110", // 版本号
  // 组件参数 接收来自父组件的数据
  props: {},
  data() {
    return {
      key: ["i"],
      show:false
    };
  },
  created() {},
  methods: {
    collapse() {
        this.show = !this.show;
    },
  },
}
</script>

<style lang="scss" scoped> 
.collapse{
    width: 100%;
    // background: red;
    margin-top: -23px;
    max-height: 18px;
    overflow: hidden;
    transition: all .2s linear 0s;
    position: relative;
    .down{
        text-align: right;
        cursor: pointer;
        img{
            width: 8px;
            vertical-align: middle;
            transform:rotate(0deg);
            transition: all .2s linear 0s;
        }
    }
}
.collapse.show{
    max-height: 200px;
    .down{
        img{ transform:rotate(180deg); }
    }
}
</style>