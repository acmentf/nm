<!--
  功能：个人中心设置
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2020年12月31日 15:20:07
-->
<template>
  <div class="config">
    <app-nav :callBack="close">
      <span slot="title">设置</span>
    </app-nav>
    <ul class="config-list">
      <li @click="setConfig(1)">
        <div class="label">
          <van-image :src="require('../images/avatar-'+userInfo.avatar_id+'.png')" class="avatar-pic">
            <template v-slot:error>
              <img src="@/assets/images/player.png" alt width="24" />
            </template>
          </van-image>
          <span class="value"></span>
        </div>
        <div class="content-right">
          <span class="type">头像</span>
          <i class="arrow-right"></i>
        </div>
      </li>
      <li @click="setConfig(2)">
        <div class="label">
          <img src="../images/nikename.png" alt width="20" />
          <span class="value">{{userInfo.nick_name}}</span>
        </div>
        <div class="content-right">
          <span class="type">昵称</span>
          <i class="arrow-right"></i>
        </div>
      </li>
      <li @click="setConfig(3)">
        <div class="label">
          <img src="../images/phone.png" alt width="20" />
          <span class="value">{{userInfo.mobile}}</span>
        </div>
        <div class="content-right">
          <span class="type">手机</span>
          <i class="arrow-right"></i>
        </div>
      </li>
      <li @click="setConfig(5)">
        <div class="label">
          <img src="../images/password.png" alt width="20" />
          <span class="value">*********</span>
        </div>
        <div class="content-right">
          <span class="type">密码</span>
          <i class="arrow-right"></i>
        </div>
      </li>
    </ul>
    <p class="system">系统</p>
    <ul class="config-list">
      <li @click="setConfig(7)">
        <div class="label">
          <img src="../images/notice.png" alt width="20" />
          <span class="value title">关于我们</span>
        </div>
        <div class="content-right">
          <i class="arrow-right"></i>
        </div>
      </li>
      <li @click="setConfig(10)">
        <div class="label">
          <img src="../images/count.png" alt width="20" />
          <span class="value title">账号管理</span>
        </div>
        <div class="content-right">
          <i class="arrow-right"></i>
        </div>
      </li>
      <!-- <li class="cancel-account flex" @click="isLogout=true">退出登录</li> -->
    </ul>
    <div class="cancel-account flex" @click="isLogout=true">退出登录</div>
    <!-- 推出登录确认框 -->
    <van-action-sheet v-model="isLogout" :round="false">
      <div class="logout">
        <p class="title">您确定要退出当前帐号吗?</p>
        <div class="handler">
          <div class="logout-sure" @click="logout">退出登录</div>
          <div class="logout-cancel" @click="isLogout=false">取消</div>
        </div>
      </div>
    </van-action-sheet>
    <!-- 列表设置 -->
    <van-popup
      v-model="isShow"
      position="right"
      :style="{ height: '100%',background:'#eee'}"
      v-if="isShow"
    >
      <div style="width:100vw;height:100vh">
        <app-nav :callBack="hidePopup" :sure="sure">
          <span slot="title">{{configStr}}</span>
          <span slot="handler" v-if="type===2 || type===1">保存</span>
        </app-nav>
        <div v-if="type===1" class="popup-content">
          <ul class="avatar-list">
            <li v-for="item in avatarList" :key="item" @click="selectAvatar(item)">
              <img
                :src="require('../images/avatar-'+item+'.png')"
                alt
                class="avatar"
                :class="item===avatarId?'selected':''"
              />
              <p>
                <img src="../images/selected.png" alt width="12" v-if="item===avatarId" />
              </p>
            </li>
          </ul>
        </div>
        <div v-if="type===2" class="popup-content">
          <p class="notice-str">请输入1-16位昵称</p>
          <text-input placeholder="请输入1-16位的昵称" v-model="nick_name" type="text" :maxlength="16"></text-input>
        </div>
        <div v-if="type===3" class="popup-content">
          <p class="notice-str">
            输入
            <span class="tel">{{userInfo.mobile}}</span>的验证码
          </p>
          <div class="input-session">
            <text-input placeholder="请输入6位验证码" v-model="code" type="code" :maxlength="6"></text-input>
            <send-button type="4"></send-button>
          </div>

          <div class="next-step flex" :class="code.length===6?'actived':''" @click="nextStep">下一步</div>
        </div>
        <div v-if="type===4" class="popup-content">
          <p class="notice-str">输入新手机号码</p>
          <div class="input-session">
            <text-input
              placeholder="请输入11位手机号码"
              v-model="newTel"
              :maxlength="11"
              type="telphone"
              :showError="showTelError"
              @change="telChange"
            >请输入11位正确的手机号码</text-input>
          </div>
          <p class="notice-str">输入验证码</p>
          <div class="input-session">
            <text-input placeholder="请输入6位验证码" v-model="code" :maxlength="6" type="code"></text-input>
            <send-button :disabled="isCanSend" type="5" :mobile="newTel"></send-button>
          </div>
          <div
            class="next-step flex"
            :class="code.length===6 && !showTelError?'actived':''"
            @click="complete"
          >完成修改</div>
        </div>
        <!-- 修改密码（手机号验证） -->
        <div v-if="type===5" class="popup-content">
          <p class="notice-str">
            输入
            <span class="tel">{{userInfo.mobile}}</span>的验证码
          </p>
          <div class="input-session">
            <text-input placeholder="请输入6位验证码" v-model="code" type="code" :maxlength="6"></text-input>
            <send-button type="3"></send-button>
          </div>
          <div
            class="next-step flex"
            :class="code.length===6?'actived':''"
            @click="nextPasswordStep"
          >下一步</div>
        </div>
        <!-- 修改密码 -->
        <div v-if="type===6" class="popup-content">
          <p class="notice-str">输入新密码</p>
          <div class="input-session">
            <text-input
              placeholder="请输入6-16新密码"
              v-model="newPassword"
              :maxlength="16"
              type="password"
              :showError="showPwdError"
              @change="pwdChange"
            >请输入6-16位新密码</text-input>
          </div>
          <p class="notice-str">重新输入密码</p>
          <div class="input-session">
            <text-input
              placeholder="请重新输入密码"
              v-model="checkPassword"
              :maxlength="16"
              :showError="showCheckPwdError"
              type="password"
              @change="testPwdChange"
            >两次密码不一致</text-input>
          </div>
          <div
            class="next-step flex"
            :class="checkPassword  === newPassword && newPassword.length>=6 && checkPassword.length>=6 ?'actived':''"
            @click="updatePass"
          >完成修改</div>
        </div>
        <!-- 关于我们 -->
        <div v-if="type===7" class="popup-content">
          <div class="about">
            <div class="list-top">
              <ul class="about-list">
                <li>
                  <img src="../images/building-two@2x.png" alt width="20" />
                  <p class="address">{{companyInfo.name}}</p>
                </li>
                <li>
                  <img src="../images/mail@2x.png" alt width="20" />
                  <p class="email">{{companyInfo.email}}</p>
                </li>
                <li>
                  <img src="../images/local@2x.png" alt width="20" />
                  <p class="zb">{{companyInfo.address}}</p>
                </li>
              </ul>
            </div>
            <div class="about-title">
              <img src="../images/map-road-two@2x.png" alt width="20" />
              <p>公司地图</p>
            </div>
            <img :src="companyInfo.company_map" alt width="100%" class="map-pic" />
            <ul class="config-list">
              <li @click="setSecondConig(1)">
                <div class="label">
                  <img src="../images/list-success-2@2x.png" alt width="20" />
                  <span class="value title">服务条款</span>
                </div>
                <div class="content-right">
                  <i class="arrow-right"></i>
                </div>
              </li>
              <li @click="setSecondConig(2)">
                <div class="label">
                  <img src="../images/protect-2@2x.png" alt width="20" />
                  <span class="value title">隐私政策</span>
                </div>
                <div class="content-right">
                  <i class="arrow-right"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 账号管理 -->
        <div v-if="type===10" class="popup-content">
          <div class="account-config">
            <ul class="config-list">
              <li @click="cancelAccount">
                <div class="label">
                  <span class="value title">注销账号</span>
                </div>
                <div class="content-right">
                  <i class="arrow-right"></i>
                </div>
              </li>
            </ul>
          </div>
          <!-- 注销账号弹窗 -->
          <van-dialog v-model="cancelDialogShow" :showConfirmButton="false" width="345">
            <div class="cancel-content">
              <p class="title">您确定要注销当前帐号吗?</p>
              <ul class="notice-list">
                <li>1.您的账户注销之后将无法登陆</li>
                <li>2.您所有的身份相关信息将会被清除</li>
                <li>3.您的数据清除之后将无法恢复</li>
                <li>4.您的所有操作和活动记录将无法查询</li>
                <li>5.该手机号将在30日内无法再次注册</li>
              </ul>
              <div class="btns">
                <div class="sure-btn flex" @click="deleteAccount">确认</div>
                <div class="cancel-btn flex" @click="cancelDialogShow=false">取消</div>
              </div>
            </div>
          </van-dialog>
        </div>
      </div>
    </van-popup>
    <!-- 关于我们 -->
    <van-popup
      v-model="isShowSeconde"
      position="right"
      style="width:100%"
      v-if="isShowSeconde"
      :style="{ height: '100%',background:'#EEEEEE'}"
    >
      <div class="file-content">
        <app-nav :callBack="hideSecodePopup" :sure="sure">
          <span slot="title">{{configSecondStr}}</span>
        </app-nav>
        <div v-if="secondType===1" class="popup-content text">
          <service-terms />
        </div>
        <div v-if="secondType===2" class="popup-content text">
          <privacy-agreement />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import AppNav from "@c/AppNav";
import TextInput from "@c/Input";
import SendButton from "./sendButton";
import ServiceTerms from "@/views/File/serviceTerms";
import PrivacyAgreement from "@/views/File/privacyAgreement";
import * as api from "@/api/userCenter";
import * as commonApi from "@/api/common";
import { mapState } from "vuex";
export default {
  name: "config",
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  components: { AppNav, TextInput, SendButton, ServiceTerms, PrivacyAgreement },
  data() {
    return {
      isShow: false,
      isShowSeconde: false,
      type: 1,
      avatarList: [1, 2, 3, 4, 5, 6],
      configStr: "更改头像",
      nickName: "",
      code: "",
      newTel: "",
      isCanSend: true,
      isSuccess: false,
      newPassword: "",
      checkPassword: "",
      showTelError: false,
      showPwdError: false,
      showCheckPwdError: false,
      isLogout: false,
      cancelDialogShow: false,
      configSecondStr: "服务条框",
      avatarId: 1,
      // 二级界面 服务条款 1 隐私政策 2
      secondType: 1,
      nick_name: ""
    };
  },
  computed: {
    ...mapState({
      companyInfo: state => state.common.company_info
    })
  },
  watch: {
    //验证手机号码
    newTel(val) {
      var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (reg.test(val)) {
        this.isCanSend = false;
        this.showTelError = false;
      } else {
        this.isCanSend = true;
      }
    },
    type(val) {
      //this.resetData();
    },
    checkPassword(val) {
      if (val && val === this.newPassword) {
        this.isSuccess = true;
      } else {
        this.isSuccess = false;
      }
    }
  },
  methods: {
    // 选择头像
    selectAvatar(item) {
      this.avatarId = item;
    },
    resetData() {
      this.nickName = "";
      this.code = "";
      this.newTel = "";
      this.isCanSend = true;
      this.isSuccess = false;
      this.newPassword = "";
      this.checkPassword = "";
      this.showTelError = false;
      this.showPwdError = false;
      this.showCheckPwdError = false;
    },
    close() {
      this.$parent.$parent.isShow = false;
    },
    setConfig(type) {
      this.newPassword = "";
      this.checkPassword = "";
      this.type = type;
      switch (type) {
        case 1:
          this.isShow = true;
          this.configStr = "更改头像";
          this.avatarId = this.userInfo.avatar_id;
          break;
        case 2:
          this.isShow = true;
          this.nick_name = this.userInfo.nick_name;
          this.configStr = "修改昵称";
          break;
        case 3:
          this.isShow = true;
          this.configStr = "验证原手机";
          this.code = "";
          break;
        case 4:
          this.configStr = "更换手机号码";
          break;
        case 5:
          this.isShow = true;
          this.configStr = "验证手机";
          this.code = "";
          this.showCheckPwdError = false;
          this.showPwdError = false;
          break;
        case 6:
          this.configStr = "修改密码";
          this.isShow = true;
          break;
        case 7:
          this.isShow = true;
          this.configStr = "关于我们";
          break;
        case 10:
          this.configStr = "账户管理";
          this.isShow = true;
          break;
        default:
          this.configStr = "更改头像";
      }
    },
    setSecondConig(type) {
      this.secondType = type;
      switch (type) {
        case 1:
          this.isShowSeconde = true;
          this.configSecondStr = "服务条款";
          break;
        case 2:
          this.isShowSeconde = true;
          this.configSecondStr = "隐私政策";
          break;
      }
    },
    hidePopup() {
      this.isShow = false;
    },
    hideSecodePopup() {
      this.isShowSeconde = false;
    },
    // 保存
    async sure() {
      let data = {};
      if (this.type === 1) {
        data = {
          avatar_id: this.avatarId + ""
        };
      } else {
        data = {
          nick_name: this.nick_name
        };
      }
      await api
        .setUserInfo(data)
        .then(res => {
          this.$toast({
            message: "修改成功",
            position: "bottom"
          });
        })
        .catch(error => {
          this.$toast({
            message: error,
            position: "bottom"
          });
        });
      this.isShow = false;
      this.$store.dispatch("userCenter/setUserInfo");
    },
    nextStep() {
      if (this.code.length === 6) {
        commonApi
          .checkCode({
            type: "4",
            code: this.code
          })
          .then(res => {
            this.configStr = "更换手机号码";
            this.type = 4;
            this.code = "";
          })
          .catch(error => {
            this.$toast({
              message: error,
              position: "bottom"
            });
          });
      }
    },
    nextPasswordStep() {
      if (this.code.length === 6) {
        commonApi
          .checkCode({
            code: this.code,
            type: "3"
          })
          .then(res => {
            this.configStr = "";
            this.setConfig(6);
            this.isSuccess = false;
          })
          .catch(error => {
            this.$toast({
              message: error,
              position: "bottom"
            });
          });
      }
    },
    telChange(tel) {
      var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (reg.test(tel)) {
        this.isCanSend = false;
        this.showTelError = false;
      } else {
        this.isCanSend = true;
        this.showTelError = true;
      }
    },
    pwdChange(pwd) {
      if (pwd.length < 6) {
        this.showPwdError = true;
      } else {
        this.showPwdError = false;
      }
    },
    testPwdChange(pwd) {
      if (this.newPassword !== pwd || !this.newPassword) {
        this.showCheckPwdError = true;
        this.isSuccess = false;
      } else {
        this.showCheckPwdError = false;
        this.isSuccess = true;
      }
    },
    //修改手机号码完成
    complete() {
      if (this.code.length === 6 && !this.showTelError) {
        api
          .updatePhone({
            code: this.code,
            mobile: this.newTel
          })
          .then(res => {
            sessionStorage.setItem("TOKEN", res.token);
            this.$store.state.common.token = res.token;
            this.$toast({
              message: "手机修改成功",
              position: "bottom"
            });
            this.isShow = false;
            this.$store.dispatch("userCenter/setUserInfo");
          })
          .catch(error => {
            this.$toast({
              message: error,
              position: "bottom"
            });
          });
      }
    },
    //密码修改
    updatePass() {
      if (
        this.checkPassword === this.newPassword &&
        this.newPassword.length >= 6 &&
        this.checkPassword.length >= 6
      ) {
        api
          .updatePwd({
            code: this.code,
            pass: this.checkPassword
          })
          .then(res => {
            this.$toast({
              message: "修改成功",
              position: "bottom"
            });
            sessionStorage.setItem("TOKEN", res.token);
            this.$store.state.common.token = res.token;
          });

        this.isShow = false;
        this.$store.dispatch("userCenter/setUserInfo");
      }
    },
    // 注销账号
    cancelAccount() {
      this.cancelDialogShow = true;
    },
    //推出登录
    logout() {
      api.logout().then(res => {
        this.$toast({
          message: "操作成功",
          position: "bottom"
        });
        this.close();
        this.isShow = false;
        this.isLogout = false;
        sessionStorage.setItem("TOKEN", "");
        this.$store.state.userCenter.matchList = null;
        this.$store.dispatch("userCenter/setUserInfo");
      });
    },
    //注销账号
    deleteAccount() {
      api.deleteAccount({}).then(res => {
        this.isShow = false;
        this.isLogout = false;
        this.cancelDialogShow = false;
        this.$toast({
          message: "操作成功",
          position: "bottom"
        });
        this.close();
        sessionStorage.setItem("TOKEN", "");
        this.$store.dispatch("userCenter/setUserInfo");
      });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang='scss' scoped>
.config {
  width: 100vw;
  height: 100vh;
  background: #eee;
  .config-list {
    margin-top: 10px;
    & > li {
      height: 44px;
      background: #fff;
      border: 1px solid transparent;
      align-items: center;
      padding: 0 25px;
      display: flex;
      justify-content: space-between;
      box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
      &:active {
        border: 1px solid #6521d7;
      }
      .label {
        display: flex;
        align-items: center;
        color: #333;
        .avatar-pic {
          width: 24px;
          height: 24px;
        }
        .value {
          padding-left: 12px;
          font-size: 12px;
          color: #333;
          &.title {
            color: #999999;
          }
        }
      }
      .content-right {
        display: flex;
        align-items: center;
        .arrow-right {
          width: 16px;
          height: 16px;
          background: url("../../../assets/images/arrow-right.png") no-repeat 0
            0;
          background-size: 100% 100%;
        }
        .type {
          color: #999999;
          margin-right: 4px;
        }
      }
    }
  }
  .system {
    padding: 10px 15px 0px 15px;
    font-size: 12px;
    color: #aaaaaa;
  }
  .popup-content {
    &.text {
      padding: 0;
    }
    .avatar-list {
      margin-top: 10px;
      padding: 14px 17px;
      background: #fff;
      display: flex;
      flex-wrap: wrap;
      & > li {
        width: 33%;
        text-align: center;
        margin-bottom: 20px;
        & > p {
          margin-top: 8px;
          height: 12px;
          text-align: center;
        }
        & > img.avatar {
          width: 64px;
          border: 2px solid #ffffff;
          border-radius: 50%;
          &.selected {
            border: 2px solid #6521d7;
          }
        }
      }
    }
    .notice {
      font-size: 12px;
      color: #999;
      padding-bottom: 8px;
      .tel {
        color: #fff;
      }
    }
    .input-session {
      display: flex;
      .text-input {
        flex: 1;
      }
    }
    .next-step {
      width: 220px;
      height: 32px;
      background: #ccc;
      border-radius: 22px;
      margin: 0 auto;
      color: #999;
      font-size: 14px;
      font-weight: 500;
      margin-top: 30px;
      &.actived {
        background: #6521d7;
        color: #fff;
      }
      &:active {
        opacity: 0.8;
      }
    }
    .about {
      .list-top {
        height: 142px;
        background: #fff;
        box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);

        padding-left: 28px;
        display: flex;
        align-items: center;
      }
      .about-list {
        & > li {
          display: flex;
          align-items: center;
          padding: 10px 0;
          & > img {
            margin-right: 10px;
          }
          & > p {
            color: #333333;
            font-size: 14px;
            &.address {
              font-weight: bold;
              font-size: 16px;
            }
          }
        }
      }
      .about-title {
        display: flex;
        padding: 20px 0;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #333333;
        & > p {
          padding-left: 4px;
        }
      }
      .map-pic {
        border-radius: 4px;
      }
      .config-list {
        margin-top: 20px;
        padding: 0;
      }
    }
    .account-config {
      .config-list {
        padding: 0;
      }
    }
  }
  .cancel-content {
    width: 345px;
    padding: 20px 0;
    text-align: center;
    .title {
      color: #999;
      font-size: 15px;
    }
    .notice-list {
      & > li {
        text-align: left;
        font-size: 14px;
        color: #333;
        margin-top: 20px;
        margin-left: 60px;
      }
    }
    .btns {
      padding: 20px 38px 0 38px;
      display: flex;
      justify-content: space-between;
      & > div {
        width: 80px;
        height: 34px;
        font-size: 14px;
        border-radius: 17px;
        &.sure-btn {
          border: 1px solid #999999;
          color: #999999;
        }
        &.cancel-btn {
          background: #6521D7;
          color: #fff;
        }
      }
    }
  }
  .file-content {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    .popup-content {
      margin-top:10px;
      flex: 1;
      overflow-y: auto;
      background: #fff;
    }
  }
  .logout {
    height: 157px;
    background: #fff;
    text-align: center;
    .title {
      color: #999;
      font-size: 15px;
      padding: 20px;
    }
    .handler {
      padding: 0 15px;
      .logout-sure {
        color: #999;
        font-size: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid #6521d7;
      }
      .logout-cancel {
        color: #ffffff;
        font-size: 16px;
        padding: 16px 0 20px 0;
      }
    }
  }
  .cancel-account {
    position: fixed;
    height: 64px;
    background: #fff;
    bottom: 0px;
    left: 0;
    width: 100%;
    color: #999999;
    font-size: 16px;
  }
  .notice-str {
    height: 36px;
    color: #aaaaaa;
    font-size: 11px;
    display: flex;
    align-items: center;
    padding-left: 25px;
  }
}
</style>