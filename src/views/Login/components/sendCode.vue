<!--
  功能：获取验证码 按钮
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2021年01月04日 11:05:03
-->
<template>
  <div
    class="send-button flex"
    @click="send"
    :class="(state===2 || disabled) ?'disabled':''"
  >{{str}}</div>
</template>

<script>
import * as api from "@/api/common";
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "1"
    },
    mobile: {
      type: String,
      default: ""
    }
  },
  name: "send-button",
  components: {},
  data() {
    return {
      // 按钮状态 1为未获取  2为 正在获取中  3为重新获取
      state: 1,
      timer: null,
      time: 60,
      str: "获取验证码"
    };
  },
  computed: {},
  watch: {},
  methods: {
    send() {
      if (this.disabled || this.state == 2) return;
      this.state = 2;
      this.str = `再次获取(${this.time}S)`;
      this._getCode();
    },
    //获取验证码
    async _getCode() {
      this.countDown();
      let data = await api.getCode({
        type: this.type,
        mobile: this.mobile,
        stk: ""
      });
    },
    countDown() {
      this.time = 60;
      this.timer = setInterval(() => {
        if (this.time == 0) {
          this.state = 3;
          this.str = "重新获取";
           this.time = 60;
          clearInterval(this.timer);
        } else {
          this.state = 2;
          this.time--;
          this.str = `再次获取(${this.time}S)`;
        }
      }, 1000);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang='scss' scoped>
.send-button {
  width: 88px;
  height: 26px;
  background: linear-gradient(90deg, #6521D7 0%, #BF49EB 100%);;
  border-radius: 4px;
  line-height: 36px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  &.disabled {
    background: #CCCCCC;
    color: #666;
  }
  &:active {
    opacity: 0.8;
  }
}
</style>