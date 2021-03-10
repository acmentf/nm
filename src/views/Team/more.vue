<!--
  功能：战队详情资料查看更多
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2020年12月31日 09:35:31
-->
<template>
  <div class="more">
    <app-nav :callBack="back">
      <span slot="title">赛事荣誉</span>
    </app-nav>
    <div class="more-content-wrapper">
      <div class="prize-count">
        <img src="./images/jt.png" alt width="100%" />
        <span class="first">{{honorData.first_num}}</span>
        <span class="second">{{honorData.second_num}}</span>
        <span class="third">{{honorData.third_num}}</span>
      </div>
      <div class="more-content">
        <div class="prize-table">
          <div class="title">
            <span>名次</span>
            <span>奖金</span>
            <span>赛事</span>
          </div>
          <ul class="table-list">
            <li v-for="(item,index) in honorData.honor" :key="index">
              <div class="label">
                <img :src="item.rank_img" alt width="18" />
                <span>{{item.ranking}}</span>
              </div>
              <div class="money">{{item.price}}</div>
              <div class="league">{{item.tournament_name}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppNav from "@c/AppNav";
import { mapState } from "vuex";
export default {
  name: "",
  components: { AppNav },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      honorData: state => state.teamDetail.teamDetailHonor
    })
  },
  watch: {},
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  created() {
    let { team_id, game_id } = this.$route.query;
    this.$store.dispatch("teamDetail/_getTeamDetailHonor", {
      team_id: Number(team_id),
      game_id
    });
  },
  mounted() {}
};
</script>
<style lang='scss' scoped>
.more {
  width: 100vw;
  height: 100vh;
 
  & > div.more-content-wrapper {
    position: absolute;
    top: 52px;
    bottom: 0;
    width: 100%;
    display: flex;
  
    flex-direction: column;
    .prize-count {
      position: relative;
      top:26px;
      & > span {
        position: absolute;
        &.first {
          font-size: 60px;
          font-weight: 400;
          line-height: 80px;
          color: #ffe343;
          text-shadow: 0px 2px 3px #ff6600;
          opacity: 1;
          left: 170px;
          top: 71px;
        }
        &.second {
          font-size: 40px;
          line-height: 53px;
          color: #f1f3ff;
          text-shadow: 0px 2px 3px #6d7fe9;
          left: 50px;
          top: 107px;
        }
        &.third {
          font-size: 40px;
          font-weight: 400;
          line-height: 53px;
          color: #f9a056;
          text-shadow: 0px 2px 3px #f9a056;
          right: 50px;
          top: 121px;
        }
      }
    }
    .more-content {
      flex: 1;
      overflow-y: auto;
      margin-top:26px;
      .prize-table {
        display: flex;
        flex-direction: column;
        height: 100%;
        .title {
          display: flex;
          justify-content: space-between;
          color: #aaa;
          font-size: 10px;
          padding: 10px;
        }
        .table-list {
          overflow-y: auto;
          flex: 1;
          background: #fff;
          & > li {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            border-radius: 6px;
            margin-bottom: 10px;
            color: #333;
            & > div {
              flex: 1;
              &:nth-child(2) {
                text-align: center;
              }
              &:nth-child(3) {
                text-align: right;
              }
              &.money {
                display: flex;
                align-items: center;
                justify-content: center;
                color:#FBB13C;
              }
              &.league{
                font-weight: bold;
              }
            }
            &:nth-child(even) {
              background: transparent;
              box-shadow: none;
            }
            .label {
              display: flex;
              align-items: center;
              img {
                margin-right: 6px;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
}
</style>