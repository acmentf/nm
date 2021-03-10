<template>
  <div :class="$options.name" alt="LOL事件日志组件" v-bind:[$options.name]="$options.version">
    <table style="width:100%;text-align:center;">
      <tr class="line">
        <td colspan="3">00:00</td>
      </tr>
      <tr class="line">
        <td colspan="3">
          <b style="opacity: 0.2;">&bull;</b>
          <b style="opacity: 0.6;">&bull;</b>
          <b>&bull;</b> 比赛开始
          <b>&bull;</b>
          <b style="opacity: 0.6;">&bull;</b>
          <b style="opacity: 0.2;">&bull;</b>
        </td>
      </tr>

      <tr class="line">
        <td style="width:40%"></td>
        <td>
          <div>
            <i></i>
            <i></i>
          </div>
        </td>
        <td style="width:40%"></td>
      </tr>
      <tr class="time">
        <td style="width:40%">
          <div class="log">
            <MyImage class="red" v-model="picurl" :type="3" />
            <span>击杀</span>
            <MyImage class="blue" v-model="picurl" :type="3" />
          </div>
        </td>
        <td>03:46</td>
        <td style="width:40%">
          <div class="log">
            <MyImage class="red" v-model="picurl" :type="3" />
            <span>击杀</span>
            <MyImage class="blue" v-model="picurl" :type="3" />
          </div>
        </td>
      </tr>

      <tr class="line topline">
        <td style="width:40%"></td>
        <td>
          <div>
            <i></i>
            <i></i>
          </div>
        </td>
        <td style="width:40%"></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "TiEventsLOL",
  version: "1.309.20201116", // 版本号
  // 组件参数 接收来自父组件的数据
  props: ["data"],
  data() {
    return {
      picurl: ""
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.TiEventsLOL {
  background: #fff;
  table {
    color: #bbbbbb;
    tr.time {
      vertical-align: middle;
      td:first-child {
        text-align: right;
      }
      td:last-child {
        text-align: left;
      }
    }
    tr.line {
      padding: 0;
      margin: 0;

      div {
        padding: 0;
        margin: 0;
        display: inline-block;
        height: 50px;
        background: #fff;
        width: 1px;
        position: relative;
        vertical-align: bottom;
        i {
          width: 5px;
          height: 5px;
          background: #ccc;
          position: absolute;
          left: -2px;
          border-radius: 5px;
        }
        i:first-child {
          top: 0;
        }
        i:last-child {
          bottom: 0;
        }
      }

      &.topline {
        div {
          height: 35px;
          i:last-child {
            display: none;
          }
        }
      }
      &.bottomline {
        div {
          height: 35px;
          i:first-child {
            display: none;
          }
        }
      }
    }
    td {
      // box-sizing: border-box; //debug
      // border:1px solid red ;  //debug
      // height: 200px; //debug
    }
    .log {
      background-color: #091331;
      border-radius: 25px;
      overflow: hidden;
      display: inline-block;
      padding: 2px;
      img {
        width: 25px;
        height: 25px;
        border: 1px solid #ddd;
        border-radius: 25px;
        &.red {
          border-color: #e92db1;
          margin-right: 10px;
        }
        &.blue {
          border-color: #a750ff;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>