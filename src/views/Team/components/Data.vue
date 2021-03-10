<!--
  功能：战队详情数据组件
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2020年12月21日 15:00:06
-->
<template>
  <div>
    <div class="team-detail-data">
      <!-- 选手列表 -->
      <div class="players-container">
        <div class="players-list-box">
          <div class="swiper-button prev" @click="slidePrev" v-show="INDEX>0"></div>
          <Swiper v-if="memberList && memberList.length" :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(item,index) in  memberList" :key="index">
              <div class="player-item" @click="routePlayer(item.player_id)">
                <div class="player-wrapper">
                  <van-image :src="item.player_icon" class="player-pic" round fit="cover">
                    <template v-slot:error>
                      <img src="@/assets/images/player.png" alt class="default-pic" />
                    </template>
                  </van-image>
                </div>

                <p class="name">{{item.player_name | ellipsis(5)}}</p>
                <p class="posiotion">{{item.position_str}}</p>
              </div>
            </swiper-slide>
          </Swiper>
          <div v-else style="color:#999">暂无队员数据</div>
          <div class="swiper-button next" @click="slideNext" v-show="memberList.length-5 > INDEX"></div>
        </div>
        <div class="handler-select">
          <my-select
            :options="selectList"
            v-model="optionId"
            class="select-1"
            placeholder="请选择"
            @change="change"
          ></my-select>
          <my-select
            :options="selectThirdList"
            v-model="optionId2"
            class="select-2"
            @change="thirdChange"
          ></my-select>
        </div>
      </div>
      <!-- 战队数据 -->
      <div class="team-data-form" v-if="teamDetailData.team_stat1">
        <module-title>战队数据</module-title>
        <ul class="team-list-wrapper" :class="isOpen?'open':''">
          <li v-for="(item,index) in teamDetailData.team_stat1" :key="index">
            <p class="data-value">{{item.value}}</p>
            <p class="data-lable">{{item.name}}</p>
          </li>
          <li class="open" @click="isOpen=!isOpen" v-show="game_id!=='CSGO'">
            {{isOpen?'收起':'展开'}}&nbsp;&nbsp;
            <img
              src="@/assets/images/arrow-bottom.png"
              alt
              width="8"
              v-if="!isOpen"
            />
            <img src="@/assets/images/arrow-top.png" alt width="8" v-else />
          </li>
        </ul>
      </div>
      <!-- 能力图谱 -->
      <div class="team-data-form" v-if="teamDetailData.team_stat2">
        <module-title>能力图谱</module-title>
        <div class="radar-chart" ref="radarChart"></div>
      </div>
      <!-- csgo地图详情 -->
      <div class="team-data-form" v-if="game_id==='CSGO'">
        <module-title v-if="teamDetailData.map_stat && teamDetailData.map_stat.length">地图数据</module-title>
        <ul class="map-list" v-if="teamDetailData.map_stat && teamDetailData.map_stat.length">
          <li
            class="map-item"
            :class="actived?'actived':''"
            v-for="(item,index) in teamDetailData.map_stat"
            :key="index"
          >
            <div class="map" :style="{background:`url(${item.map_cover_img}) no-repeat 0 0`}">
              <div class="map-top">
                <span class="map-name map-lable">{{item.map_name}}</span>
                <span class="win-rate map-lable">地图胜率:{{item.map_win_rate}}</span>
              </div>
              <div class="map-bottom">
                <div class="near-win">
                  <!-- <span class="map-lable">近期战术:</span>
                  <ul>
                    <li>
                      <img src="@/assets/images/win_blue.png" alt />
                    </li>
                    <li>
                      <img src="@/assets/images/win_blue.png" alt />
                    </li>
                    <li>
                      <img src="@/assets/images/lose.png" alt />
                    </li>
                    <li>
                      <img src="@/assets/images/win_blue.png" alt />
                    </li>
                    <li>
                      <img src="@/assets/images/win_blue.png" alt />
                    </li>
                  </ul>-->
                </div>
                <span class="count map-lable">使用次数:{{item.use_time}}</span>
              </div>
            </div>
            <div class="map-data">
              <ul class="map-data-top">
                <li>
                  <span class="lable">场均回合:</span>
                  <span class="data">29:22′</span>
                </li>
                <li>
                  <span class="lable">手枪局胜率:</span>
                  <span class="data">66.7%</span>
                </li>
                <li>
                  <span class="lable">先胜五轮:</span>
                  <span class="data">66.7%</span>
                </li>
              </ul>
              <div class="row-bar">
                <div class="row-bar-left">
                  <span class="lable">CT/T胜回合比:</span>
                  <div class="bar">
                    <div class="bar-ct"></div>
                    <div class="bar-t"></div>
                  </div>
                </div>
                <div class="row-bar-right">
                  <span class="ct">52.3%</span> /
                  <span class="t">52.3%</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- LOL/Dota 常用英雄 -->
      <div class="team-data-form table" v-else>
        <module-title
          v-if="teamDetailData.hero_stat.data && teamDetailData.hero_stat.data.length"
        >常用英雄</module-title>
        <ti-table
          :columns="columns"
          :tableData="teamDetailData.hero_stat.data"
          v-if="teamDetailData.hero_stat.data && teamDetailData.hero_stat.data.length"
        ></ti-table>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import MySelect from "@/components/Select";
import { mapState, mapGetters } from "vuex";
import { realFormatSecond } from "@/utils/utils";
import Empty from "@c/Empty";
import ModuleTitle from "@c/ModuleTitle";
import Module from "@/components/Module";
import TiTable from "@c/TiTable";
import "swiper/swiper.min.css";
export default {
  name: "team-data",
  components: {
    MySelect,
    Module,
    Swiper,
    SwiperSlide,
    TiTable,
    Empty,
    ModuleTitle
  },
  data() {
    var _this = this;
    return {
      id: 1,
      src: "",
      INDEX: 0,
      radarChart: {
        grid: {
          // 控制图的大小，调整下面这些值就可以，
          x: 40
        },
        tooltip: {
          show: false
        },
        legend: {
          left: "center",
          bottom: 10,
          itemGap: 40,
          itemWidth: 26,
          itemHeight: 6,
          textStyle: {
            color: "#333",
            fontSize: 14
          }
        },
        radar: {
          startAngle: 150,
          angleAxis: { clockwise: true },
          center: ["50%", "48%"],
          radius: 60,
          top: 10,
          name: {
            textStyle: {
              color: "#fff",
              fontSize: 14,
              padding: [3, 8]
            },
            rich: {
              p: {
                color: "#999",
                lineHeight: 20
              },
              a: {
                color: "#4D8AF5"
              },
              b: {
                color: "#F556A6"
              },
              span: {
                color: "#333",
                align: "center"
              }
            },
            formatter: function(value, indicator) {
              return `{span|${value.title}}\n{a|${value.home}}{p|/}{b|${value.away}}`;
            }
          },
          indicator: [],
          splitLine: {
            lineStyle: {
              color: [
                "rgba(112, 112, 112,0.5)",
                "rgba(112, 112, 112,0.5)",
                "rgba(112, 112, 112,0.5)",
                "rgba(112, 112, 112,0.5)",
                "rgba(112, 112, 112,0.5)",
                "rgba(112, 112, 112,0.5)",
                "rgba(112, 112, 112,0.5)",
                "rgba(112, 112, 112,0.5)"
              ]
            }
          },
          axisLine: {
            lineStyle: {
              color: "rgba(112, 112, 112,0.5)"
            }
          },
          splitArea: {
            show: false
          }
        },

        series: [
          {
            // name: '预算 vs 开销（Budget vs spending）',
            type: "radar",
            tooltip: {
              trigger: "item"
            },
            areaStyle: {
              opacity: 0.2
            },
            lineStyle: {
              width: 2,
              opacity: 1
            },
            symbol: "none",
            data: []
          }
        ]
      },
      mySwiper: null,
      swiperOption: {
        loop: false,
        slidesPerView: 5, //一行显示3个
        spaceBetween: 7, //间隔30
        freeMode: false,
        observer: false,
        autoUpdate: false,
        observeParents: false,
        stopOnLastSlide: false,
        disableOnInteraction: false,
        speed: 500, //滑动速度
        // 设置点击箭头
        on: {
          slideChange: function(swiper) {
            _this.INDEX = swiper.realIndex;
          }
        }
      },
      optionId: 2,
      optionId2: 1,
      selectList: [
        {
          id: 2,
          lable: "按场次"
        }
      ],
      isOpen: false,
      actived: false,
      columns: [
        {
          field: "hero_img",
          title: "英雄",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          isFrozen: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            return `<div class="avatar"><img src="${rowData[field]}"/ width="30"><span>${rowData["hero_name"]}</span></div>`;
          }
        },
        {
          field: "enter",
          title: "出场次数",
          width: 80,
          sort: "enter",
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          orderBy: "asc"
        },
        {
          field: "win_rate",
          title: "胜率",
          width: 70,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            return `<p class="br">${
              rowData["win_rate"]
            }%<br><span class="bar"><i style="width:${rowData["win_rate"] +
              "%"}"></i></span></p>`;
          }
        },
        {
          field: "first_blood",
          title: "一血率",
          width: 70,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            return `<span>${rowData["first_blood"]}%</span>`;
          }
        },
        {
          field: "first_towers",
          title: "一塔率",
          width: 70,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            return `<span>${rowData["first_towers"]}%</span>`;
          }
        },
        {
          field: "five_kills",
          title: "五杀率",
          width: 70,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            return `<span>${rowData["five_kills"]}%</span>`;
          }
        },
        {
          field: "ten_kills",
          title: "十杀率",
          width: 70,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            return `<span>${rowData["ten_kills"]}%</span>`;
          }
        },
        {
          field: "avg_time",
          title: "场均时长",
          width: 70,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "avg_kill",
          title: "场均击杀",
          width: 70,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "avg_assists",
          title: "场均助攻",
          width: 70,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "avg_die",
          title: "死亡",
          width: 70,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        }
      ],
      tableData: []
    };
  },
  computed: {
    ...mapState({
      game_id: state => state.teamDetail.game_id,
      team_id: state => state.teamDetail.team_id,
      select_type: state => state.teamDetail.select_type,
      teamDetailData: state => state.teamDetail.teamDetailData
    }),

    ...mapGetters({
      memberList: "teamDetail/get_team_members",
      selectThirdList: "teamDetail/get_select_list"
    })
  },
  //   watch: {
  //     teamDetailData: {
  //       handler({ hero_stat, team_stat2 }) {
  //         this.initChart("radarChart", team_stat2);
  //       },
  //       deep: true
  //     }
  //   },
  methods: {
    initChart(domName, team_stat2) {
      // console.log("------initChart-----",team_stat2)
      if (team_stat2) {
        let indicator = [];
        let data = [
          {
            value: [],
            name: this.$store.state.teamDetail.teamDetailTopData.team_name,
            itemStyle: {
              color: "#2AB7CA"
            },
            lineStyle: {
              color:"#4D8AF5"
            }
          },
          {
            value: [],
            name: "战队平均值",
            itemStyle: {
              color: "#F35463"
            },
            lineStyle: {
              color:"#F556A6"
            }
          }
        ];
        //let format_data = team_stat2.reverse();
        team_stat2.forEach(item => {
          let _data = [];
          let total = Number(item.a_value) + Number(item.b_value);
          let home = (Number(item.a_value) / total) * 100;
          let away = (Number(item.b_value) / total) * 100;
          

          indicator.push({
            name: {
              title: item.name,
              home:
                item.type == 2
                  ? realFormatSecond(item.a_value,1)
                  : item.a_value + "%",
              away:
                item.type == 2
                  ? realFormatSecond(item.b_value,1)
                  : item.b_value + "%",
              type: item.type
            },
            max: 100
          });
          data[0].value.push(home);
          data[1].value.push(away);
        });
        this.radarChart.radar.indicator = indicator;
        // console.log("indicator",indicator);
        this.radarChart.series[0].data = data;
        this.$nextTick(() => {
          var myChart = $echarts.init(this.$refs[domName]);
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(this.radarChart);
        });
      }
    },
    slidePrev() {
      this.$refs.mySwiper.$swiper.slidePrev();
    },
    slideNext() {
      this.$refs.mySwiper.$swiper.slideNext();
    },
    change(lable, id) {
      this.$store.dispatch("teamDetail/resetThirdSelectList", {
        select_type: id
      });
    },
    async initData() {
      await this.$store.dispatch("teamDetail/_getTeamSelectList");
      await this.$store.dispatch("teamDetail/_getTeamDataDetail");
      this.initChart("radarChart", this.teamDetailData.team_stat2);
    },
    async thirdChange(lable, id) {
      this.$store.state.teamDetail.sub_type = id;
      await this.$store.dispatch("teamDetail/_getTeamDataDetail");
      this.initChart("radarChart", this.teamDetailData.team_stat2);
    },
    routePlayer(player_id) {
      this.$router.push({
        path: "/player-detail",
        query: {
          game_id: this.game_id,
          team_id: this.team_id,
          player_id,
          t: new Date().getTime()
        }
      });
    },
    async initData() {
      await this.$store.dispatch("teamDetail/_getTeamSelectList");
      await this.$store.dispatch("teamDetail/_getTeamDataDetail");
      this.initChart("radarChart", this.teamDetailData.team_stat2);
    }
  },
  created() {
    this.initData();
  },
  mounted() {
    this.mySwiper = this.$refs["mySwiper"];
  }
};
</script>
<style lang='scss' >
.team-detail-data {
  overflow-x: hidden;
  .players-container {
    height: 168px;
    background: #fff;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
    opacity: 1;
    padding: 20px 10px;
    padding-bottom: 0;
    flex-direction: column;
    display: flex;
    position: relative;
    .players-list-box {
      padding: 0 20px;
      text-align: center;
      .player-item {
        height: 90px;
      }
      .player-wrapper {
        width: 42px;
        height: 42px;
        overflow: hidden;
      }
      .player-pic {
        width: 42px;
        height: 42px;
        .van-image__error {
          background: transparent;
          position: relative;
        }
        .default-pic {
          height: 42px;
          width: 42px;
        }
      }
      .name {
        font-size: 12px;
        font-weight: bold;
        color: #333;
        margin-top: 4px;
      }
      .posiotion {
        color: #999;
        font-size: 10px;
        margin-top: 7px;
      }
      .swiper-button {
        position: absolute;
        width: 12px;
        height: 12px;
        &.next {
          background: url("../images/swiper-button-next.png") no-repeat 0 0;
          background-size: 100% 100%;
          top: 35px;
          right: 10px;
        }
        &.prev {
          background: url("../images/swiper-button-next.png") no-repeat 0 0;
          background-size: 100% 100%;
          top: 35px;
          left: 10px;
          transform: rotateY(170deg);
        }
      }
    }

    .handler-select {
      margin-top: 0px;
      position: relative;
      z-index: 99999;
      .select-1 {
        width: 70px;
        min-height: 24px;
        float: left;
      }
      .select-2 {
        width: 245px;
        min-height: 24px;
        float: right;
      }
    }
  }
  .team-data-form {
    .team-list-wrapper {
      background: #fff;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);

      display: flex;
      flex-wrap: wrap;
      padding-top: 28px;
      position: relative;
      height: 157px;
      overflow: hidden;
      & > li {
        width: 25%;
        text-align: center;
        margin-bottom: 28px;
        .data-value {
          font-size: 14px;
          font-weight: bold;
          color: #333;
          margin-bottom: 5px;
        }
        .data-lable {
          font-size: 10px;
          color: #999999;
        }
      }
      & > li.open {
        width: 100%;
        position: absolute;
        bottom: 0;
        margin-bottom: 0;
        text-align: center;
        color: #6b7183;
        background: #fff;
        height: 25px;
      }
      &.open {
        height: auto;
      }
    }
    .radar-chart {
      width: 100%;
      height: 277px;
      background: #fff;
    }
    .map-list {
      & > .map-item {
        height: 66px;
        border-radius: 4px;
        overflow: hidden;
        transition: height 0.1s ease-in-out;
        margin-bottom: 16px;
        &.actived {
          height: 126px;
        }
        .map {
          font-size: 11px;
          height: 66px;
          padding: 10px;
          border-radius: 4px;

          .map-lable {
            color: #ffffff;
            &.win-rate,
            &.count {
              padding: 1px 4px;
              background: rgba(0, 0, 0, 0.5);
              border-radius: 9px;
            }
          }
          .map-top {
            display: flex;
            justify-content: space-between;
            .map-name {
              font-size: 12px;
            }
          }
          .map-bottom {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            .near-win {
              //padding: 1px 5px 1px 10px;
              background: rgba(0, 0, 0, 0.5);
              border-radius: 9px;
              display: flex;
              align-items: center;
              & > ul {
                display: flex;
                img {
                  width: 12px;
                }
              }
            }
          }
        }
        .map-data {
          height: 60px;
          background: #0f1e45;
          padding: 8px 10px 0 10px;
          font-size: 10px;
          color: #fff;
          .lable {
            color: #adadb4;
          }
          .map-data-top {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
          }
          .row-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .row-bar-left {
            flex: 1;
            padding-right: 6px;
            display: flex;
            align-items: center;
            .bar {
              height: 16px;
              background: red;
              flex: 1;
              margin-left: 6px;
              display: flex;
              & > div {
                height: 16px;
                &.bar-ct {
                  background: linear-gradient(270deg, #4ba2ef 0%, #1bb9d9 100%);
                  width: 30%;
                }
                &.bar-t {
                  background: linear-gradient(270deg, #f9d545 0%, #eec145 100%);
                  flex: 1;
                }
              }
            }
          }
          .row-bar-right {
            font-size: 11px;
            width: 74px;
            text-align: right;
            color: #adadb4;
            .ct {
              color: #1eb7da;
            }
            .t {
              color: #f9d545;
            }
          }
        }
      }
    }
    &.table {
      margin-right: 0;
    }
  }
  .avatar {
    display: flex;
    height: 30px;
    align-items: center;
    & > span {
      padding-left: 3px;
    }
  }
  .br {
    border-spacing: 0;
    border-collapse: separate;
    margin: 0;
    box-sizing: border-box;
    color: #666;
    line-height: 14px;
    padding-top: 7px;
    text-align: center;
    overflow: hidden;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    .bar {
      width: 58px;
      display: inline-block;
      height: 6px;
      border-radius: 3px;
      overflow: hidden;
      background: #fff;
      position: relative;
      & > i {
        position: absolute;
        left: 0;
        top: 0;
        background: #6521d7;
        border-radius: 3px;
        height: 6px;
      }
    }
  }
}
</style>