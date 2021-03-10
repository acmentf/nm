<template>
  <div class="empty">
    <img src="./images/match.png" alt  v-if="EmptyType==1"/>
    <img src="./images/no-data.png" alt  v-if="EmptyType==2"/>
     <img src="./images/notice.png" alt  v-if="EmptyType==3"/>
    <p><slot></slot></p>
  </div>
</template>

<script>
const MatchEmpty  = require('./images/match.png');
const NoData  = require('./images/no-data.png');
export default {
  props:{
    EmptyType: String | Number,
    default: 1  // 图片类型 1：没比赛  2： 没数据 3 :无关注
  },
  data() {
    return {
    };
  }
};
</script>

<style lang="scss" scoped>
.empty {
  text-align: center;
  //margin-top:30px;
  & > p {
    font-size: 12px;
    padding-top: 20px;
    line-height: 17px;
    color: #333;
    opacity: 0.5;
    font-weight: 400;
  }
  &>img{
    width:80%;
  }
}
</style>
