<!--
  功能：Pie（空心饼状图）图
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2020年12月24日 13:44:27
-->
<template>
  <div class="pie" ref="pie" :style="{width:width+'px',height:height+'px'}"></div>
</template>
<script>
export default {
  props: {
    // 饼图类型 1为主队 2为客队
    type: {
      type: Number | String,
      default: 2
    },
    width: {
      type: String,
      default: "87"
    },
    height: {
      type: String,
      default: "87"
    },
    value: {
      type: String | Number,
      default: 0
    }
  },
  name: "pie",
  components: {},
  data() {
    var _this = this;
    return {
      option: {
        series: [
          {
            type: "pie",
            radius: ["60%", "100%"],
            center: ["50%", "50%"],
            hoverAnimation: false,
            avoidLabelOverlap: false,
            startAngle: 0, //起始角度
            labelLine: {
              show: false
            },
            data: [
              { value: _this.value },
              { value: 100 - Number(_this.value) }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              },
              normal: {
                borderWidth: 4,
                borderColor: "#fff",
                color: function(params) {
                
                  var colorList =
                    _this.type == 1
                      ? [
                          {
                            c1: "#4D8AF5",
                            c2: "#4D8AF5"
                          },
                          {
                            c1: "#f2f2f2",
                            c2: "#f2f2f2"
                          }
                        ]
                      : [
                          {
                            c1: "#4D8AF5",
                            c2: "#4D8AF5"
                          },
                          {
                            c1: "#f2f2f2",
                            c2: "#f2f2f2"
                          }
                        ];
                  return new $echarts.graphic.LinearGradient(1, 0, 0, 0, [
                    {
                      //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                      offset: 0,
                      color: colorList[params.dataIndex].c1
                    },
                    {
                      offset: 1,
                      color: colorList[params.dataIndex].c2
                    }
                  ]);
                }
              }
            }
          }
        ]
      }
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {
    var myChart = $echarts.init(this.$refs["pie"]);
    myChart.setOption(this.option);
  }
};
</script>
<style lang='less' scoped>
</style>