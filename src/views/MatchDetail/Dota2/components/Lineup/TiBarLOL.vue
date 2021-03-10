<!--
  功能：LOL队伍数据对比图组件
  作者：feikeq
  邮箱：feikeq@gmail.com
  时间：2020年11月11日 14:30:00
-->
<template>
    <Module :alt="title" v-if="data">
        <!-- {{data}} -->
        <div :class="$options.name" alt="LOL队伍数据对比图组件" v-bind:[$options.name]="$options.version">
        
            <div class="barmyChart" ref="barmyChart"></div>
        
    </div>
    </Module>
</template>

<script>
import Module from "@c/Module";
export default {
  name: "TiBarLOL",
  version: "1.309.20201111", // 版本号
  components:{Module},
  // 组件参数 接收来自父组件的数据
  props: ['title','data'],
  methods: {
      initChart(){
          this.$nextTick(()=>{
            //   console.log(this.$refs['barmyChart']);
              var myChart = $echarts.init(this.$refs['barmyChart']);
               // 使用刚指定的配置项和数据显示图表。
              myChart.setOption(this.chartOption);
          });
      }
  },
  data() {

 
    var data_red =[4, 11, 6, 5,3];
    // var data_red = this.data.rccf_home;
    var data_blue = [10, 5, 2, 6,8];
    // var data_blue = this.data.rccf_away;
    return {
        chartOption:{
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
                color:"#333"
            },
        },
        grid: {
          left: "15%",
          top: "10%"
        },
        xAxis: {
          data: ["核心", "控制", "先手", "爆发", "打野"],
        // data: this.data.name,
          axisLine: {
            lineStyle: {
              color: "#F4F4F4"
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#999" //X轴提示文本
            }
          }
        },

        yAxis: [
          {
            type: "value",
            axisLabel: {
              show: true,
              interval: "auto",
              formatter: "{value}"
            },
            axisLine: {
              lineStyle: {
                color: "#999999" // Y轴提示文本
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
        backgroundColor: "#fff",
        series: [
          {
            name: "WE",
            type: "bar",
            data: data_blue, 
            color: '#2AB7CA',
            barGap: "0%", //系列的柱间距离，为百分比（如 '30%'，表示柱子宽度的 30%）。
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#2AB7CA",
                    fontSize: 9,
                    fontWeight:900
                  },
                //   formatter: "{c}%"
                }
              }
            }
          },
          {
            name: "皇族",
            type: "bar",
            data: data_red, 
            color: "#F35463",
             itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#F35463",
                    fontSize: 9,
                    fontWeight:900
                  },
                //   formatter: "{c}%"
                }
              }
            }
          }
        ]
      }
    };
  },
  mounted(){
    //  this.initChart(); //debug;
  },
  watch:{
      data(newVal, oldVal) {
        //   console.log('--watch--')
        //   console.log(this.economics_info);

        this.chartOption.xAxis.data = this.data.name;
        this.chartOption.series[0].name = this.data.team_name_home || '[主队]';
        this.chartOption.series[0].data = this.data.rccf_home;
        this.chartOption.series[1].name = this.data.team_name_away || '[客队]';
        this.chartOption.series[1].data = this.data.rccf_away;
        
          this.initChart(this.chartOption);
      }
  }
  
};
</script>

<style lang="scss" scoped>
.TiBarLOL{
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
    margin-top:10px;
    background: #fff;
    overflow: hidden;
 .barmyChart {
    // margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    // width: 345px;
    height: 268px;
    
}
}
</style>