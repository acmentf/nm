<!--
  功能：
  作者：tangfeng
  邮箱：acmentf@163.com
  时间：2020年11月02日 13:24:58
-->
<template>
  <div class="my-tabs">
    <ul class="tabs-list">
      <li
        v-for="(item, index) in tabsList"
        :key="index"
        @click="_route(index)"
        :class="actived == index ? 'actived' : ''"
      >
        <i class="icon" :class="renderIco(index)"></i>
        <p>{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  // 组件名称
  name: "my-tabs",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      actived: 0
    };
  },
  // 计算属性
  computed: {
    ...mapState({
      tabsList: state => state.common.navTabsList
    })
  },
  // 侦听器
  watch: {
    // $route(to) {
    //   this._route(to.meta._INDEX);
    // }
  },
  // 组件方法
  methods: {
    renderIco(index) {
      if (index == this.actived) {
        return "icon-" + (index + 1);
      } else {
        return "icon-" + (index + 1) + "-" + (index + 1);
      }
    },
    _route(index) {
      this.actived = index;
      this.$store.state.common.TabbarActive = index;
      switch (index) {
        case 0:
          // this.$router.push("/main/index");

          this.$store.state.common.contentType = "matchList";
          this.$store.dispatch("matchList/_getMatchList");
          break;
        case 1:
          this.$store.state.common.contentType = "leagueList";
          break;
        case 2:
          this.$store.state.common.contentType = "teamList";
          break;
        case 3:
          this.$store.state.common.contentType = "my";
          break;
        default:
          this.$store.state.common.contentType = "matchList";
      }
    }
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 在实例初始化之后，组件属性计算之前，如data属性等
   */
  beforeCreate() {},
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {
    //获取tabs数据
    //this.actived = this.$route.meta._INDEX;
  },
  /**
   * 在挂载开始之前被调用：相关的 render 函数首次被调用。
   */
  beforeMount() {},
  mounted() {}
};
</script>

<style scoped lang="scss">
.my-tabs {
  height: 59px;
  width: 100%;
  padding-top: 8px;
  background: #6521d7;
  .tabs-list {
    display: flex;
    align-items: center;
    & > li {
      flex: 1;
      text-align: center;
      color: #bbbbbb;
      .icon {
        display: inline-block;
        width: 22px;
        height: 22px;
        background: url("../icon/1-1.png") no-repeat 0 0;
        background-size: 100% 100%;
      }
      .icon-1 {
        background: url("../icon/1.png") no-repeat 0 0;
        background-size: 100% 100%;
      }
      .icon-2 {
        background: url("../icon/2.png") no-repeat 0 0;
        background-size: 100% 100%;
      }
      .icon-3 {
        background: url("../icon/3.png") no-repeat 0 0;
        background-size: 100% 100%;
      }
      .icon-4 {
        background: url("../icon/4.png") no-repeat 0 0;
        background-size: 100% 100%;
      }
      .icon-1-1 {
        background: url("../icon/1-1.png") no-repeat 0 0;
        background-size: 100% 100%;
      }
      .icon-2-2 {
        background: url("../icon/2-2.png") no-repeat 0 0;
        background-size: 100% 100%;
      }
      .icon-3-3 {
        background: url("../icon/3-3.png") no-repeat 0 0;
        background-size: 100% 100%;
      }
      .icon-4-4 {
        background: url("../icon/4-4.png") no-repeat 0 0;
        background-size: 100% 100%;
      }

      & > p {
        color: #dddddd;

        margin-top: 3px;
      }
      &.actived {
        & > p {
          color: #ffffff;
          font-weight: 800;
        }
      }
    }
  }
}
</style>
