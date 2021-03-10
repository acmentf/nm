<!--
  功能：关注五角星
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2020年12月02日 16:48:32
-->
<template>
  <i class="focus_disabled_1" @click.stop="change" :class="value?'focus':''" v-if="type==='1'"></i>
  <i class="focus_disabled_2" @click.stop="change" :class="value?'focus':''" v-else></i>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    type: {
      //五角星样式 1列表（黄色） 2 详情 （灰白色）
      type: String,
      default: "1"
    },
    parmars: {
      type: Object,
      default: () => ({
        game_id: "LOL", //游戏id
        tournament_id: 0, //赛事id
        type: "0", //关注类型 0代表比赛
        //op_type:0, 操作类型 0添加 1移除 2查询多个id 3查单个id
        id_list: "" // 关注id
      })
    },
    // 是否关注
    value: {
      type: Boolean,
      default: false
    }
  },
  name: "",
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    async change() {
      let { game_id, type, id_list } = this.parmars;
      // 判断用户是否登录
      if (!sessionStorage.getItem("TOKEN")) {
        this.$router.push("/login");
        return false;
      }
      let data = await this.$store.dispatch("common/_toggleFoucs", {
        game_id,
        type,
        op_type: this.value ? 1 : 0,
        id_list: id_list + ""
      });
      if (!data) {
        this.$emit("input", !this.value);
        this.$emit("change", id_list);
        this.$toast({
          message: this.value ? "取消关注成功" : "关注成功",
          position: "bottom"
        });
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.focus_disabled_1 {
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url("./icon/focus_disabled.png") no-repeat 0 0;
  background-size: 100% 100%;
  position: relative;
  z-index: 111;
  &.follow {
    background-image: url("./icon/follow.png");
  }
  &.focus {
    background: url("./icon/focus.png") no-repeat 0 0;
    background-size: 100% 100%;
  }
}
.focus_disabled_2 {
  display: inline-block;
  width: 22px;
  height: 22px;
  background: url("./icon/focus_disabled_1.png") no-repeat 0 0;
  background-size: 100% 100%;
  position: relative;
  z-index: 111;
  &.follow {
    background-image: url("./icon/follow.png");
  }
  &.focus {
    background: url("./icon/focus_1.png") no-repeat 0 0;
    background-size: 100% 100%;
  }
}
</style>
