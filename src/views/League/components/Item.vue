<template>
  <!-- 联赛列表 -->

  <div class="ls-item flex">
    <div class="ls-item-left flex">
      <div class="logo">
        <van-image :src="list.logo_url" width="44">
          <template v-slot:error>
            <img src="@/assets/images/league.png" alt width="44" />
          </template>
        </van-image>
      </div>
      <div class="detail">
        <p class="name">{{ list.name }}</p>
        <p class="start-time">{{ list.time_str }}</p>
      </div>
    </div>
    <div class="ls-item-right">
      <span :class="['','','run','disabled'][list.status]">
        {{
        list.status_str
        }}
      </span>
      <p class="money">{{ list.price }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    list: {
      type: Object,
      default: () => {}
    }
    // list.tid 联赛ID 通过 IFAppUIleague 接口添加  "tournament_ids":{$tid}
  },
  name: "ListItem",
  methods: {},
  data() {
    return {};
  },
  // 计算属性
  computed: {
    ...mapState({
      game_id: state => state.matchList.game_id
    })
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.ls-item {
  height: 80px;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 0px;
  padding: 0 10px;
  .ls-item-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > .logo {
      width: 44px;
    }
    & > .detail {
      padding-left: 10px;
      .name {
        font-weight: bold;
        color: #333;
        font-size: 15px;
      }
      .start-time {
        font-size: 11px;
        color: #666666;
        padding-top: 8px;
      }
    }
  }
  .ls-item-right {
    text-align: right;
    & > span {
      display: flex;
      width: 49px;
      height: 17px;
      justify-content: center;
      align-items: center;
      background: #2AB7CA;
      border-radius: 9px;
      color: #fff;
      margin-left: auto;
      font-size: 11px;
      &.disabled {
        background: #bbb;
      }
      &.run {
        background: #6521D7;
      }
    }
    & > p {
      font-size: 11px;
      color: #666666;
      padding-top: 10px;
      margin-left: auto;
    }
  }
}
</style>
