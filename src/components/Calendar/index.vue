<template>
  <!-- 日历组件 -->
  <div class="calendar">
    <span class="rl" @click="actionCalender"></span>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Index",
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapState({
      isShow: state => state.common.isShow
    })
  },
  methods: {
    //切换日历的显示隐藏
    actionCalender() {
      this.$store.state.common.isShow = !this.$store.state.common.isShow;
      // if (this.$store.state.common.isShow) {
      //   $(".van-tabs__content").css({
      //     overflow: "hidden"
      //   });
      // } else {
      //   $(".van-tabs__content").css({
      //     overflow: "auto"
      //   });
      // }
    },
    preventScroll() {
      let _this = this;
      document.addEventListener("touchmove", function(event) {
        //监听滚动事件
        if (_this.$store.state.common.isShow) {
          //判断是遮罩显示时执行，禁止滚屏
          event.preventDefault(); //最关键的一句，禁止浏览器默认行为
        }
      },{ passive: false });
    }
  },
  mounted(){
    this.preventScroll()
  }
};
</script>

<style lang="scss" scoped>
.calendar {
  position: relative;
  z-index: 1111111111;
  .rl {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url("./rl.png") no-repeat 0 0;
    background-size: 100% 100%;
  }
}
</style>
