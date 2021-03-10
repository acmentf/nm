<!--
  功能：直播
  作者：feikeq
  邮箱：feikeq@gmail.com
  时间：2020年11月09日 14:30:00
-->
<template>
  <div alt="直播" class="fixedContent">
    <van-tabs
      v-model="$store.state.matchDetail.tabListActiveName"
      class="main-tabs"
      animated
      line-width="20px"
      :swipe-threshold="5"
      v-if="notEmpty"
      @change="tabChange"
      @rendered="tabChange"
    >
      <van-tab v-for="(item, index) in tabList" :name="index" :title="item.lable" :key="index">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <div class="content">
            <div v-if="item.data.roleselect_info && item.data.roleselect_info.length_time">
              <TiHeroLOL :data="item.data.roleselect_info" />
              <module-title>曲线图</module-title>
              <TiEconomyLOL
                title="经济走势图"
                v-if="item.data.economics_info && item.data.economics_info.ecolist && item.data.economics_info.ecolist.length"
                :data="item.data.economics_info"
              />
              <TiStrategyLOL title="关键事件触发图" :data="item.data.resources_info" />
              <TIEquipLOL title="出装与KD数据" :data="item.data.roleattribute_info" />
              <!-- <TiEventsLOL /> -->
            </div>
            <div v-else>
              <Empty EmptyType="2">暂无本局相关数据</Empty>
            </div>
          </div>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <Empty v-if="!notEmpty" EmptyType="2">暂无数据</Empty>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TiHeroLOL from "./TiHeroLOL";
import TiEconomyLOL from "./TiEconomyLOL";
import TiStrategyLOL from "./TiStrategyLOL";
import TIEquipLOL from "./TIEquipLOL";
import TiEventsLOL from "./TiEventsLOL";
import Empty from "@c/Empty";
import ModuleTitle from "@c/ModuleTitle"
export default {
  name: "Live",
  version: "1.309.20201112", // 自定义版本号属性
  // 局部注册的组件
  components: {
    TiHeroLOL,
    TiEconomyLOL,
    TiStrategyLOL,
    TIEquipLOL,
    Empty,
    TiEventsLOL,
    ModuleTitle
  },
  props: {},
  methods: {
    onRefresh() {
      // 下拉刷新的方法
      var _idx = this.$store.state.matchDetail.tabListActiveName;
      this.initLiveData(this.tabList[_idx].box_num, _idx);
    },
    tabChange(index, title) {
      this.initLiveData(this.tabList[index].box_num, index);
    },
    initLiveData(box_num, index) {
      var _this = this;
      var _params = {
        box_num,
        index,
        callback: function() {
          _this.isLoading = false;
        }
      };
      this.$store.dispatch("matchDetail/_matchDetailLiveVideo", _params);
    }
  },
  data() {
    // console.log("11111111111111")
    return {
      isLoading: false, //下拉刷新
      dataList: [], // 每局的数据
      activeName: this.$store.state.matchDetail.tabListActiveName
    };
  },
  created() {
    // this.initLiveData(1,0)
  },
  computed: {
    ...mapState({
      tabList: state => state.matchDetail.tabList,
      //   activeName: state=> state.matchDetail.tabListActiveName,
      matchDetailTop: state => state.matchDetail.matchDetailTop,
      notEmpty: state =>
        state.matchDetail.matchDetailTop.mnl
          ? state.matchDetail.matchDetailTop.mnl.round
          : 0
    })
  },
  mounted() {},
  watch: {}
};
</script>
<!-- 
使用 scoped 后，父组件的样式将不会渗透到子组件中。
不过一个子组件的根节点会同时受其父组件的 scoped CSS 和子组件的 scoped CSS 的影响。
这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式
-->
<style lang="scss" >
</style>
