<!--
  功能：开屏页
  作者：tangfeng
  邮箱：acmentf@163.com
  时间：2020年10月31日 16:46:14
-->
<template>
  <div class="open-page">
    <van-swipe
      class="my-swipe"
      indicator-color="white"
      :loop="false"
      :duration="200"
      @change="onChange"
    >
      <van-swipe-item v-for="(item, index) in IMG_LIST" :key="item.id">
        <div class="page-container" :class="'bg-' + (index + 1)">
          <div class="top-image">
            <img
              :src="item.topImage"
              :class="current == index ? 'animated pulse' : ''"
            />
          </div>
          <div class="bottom_image">
            <img :src="item.typeImage" alt="" />
            <p>
              <img :src="item.typeInfoImage" alt="" />
            </p>
          </div>
          <div class="btn" v-if="item.btn" @click="routerToIndex">立即体验</div>
        </div>
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          <Indicator :count="IMG_LIST.length" :currentIndex="current" />
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script>
import Indicator from "./components/Indicator";
export default {
  // 组件名称
  name: "open-page",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: { Indicator },
  // 组件状态值
  data() {
    return {
      current: 0,
      IMG_LIST: [
        {
          id: 1,
          bgImage: require("./images/bg_1.png"),
          topImage: require("./images/top_1.png"),
          typeImage: require("./images/bottom_1.png"),
          typeInfoImage: require("./images/bottom_1_notice.png"),
        },
        {
          id: 2,
          bgImage: require("./images/bg_2.png"),
          topImage: require("./images/top_2.png"),
          typeImage: require("./images/bottom_2.png"),
          typeInfoImage: require("./images/bottom_2_notice.png"),
        },
        {
          id: 3,
          bgImage: require("./images/bg_3.png"),
          topImage: require("./images/top_3.png"),
          typeImage: require("./images/bottom_3.png"),
          typeInfoImage: require("./images/bottom_3_notice.png"),
        },
        {
          id: 4,
          bgImage: require("./images/bg_4.png"),
          topImage: require("./images/top_3.png"),
          typeImage: require("./images/bottom_4.png"),
          typeInfoImage: require("./images/bottom_4_notice.png"),
          btn: true,
        },
      ],
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    onChange(index) {
      this.current = index;
    },
    //跳转到 首页
    routerToIndex(){

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
  created() {},
  /**
   * 在挂载开始之前被调用：相关的 render 函数首次被调用。
   */
  beforeMount() {},
  mounted() {},
};
</script> 

<style scoped lang='scss'>
.open-page {
  .page-container {
    height: 100vh;
    width: 100%;
    overflow: hidden;
    position: relative;
    &.bg-1 {
      background: url("./images/bg_1.png") 0 0 no-repeat;
      background-size: 100% 100%;
    }
    &.bg-2 {
      background: url("./images/bg_2.png") 0 0 no-repeat;
      background-size: 100% 100%;
    }
    &.bg-3 {
      background: url("./images/bg_3.png") 0 0 no-repeat;
      background-size: 100% 100%;
    }
    &.bg-4 {
      background: url("./images/bg_4.png") 0 0 no-repeat;
      background-size: 100% 100%;
    }
    .top-image {
      text-align: center;
      & > img {
        width: 300px;
        margin-top: 15%;
      }
    }
    .bottom_image {
      text-align: center;
      margin-top: 60px;
      & > p {
        padding-top: 20px;
      }
    }
    .btn {
      width: 240px;
      height: 72px;
      background: url("./images/btn.png") no-repeat 0 0;
      background-size: 100% 100%;
      color: #922af6;
      display: flex;
      align-items: center;
      margin: 0 auto;
      margin-top: 80px;
      justify-content: center;
      font-size:24px
    }
    @media screen and (min-height: 800px) {
      .top-image {
        text-align: center;
        & > img {
          width: 300px;
          margin-top: 105px;
        }
      }
      .bottom_image {
        text-align: center;
        margin-top: 110px;
        & > p {
          padding-top: 20px;
        }
      }
    }
  }
  .custom-indicator {
    position: absolute;
    width: 100%;
    bottom: 15%;
    @media screen and (min-height: 800px) {
       bottom: 150px;
    }
  }
}
</style>
