<template>
  <!-- 联赛列表 -->
  <div class="ls-item">
    <span class="level">
      <img src="../images/1.png" alt width="16" v-show="index==1" />
      <img src="../images/2.png" alt width="16" v-show="index==2" />
      <img src="../images/3.png" alt width="16" v-show="index==3" />
      <span v-show="index>3">{{index}}</span>
    </span>
    <div class="middle-content">
      <p class="pm">
        <!-- <i class="pm-icon"></i>
        <span>2</span> -->
      </p>
      <div class="team-left">
        <!-- <MyImage v-model="list.team_img_url" size="33" :type="5"/> -->
        <van-image :src="list.team_img_url">
          <template v-slot:error>
            <img src="@/assets/images/team.png" alt  width="33"/>
          </template>
        </van-image>
      </div>
      <p class="name">{{list.team_name}}</p>
      <div class="team-right">
        <!-- <MyImage v-model="list.county_img_url" size="33" :type="5" /> -->
        <van-image :src="list.country_img_url" width="33">
          <template v-slot:error>
            <img src="@/assets/images/country.png" alt width="33" style="position:relative;top:-4px"/>
          </template>
        </van-image>
      </div>
    </div>
    <div class="integral">{{list.score}}</div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 1
    }
  },
  name: "ListItem",
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>

<style lang="scss" >
.ls-item {
  background: #fff;
  height: 54px;
  border-radius: 0;
  padding: 0 10px 0 12px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .level {
    color: #333;
    font-size: 11px;
    & > span {
      display: inline-block;
      width: 16px;
      height: 16px;
    }
  }
  .middle-content {
    flex: 1;
    display: flex;
    align-items: center;
    .team-left,
    .team-right {
      width: 33px;
      border-radius: 50%;
      text-align: center;
      .van-image__img{
        border-radius: 2px;
        overflow: hidden;
      }
    }

    .name {
      color: #333;
      flex: 1;
      padding-left: 10px;
      font-size:12px;
    }
    .pm {
      color: #ff4e49;
      font-size: 11px;
      margin: 0 18px;
      line-height: 20px;
      & > .pm-icon {
        display: block;
        width: 8px;
        height: 7px;
        background: url("../images/top.png") no-repeat 0 0;
        background-size: 100% 100%;
      }
    }
  }
  .integral {
    font-size: 12px;
    font-weight: 400;
    color: #333;
    width: 40px;
    text-align: right;
  }
}
</style>
