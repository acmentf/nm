<!--
  功能：LOL经济曲线图economy组件
  作者：feikeq
  邮箱：feikeq@gmail.com
  时间：2020年11月07日 14:30:00
-->
<template>
  <div :class="$options.name" alt="LOL经济曲线图组件" v-bind:[$options.name]="$options.version">
    <Module :alt="title">
      <div class="economyChart" ref="economyChart"></div>
    </Module>
  </div>
</template>

<script>
import Module from "@c/Module";
export default {
  name: "TiEconomyLOL",
  version: "1.30.20201107", // 版本号
  components: { Module },
  // 组件参数 接收来自父组件的数据
  props: ["title", "data"],
  methods: {
    initChart(chartData) {
      if (chartData) {
        this.chartOption.series[0].data = chartData.ecolist;

        if (chartData.explist && chartData.explist.length) {
          this.chartOption.series[1].data = chartData.explist;
        } else {
          this.chartOption.series.splice(1, 1);
        }

        //   if(!chartData.explist || !chartData.explist.length) this.chartOption.series.splice(1,1); //删除
      }
      //   console.log("this.chartOption", this.chartOption);
      this.$nextTick(() => {
        var myChart = $echarts.init(this.$refs["economyChart"]);

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(this.chartOption);
      });
    }
  },
  data() {
    var _this = this;

    var data_red = [
      ["2016-10-4", 30],
      ["2016-10-5", 29],
      ["2016-10-6", 24],
      ["2016-10-7", 30],
      ["2016-10-8", 32],
      ["2016-10-9", 35],
      ["2016-10-10", 44],
      ["2016-10-11", 34],
      ["2016-10-12", 33]
    ];

    var data_blue = [
      ["2016-10-4", 22],
      ["2016-10-5", 31],
      ["2016-10-6", 26],
      ["2016-10-7", 16],
      ["2016-10-8", 18],
      ["2016-10-9", 12],
      ["2016-10-10", 15],
      ["2016-10-11", 15],
      ["2016-10-12", 6]
    ];

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
          // show:false,
          // x: "center", //可设定图例在左、右、居中
          //   y: "bottom",
          align: "right",
          itemGap: 20, //图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
          itemWidth: 26, //图例标记的图形宽度。
          itemHeight: 7, //图例标记的图形高度。
          bottom: 18,
          icon: "roundRect",
          textStyle: {
            color: "#333333"
          },
          formatter: function(name) {
            return name + "差"; //模板变量为图例名称
          }
        },

        /*
        tooltip 提示框组件。
        */
        tooltip: {
          // triggerOn: 'axis',
          trigger: "axis", // 触发类型(axis坐标,item数据项图形,none不触发)
          backgroundColor: "rgba(51, 51, 51, 0.5)", //通过设置rgba调节背景颜色与透明度
          borderWidth: 0, //提示框浮层的边框宽。
          position: function(point, params, dom, rect, size) {
            var pointX = point[0],
              pointY = point[1];
            var boxWidth = size.contentSize[0],
              boxHeight = size.contentSize[1],
              _mid = boxHeight / 2;
            var x = pointX,
              y = pointY - _mid;
            if (point[0] > size.viewSize[0] / 2) {
              x = pointX - boxWidth;
              y = pointY - boxHeight + _mid;
            }
            if (y < 10) y = 0;
            return [x, y];
          },
          formatter: function(params) {
            // console.log(params);
            var res =
              "<p style='text-align:center;line-height:11px;color:#fff;'>" +
              params[0].axisValue +
              "</p>";
            for (var i = 0; i < params.length; i++) {
              var _val = (params[i].data[1] || params[i].data[0]) * 1;
              if (isNaN(_val)) _val = 0;
              var _teamName =
                _val > 0 ? _this.data.team_standard : _this.data.team_contrast;
              var _css =
                " text-align:left; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;vertical-align: bottom; display: inline-block; ";
              var _tmp =
                params[i].marker +
                "<b style='color:rgba(255, 255, 255, 1);font-size:11px;width:40px;" +
                _css +
                "'>" +
                _teamName +
                "</b> " +
                "<b style='color:rgba(255, 255, 255, 1);font-size:11px;width:56px;" +
                _css +
                "'>" +
                params[i].seriesName +
                "领先:" +
                "</b> " +
                " <b style='color:rgba(255, 255, 255, 1)" +
                ";font-size:11px;display: inline-block;margin-left:-5px;' >" +
                (Math.abs(_val)/1000).toFixed(1) +
                "K</b><br />";

              res += _tmp;
            }
            // console.log(res);

            return res;
          },
          // axisPointer 坐标轴指示器配置项。
          axisPointer: {
            type: "line", // ('line' 直线指示器 ,'shadow' 阴影指示器 ,'cross' 十字准星指示器 ,'none' 无指示器)
            shadowStyle: {
              color: "rgba(150,150,150,0.3)"
            },
            lineStyle: {
              color: "rgba(150,150,150,0.8)"
            },
            crossStyle: {
              color: "blue"
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
          type: "category",

          // boundaryGap 坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
          // boundaryGap:['20%', '20%'],
          boundaryGap: false, //代表是零刻度开始

          /* splitLine 坐标轴在 grid 区域中的分隔线。*/
          splitLine: {
            show: true,
            lineStyle: {
              opacity: 0.1,
              // 使用深浅的间隔色
              color: ["#4C95FA"]
            }
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

          // axisTick 坐标轴刻度相关设置。
          axisTick: {
            inside: true // 坐标轴刻度是否朝内，默认朝外。
          },
          /* splitLine 坐标轴在 grid 区域中的分隔线。*/
          splitLine: {
            show: true,
            lineStyle: {
              opacity: 0.1,
              // 使用深浅的间隔色
              color: ["#4C95FA"]
            }
          },

          // axisLabel 坐标轴刻度标签的相关设置。
          axisLabel: {
            // inside: true,
            formatter: function(params) {
              return params / 1000 + "K";
            }
          }
          // z: 10 //Y 轴组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
        },

        // grid 直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴。可以在网格上绘制折线图，柱状图，散点图（气泡图）。
        grid: {
          // show:true, //是否显示直角坐标系网格。
          top: 20, //grid 组件离容器上侧的距离。
          // left: 40, //grid 组件离容器左侧的距离。
          right: 20, //grid 组件离容器右侧的距离。
          bottom: 80
          // height: 160 //grid 组件的高度。默认自适应。
        },

        // series 系列列表。每个系列通过 type 决定自己的图表类型
        series: [
          {
            name: "经济", //系列名称
            type: "line", //折线/面积图
            smooth: true, //是否平滑曲线显示。
            // symbol: 'image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7', //标记的图形。
            // symbolSize: 40, //标记的大小
            symbol: "none",
            symbolSize: 0, //标记的大小
            sampling: "average", //折线图在数据量远大于像素点时候的降采样策略，开启后可以有效的优化图表的绘制效率，默认关闭，也就是全部绘制不过滤数据点。

            // itemStyle 折线拐点标志的样式。
            itemStyle: {
              emphasis: {
                lineStyle: {
                  width: 1
                }
              },
              // color: '#CA6BCE',
              // width:200, // 设置到这没用真TM坑
              normal: {
                color: "#F5AF10",
                lineStyle: {
                  width: 1 // 0.1的线条是非常细的了
                }
              }
            },
            // 填充颜色
   
            areaStyle: {
              color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
                 {
                  offset: 0,
                  color: "rgba(245, 175, 16, 0.5)"
                },
                {
                  offset: 1,
                  color: "rgba(128, 128, 128, 0)"
                }
              ])
            },
            data: data_blue
          },
          {
            name: "经验",
            type: "line",
            smooth: true,
            // stack: 'a',
            symbol: "none", // 'circle',
            symbolSize: 0,
            sampling: "average",
            itemStyle: {
              // color: '#6231E7',
              normal: {
                color_bak: "#6231E7",
                color: "#F35463",
                lineStyle: {
                  width: 1 // 0.1的线条是非常细的了
                }
              }
            },
            /**
             * 
             * 
             */
            //填充的颜色。
            areaStyle: {
              color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(240, 83, 101, 0.5)"
                },
                {
                  offset: 1,
                  color: "rgba(39, 6, 31, 0)"
                }
              ])
            },
            data: data_red
          }
        ]
      }
    };
  },
  computed: {
    economics_info() {
      var _data = {
        ecolist: [],
        explist: [],
        team_standard: "",
        team_contrast: ""
      };
      var _this = this;
      if (this.data) {
        if (this.data.ecolist) {
          _data.ecolist = this.data.ecolist.map(function(item) {
            if (!item) return ["00:00", 0];
            var _tmp = item.split(":");
            return [_this.$realFormatSecond(_tmp[0] * 60), _tmp[1] * 1];
          });
        }
        if (this.data.explist) {
          _data.explist = this.data.explist.map(function(item) {
            if (!item) return ["00:00", 0];
            var _tmp = item.split(":");
            return [_this.$realFormatSecond(_tmp[0] * 60), _tmp[1] * 1];
          });
        }
        _data.team_standard = this.data.team_standard;
        _data.team_contrast = this.data.team_contrast;
      }
      //   console.log("datatatatadta", _data);
      return _data;
    }
  },
  mounted() {
    //   console.log('--mounted--');
    this.initChart(this.economics_info); //初始化
  },
  created() {
    // console.log($echarts)
  },
  watch: {
    data(newVal, oldVal) {
      //   console.log('--watch--')
      //   console.log(this.economics_info);
      this.initChart(this.economics_info);
    }
  }
};
</script>

<style lang="scss" scoped>
.TiEconomyLOL .economyChart {
  // margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  height: 300px;
  background: #fff;
}
</style>
