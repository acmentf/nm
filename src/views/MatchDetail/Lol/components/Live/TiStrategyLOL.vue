<!--
  功能：LOL战略饼图strategy组件
  作者：feikeq
  邮箱：feikeq@gmail.com
  时间：2020年11月09日 14:30:00
-->
<template>
  <Module :alt="title">
    <!-- {{data}} -->
    <div :class="$options.name" alt="LOL战略饼图strategy组件" v-bind:[$options.name]="$options.version">
      <table style="width:100%;height:298px;text-align: center;" v-if="data">
        <tr style="height:50px;">
          <td style="width:49%">
            <TiStrategyPanleLOL
              title="大龙"
              :icon="ico_dl"
              :home="data.team_res_home.bigdragon"
              :away="data.team_res_away.bigdragon"
            />
          </td>
          <td style="width:2%"></td>
          <td style="width:49%">
            <TiStrategyPanleLOL
              title="小龙"
              :icon="ico_xl"
              :home="data.team_res_home.smalldragon"
              :away="data.team_res_away.smalldragon"
            />
          </td>
        </tr>
        <tr style="height:50px;">
          <td>
            <TiStrategyPanleLOL
              title="推塔"
              :icon="ico_tt"
              :home="data.team_res_home.tower"
              :away="data.team_res_away.tower"
            />
          </td>
          <td></td>
          <td>
            <TiStrategyPanleLOL
              title="水晶"
              :icon="ico_sj"
              :home="data.team_res_home.crystal"
              :away="data.team_res_away.crystal"
            />
          </td>
        </tr>
        <tr style="height:50px;">
          <td colspan="3">
            <div class="tag">
              <b>{{data.team_res_home.team_short_name||"[主队]"}}</b>
              <i class="blue"></i>
              <b>{{data.team_res_away.team_short_name||"[客队]"}}</b>
              <i class="red"></i>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </Module>
</template>

<script>
import Module from "@c/Module";
import TiStrategyPanleLOL from "./TiStrategyPanleLOL";
// 导入图片资源
import LOL_dl from "../../images/dl.png";
import LOL_xl from "../../images/xl.png";
import LOL_tt from "../../images/tt.png";
import LOL_sj from "../../images/sj.png";

export default {
  name: "TiEconomyLOL",
  version: "1.30.20201107", // 版本号
  // 局部注册的组件
  components: { Module, TiStrategyPanleLOL },
  // 组件参数 接收来自父组件的数据
  props: ["title", "data"],
  data() {
    //   console.log("大龙图---", LOL_dl );
    return {
      ico_dl: LOL_dl,
      ico_xl: LOL_xl,
      ico_tt: LOL_tt,
      ico_sj: LOL_sj
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.TiEconomyLOL {
  width: 100%;
  background: #fff;
  //border-radius: 6px;
  margin-bottom: 10px;
  // display: flex;
  table td {
    // box-sizing: border-box; //debug
    // border:1px solid rgb(21, 255, 0) ;
  }
  .tag {
    color: #333333;
    i {
      display: inline-block;
      width: 26px;
      height: 6px;
      border-radius: 8px;
      vertical-align: middle;
      margin-right: 22px;
      margin-left:6px;
    }
    i.red {
      background: #F35463;
    }
    i.blue {
      background: #2AB7CA;
    }
  }
}
</style>