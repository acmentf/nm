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
      this.str = this.time + "s后重新获取";
      this._getCode();
    },
    //获取验证码
    async _getCode() {
      this.countDown();
      let data = await api.getCode({
        type: this.type,
        mobile: this.mobile
      });
    },
    countDown() {
      this.time = 60;
      this.timer = setInterval(() => {
        if (this.time == 1) {
          this.time = 60;
          this.state = 3;
          this.str = "重新获取";
          clearInterval(this.timer);
        } else {
          this.state = 2;
          this.time--;
          this.str = this.time + "s后重新获取";
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
  width: 90px;
  height: 42px;
  background:#6521D7;
  line-height: 42px;
  text-align: center;
  color: #fff;
  &.disabled {
    background: #ddd;
  }
}
</style>