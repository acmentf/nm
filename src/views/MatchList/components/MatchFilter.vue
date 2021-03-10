<template>
  <!-- 条件筛选 -->
  <div class="filter-wrapper">
    <ul class="league-list">
      <li
        v-for="(item,index) in leagueList"
        :key="index"
        :class="item.selected ? 'select':''"
        @click="selectToggle(item,index)"
      >
        <span class="zw">
          <img src="../images/select.png" alt v-show="item.selected" />
        </span>
        <p class="league-name">{{item.name}}</p>
        <span class="status">
          <span v-show="$store.state.matchList.game_status!==2">{{item.now}}</span>
          <span v-show="$store.state.matchList.game_status!==2">/</span>
          <span>{{item.total}}</span>
        </span>
      </li>
    </ul>
    <div class="handle-btns">
      <span class="select-class">
        <span class="all" @click="selectAll">全选</span>
        <span class="back" @click="selectBack">反选</span>
      </span>
      <span class="sure" @click="sure">确定</span>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "MatchFilter",
  data() {
    return {
    };
  },
 
  methods: {
    selectToggle(item, index) {
      item.selected = !item.selected;
    },
    selectAll(){
      this.leagueList.map(item=>item.selected = true)
    },
    selectBack(){
      this.leagueList.map(item=>item.selected = !item.selected);
    },
    sure(){
      //获取ids
      let ids = [];
      this.leagueList.forEach(item=>{
        if(item.selected) {
          ids.push(item.id)
        }
      })

      //this.$store.state.matchList.tournament_ids = tournament_ids;
      this.$store.dispatch('matchList/_filterMatchList',ids)
    }
  },
  computed:{
    ...mapState({
      leagueList: state=> state.matchList.leagueList
    })
  }
};
</script>

<style lang="scss" scoped>
.filter-wrapper {
  padding: 20px;
  .league-list {
    height:250px;
    overflow-y:auto;
    & > li {
      height: 22px;
      align-items: center;
      display: flex;
      margin-bottom: 10px;
      padding: 0 7px;
      &.select {
        border: 1px solid #6521D7;
        border-radius: 6px;
        .league-name {
          color: #6521D7;
          opacity: 1;
        }
      }
      & > .zw {
        display: inline-block;
        width: 9px;
        height: 7px;
        & > img {
          width: 9px;
          height: 7px;
          vertical-align: top;
        }
      }
      .league-name {
        flex: 1;
        font-size: 11px;
        color: #999;
        padding-left: 7px;
        opacity: 0.5;
      }

      .status {
        font-size: 11px;
        color: #666666;
        & > :first-child {
          color: #6521D7;
          font-weight: bold;
        }
      }
    }
  }
  .handle-btns {
    font-size: 12px;
    color: #333;
    display: flex;
    justify-content: space-between;
    margin-top:44px;
    .back {
      padding-left: 40px;
    }
    .sure {
      width: 80px;
      height: 24px;
      background: #6521D7;
      opacity: 1;
      border-radius: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      &.disabled{
        opacity: 0.2;
      }
    }
  }
}
</style>

