<!--
  功能：
  作者：tangfeng
  邮箱：acmentf@163.com
  时间：2020年11月02日 17:48:37
-->
<template>
  <div class="match-item">
    <!-- <div class="mounted">
      <div class="item-top">
        <p class="match-type">黄金职业联赛</p>
        <p class="inning"><span>第二局</span><span class="item">16</span></p>
        <p>BO3</p>
      </div>
      <div class="item-middle">
        <i class="focus"></i>
        <i class="live"></i>
      </div>
      <div class="item-bottom">
        <span class="start-time">18:00</span>
        <span class="online-count">22233</span>
      </div>
    </div> -->
    <!-- 骨架图 -->
    <div class="skeleton">
      <p class="skeleton-top"></p>
      <div class="skeleton-middle">
        <div class="skeleton-middle-left">
          <span></span>
          <p></p>
        </div>
        <span class="vs">VS</span>
        <div class="skeleton-middle-right">
          <p></p>
          <span></span>
        </div>
      </div>
      <p class="skeleton-bottom"></p>
    </div>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "match-item",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {};
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {},
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 在实例初始化之后，组件属性计算之前，如data属性等
   */
  beforeCreate() {},
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {},
  /**
   * 在挂载开始之前被调用：相关的 render 函数首次被调用。
   */
  beforeMount() {},
  mounted() {},
};
</script> 

<style scoped lang='scss'>
.match-item {
  background: #fff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15);
  opacity: 1;
  border-radius: 6px;
  height: 100px;
  & > div {
    padding: 16px 10px 15px 10px;
  }
  & > .mounted > div {
    display: flex;
    justify-content: space-between;
    position: relative;
    color: #fff;
  }
  .item-top {
    .inning {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      color: #999;
      .item {
        padding: 10px;
      }
    }
  }
  .item-middle {
    margin-top: 13px;
    .focus {
      width: 14px;
      height: 14px;
      background: url("../icon/focus.png") no-repeat 0 0;
      background-size: 100% 100%;
    }
    .live {
      width: 14px;
      height: 12px;
      background: url("../icon/live.png") no-repeat 0 0;
      background-size: 100% 100%;
    }
  }
  .item-bottom {
    margin-top: 13px;
  }
  .skeleton {
    padding: 10px 10px 15px 10px;
    .skeleton-top {
      background: #495a8b;
      height: 10px;
      border-radius: 10px;
    }
    .skeleton-middle {
      margin-top: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      .skeleton-middle-left {
        display: flex;
        align-items: center;
        & > span {
          background: #495a8b;
          height: 10px;
          border-radius: 10px;
          width: 45px;
        }
        & > p {
          background: #495a8b;
          height: 10px;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          margin-left: 10px;
        }
      }
      .vs {
        font-weight: bold;
        font-size: 16px;
        color: #495a8b;
        margin: 0 26px;
      }
      .skeleton-middle-right {
        display: flex;
        align-items: center;
        & > p {
          background: #495a8b;
          height: 10px;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }
        & > span {
          background: #495a8b;
          height: 10px;
          border-radius: 10px;
          width: 45px;
        }
      }
    }
    .skeleton-bottom {
      width: 130px;
      height: 10px;
      background: #495a8b;
      border-radius: 10px;
      margin: 0 auto;
      margin-top: 12px;
    }
  }
}
</style>
