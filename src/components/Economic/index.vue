<template>
  <span class="economic">
     <img :src="coinIcon" alt="" width="12"><span class="coin" :class="type!=1?'coin-1':''">{{(economic/1000).toFixed(1)}}K</span>
  </span>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default:1
    },
    economic:{
      type: Number,
      default: 0
    }
  },
  name: "economic",
  data() {
    return {
        coinIcon:this.type == 1 ? require('./images/1.png') : require('./images/2.png')
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
    .economic{
        display: flex;
        justify-content: center;
        align-items: center;
        .coin{
          color:#F35463;
          font-size:10px;
          &.coin-1{
               color:#2AB7CA;
          }
        }
    }
</style>
