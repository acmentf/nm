<!--
  功能：LOL胜率等图probability组件
  作者：feikeq
  邮箱：feikeq@gmail.com
  时间：2020年11月11日 14:30:00
-->
<template>
  <div :class="$options.name" alt="LOL胜率等图probability组件" v-bind:[$options.name]="$options.version">
    <!-- {{data}} -->
    <div class="barmyChart" ref="barmyChart"></div>
    <div class="tip blue">
      {{data.team_name_home||'[主队]'}}：{{data.team_rate_home}}
      <span></span>
    </div>
    <div class="tip red">
      {{data.team_name_away||'[客队]'}}：{{data.team_rate_away}}
      <span>Pick顺序→</span>
    </div>
  </div>
</template>

<script>
import Module from "@c/Module";

// 导入图片资源
import LOL_hero from "../../images/hero.png";

import LOL_c1 from "../../images/c1.png";
import LOL_c2 from "../../images/c2.png";
import LOL_c3 from "../../images/c3.png";
import LOL_c4 from "../../images/c4.png";
import LOL_c5 from "../../images/c5.png";
import LOL_c6 from "../../images/c6.png";
import LOL_c7 from "../../images/c7.png";
import LOL_c8 from "../../images/c8.png";
import LOL_c9 from "../../images/c9.png";

export default {
  name: "TiProbabilityChart",
  version: "1.309.20201111", // 版本号
  components: { Module },
  // 组件参数 接收来自父组件的数据
  props: ["title", "data"],
  methods: {
    initChart() {
      var _tmp = [] ,_box =[];
      var data = this.data;
      this.chartOption.series.name = data.team_name_home || "[主队]";

      for (var index = 0; index < data.role_list.length; index++) {
        var element = data.role_list[index];
        //   console.log("elementelementelement",element)
        var _data =  [index, element.rate * 1];
        var _item = {
          value: _data,
          symbol: "image://" + element.role_img_url,
          itemStyle: {
                color: '#8DCC93',
                borderType : 'solid',
                borderColor: '#5DB665',
                borderWidth: 2
            }
        };
        _tmp.push(_item);
        var _cbox={coord:_data};
        if(element.tip=="红队")_cbox.itemStyle={borderColor:"#E92DB1"};
        _box.push(_cbox);

      }
    //   console.log("_item",_item);
      this.chartOption.series[0].data = _tmp;
      this.chartOption.series[0].markPoint.data = _box;

      this.$nextTick(() => {
        //   console.log(this.$refs['barmyChart']);
        var myChart = $echarts.init(this.$refs["barmyChart"]);
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(this.chartOption);
      });
    }
  },
  data() {
    //   var data_red = [["2016-10-4",30],["2016-10-5",29],["2016-10-6",24],["2016-10-7",30],["2016-10-8",32],["2016-10-9",35],["2016-10-10",44],["2016-10-11",34],["2016-10-12",33]];
    var data_red = [
      //    ["2016-10-4",30],
      {
        value: [1, 55],
        symbol: "image://" + LOL_hero,
      },
      {
        value: [2, 29],
        symbol: "image://" + LOL_c1
      },
      {
        value: [3, 24],
        symbol: "image://" + LOL_c2
      },
      {
        value: [4, 30],
        symbol: "image://" + LOL_c3
      },
      {
        value: [5, 32],
        symbol: "image://" + LOL_c4
      },
      {
        value: [6, 35],
        symbol: "image://" + LOL_c5
      },
      {
        value: [7, 44],
        symbol: "image://" + LOL_c6
      },
      {
        value: [8, 34],
        symbol: "image://" + LOL_c7
      },
      {
        value: [9, 33],
        symbol: "image://" + LOL_c8
      },
      {
        value: [10, 80],
        symbol: "image://" + LOL_c9
      }
    ];

    let icon =
      '<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9125" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><defs><style type="text/css"></style></defs><path d="M874.044235 149.955765L873.411765 361.411765l150.588235 150.588235-150.588235 150.588235 0.63247 211.456L662.588235 873.411765l-150.588235 150.588235-150.588235-150.588235-211.456 0.63247L150.588235 662.588235l-150.588235-150.588235 150.588235-150.588235-0.63247-211.456L361.411765 150.588235l150.588235-150.588235 150.588235 150.588235z" fill="#FF6E6E" p-id="9126"></path><path d="M512 512m-271.058824 0a271.058824 271.058824 0 1 0 542.117648 0 271.058824 271.058824 0 1 0-542.117648 0Z" fill="#0C0058" p-id="9127"></path></svg>';
    icon = encodeURIComponent(icon); // 转译
    icon = "data:image/svg+xml;utf8," + icon; // 添加url前缀
    icon = "image://" + icon; // 添加ECharts需要的前缀

    return {
      chartOption: {
        animation: true,

        // title 标题组件，包含主标题和副标题。
        title: {
          // left: 'center', //title 组件离容器左侧的距离。（可以 20 或 '20%'来设置）
          // text: 'text 主标题文本，支持使用 \n 换行',
          // subtext: '副标题文本，支持使用 \n 换行',
        },

        // legend 图例组件。
        legend: {
          show: false
        },

        /*
                        tooltip 提示框组件。
                        */
        tooltip: {
          // triggerOn: 'axis',
          trigger: "none", // 触发类型(axis坐标,item数据项图形,none不触发)
          backgroundColor: "rgba(15, 23, 46, 0.8)", //通过设置rgba调节背景颜色与透明度
          borderWidth: 0, //提示框浮层的边框宽。
          formatter: function(params) {
            // console.log(params);
            var res = "";
            for (var i = 0; i < params.length; i++) {
              var _css =
                "width:40px; text-align: right; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;    vertical-align: bottom; display: inline-block; ";
              var _tmp =
                "<b style='color:rgba(255, 255, 255, 0.7);font-size:10px;" +
                _css +
                "'>" +
                params[i].seriesName +
                "</b> " +
                params[i].marker +
                " <b style='color:" +
                params[i].color +
                ";font-size:10px;display: inline-block;' >" +
                params[i].data +
                "</b><br />";
              //   console.log(_tmp);
              res += _tmp;
            }

            return res;
          },
          // axisPointer 坐标轴指示器配置项。
          axisPointer: {
            type: "shadow", // ('line' 直线指示器 ,'shadow' 阴影指示器 ,'cross' 十字准星指示器 ,'none' 无指示器)
            shadowStyle: {
              color: "rgba(150,150,150,0.3)"
            }
          }
        },

        /*
                        xAxis 直角坐标系 grid 中的 x 轴，一般情况下单个 grid 组件最多只能放上下两个 x 轴，
                        多于两个 x 轴需要通过配置 offset 属性防止同个位置多个 x 轴的重叠。
                        */
        xAxis: {
          /*
                            type 坐标轴类型。
                            'value' 数值轴，适用于连续数据。
                            'category' 类目轴，适用于离散的类目数据。为该类型时类目数据可自动从 series.data 或 dataset.source 中取，或者可通过 xAxis.data 设置类目数据。
                            'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
                            'log' 对数轴。适用于对数数据。
                            */
          type: "value",

          // boundaryGap:['0%', '100%'],

          /* splitLine 坐标轴在 grid 区域中的分隔线。*/
          splitLine: {
            show: false, // 是否显示区域中的分隔线。
            lineStyle: {
              opacity: 0.1,
              // 使用深浅的间隔色
              color: ["#4C95FA"]
            }
          },
          axisLine:{
            lineStyle:{
                color:'#FAFAFA',
                width:1,   //这里是坐标轴的宽度,可以去掉
                opacity: 0.14,
            }
        },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          }

          // minorSplitLine 坐标轴在 grid 区域中的次分隔线。次分割线会对齐次刻度线 minorTick
          // minorSplitLine:{
          //     show: true,
          //     lineStyle: {
          //         opacity :0.1,
          //         // 使用深浅的间隔色
          //         color: ['#4C95FA']
          //     }
          // },
        },

        // yAxis 直角坐标系 grid 中的 y 轴，一般情况下单个 grid 组件最多只能放左右两个 y 轴，多于两个 y 轴需要通过配置 offset 属性防止同个位置多个 Y 轴的重叠。
        yAxis: {
          /*
                            type 坐标轴类型。
                            'value' 数值轴，适用于连续数据。
                            'category' 类目轴，适用于离散的类目数据。为该类型时类目数据可自动从 series.data 或 dataset.source 中取，或者可通过 xAxis.data 设置类目数据。
                            'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
                            'log' 对数轴。适用于对数数据。
                            */
          type: "value",
          max: 100,
          min: 0,
          interval: 50, // 步长

          // axisTick 坐标轴刻度相关设置。
          axisTick: {
            show:false,
            inside: true // 坐标轴刻度是否朝内，默认朝外。
          },
          /* splitLine 坐标轴在 grid 区域中的分隔线。*/
          splitLine: {
            // show: false,
            lineStyle: {
              opacity: 0.1,
              // 使用深浅的间隔色
              color: ["#4C95FA"]
            }
          },
          axisLine:{
                show:false, //隐藏左侧y洲
            }, 

          // axisLabel 坐标轴刻度标签的相关设置。
          axisLabel: {
            // inside: true,
            formatter: "{value}%"
          }
          // z: 10 //Y 轴组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
        },

        // grid 直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴。可以在网格上绘制折线图，柱状图，散点图（气泡图）。
        grid: {
          // show:true, //是否显示直角坐标系网格。
          top: 50, //grid 组件离容器上侧的距离。
          left: 40, //grid 组件离容器左侧的距离。
          right: 20, //grid 组件离容器右侧的距离。
          bottom: 50
          // height: 160 //grid 组件的高度。默认自适应。
        },

        // series 系列列表。每个系列通过 type 决定自己的图表类型
        series: [
          {
            name: "红队", //系列名称
            type: "line", //折线/面积图
            smooth: false, //是否平滑曲线显示。
            // symbol: 'image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7', //标记的图形。
            // symbolSize: 40, //标记的大小
            symbol: "none",
            symbolSize: 0, //标记的大小
            sampling: "average", //折线图在数据量远大于像素点时候的降采样策略，开启后可以有效的优化图表的绘制效率，默认关闭，也就是全部绘制不过滤数据点。
            // itemStyle 折线拐点标志的样式。
            itemStyle: {
              // color: '#CA6BCE',
              // width:200, // 设置到这没用真TM坑
              normal: {
                color: "rgba(150,150,150,0.9)",
                lineStyle: {
                  width: 1 // 0.1的线条是非常细的了
                }
              }
            },

            /* 
                                stack数据堆叠，同个类目轴上系列配置相同的stack值后，
                                后一个系列的值会在前一个系列的值上相加。
                                */
            // stack: 'a',

            data: data_red,
            symbol: icon,
            // symbol:['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'],
            symbolSize: 20,
            markPoint: {
                data: [],
                label:{
                    show:false,
                },
                
                symbol:'rect',
                symbolSize:20,
                
                itemStyle:{
                    // offset:[30,40],
                    color:"transparent",
                    backgroundColor:'transparent',
                    borderColor:"#8B65FF", 
                    borderWidth:1,
                }
            },
          }
        ]
      }
    };
  },
  mounted() {
    this.initChart();
  }
};
</script>

<style lang="scss" scoped>
.TiProbabilityChart {
  width: 100%;
  height: 100%;
  position: relative;
  .barmyChart {
    // margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    // width: 345px;
    height: 250px;
    // background:red;
    border-radius: 6px;
  }
  .tip {
    position: absolute;
    height: 20px;
    line-height: 20px;
    // background: red;
    width: 100%;
    font-size:12px;
    font-weight: bold;
    &.blue {
      color: #2AB7CA;
      top: 0;
    }
    &.red {
      color: #F35463;
      bottom: 0;
    }
    & > span {
      float: right;
      margin-right: 10px;
      color: #999999;
      font-weight: 200;
      img {
        width: 14px;
        cursor: pointer;
      }
    }
  }
}
</style>