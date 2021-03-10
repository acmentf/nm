<template>
  <Module :alt="title">
    <!-- {{data}} -->
    <div :class="$options.name" v-bind:[$options.name]="$options.version">
      <!-- <div class="team_logo">
        <MyImage v-model="data.team_img_home" :type="1" class="team" />
        <MyImage v-model="data.team_img_away" :type="1" class="team" />
      </div> v-for="(item,index) in data.home" :key="index"-->
      <!-- <table style="width:100%">
        <template v-for="(item, index) in data.role_ppgi">
          <tr class="additional" :key="index">
            <td></td>
            <td>
              <div class="tip">
                <div class="rt">
                  <template
                    v-for="(wl_item, wl_index) in item
                                            .battle_wl_info.win_lost_home"
                  >
                    <img :key="wl_index" v-if="wl_item" src="../images/win_blue.png" />
                    <img :key="wl_index" v-if="!wl_item" src="../images/lose.png" />
                  </template>
                </div>
                <span class="item-name">
                  {{
                  item.battle_wl_info.attr_name || "近期战绩"
                  }}
                </span>
                <div class="lt">
                  <template
                    v-for="(wl_item, wl_index) in item
                                            .battle_wl_info.win_lost_away"
                  >
                    <img :key="wl_index" v-if="wl_item" src="../images/win_red.png" />
                    <img :key="wl_index" v-if="!wl_item" src="../images/lose.png" />
                  </template>
                </div>
              </div>
            </td>
            <td></td>
          </tr>
          <tr>
            <td class="lt">
              <MyImage v-model="item.role_img_home" :type="3" class="hero" />
            </td>
            <td>
              <RowBar :dataList="renderDataList(item)" unit="%" style="padding:0 5px;" />
            </td>
            <td class="rt">
              <MyImage v-model="item.role_img_away" :type="3" class="hero" />
            </td>
          </tr>
          <tr class="spacing">
            <td class="lt"></td>
            <td></td>
            <td class="rt"></td>
          </tr>
        </template>
      </table>-->
      <!-- HOME -->
      <div class="home session">
        <div class="content-header">
          <div class="content-left">
            <MyImage v-model="data.team_img_home" :type="1" class="team-pic" />
            <p class="team-name">{{data.team_name_home}}</p>
          </div>
          <div class="content-right">
            <div>当前战队</div>
            <div>所有战队</div>
          </div>
        </div>
        <div class="content-body">
          <ul>
            <li v-for="(item,index) in data.home" :key="index">
              <div class="content-left">
                <MyImage v-model="item.role_img" :type="3" class="hero-pic" />
                <div class="detail">
                  <p class="hero-name">{{item.role_name}}</p>
                  <img
                    class="win-lost"
                    v-for="(_item,_index) in item.win_lost"
                    :key="_index"
                    :src="_item==1?require('../images/win_away.png'):require('../images/lose.png')"
                  />
                </div>
              </div>
              <div class="content-right">
                <div style="padding-right:8px;">
                  <row-bar-item
                    :content="{
                     value: item.current.ivalue,
                     title_left:  item.current.value,
                     title_right: item.current.ivalue+'%'
                    }"
                  ></row-bar-item>
                </div>
                <div style="padding-left:8px;">
                  <row-bar-item
                    :content="{
                     value: item.all.ivalue,
                     title_left:  item.all.value,
                     title_right: item.all.ivalue+'%'
                    }"
                  ></row-bar-item>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="away session">
        <div class="content-header">
          <div class="content-left">
            <MyImage v-model="data.team_img_away" :type="1" class="team-pic" />
            <p class="team-name">{{data.team_name_away}}</p>
          </div>
          <div class="content-right">
            <div>当前战队</div>
            <div>所有战队</div>
          </div>
        </div>
        <div class="content-body">
          <ul>
            <li v-for="(item,index) in data.away" :key="index">
              <div class="content-left">
                <MyImage v-model="item.role_img" :type="3" class="hero-pic" />
                <div class="detail">
                  <p class="hero-name">{{item.role_name}}</p>
                  <img
                    class="win-lost"
                    v-for="(_item,_index) in item.win_lost"
                    :key="_index"
                    :src="_item==1?require('../images/win_home.png'):require('../images/lose.png')"
                  />
                </div>
              </div>
              <div class="content-right">
                <div style="padding-right:8px;">
                  <row-bar-item
                    bgColor="#F35463"
                    :content="{
                     value: item.current.ivalue,
                     title_left:  item.current.value,
                     title_right: item.current.ivalue+'%'
                    }"
                  ></row-bar-item>
                </div>
                <div style="padding-left:8px;">
                  <row-bar-item
                    bgColor="#F35463"
                    :content="{
                     value: item.all.ivalue,
                     title_left:  item.all.value,
                     title_right: item.all.ivalue+'%'
                    }"
                  ></row-bar-item>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Module>
</template>

<script>
import RowBarItem from "./RowBarItem";
import Module from "@c/Module";
// import TiBarLOL from "./TiBarLOL";
export default {
  name: "TiRecord",
  version: "1.30.20201111", // 版本号
  components: { Module, RowBarItem },
  props: ["title", "data"],
  methods: {},
  data() {
    return {};
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.TiRecord {
  padding: 15px;
  width: 100%;
  // height: 536px;
  margin-bottom: 10px;
  background: #ffff;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  color: #666;
  .home {
    margin-bottom: 10px;
  }
  .content-header {
    display: flex;
  }
  .content-left {
    flex: 1;
    display: flex;
    align-items: center;
    color: #333;
    margin-bottom: 6px;
    & > img {
      width: 28px;
      height: 28px;
    }
    .team-name {
      flex: 1;
      font-size: 15px;
      font-weight: 800;
    }
    .detail {
      margin-left: 6px;
      color: #666666;
      font-size: 13px;
    }
    .hero-pic {
      width: 40px;
      height: 40px;
      border-radius: 3px;
    }
    .win-lost {
      width: 17px;
      height: 17px;
      margin-right: 2px;
      margin-top:5px;
    }
  }
  .content-right {
    width: 176px;
    display: flex;
    & > div {
      flex: 1;
      display: flex;
      align-items: center;
      color: #666666;
      font-size: 12px;
    }
  }
  .content-body {
    li {
      display: flex;
    }
  }
  .team_logo {
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    img.team-pic {
      width: 28px;
      max-height: 28px;
    }
  }
}
</style>
