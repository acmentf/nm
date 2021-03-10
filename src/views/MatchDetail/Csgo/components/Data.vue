<template>
  <!-- 数据 -->
  <div class="data">
    <van-tabs
      class="main-tabs"
      background="#fff"
      ref="tabs"
      line-width="20px"
      :swipe-threshold="6"
      v-model="$store.state.matchDetail.tabListActiveName"
      v-if="tabList.length"
      @change="_matchDetailLiveVideo"
      @rendered="_matchDetailLiveVideo"
    >
      <van-tab v-for="(item, index) in tabList" :title="item.lable" :name="index" :key="index">
        <div class="content" v-if="item.data.mmi">
          <div class="wrapper">
            <!-- 总述 -->
            <div class="overview">
              <ul>
                <li class="table-head" v-for="(_item,_index) in item.data.mmi.total" :key="_index">
                  <p class="first">{{_item.title|ellipsis(6)}}</p>
                  <p class="home-box">
                    <span v-show="_index !==0">{{_item.value_home}}</span>
                    <MyImage
                      class="pic"
                      :size="_index==0 ? 19:14"
                      :value="__item"
                      v-for="(__item,__index) in _item.img_homes"
                      :key="__index"
                    />
                  </p>
                  <p class="away-box">
                    <span v-show="_index !==0">{{_item.value_away}}</span>
                    <MyImage
                      :size="_index==0 ? 19:14"
                      class="pic"
                      :value="__item"
                      v-for="(__item,__index) in _item.img_aways"
                      :key="__index"
                    />
                  </p>
                </li>
              </ul>
            </div>
            <!-- 击杀数据 -->
            <div class="js-data">
              <div class="home-js-data">
                <span v-for="(_item,_index) in  item.data.mmi.score_home" :key="_index">
                  <van-image
                    :src="_item.img_url"
                    v-if="_index==0"
                    style="width:44px;margin-right:16px"
                  >
                    <template v-slot:error>
                      <img src="@/assets/images/team.png" alt width="44" />
                    </template>
                  </van-image>

                  <van-image :src="_item.img_url" v-if="_index!=0" style="width:16px">
                    <template v-slot:error>
                      <img src="@/assets/images/null.png" alt width="16" />
                    </template>
                  </van-image>
                </span>
              </div>
              <span class="vs">VS</span>
              <div class="away-js-data">
                <span v-for="(_item,_index) in  item.data.mmi.score_away" :key="_index">
                  <van-image
                    :src="_item.img_url"
                    v-if="_index!==item.data.mmi.score_away.length-1"
                    style="width:16px"
                  >
                    <template v-slot:error>
                      <img src="@/assets/images/null.png" alt width="16" />
                    </template>
                  </van-image>
                  <van-image
                    :src="_item.img_url"
                    v-if="_index==item.data.mmi.score_away.length-1"
                    style="width:44px;margin-left:16px"
                  >
                    <template v-slot:error>
                      <img src="@/assets/images/team.png" alt width="44" />
                    </template>
                  </van-image>
                </span>
              </div>
            </div>
            <!-- 上半场 -->
            <div class="middle-top middle">
              <ul>
                <li class="head" v-for="(item,index) in item.data.mmi.first_half" :key="index">
                  <span v-if="index==0" class="title">{{item.title}}</span>
                  <div v-else>{{item.title}}</div>

                  <p>
                    <van-image
                      :src="item.img_home"
                      class="pic"
                      v-show="index==0"
                      style="width:19px"
                    >
                      <template v-slot:error>
                        <img src="@/assets/images/team.png" alt width="19" />
                      </template>
                    </van-image>
                    <van-image
                      :src="item.img_home"
                      class="pic"
                      v-show="item.img_home && index!==0"
                      style="width:14px"
                    >
                      <template v-slot:error>
                        <img src="@/assets/images/null.png" alt width="14" />
                      </template>
                    </van-image>
                  </p>
                  <p>
                    <van-image
                      :src="item.img_away"
                      class="pic"
                      v-show="index==0"
                      style="width:19px"
                    >
                      <template v-slot:error>
                        <img src="@/assets/images/team.png" alt width="19" />
                      </template>
                    </van-image>
                    <van-image
                      :src="item.img_away"
                      class="pic"
                      v-show="item.img_away && index!==0"
                      style="width:14px"
                    >
                      <template v-slot:error>
                        <img src="@/assets/images/null.png" alt width="14" />
                      </template>
                    </van-image>
                  </p>
                </li>
              </ul>
            </div>
            <div class="middle-buttom middle">
              <ul>
                <li class="head" v-for="(item,index) in item.data.mmi.secend_half" :key="index">
                  <span v-if="index==0" class="title">{{item.title}}</span>
                  <div v-else>{{item.title}}</div>
                  <p>
                    <van-image
                      :src="item.img_home"
                      class="pic"
                      v-show="index==0"
                      style="width:19px"
                    >
                      <template v-slot:error>
                        <img src="@/assets/images/team.png" alt width="19" />
                      </template>
                    </van-image>
                    <van-image
                      :src="item.img_home"
                      class="pic"
                      v-show="item.img_home && index!==0"
                      style="width:14px"
                    >
                      <template v-slot:error>
                        <img src="@/assets/images/null.png" alt width="14" />
                      </template>
                    </van-image>
                  </p>
                  <p>
                    <van-image
                      :src="item.img_away"
                      class="pic"
                      v-show="index==0"
                      style="width:19px"
                    >
                      <template v-slot:error>
                        <img src="@/assets/images/team.png" alt width="19" />
                      </template>
                    </van-image>
                    <van-image
                      :src="item.img_away"
                      class="pic"
                      v-show="item.img_away && index!==0"
                      style="width:14px"
                    >
                      <template v-slot:error>
                        <img src="@/assets/images/null.png" alt width="14" />
                      </template>
                    </van-image>
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <!-- 赛后数据 -->
          
          <Module title class="after-data" v-if="tableData.length">
            <Table
              titleBgColor="#2AB7CA"
              :tableData="tableData"
              :columns="columns"
              is-horizontal-resize
            />
          </Module>
        </div>
      </van-tab>
    </van-tabs>
    <Empty :EmptyType="2" v-else>暂无数据，看看其他的数据吧~</Empty>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Module from "@c/Module";
import Table from "@c/TiTable";
import Empty from "@c/Empty";
export default {
  name: "Data",
  data() {
    return {
      actived: 0,
      // tabList: [{ lable: "第一局" }],
      url: "",
      isLoading: false,
      tableData: [],
      columns: [],
      home: {},
      away: {}
    };
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
    _matchDetailLiveVideo(index, title) {
      $(".data .van-tabs__content").animate({ scrollTop: 0 }, 10);
      this.initLiveData(this.tabList[index].box_num, index);
    },
    initLiveData(box_num, index) {
      var _this = this;
      var _params = {
        box_num,
        index,
        callback: data => {
          _this.isLoading = false;
          let { away, home } = data.uami;
          this.away = away;
          this.home = home;
          this.columns = [];
          this.tableData = [];
          if (!home.title) {
            return false;
          }
          home.title.forEach((item, index) => {
            this.columns.push({
              field: index,
              title:
                index !== 0
                  ? `<span style="font-size:11px;color:#fff">${item}</span>`
                  : `<img src="${
                      home.img_url
                    }" width="26"><span style="font-size:13px;padding-left:4px;color:#fff">${item.slice(
                      0,
                      4
                    ) + "..."}</span>`,
              width: index == 0 ? 110 : 55,
              titleAlign: "center",
              columnAlign: "center",
              formatter: function(rowData, rowIndex, pagingIndex, field) {
                if (field == 0) {
                  if (typeof rowData[field] == "object") {
                    return `<img src="${rowData[field][0]}" width="26"><span style="font-size:13px;padding-left:4px;">${rowData[field][1]}</span>`;
                  }
                } else if (field == 5 || field == 7) {
                  if (Number(rowData[field])) {
                    return rowData[field] > 0
                      ? `<b style="color:#E93535">+${rowData[field]}</b>`
                      : `<b style="color:#35E9B8">${rowData[field]}</b>`;
                  }
                } else {
                  return `<span style="color:#BCBCBC">${rowData[field]}</span>`;
                }
                return rowData[field];
              },
              isFrozen: index == 0
            });
          });
          if (home.value.length) {
            this.tableData.push(...home.value);
            var _title = [...away.title];
            _title[0] = [away.img_url, _title[0]];
            _title.__tableTrBg = "red";
            this.tableData.push(_title);
            this.tableData.push(...away.value);
          }
        }
      };
      this.$store.dispatch("matchDetail/_matchDetailLiveVideo", _params);
    }
  },
  components: { Empty, Module, Table },
  computed: {
    ...mapState({
      tabList: state => state.matchDetail.tabList
    }),
    renderTableData() {
      return this.tabList;
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang="scss">
.data {
  height: 100%;
  .main-tabs {
    height: 100%;
    display: flex;
    flex-direction: column;
    & > .van-tabs__content {
      flex: 1;
      overflow-y: auto;
    }
  }
  .van-tabs__wrap {
    margin-top: 10px;
  }
  .wrapper {
    margin-top: 10px;
    width: 375px;
    .overview {
      height: 100px;
      background: #fff;
      padding: 8px 15px;
      & > ul {
        height: 100%;
        display: flex;
        li {
          font-size: 10px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p {
            flex: 1;
            width: auto;
            display: flex;
            align-items: center;
            width: 100%;
            justify-content: left;

            & > span {
              margin-right: 3px;
            }
            & > .pic {
              margin-right: 3px;
            }
            &.home-box {
              color: #2AB7CA;
              padding-left: 10px;
              margin-bottom: 8px;
              font-weight: bold;
            }
            &.away-box {
              color: #F35463;
              padding-left: 10px;
              font-weight: bold;
            }
            &.first {
              color: #999;
              padding-bottom: 8px;
              margin-bottom: 8px;
              border-bottom: 1px solid #dddddd;
            }
          }
        }
        .home-data {
          margin-top: 18px;
        }
        .away-data {
          margin-top: 10px;
        }
      }
    }
    .js-data {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      align-items: center;
      padding: 10px 15px;
      background: #fff;

      .vs {
        color: #aaa;
        font-size: 13px;
        font-weight: bold;
        padding: 0 22px;
      }
      & > div {
        flex: 1;
        display: flex;
        align-items: center;
        & > span {
          flex: 1;
        }
        &.home-js-data {
          .team-pic {
            margin-right: 17px;
          }
        }
        &.away-js-data {
          .team-pic {
            margin-left: 17px;
          }
        }
      }
    }
    .middle {
      height: 102px;
      background: #fff;
      box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
      padding: 10px;
      & > ul {
        display: flex;
        height: 100%;
        li {
          flex: 1;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-content: center;
          & > p {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          & > span {
            display: flex;
            width: 36px;
            margin-bottom: 10px;
          }
          & > div {
            color: #aaa;
            margin-bottom: 10px;
          }
        }
      }
      &.middle-buttom {
        .title {
          color: #aaa;
        }
      }
      &.middle-top {
        .title {
          color: #aaa;
        }
      }
    }
  }

  .red {
    span {
      color: #fff !important;
    }
  }
  .after-data {
    //width:375px;
  }
}
</style>
