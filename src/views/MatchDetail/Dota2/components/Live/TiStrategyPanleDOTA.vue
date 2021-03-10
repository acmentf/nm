<!--
  功能：LOL战略饼图panle组件
  作者：feikeq
  邮箱：feikeq@gmail.com
  时间：2020年11月07日 14:30:00
-->
<template>
  <div :class="$options.name" alt="LOL战略饼图panle组件" v-bind:[$options.name]="$options.version">
    <div class="PanleChart" ref="PanleChart"></div>
    <div class="result">
      <b class="blue">{{home || 0}}</b> &minus;
      <b class="red">{{away|| 0}}</b>
    </div>
  </div>
</template>

<script>
export default {
  name: "TiStrategyPanleDOTA",
  version: "1.30.20201109", // 版本号
  // 组件参数 接收来自父组件的数据
  props: ["icon", "title", "home", "away"],
  data() {
    var _this = this;
    var datas = [
      { value: this.away || 0, name: "客队" },
      { value: this.home || 0, name: "主队" }
    ];
    return {
      chartOption: {
        // title 标题组件，包含主标题和副标题。
        title: {
          // left: 'center', //title 组件离容器左侧的距离。（可以 20 或 '20%'来设置）
          // text: 'text 主标题文本，支持使用 \n 换行',
          // subtext: '副标题文本，支持使用 \n 换行',
        },

        /*
    tooltip 提示框组件。
    */
        tooltip: {
          show: false,

          // triggerOn: 'axis',
          // trigger: 'item', // 触发类型(axis坐标,item数据项图形,none不触发)
          trigger: "none",
          backgroundColor: "rgba(15, 23, 46, 0.8)", //通过设置rgba调节背景颜色与透明度
          borderWidth: 0, //提示框浮层的边框宽。
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // legend 图例组件。
        legend: {
          show: false,
          selectedMode: false
        },

        //graphic 是原生图形元素组件。可以支持的图形元素包括：
        graphic: [
          {
            type: "image",
            style: {
              // image: "https://img-home.csdnimg.cn/images/20201103102506.gif",
              image: this.icon,
              width: 22,
              height: 22
            },
            left: "center",
            top: "32%" //number：表示像素值。 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。'middle'：表示自动居中。
          },
          {
            type: "text",
            left: "center",
            top: "60%",
            style: {
              text: _this.title,
              textAlign: "center",
              fill: "#333",
              width: 30,
              height: 30,
              fontSize: 13
            }
          }
        ],
        series: [
          {
            name: "半径模式",
            type: "pie",
            clickable: false,
            selectedMode: false,
            radius: ["60%", "100%"],
            // center: ['25%', '50%'],
            startAngle: 80, //起始角度

            //是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：
            // 'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小。
            // 'area' 所有扇区圆心角相同，仅通过半径展现数据大小。
            // roseType: 'radius',

            label: {
              show: false
            },
            itemStyle: {
              // color: '#CA6BCE',
              // width:200, // 设置到这没用真TM坑
              // normal: {
              //     color: '#CA6BCE',
              //     lineStyle: {
              //         width:1// 0.1的线条是非常细的了
              //     }
              // }
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

            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },

            emphasis: {
              label: {
                show: true
              }
            },
            data: datas
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
.TiStrategyPanleDOTA {
  // width: 100px;
  // height: 100px;
  width: 100%;
  min-height: 100px;

  height: 100%;
  // overflow: hidden;
  .PanleChart {
    display: inline-block;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 88px;
    height: 88px;
    background: #fff;
    border-radius: 6px;
    pointer-events: none;
  }
  .result {
    // background: red;
    margin-top: -10px;
    font-size: 15px;
    color: #999999;
    b.red {
      color: #f35463;
    }
    b.blue {
      color: #2ab7ca;
    }
  }
}
</style>