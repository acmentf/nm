<!--
  功能：直播
  作者：feikeq
  邮箱：feikeq@gmail.com
  时间：2020年11月09日 14:30:00
-->
<template>
  <div alt="直播" class="fixedContent">
    <!-- {{tabList[$store.state.matchDetail.tabListActiveName].data.roleselect_info.length_time}} -->
    <van-tabs
      v-model="$store.state.matchDetail.tabListActiveName"
      class="main-tabs"
      animated
      line-width="20px"
      :swipe-threshold="6"
      v-if="notEmpty"
      @change="tabChange"
      @rendered="tabChange"
    >
      <van-tab v-for="(item, index) in tabList" :title="item.lable" :name="index" :key="index">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <div class="content">
            <!-- {{item.data.roleselect_info}} -->
            <!-- {{item.data.roleselect_info.length_time}} -->
            <div v-if="item.data.roleselect_info && item.data.roleselect_info.length_time">
              <TiHeroDOTA :data="item.data.roleselect_info" />
              <module-title>曲线图</module-title>
              <TiEconomyDOTA
                title="经济走势图"
                v-if="item.data.economics_info && item.data.economics_info.ecolist && item.data.economics_info.ecolist.length"
                :data="item.data.economics_info"
              />
              <TiStrategyDOTA title="关键事件触发图" :data="item.data.resources_info" />
              <TiEquipDOTA title="出装与KD数据" :data="item.data.roleattribute_info" />
              <!-- <TiEventsDOTA /> -->
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
import { mapState, mapGetters, mapMutations } from "vuex";

import TiHeroDOTA from "./TiHeroDOTA";
import TiEconomyDOTA from "./TiEconomyDOTA";
import TiStrategyDOTA from "./TiStrategyDOTA";
import TiEquipDOTA from "./TiEquipDOTA";
import Empty from "@c/Empty";
import ModuleTitle from "@c/ModuleTitle";
export default {
  name: "Live",
  version: "1.309.20201112", // 自定义版本号属性
  // 局部注册的组件
  components: {
    Empty,
    TiHeroDOTA,
    TiEconomyDOTA,
    TiStrategyDOTA,
    TiEquipDOTA,
    ModuleTitle
    //   , TiEventsDOTA
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
    },
    notEmpty2() {
      if (this.tabList) {
        var _MenuItem = this.tabList[
          this.$store.state.matchDetail.tabListActiveName
        ];
        console.log("_MenuItem", _MenuItem);
        if (_MenuItem) {
          if (_MenuItem.data) {
            if (
              _MenuItem.data.roleselect_info &&
              _MenuItem.data.roleselect_info.length_time
            ) {
              return true;
            }
          }
        }
      }
      return false;
    }
  },
  data() {
    return {
      isLoading: false, //下拉刷新
      dataList: [] // 每局的数据
    };
  },

  created() {
    this.initLiveData(1, 0);
  },

  computed: {
    ...mapState({
      tabList: state => state.matchDetail.tabList,
      matchDetailTop: state => state.matchDetail.matchDetailTop,
      //   notEmpty: state => (state.matchDetail.matchDetailTop.mnl ? true : false)
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
.van-tabs__nav {
  background: transparent;
}
.fixedContent {
  height: 100%;
 
}
</style>
