
<template>
  <div class="select-date-tab">
    <calendar-icon class="cd" />
    <van-tabs
      :style="{height:($store.state.common.secendCotentHeight)+'px'}"
      class="date-tabs"
      v-model="actived"
      line-width="0"
      :swipe-threshold="7"
      swipeable
      @change="dateChage"
    >
      <van-tab v-for="(item, index) in date_table" :title="item.lable" :key="index">
        <template #title>
          <p class="date" v-if="item.week!='今天'">{{item.fd_str}}</p>
          <p class="week">{{item.week}}</p>
        </template>
        <slot></slot>
      </van-tab>
    </van-tabs>
   
    <calendar :show.sync="$store.state.common.isShow" :mode="mode" @change="changeDate" class="calendar-box"/>
    <div class="zz-1" v-show="$store.state.common.isShow" @click="$store.state.common.isShow=false"></div>
  </div>
</template>

<script>
import CalendarIcon from "@c/Calendar";
import { mapGetters } from "vuex";
export default {
  name: "Index",
  components: { CalendarIcon},
  data() {
    return {
      actived: this.$store.state.matchList.actived,
      disabled: false,
      mode: "single",
      date: ""
    };
  },
  props: ["date_table", "type"],
  watch: {},
  methods: {
    updateDate(ymd_str) {
      $(".van-tabs__content").scrollTop(0);
      this.$store.state.matchList.game_day = ymd_str;
      this.$store.dispatch("matchList/_getMatchList");
    },
    dateChage(index) {
      this.updateDate(this.date_table[index].ymd_str);
    },
    changeDate(date) {
      this.date = date.format('YYYY-MM-DD'); 
      
      this.$store.state.common.isShow = false;
      this.updateDate(this.date);
      let flag = true;
      this.date_table.forEach((item, index) => {
        if (item.ymd_str == this.date) {
          this.actived = index;
          flag = false;
        }
      });
    }
  },
  computed: {},
  mounted() {
    document.getElementsByClassName("van-tab__pane-wrapper");
  }
};
</script>

<style lang="scss" >
.select-date-tab {
  position: relative;
  align-items: center;
  height: 100%;
  .rl {
    width: 14px;
    height: 14px;
    background: #fff;
  }
  .van-tab__text--ellipsis {
    display: inline-block !important;
  }
  .van-tabs__nav--line {
    padding-right: 50px;
    padding-left:5px;
  }
  p.date,
  p.week {
    text-align: center;
    font-size: 12px;
  }
  .van-tab--active > span {
    color: #333;
    font-weight: bold;
    font-size: 13px;
  }
  .van-tab {
    justify-content: center;
    padding: 0;
    margin-right: 2px;
    font-size: 11px;
    color: #999999;
  }
  .cd {
    position: absolute;
    top: 12px;
    right: 15px;
    z-index: 999999;
    width: 16px;
  }
  .date-tabs {
    display: flex;
    flex-direction: column;
    height: 100%;
    .van-tabs__wrap {
      height: 40px !important;
      padding: 0;
      box-sizing: none;
    }
    .van-tabs__content {
      flex: 1;
      overflow-y: auto;
    }
  }
  .calendar-box {
    position: absolute;
    left: 50%;
    top: 40px;
    z-index: 99999999;
    transform: translate(-50%,0);
  }
  .zz-1 {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999999;
  }
}
</style>
