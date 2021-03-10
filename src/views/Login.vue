<template>
  <div class="login">
    <div class="form-wrap">
      <van-button type="0" @click="_login">默认按钮</van-button>
    </div>
  </div>
</template>

<script>
import { login } from "@/service/login";
import {Md5,storage} from '@/utils/utils' 
import {Button, Toast } from "vant"
export default {
  components: {
    [Button.name]:Button,
    [Toast.name]:Toast
  },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    // 登录
    _login() {
      this.$router.push('/salesman')
      // login({
      //   mobile: "12345678904",
      //   loginpwd: Md5('123')
      // }).then(res => {
      //   if(res.data.code) {
      //     storage.setLocal('userInfo',res.data.data);
      //     this.$router.push('/detail')
      //   }
      // });
    }
  },
  created() {
   
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.login {
  .form-wrap {
    margin-top: 25%;
    text-align: center;
    .form-item {
      .logo {
        width: 40px;
      }
      .name {
        font-size: 18px;
        padding-left: 8px;
      }
    }
    .input-wrap {
      margin-top: 20px;
      & > p {
        width: 70%;
        margin: 0 auto;
        margin-bottom: 15px;
        & > input {
          border: 1px solid gainsboro;
          line-height: 40px;
          width: 100%;
          border-radius: 16px;
          text-indent: 20px;
          font-size: 14px;
        }
      }
    }
    .login-btn {
      margin-top: 40px;
      button {
        width: 70%;
        display: block;
        margin: 0 auto;
        line-height: 40px;
        background: gold;
        color: #fff;
        border-radius: 16px;
        font-size: 20px;
      }
    }
  }
}
</style>