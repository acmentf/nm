<!--
  横向柱状图组件
-->
<template>
  <div class="row-bar">
    <ul class="row-list">
      <li
        class="row-item"
        v-for="(item,index) in dataList"
        :key="index"
        :style="{marginBottom: marginBottom+'px'}"
      >
        <div class="tip" v-if="item.tip_home">
          <div class="rt" v-if="item.tip_home">
            <i>{{item.tip_home}}</i>
          </div>
          <span class="item-name"></span>
          <div class="lt" v-if="item.tip_away">
            <i>{{item.tip_away}}</i>
          </div>
        </div>
        <div class="row">
          <div class="row-item-left lt" :style="{background:bgColor}">
            <span class="data l">{{getUval(item.attr_home,item.dw)}}</span>
            <p
              :style="{width:getPercentage(item.attr_home,item.attr_total),height:height+'px',lineHeight:height+'px'}"
              :class="item.attr_home==0 ? 'empty':''"
            ></p>
          </div>
          <span class="item-name">{{item.attr_name}}</span>
          <div class="row-item-right rt" :style="{background:bgColor}">
            <span class="data r">{{getUval(item.attr_away,item.dw)}}</span>
            <p
              :style="{width:getPercentage(item.attr_away,item.attr_total),height:height+'px',lineHeight:height+'px'}"
              :class="item.attr_away==0 ? 'empty':''"
            ></p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      /**
       [
         {
            attr_away, //客队数据
            attr_home, //主队数据
            attr_name, //数据类型名称
            attr_total, //总数值
            dw: "%" //单位
          }
        ]
       */
      default: () => []
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
      default: "#091331"
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
    getPercentage(number, total) {
      var _val = (number / total) * 100;
      if (_val) return _val + "%";
      return "null";
    },
    getUval(str, dw) {
      var _str = str;
      if (_str) {
        _str += dw || this.unit;
        return _str;
      }
      return "0";
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.row-bar {
  .row-list {
    & > li {
      &:last-child {
        margin-bottom: 0 !important;
      }
      & > div {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        & > div {
          flex: 1;
        }
        &.tip {
          min-height: 5px;
          line-height: 13px;
          color: #333;
          margin-bottom: 5px;
          i {
            font-style: normal;
            font-size: 12px;
            display: inline-block;
          }
          .lt > i {
            -webkit-transform-origin-x: 0;
          }
        }

        .item-name {
          width: 57px;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
        .lt {
          text-align: left;
        }
        .rt {
          text-align: right;
        }
        .row-item-left {
          position: relative;
          display: flex;
          justify-content: flex-end;
          height: 100%;
          background: #eee !important;
          & > p {
            font-size: 11px;
            padding-right: 7px;
            text-align: right;
            background: #2AB7CA;
            &.empty {
              background: transparent;
            }
          }
        }
        .row-item-right {
          position: relative;
          display: flex;
          justify-content: flex-start;
          height: 100%;
          background: #eee !important;
          & > p {
            text-align: left;
            font-size: 11px;
            padding-left: 7px;
            background: #F35463;
            &.empty {
              background: transparent;
            }
          }
        }
        .data {
          position: absolute;
          top: 50%;
          transform: translate(0, -50%);
          color:rgba(51, 51, 51, 0.5);
          line-height: 16px;
          &.r {
            left: 7px;
          }
          &.l {
            right: 7px;
          }
        }
      }
    }
  }
}
</style>
