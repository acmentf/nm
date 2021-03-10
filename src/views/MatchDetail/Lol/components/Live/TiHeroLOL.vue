<!--
  功能：英雄选择HeroLOL组件
  作者：feikeq
  邮箱：feikeq@gmail.com
  时间：2020年11月07日 14:30:00
-->
<template>
  <div :class="$options.name" alt="LOL英雄选择组件" v-bind:[$options.name]="$options.version">
    <table v-if="data">
      <tr style="height: 10px;">
        <td width="10%" class="logo"></td>
        <td width="15%" class="team"></td>
        <td width="10%" class="color"></td>
        <td width="7%" class="score home"></td>
        <td width="2%"></td>
        <td width="12%"></td>
        <td width="2%"></td>
        <td width="7%" class="score away"></td>
        <td width="10%" class="color"></td>
        <td width="15%" class="team"></td>
        <td width="10%" class="logo"></td>
      </tr>
      <tr style="height:26px;">
        <td width="10%" class="logo">
          <MyImage v-model="data.team_logo_home" :type="1" />
        </td>
        <td colspan="3" class="team">
          <p style="text-align:left;">{{data.teamAE_home || "[主队]"}}</p>
        </td>
        <td width="2%"></td>
        <td width="12%"></td>
        <td width="2%"></td>
        <td colspan="3" width="15%" class="team">
          <p style="text-align:right;">{{data.teamAE_away || "[客队]"}}</p>
        </td>
        <td width="10%" class="logo">
          <MyImage v-model="data.team_logo_away" :type="1" />
        </td>
      </tr>
      <tr style="height:26px;">
        <td colspan="2"></td>
        <td width="10%" class="color">
          <dd class="blue"></dd>
        </td>
        <td width="7%" class="score home">{{data.home_kill || 0}}</td>
        <td width="2%"></td>
        <td
          width="12%"
          style="font-size:14px;color: #666;"
        >{{data.length_time? $realFormatSecond(data.length_time): '00:00'}}</td>
        <td width="2%"></td>
        <td width="7%" class="score away">{{data.away_kill || 0}}</td>
        <td width="10%" class="color">
          <dd class="red"></dd>
        </td>
        <td colspan="2"></td>
      </tr>
      <tr style="height:5px;">
        <td width="10%" class="logo"></td>
        <td width="15%" class="team"></td>
        <td width="10%" class="color"></td>
        <td width="7%" class="score"></td>
        <td width="2%"></td>
        <td width="12%"></td>
        <td width="2%"></td>
        <td width="7%" class="score"></td>
        <td width="10%" class="color"></td>
        <td width="15%" class="team"></td>
        <td width="10%" class="logo"></td>
      </tr>
      <tr>
        <td colspan="5">
          <div class="hero_ico gray" style="text-align:left;">
            <MyImage
              v-for="(h_item, h_index) in data.role_ban_home.role_list"
              :key="h_index"
              v-model="data.role_ban_home.role_list[h_index]"
              :type="3"
            />
          </div>
        </td>
        <td style="font-size:14px;color: #999;">Ban</td>
        <td colspan="5">
          <div class="hero_ico gray" style="text-align:right;">
            <MyImage
              v-for="(h_item, h_index) in data.role_ban_away.role_list"
              :key="h_index"
              v-model="data.role_ban_away.role_list[h_index]"
              :type="3"
            />
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="5">
          <div class="hero_ico" style="text-align:left;">
            <MyImage
              v-for="(h_item, h_index) in data.role_pick_home.role_list"
              :key="h_index"
              v-model="data.role_pick_home.role_list[h_index]"
              :type="3"
            />
          </div>
        </td>
        <td style="font-size:14px;color: #6521D7">Pick</td>
        <td colspan="5">
          <div class="hero_ico" style="text-align:right;">
            <MyImage
              v-for="(h_item, h_index) in data.role_pick_away.role_list"
              :key="h_index"
              v-model="data.role_pick_away.role_list[h_index]"
              :type="3"
            />
          </div>
        </td>
      </tr>

      <tr style="height: 2px;">
        <td width="10%"></td>
        <td width="15%"></td>
        <td width="10%"></td>
        <td width="7%"></td>
        <td width="2%"></td>
        <td width="12%"></td>
        <td width="2%"></td>
        <td width="7%"></td>
        <td width="10%"></td>
        <td width="15%"></td>
        <td width="10%"></td>
      </tr>

      <tr style="vertical-align: top;">
        <td colspan="5">
          <div class="label blue">
            <i v-for="(t_item, t_index) in data.team_home" :key="t_index">{{t_item}}</i>
          </div>
        </td>
        <td></td>
        <td colspan="5">
          <div class="label red">
            <i v-for="(t_item, t_index) in data.team_away" :key="t_index">{{t_item}}</i>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "TiHeroLOL",
  version: "1.30.20201107", // 版本号
  // 组件参数 接收来自父组件的数据
  props: ["data"],
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.TiHeroLOL {
  margin-top: 10px;
  padding: 0 5px;
  background: #fff;
  // box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15);

  table {
    width: 100%;
    overflow: hidden;
    table-layout: fixed;
    border-collapse: collapse;
    text-align: center;

    td {
      // box-sizing: border-box; //debug
      // border:1px solid red ;
      .hero_ico {
        width: 100%;
        img {
          width: 25px;
          border-radius: 4px;
          margin: 2px;
        }
        &.gray {
          filter: Gray;
          -webkit-filter: grayscale(100%);
        }
      }
    }
    td.logo {
      img {
        width: 28px;
        height: 28px;
        object-fit: contain;
      }
    }
    td.team {
      & > p {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      font-size: 15px;
      font-weight: 400;
    }
    td.color {
      dd {
        display: inline-block;
        width: 34px;
        height: 8px;
        border-radius: 8px;
      }
      dd.blue {
        background: #2AB7CA;
      }
      dd.red {
        background: #F35463;
      }
    }
    td.score {
      text-align: center;
      font-size: 18px;
      font-weight: 800;
      &.home {
        color: #2AB7CA;
      }
      &.away {
        color: #F35463;
      }
    }
  }

  .label {
    width: 100%;
    padding: 2px 2px 10px 4px;
    i {
      height: 16px;
      line-height: 16px;
      padding: 1px 5px;
      display: inline-block;
      font-weight: normal;
      font-style: normal;
      text-align: center;
      font-size: 12px;
      border-radius: 1px;
      margin: 2px;
    }
  }
  .label.blue {
    text-align: left;
    i {
      background: #2AB7CA;
    }
  }
  .label.red {
    text-align: right;
    i {
      background: #F35463;
    }
  }
}
</style>