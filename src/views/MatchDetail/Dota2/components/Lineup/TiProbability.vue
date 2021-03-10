<!--
  功能：LOL胜率等图probability组件
  作者：feikeq
  邮箱：feikeq@gmail.com
  时间：2020年11月11日 14:30:00
-->
<template>
  <Module :alt="title">
    <!-- {{data[value]}} -->
    <div
      :class="$options.name"
      alt="LOL胜率等图probability组件"
      v-bind:[$options.name]="$options.version"
    >
      <van-tabs
        v-model="active"
        animated
        :swipe-threshold="6"
        line-width="30px"
        @change="tabChange"
      >
        <van-tab v-for="(item,index) in data" :title="item.page_top.page_name" :key="index">
          <div class="content">
            <TiProbabilityChart :data="item.page_top" />
            <div class="qtip">
              <span>
                <img
                  src="../../images/q.png"
                  tabindex="0"
                  @blur="tipboxChange"
                  @click="tipboxChange"
                />
              </span>
              <div class="tipbox" v-if="tipbox">
                <p>根据双方所选英雄在所有战队和当前战队的表现情况，并结合BP规则计算战队的胜率、一血率、一塔率、五杀率、十杀率的趋势变化。</p>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </Module>
</template>

<script>
import Module from "@c/Module";

import TiProbabilityChart from "./TiProbabilityChart";

export default {
  name: "TiProbability",
  version: "1.309.20201111", // 版本号
  components: { Module, TiProbabilityChart },
  // 组件参数 接收来自父组件的数据
  props: ["title", "data", "value"],
  data() {
    return {
      tipbox: false, // 显示提示
      active: 0,
      game_id: 0,

      tabList: [
        { lable: "胜率", name: "live" },
        // { lable: "聊天", name:'chat',disabled:true },
        { lable: "一血率", name: "lineup" },
        { lable: "首塔率", name: "player" },
        { lable: "五杀率", name: "analyse" },
        { lable: "十杀率", name: "analyse" }
      ],
      match_id: ""
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    tabChange(index, text) {
      //   console.log(index,text);
      this.$emit("input", index);
    },
    tipboxChange() {
      this.tipbox = !this.tipbox;
      //   console.log("this.tipbox",this.tipbox);
    },
    initChart() {}
  }
};
</script>

<style lang="scss" >
.TiProbability {
  position: relative;
  margin-bottom: 10px;
  width: 100%;
  // width: 345px;
  height: 318px; //解决DATA2英雄排名数据图表bug滚动
  background: #fff;

  .van-tabs__nav {
    background-color: transparent;
  }
  .van-tabs__line {
    background: #6521D7;
  
  }
  .van-tabs__wrap {
    height: 44px !important;
    padding: 0 12px;
    box-sizing: none;
    box-shadow:none;
  }
  .content {
    overflow: hidden; //解决DATA2英雄排名数据图表bug滚动
    padding: 5px 15px;
    .qtip {
      position: absolute;
      height: 20px;
      line-height: 20px;
      // background: red;
      width: 100%;
      top: 0;
      .tipbox {
        -webkit-transform-origin-x: 0;
        -webkit-transform: scale(0.9);
        width: 220px;
        height: 102px;
        background: #0b193d;
        border: 1px solid rgba(28, 113, 218, 0.4);
        opacity: 1;
        border-radius: 6px;
        position: absolute;
        right: 10px;
        top: 15px;
        padding: 10px;
        font-size: 11px;
        color: rgba(255, 255, 255, 0.5);
      }
      span {
        float: right;
        margin-right: 40px;
        color: #696e7e;
        img {
          width: 14px;
          cursor: pointer;
          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>