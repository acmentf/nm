<template>
  <div
    class="bar"
    style="width:100%;padding-bottom:17px"
    :style="'height:'+height+'px'"
    ref="bar"
  ></div>
</template>

<script>
export default {
  name: "Bar",
  props: {
    //x坐标刻度名
    xDataLable: {
      type: Array,
      default: () => [],
    },
    // 单位
    unit: {
      type: String,
      default: "%",
    },
    // y坐标数据
    yDataList: {
      type: Array,
      default: () => [
        {
          name: "",
          data: [],
        },
        {
          name: "",
          data: [],
        },
      ],
    },
    // 高度
    height:{
        type:Number,
        default:300
    }
  },
  methods: {
    initChart() {
      this.$nextTick(() => {
        //   console.log(this.$refs['barmyChart']);
        var myChart = $echarts.init(this.$refs["bar"]);
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(this.option);
      });
    },
  },
  data() {
    return {
        option:{
        // tooltip: {},
        
        legend: {
            // show:false,
            // x: "center", //可设定图例在左、右、居中
            y: "bottom",
            align: "right",
            itemGap: 20, //图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
            itemWidth: 26, //图例标记的图形宽度。
            itemHeight: 6, //图例标记的图形高度。
            icon:"roundRect",
            textStyle:{
                color:"rgba(228, 228, 228, 0.6)"
            },
        },
        grid: {
          left: "15%",
          top: "10%"
        },
        yAxis: {
        //   data: ["核心", "控制", "先手", "爆发", "打野"],
          data: this.xDataLable,
          axisLine: {
            lineStyle: {
              color: "rgba(76, 149, 250, 0.2)"
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "rgba(228, 228, 228, 0.65)" //X轴提示文本
            },
            interval: 0,
            // rotate: 30
          }
        },

        xAxis: [
          {
            type: "value",
            axisLabel: {
              show: true,
              interval: "auto",
            //   formatter: "{value}"
              formatter: `{value}${this.unit}`,
            },
            axisLine: {
              lineStyle: {
                color: "rgba(228, 228, 228, 0.65)" // Y轴提示文本
              }
            },
            barWidth: 18,
            show: true,
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgba(76, 149, 250, 0.2)"],
                width: 1,
                type: "solid"
              }
            }
          }
        ],
        backgroundColor: "#0f1e45",
        series: [
          {
            name: this.yDataList[0].name,
            type: "bar",
            data: this.yDataList[0].data, 
            color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#6527E3" }, //柱图渐变色
              { offset: 0.5, color: "#5367FE" }, //柱图渐变色
              { offset: 1, color: "#5367FE" } //柱图渐变色
            ]),
            barGap: "0%", //系列的柱间距离，为百分比（如 '30%'，表示柱子宽度的 30%）。
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "right", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#2AB7CA",
                    fontSize: 9,
                    fontWeight:900
                  },
                  formatter: `{c}${this.unit}`,
                }
              }
            }
          },
          {
            name: this.yDataList[1].name,
            type: "bar",
            data: this.yDataList[1].data, 
            color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#F35463" }, //柱图渐变色
              { offset: 0.5, color: "#DD6EFE" }, //柱图渐变色
              { offset: 1, color: "#DD6EFE" } //柱图渐变色
            ]),
             itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "right", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#F35463",
                    fontSize: 9,
                    fontWeight:900
                  },
                  formatter: `{c}${this.unit}`,
                }
              }
            }
          }
        ]
      },
      
    };
  },
  mounted() {
    // var myChart = echarts.init(this.$refs["bar"]);
    // myChart.setOption(this.option);
  },
  watch: {
    xDataLable(newVal, oldVal) {
      //   console.log("--watch--");
      //   console.log(newVal);
      this.option.yAxis.data = newVal;
      this.option.series[0].name = this.yDataList[0].name || "[主队]";
      this.option.series[0].data = this.yDataList[0].data;
      this.option.series[1].name = this.yDataList[1].name || "[客队]";
      this.option.series[1].data = this.yDataList[1].data;

      //   console.log(this.option);

      this.initChart(this.option);
    },
  },
};
</script>

<style lang="scss" scoped></style>
