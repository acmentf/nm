<!--
 * @Author: FeikeQ
 * @Date: 2020-11-21 18:20:54
 * @LastEditTime: 2020-12-09 13:50:27
 * @LastEditors: FeikeQ
 * @FilePath: /ti-wap/src/views/MatchDetail/Lol/components/Lineup/index.vue
 * @Description: 
-->
<template>
  <div class="fixedContent" :class="$options.name" v-bind:[$options.name]="$options.version">
    <van-tabs class="main-tabs" animated line-width="20px" :swipe-threshold="6" v-if="notEmpty"  @change="tabChange">
      <van-tab v-for="(item, index) in tabList" :title="item.lable" :key="index" >
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="content">
          <div v-if="item">
            <TiBarLOL title="队伍数据对比" :data ="item.lineup.rcffj_list" class="TiBarLOL"/>
            <br/>
            <TiProbability title="胜率一血率等排名数据" :data ="item.lineup.battle_info" v-model="tabIndex"/>
            <TiRecord v-if="item.lineup.battle_info" :title="item.lineup.battle_info[tabIndex].page_top.page_name||'战绩比对'" :data ="item.lineup.battle_info[tabIndex].page_down" />
          </div>
        </div>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <div v-else>
        <Empty EmptyType="2">暂无阵容数据</Empty>
    </div>


  </div>
</template>

<script>
import {mapState} from "vuex";
import TiBarLOL from "./TiBarLOL";
import TiProbability from "./TiProbability";
import TiRecord from "../../../components/TiRecord";
import Empty from "@c/Empty"
export default {
  name: "Lineup",
  version: "1.30.20201111", // 版本号
    
  components: {Empty, TiBarLOL ,TiProbability,TiRecord},
  
  methods: {
      onRefresh(){
            // 下拉刷新的方法
            var _idx = this.$store.state.matchDetail.tabListActiveName;
            this.initLineupData(this.tabList[_idx].box_num,_idx);
        },
      tabChange(index, title){
        this.initLineupData(this.tabList[index].box_num,index);
      },
      initLineupData(box_num,index){
          var _this =this;
          var _params = {
             box_num,
             index,
             callback:function(){
                _this.isLoading = false; 
            }
          };
        this.$store.dispatch("matchDetail/_matchDetailBattleArray",_params );
      }
  },
  data() {
    return {
        isLoading: false, //下拉刷新
        tabIndex:0,
    };
  },
  created(){
    this.initLineupData(1,0)
  },
  computed:{
    ...mapState({
      tabList: state=> state.matchDetail.tabList,
      matchDetailTop: state=> state.matchDetail.matchDetailTop,
      notEmpty: state => state.matchDetail.matchDetailTop.mnl ? state.matchDetail.matchDetailTop.mnl.round : 0
    })
  },
  mounted() {},
  watch: {}
};

</script>

<style scope lang="scss">
 .TiBarLOL{
  margin-top:10px;
 }
</style>