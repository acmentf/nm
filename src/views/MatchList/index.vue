<template>
  <div class="match-wrapper">
    <MainTabs :dataList="matchStateList">
      <!-- 全部 -->
      <van-pull-refresh
        v-model="$store.state.matchList.isLoading"
        @refresh="onRefresh"
        slot="list0"
        style="min-height:100%"
      >
        <ul v-if="matchStateList[0].list.length && matchStateList[0].listShow" class="list-wrapper">
          <li v-for="_item in matchStateList[0].list" :key="_item.group_name">
            <p class="date" v-if="!isFilter || _item.isShow">{{_item.group_str}}</p>
            <MatchItem
              v-show="!isFilter || __item.show"
              v-for="(__item,__index) in _item.group_item"
              :key="__index"
              :item_data="__item"
              :dateStr="_item.group_str"
            />
          </li>
        </ul>
        <match-empty v-else :EmptyType="1" style="position:relative;top:54px;">暂无比赛， 请查看其他比赛</match-empty>
      </van-pull-refresh>
      <!-- 进行中 -->
      <van-pull-refresh
        v-model="$store.state.matchList.isLoading"
        @refresh="onRefresh"
        slot="list1"
        style="min-height:100%"
      >
        <ul
          v-if="matchStateList[1].list.length&& matchStateList[1].listShow"
          class="list-wrapper"
          style="padding-top:10px"
        >
          <li v-for="_item in matchStateList[1].list" :key="_item.group_name">
            <MatchItem
              v-show="!isFilter || __item.show"
              v-for="(__item,__index) in _item.group_item"
              :key="__index"
              :item_data="__item"
              :dateStr="_item.group_str"
            />
          </li>
        </ul>
        <match-empty v-else :EmptyType="1" style="position:relative;top:54px;">暂无比赛， 请查看其他比赛</match-empty>
      </van-pull-refresh>
      <!-- 赛程 -->
    
      <select-date-tabs slot="list2" :date_table="scheduleDate">
        
        <van-pull-refresh v-model="$store.state.matchList.isLoading" @refresh="onRefresh">
          <div style="min-height:68vh">
           
            <ul
              v-if="matchStateList[2].list.length&& matchStateList[2].listShow"
              class="list-wrapper"
            >
              <li v-for="_item in matchStateList[2].list" :key="_item.group_name">
                <p class="date" v-if="!isFilter || _item.isShow">{{_item.group_str}}</p>
                <MatchItem
                  v-show="!isFilter || __item.show"
                  v-for="(__item,__index) in _item.group_item"
                  :key="__index"
                  :item_data="__item"
                  :dateStr="_item.group_str"
                />
              </li>
            </ul>
            <match-empty v-else :EmptyType="1" style="position:relative;top:54px;">暂无比赛， 请查看其他比赛</match-empty>
          </div>
        </van-pull-refresh>
      </select-date-tabs>
      <!-- 赛果 -->
      <select-date-tabs slot="list3" :date_table="resultsDate" :type="1">
        <van-pull-refresh v-model="$store.state.matchList.isLoading" @refresh="onRefresh">
          <div style="min-height:68vh">
            <ul
              v-if="matchStateList[3].list.length&& matchStateList[3].listShow"
              class="list-wrapper"
            >
              <li v-for="_item in matchStateList[3].list" :key="_item.group_name">
                <p class="date" v-if="!isFilter || _item.isShow">{{_item.group_str}}</p>
                <MatchItem
                  v-show="!isFilter || __item.show"
                  v-for="(__item,__index) in _item.group_item"
                  :key="__index"
                  :item_data="__item"
                  :dateStr="_item.group_str"
                />
              </li>
            </ul>
            <match-empty v-else :EmptyType="1" style="position:relative;top:54px;">暂无比赛， 请查看其他比赛</match-empty>
          </div>
        </van-pull-refresh>
      </select-date-tabs>
      <!-- 关注 -->
      <!-- <div slot="list4">
        <ul v-if="matchStateList[4].list.length&& matchStateList[4].listShow" class="list-wrapper">
          <li v-for="_item in matchStateList[4].list" :key="_item.group_name">
            <p class="date" v-if="!isFilter || _item.isShow">{{_item.group_str}}</p>
            <MatchItem
              v-show="!isFilter || __item.show"
              v-for="(__item,__index) in _item.group_item"
              :key="__index"
              :item_data="__item"
              :dateStr="_item.group_str"
            />
          </li>
        </ul>
        <match-empty v-else :EmptyType="3">还没有关注，去找找您喜欢的比赛关注吧</match-empty>
      </div>-->
    </MainTabs>
    <van-dialog
      v-model="$store.state.matchList.filterSwitch"
      title="赛事筛选"
      :show-confirm-button="false"
      :close-on-click-overlay="true"
    >
      <MatchFilter v-if="leagueList.length" />
      <match-empty v-else :EmptyType="1" style="position:relative;top:-60px;">暂无赛事</match-empty>
    </van-dialog>
  </div>
</template>
<script>
import MatchItem from "@c/MatchItem";
import MainTabs from "@c/MainTabs";
import MatchEmpty from "@c/Empty";
import Tabs from "@c/Tabs";
import SelectDateTabs from "@c/SelectDate";
import { mapState, mapGetters } from "vuex";
import MatchFilter from "./components/MatchFilter";
export default {
  components: {
    MainTabs,
    Tabs,
    MatchItem,
    MatchEmpty,
    SelectDateTabs,
    MatchFilter
  },
  data() {
    return {
      active: 0,
      tabs: [{}],
      timer: null
    };
  },
  computed: {
    ...mapState({
      matchStateList: state => state.matchList.matchStateList,
      resultsDate: state => state.common.resultsDate,
      scheduleDate: state => state.common.scheduleDate,
      isFilter: state => state.matchList.isFilter,
      leagueList: state => state.matchList.leagueList
    })
  },
  created() {
    this.$store.dispatch("matchList/_getMatchList");
    //轮询每隔3分钟请求一次最近数据
    this.timer = setInterval(() => {
      this.$store.dispatch("matchList/_getMatchList");
    }, 3 * 60 * 1000);
  },
  methods: {
    onRefresh() {
      this.$store.dispatch("matchList/_getMatchList");
    }
  },
  mounted() {},
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>

<style  lang="scss">
.match-wrapper {
  .list-wrapper {
    padding-bottom: 10px;
    & > li {
      .match-item {
        margin-bottom: 0px;
        &:last-child {
          margin-bottom: 0px;
        }
      }
    }
    .date {
      height: 36px;
      text-align: left;
      color: #aaaaaa;
      font-size: 11px;
      margin-left: 15px;
      display: flex;
      align-items: center;
    }
  }
  .van-dialog__header {
    color: #333;
    font-size: 14px;
  }
}
</style>