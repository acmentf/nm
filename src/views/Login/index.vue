<!--
  功能：登录
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2021年01月05日 10:18:38
-->
<template>
  <div class="login">
    <transparent-back :callBack="callBack"/>
    <div class="logo">
      <img src="./images/logo.png" alt width="190" />
    </div>
    <!-- <p class="find-pwd">找回密码</p> -->
    <!-- 找回密码 -->
    <div class="login-wrapper find" v-if="isFind">
      <div class="form-container" v-if="pwdStep==1">
        <ul class="form-list">
          <li>
            <label for="tel">
              <img src="./images/tel.png" alt width="26" />
            </label>
            <div class="input">
              <input
                type="text"
                id="tel"
                placeholder="请输入手机号"
                autocomplete="off"
                v-model="mobile"
                @keyup="mobile=mobile.replace(/[^\d]/g,'')"
                maxlength="11"
                @input="inputChange"
              />
              <i class="delete-icon" v-show="mobile" @click.stop="mobile='';isDisabledCode=true"></i>
            </div>
          </li>
          <li>
            <label for="pwd">
              <img src="./images/code.png" alt width="26" />
            </label>
            <div class="input">
              <input
                type="text"
                id="pwd"
                placeholder="请输入验证码"
                autocomplete="off"
                v-model="tstr"
                @keyup="tstr=tstr.replace(/[^\d]/g,'')"
                maxlength="6"
              />
              <i class="delete-icon" v-show="tstr" @click.stop="tstr='';isDisabledCode=true"></i>
            </div>
            <send-code class="send-code" type="2" :disabled="isDisabledCode" :mobile="mobile"></send-code>
          </li>
        </ul>
        <div
          class="next-btn flex"
          @click="nextStep"
          :class="mobile.length===11 && tstr.length === 6 ? 'actived':''"
        >下一步</div>
      </div>
      <div class="form-container" v-else-if="pwdStep==2">
        <ul class="form-list">
          <li>
            <label for="pwd">
              <img src="./images/pwd.png" alt width="20" />
            </label>
            <div class="input">
              <input
                :type="inputType"
                :placeholder="this.flag==1?'请设置6-16位新密码':'请输入6-16位新密码'"
                autocomplete="off"
                v-model="newPwd"
                maxlength="16"
              />
              <i class="delete-icon pwd" v-show="newPwd" @click.stop="newPwd=''"></i>
              <i class="close-icon" v-show="inputType=='text'" @click="inputType='password'"></i>
              <i class="open-icon" v-show="inputType=='password'" @click="inputType='text'"></i>
            </div>
          </li>
          <li>
            <label for="pwd">
              <img src="./images/pwd.png" alt width="20" />
            </label>
            <div class="input">
              <input
                :type="inputType"
                id="pwd"
                placeholder="请再次输入密码"
                autocomplete="off"
                v-model="resetNewPwd"
                maxlength="16"
              />
              <i class="delete-icon pwd" v-show="resetNewPwd" @click.stop="resetNewPwd=''"></i>
              <i class="close-icon" v-show="inputType=='text'" @click="inputType='password'"></i>
              <i class="open-icon" v-show="inputType=='password'" @click="inputType='text'"></i>
            </div>
          </li>
        </ul>
        <div class="handler-btns">
          <div
            class="success flex"
            :class="newPwd.length>=6 && newPwd === resetNewPwd? 'actived':''"
            @click="complete"
          >{{this.flag==1? '确认':'完成修改'}}</div>
        </div>
        <p class="next" @click="$router.push('/main/index')" v-show="flag==1">
          跳过
          <i class="arrow-right"></i>
        </p>
      </div>
      <div class="form-container" v-else-if="pwdStep==3">
        <div class="success-icon">
          <img src="./images/success.png" alt width="75" />
          <p>找回密码成功</p>
        </div>
        <div class="handler-btns">
          <div class="success flex actived" @click="isFind=false">去登录</div>
        </div>
      </div>
    </div>
    <!-- 登录/注册 -->
    <div class="login-wrapper" v-else>
      <div class="form-container">
        <ul class="form-list">
          <li>
            <label for="tel">
              <img src="./images/tel.png" alt width="26" />
            </label>
            <div class="input">
              <input
                type="text"
                id="tel"
                placeholder="请输入手机号"
                v-model="mobile"
                @input="inputChange"
                @keyup="mobile=mobile.replace(/[^\d]/g,'')"
                autocomplete="off"
                maxlength="11"
              />
              <i class="delete-icon" v-show="mobile" @click.stop="mobile='';isDisabledCode=true"></i>
            </div>
          </li>
          <li v-if="type==1">
            <label for="pwd">
              <img src="./images/code.png" alt width="26" />
            </label>
            <div class="input">
              <input
                type="text"
                id="pwd"
                placeholder="请输入验证码"
                v-model="tstr"
                autocomplete="off"
                @keyup="tstr=tstr.replace(/[^\d]/g,'')"
                maxlength="6"
              />
              <i class="delete-icon" v-show="tstr" @click.stop="tstr=''"></i>
            </div>
            <send-code class="send-code" type="1" :disabled="isDisabledCode" :mobile="mobile"></send-code>
          </li>
          <li v-if="type==2">
            <label for="pwd">
              <img src="./images/pwd.png" alt width="26" />
            </label>
            <div class="input">
              <input
                :type="inputType"
                id="pwd"
                placeholder="请输入密码"
                v-model="tstr"
                autocomplete="off"
                maxlength="16"
              />
              <i class="delete-icon pwd" v-show="tstr" @click.stop="tstr=''"></i>
              <i class="close-icon" v-show="inputType=='text'" @click="inputType='password'"></i>
              <i class="open-icon" v-show="inputType=='password'" @click="inputType='text'"></i>
              <p class="forget" @click="isFind=true; flag= 0; pwdStep = 1;tstr = '';">忘记密码?</p>
            </div>
          </li>
        </ul>
        <div
          class="login-btn flex"
          :class="(mobile.length===11 && tstr.length>= 6 && (isAgree|| type==2)) ? 'actived':''"
          @click="login"
        >{{type==1?'登录/注册':'登录'}}</div>
      </div>
      <div class="agreement" v-if="type==1">
        <img
          src="./images/selected.png"
          alt
          width="16"
          v-if="isAgree"
          class="pic"
          @click="isAgree=!isAgree"
        />
        <span class="no-agreement pic" v-else @click="isAgree=!isAgree"></span>
        同意TI电竞
        <span class="router" @click="view(1)">《服务条款》</span>和
        <span class="router" @click="view(2)">《隐私协议》</span>
      </div>
      <!-- 账户密码登录 -->
      <div class="account-login" @click="type=2;tstr=''" v-if="type==1">
        <span>账号密码登录</span>
        <i class="arrow-right"></i>
      </div>
      <div class="account-login" @click="type=1;tstr=''" v-if="type==2">
        <span>手机验证登录</span>
        <i class="arrow-right"></i>
      </div>
    </div>
    <!-- 弹窗 -->
    <van-popup v-model="isShow" position="right" :style="{ height: '100%',background:'#EEEEEE'}">
      <div class="file-content">
        <app-nav :callBack="()=>{isShow=false}">
          <span slot="title">{{agreementType==1?"服务条款":"用户隐私协议"}}</span>
        </app-nav>
        <div v-if="agreementType===1" class="popup-content">
          <service-terms />
        </div>
        <div v-if="agreementType===2" class="popup-content">
          <privacy-agreement />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import SendCode from "./components/sendCode";
import { mapState } from "vuex";
import * as api from "@/api/userCenter";
import * as commonApi from "@/api/common";
import AppNav from "@c/AppNav"
import TransparentBack from "@c/TransparentBack";
import ServiceTerms from "@/views/File/serviceTerms";
import PrivacyAgreement from "@/views/File/privacyAgreement";
export default {
  name: "login",
  components: { SendCode, TransparentBack, ServiceTerms, PrivacyAgreement ,AppNav},
  data() {
    return {
      typeList: [
        {
          type: 1,
          lable: "短信登录"
        },
        {
          type: 2,
          lable: "密码登录"
        }
      ],
      isAgree: false,
      isFind: false,
      pwdStep: 1,
      mobile: "",
      newPwd: "", //新密码
      resetNewPwd: "", //重复新密码
      type: 1,
      isShow: false,
      agreementType: 1,
      isDisabledCode: true,
      inputType: "password",
      flag: 0, //是否为新用户 1为是 0为否
      tstr: "" //密码或者验证码
    };
  },
  computed: {},
  watch: {},
  methods: {
    //tabs切换
    tabsToggle(index) {
      this.type = index;
      this.tstr = "";
    },
    view(type) {
      this.agreementType = type;
      this.isShow = true;
    },
    callBack() {
      if (this.isFind) {
        this.isFind = false;
        this.tstr = "";
      } else {
        this.$router.go(-1);
      }
    },
    // 设置新密码
    nextStep() {
      if (this.mobile.length === 11 && this.tstr) {
        commonApi
          .checkCode({
            type: "2",
            mobile: this.mobile,
            code: this.tstr
          })
          .then(res => {
            this.resetNewPwd = "";
            this.newPwd = "";
            this.textType = "text";
            this.pwdStep = 2;
          })
          .catch(error => {
            this.$toast({
              message: error,
              position: "bottom"
            });
          });
      }
    },
    clear() {},
    //放弃设置新密码
    giveUp() {
      this.pwdStep = 1;
      this.isFind = false;
      this.tstr = "";
      this.newPwd = "";
    },
    //取消设置密码
    cancel() {
      this.pwdStep = 1;
      this.isFind = false;
      this.tstr = "";
      this.newPwd = "";
    },
    inputChange() {
      var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (reg.test(this.mobile)) {
        this.isDisabledCode = false;
      } else {
        this.isDisabledCode = true;
      }
    },
    login() {
      if (
        this.mobile.length === 11 &&
        this.tstr &&
        (this.isAgree || this.type == 2)
      ) {
        api
          .Login({
            type: this.type,
            qstr: this.mobile,
            tstr: this.tstr
          })
          .then(res => {
            this.$store.state.common.token = res.token;
            sessionStorage.setItem("TOKEN", res.token);
            //判断是否为新用户 1为新用户 0为老用户
            this.flag = res.flag;
            if (res.flag) {
              this.isFind = true;
              this.pwdStep = 2;
            } else {
              this.$router.push("/main/index");
            }
          })
          .catch(error => {
            this.$toast({
              message: error,
              position: "bottom"
            });
          });
      }
    },
    //修改密码
    complete() {
      if (this.newPwd !== this.resetNewPwd) {
        this.$toast({
          message: "两次密码不相同，请重新输入",
          position: "bottom"
        });
        return false;
      }
      api
        .forgetPwd({
          mobile: this.mobile,
          code: this.tstr,
          pass: this.newPwd
        })
        .then(res => {
          if (this.flag) {
            this.$toast({
              message: "设置密码成功",
              position: "bottom"
            });
            setTimeout(() => {
              this.$router.push("/main/index");
            }, 500);
          } else {
            this.pwdStep = 3;
            this.tstr = "";
            this.newPwd = "";
          }
        })
        .catch(error => {
          this.$toast({
            message: error,
            position: "bottom"
          });
        });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang='scss' scoped>
.login {
  min-height: 100vh;
  position: relative;
  background: url("./images/bg.png") no-repeat 0 0;
  background-size: 100% 100%;
  .logo {
    padding-top: 48px;
    text-align: center;
    padding-bottom: 20px;
  }
  .back {
    position: absolute;
    left: 15px;
    top: 32px;
    color: #fff;
    font-size: 14px;
    display: flex;
    align-items: center;
    & > .back-pic {
      width: 18px;
      height: 18px;
      background: url("./images/back.png") no-repeat 0 0;
      background-size: 100% 100%;
      margin-right: 4px;
    }
  }
  .login-wrapper {
    padding: 0 15px;
    .form-container {
      margin: 0 auto;
      .form-list {
        margin: 0 auto;
        & > li {
          display: flex;
          margin-top: 40px;
          align-items: center;
          & > .input {
            flex: 1;
            padding: 3px 0;
            border-bottom: 1px solid #fff;
            position: relative;
            .delete-icon {
              position: absolute;
              width: 22px;
              height: 22px;
              background: url("./images/delete.png") no-repeat 0 0;
              background-size: cover;
              right: 0;
              display: inline-block;
              &.pwd {
                right: 25px;
              }
            }
            .close-icon,
            .open-icon {
              position: absolute;
              width: 22px;
              height: 22px;
              background: url("./images/open.png") no-repeat 0 0;
              background-size: cover;
              right: 0;
              display: inline-block;
              &.open-icon {
                background: url("./images/close.png") no-repeat 0 0;
                background-size: cover;
              }
            }
            & > input {
              width: 100%;
              height: 20px;
              border: 0; // 去除未选中状态边框
              outline: none; // 去除选中状态边框
              background: transparent; // 透明背景
              color: #fff;
              font-size: 15px;
              &::-webkit-input-placeholder {
                font-size: 15px;
                color: #fff;
              }
            }
          }
          & > label {
            margin-right: 8px;
            position: relative;
            top: 2px;
          }
          .send-code {
            margin-left: 6px;
          }
          .forget {
            text-align: right;
            bottom: -20px;
            color: #FFB32E;
            position: absolute;
            right: 0;
            font-size: 12px;
          }
        }
      }
      .notice {
        color: #ddd;
        font-size: 9px;
        margin-top: 5px;
      }
      .login-btn,
      .next-btn {
        height: 44px;
        background: #CCCCCC;
        color: #666666;
        border-radius: 22px;
        margin: 0 auto;
        font-size: 16px;
        margin-top: 40px;
        &:active {
          opacity: 0.8;
        }
        &.actived {
          background: linear-gradient(90deg, #6521D7 0%, #BF49EB 100%);;

          color: #fff;
        }
      }
      .giveUp-btn {
        margin: 0 auto;
        height: 34px;
        border: 1px solid #FFB32E;
        border-radius: 22px;
        margin-top: 10px;
        color: #fff;
        font-size: 14px;
      }
    }
    .agreement {
      margin-top: 20px;
      width: 100%;
      justify-content: center;
      color: #ddd;
      display: flex;
      align-items: center;
      font-size: 12px;
      .no-agreement {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1px solid #FFB32E;
      }
      .pic {
        margin-right: 4px;
      }
    }
    .account-login {
      display: flex;
      margin-top: 40px;
      text-align: center;
      color: #ddd;
      font-size: 14px;
      justify-content: center;
      align-items: center;
      margin-right: 4px;
      & > i {
        width: 14px;
        height: 14px;
        background: url("./images/arrow-right.png") no-repeat 0 0;
        background-size: cover;
      }
    }
  }
  .handler-btns {
    margin-top: 40px;
    & > .flex {
      height: 44px;
      color: #fff;
      font-size: 16px;
      &:active {
        opacity: 0.8;
      }
    }
    .success {
      opacity: 1;
      border-radius: 22px;
      margin-bottom: 20px;
      background: #999;
      color: #ccc;
      &.actived {
        background: linear-gradient(90deg, #6521D7 0%, #BF49EB 100%);;

        color: #fff;
      }
    }
    .cancel {
      border: 1px solid #FFB32E;
      border-radius: 22px;
    }
    & > p {
      font-size: 9px;
      color: #bbb;
      margin-top: 10px;
    }
  }
  /***找回密码 */
  .find {
    .find-title {
      font-size: 26px;
      color: #fff;
      margin-bottom: 76px;
    }
    .success-icon {
      text-align: center;
      margin-top: 40px;
      & > p {
        font-size: 14px;
        color: #4c95fa;
        margin-top: 14px;
      }
    }
  }
  /***iphonex */

  .router {
    color: #FFB32E;
  }
  .file-content {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    .popup-content {
      flex: 1;
      overflow-y: auto;
      margin-top:10px;
      background: #fff;
    }
  }
  .next {
    text-align: center;
    color: #999999;
    font-size: 14px;
    margin-top: 57px;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      width: 14px;
      height: 14px;
      background: url("./images/arrow-right.png") no-repeat 0 0;
      background-size: 100% 100%;
      margin-left: 4px;
      margin-top: 2px;
    }
  }
}
@media screen and (min-height: 800px) {
  .login {
    width: 100%;
    height: 100vh;
    background: url("./images/bg.png") no-repeat 0 0;
    background-size: 100% 100%;
  }
  .title {
    margin-bottom: 40px !important;
  }
}
</style>