<!--
  功能：LOL经济曲线图panle组件
  作者：feikeq
  邮箱：feikeq@gmail.com
  时间：2020年11月07日 14:30:00
-->
<template>
  <div class="panle" alt="LOL经济曲线图组件" v-bind:[$options.name]="$options.version">
    <div class="PanleChart" ref="PanleChart"></div>
  </div>
</template>

<script>
export default {
  name: "Pie",
  version: "1.30.20201109", // 版本号
  // 组件参数 接收来自父组件的数据
  props: {
    Rates: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    var _this = this;
    var datas = [
      { value: 52, name: "胜率" },
      { value: 48, name: "胜率" }
    ];
    return {
      chartOption: {
        tooltip: {
          show: false
        },
        // legend 图例组件。
        legend: {
          show: false
        },
        //graphic 是原生图形元素组件。可以支持的图形元素包括：
        graphic: [
          {
            type: "text",
            left: "center",
            top: "center",
            style: {
              text: _this.title,
              textAlign: "center",
              fill: "#666",
              width: 30,
              height: 30,
              fontSize: 12
            }
          }
        ],
        series: [
          {
            name: "半径模式",
            type: "pie",
            radius: ["60%", "100%"],
            startAngle: 80, //起始角度
            // roseType: "radius",
            label: {
              show: false
            },
            itemStyle: {
              normal: {
                borderWidth: 5,
                borderColor: "#fff",
                color: function(params) {
                  var colorList = [
                    {
                      c1: "#F35463",
                      c2: "#F35463"
                    },
                    {
                      c1: "#2AB7CA",
                      c2: "#2AB7CA"
                    }
                  ];
                  // console.log("params.dataIndex",);

                  if (!colorList[params.dataIndex]) params.dataIndex = 2;
                  var c_star = colorList[params.dataIndex].c1;
                  var c_end = colorList[params.dataIndex].c2;
                  // console.log(c_star,c_end);
                  return new $echarts.graphic.LinearGradient(1, 0, 0, 0, [
                    {
                      //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上

                      offset: 0,
                      color: c_star
                    },
                    {
                      offset: 1,
                      color: c_end
                    }
                  ]);
                  /*  return colorList[params.dataIndex]*/
                }
              }
            },
            label: {
              show: false,
              position: "center"
            },
          
            data: _this.Rates
          }
        ]
      }
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.$nextTick(() => {
        //   console.log(this.$refs['PanleChart']);
        var myChart = $echarts.init(this.$refs["PanleChart"]);
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(this.chartOption);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.panle {
  // width: 100px;
  // height: 100px;
  width: 100%;
  __min-height: 100px;

  height: 100%;
  // overflow: hidden;
  .PanleChart {
    display: inline-block;
    __margin-top: 10px;
    __margin-bottom: 10px;
    width: 64px;
    height: 64px;
    // background: #0F1E45;
    border-radius: 6px;
    pointer-events: none;
  }
  .result {
    // background: red;
    margin-top: -15px;
    b.red {
      color: #F35463;
    }
    b.blue {
      color: #2AB7CA;
    }
  }
}
</style>