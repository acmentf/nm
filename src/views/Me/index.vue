<template>
  <!-- 用户中心 -->
  <div class="user-center" v-if="isRefersh">
    {{$store.state.common.t}}
    <!-- 用户头像 -->
    <div class="avatar-container">
      <img
        src="./images/default-avatar.png"
        alt
        width="68"
        v-if="!userInfo.user_id"
        @click="goLogin"
      />
      <img :src="require('./images/avatar-'+userInfo.avatar_id+'.png')" alt width="68" v-else @click="isShow=true" />
      <div class="str" v-if="!userInfo.user_id" @click="goLogin">
        Hello,
        <br />点我登录
      </div>
      <div class="str" v-else>{{userInfo.nick_name}}</div>
      <img
        src="./images/config.png"
        alt
        width="20"
        class="config-pic"
        @click="isShow=true"
        v-if="userInfo.user_id"
      />
    </div>
    <!-- 邀请好友 -->
    <div class="invitation-wrapper">
      <div class="invitation" @click="sharePoup">
        <div class="label flex">
          <img src="./images/invite.png" alt width="24" />
          <span class="invite-str">邀请好友</span>
        </div>
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="main-container">
      <div>
        <p class="notice">我的关注</p>
        <div class="team-detail-content">
          <ul v-if="matchList">
            <li v-for="item in matchList" :key="item.group_name">
              <p class="date">{{item.group_str}}</p>
              <MatchItem
                v-for="(_item,_index) in item.group_item"
                :key="_index"
                :item_data="_item"
                :dateStr="item.group_str"
                class="match-item"
              />
            </li>
          </ul>
          <match-empty :EmptyType="3" v-else>还没有关注，去找找您喜欢的比赛关注吧</match-empty>
        </div>
      </div>
    </div>
    <!-- 设置 popup-->
    <van-popup v-model="isShow" position="right" :style="{ height: '100%'}">
      <Config :userInfo="userInfo" />
    </van-popup>
    <!-- 分享 -->
    <van-overlay :show="isShare" @click="isShare = false" z-index='1111'>
      <div class="share" @click.stop>
        <img src="./images/share.png" alt width="100%" />
      </div>
    </van-overlay>
    <img id="downloadPic" src="./images/download-pic.png" alt style="display:none" />
    <van-action-sheet v-model="isShare" :overlay="false">
      <div class="share-content">
        <ul class="handler-list">
          <li @click="downloadIamge('share-img')">
            <img src="./images/download.png" alt />
            <p>下载图片</p>
          </li>
          <li @click="copyLink">
            <img src="./images/clone.png" alt />
            <p>复制链接</p>
          </li>
        </ul>
        <div class="cancel-btns flex" @click="isShare = false">取消</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import Module from "@c/Module";
import Star from "@c/Star";
import MatchItem from "./components/MatchItem";
import Config from "./components/config";
import { mapState } from "vuex";
import * as api from "@/api/userCenter";
import MatchEmpty from "@c/Empty";
export default {
  components: { Module, Star, MatchItem, Config, MatchEmpty },
  data() {
    return {
      isShow: false,
      isShare: false,
      isRefersh: true,
      show: true,
      mode: "single",
      date: ""
    };
  },
  watch: {
    $route(val) {
      if (val.path === "/main/index") {
        this.isRefersh = true;
        this.getUserInfo();
      } else {
        this.isRefersh = false;
      }
    }
  },
  methods: {
    /**跳转到登录界面 */
    goLogin() {
      this.$router.push("/login");
    },
    getUserInfo() {
      this.isShow = false;
      this.isShare = false;
      if (sessionStorage.getItem("TOKEN")) {
        this.$store.dispatch("userCenter/setUserInfo");
        this.getFocusList();
      } else {
        this.$store.state.userCenter.matchList = null;
      }
    },
    onChange(date) {
      this.date = date.format("YYYY-MM-DD");
    },
    //分享
    sharePoup() {
      this.isShare = true;
    },
    //下载图片
    downloadIamge(name) {
      var img = document.getElementById("downloadPic"); // 获取要下载的图片
      var url = img.src; // 获取图片地址
      var a = document.createElement("a"); // 创建一个a节点插入的document
      var event = new MouseEvent("click"); // 模拟鼠标click点击事件
      a.download = name; // 设置a节点的download属性值
      a.href = url; // 将图片的src赋值给a节点的href
      a.dispatchEvent(event); // 触发鼠标点击事件
      this.$toast({
        message: "图片下载成功",
        position: "bottom"
      });
      this.isShare = false;
    },
    //复制链接
    copyLink(row) {
      let inputNode = document.createElement("input");
      let { protocol, host } = window.location;
      inputNode.value = `${protocol}//${host}`;
      document.body.appendChild(inputNode);
      inputNode.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      inputNode.className = "oInput";
      inputNode.style.display = "none";
      this.$toast({ message: "复制链接成功", position: "bottom" });
      this.isShare = false;
    },
    //获取关注列表
    getFocusList() {
      api
        .getFocusList({ type: "0", op_type: 1 })
        .then(res => {
          this.$store.state.userCenter.matchList = res.list;
        })
        .catch(error => {
          this.$store.state.userCenter.matchList = null;
        });
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userCenter.userInfo,
      shareImgUrl: state => state.common.invitePic,
      codeUrl: state => state.common.codeUrl,
      matchList: state => state.userCenter.matchList
    })
  },
  created() {
    this.getUserInfo();
  }
};
</script>
<style lang="scss" scoped>
.user-center {
  height: 100vh;
  background: #eee;
  .avatar-container {
    background: #6521d7;
    position: relative;
    padding: 0 15px;
    height: 108px;
    display: flex;
    align-items: center;
    .config-pic {
      position: absolute;
      right: 15px;
      top: 12px;
    }
    .str {
      font-size: 20px;
      line-height: 27px;
      color: #ffffff;
      margin-left: 16px;
    }
  }
  .invitation-wrapper {
    margin-top: 10px;
    .invitation {
      height: 44px;
      background: #fff;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
      opacity: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px 10px 25px;
      .arrow-right {
        width: 16px;
        height: 16px;
        background: url("../../assets/images/arrow-right.png") no-repeat 0 0;
        background-size: 100% 100%;
      }
      .invite-str {
        font-size: 12px;
        color: #333333;
        margin-left: 10px;
      }
    }
  }

  .main-container {
    position: absolute;
    width: 100%;
    top: 162px;
    bottom: 62px;
    .item {
      margin-top: 10px;
      display: flex;
      height: 80px;
      padding: 0 10px;
      border-radius: 6px;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15);
      background: #6521d7;
      align-items: center;
      position: relative;
      .team-pic {
        width: 44px;
        height: 44px;
        margin-right: 10px;
      }
      .star {
        position: absolute;
        top: 10px;
        right: 10px;
      }
      .detail {
        flex: 1;
        .name {
          color: #ffffff;
          font-weight: bold;
          font-size: 15px;
          margin-bottom: 8px;
        }
        .bottom {
          display: flex;
          justify-content: space-between;
          .time {
            font-size: 12px;
            color: #878fa2;
            .space {
              padding: 0 5px;
            }
          }
          .status {
            font-size: 10px;
            &.now {
              color: #ff4e49;
            }
            &.nostart {
              color: #5dba6c;
            }
            &.end {
              color: #999999;
            }
          }
          .score {
            font-size: 10px;
            font-weight: 500;
            color: #ffffff;
          }
        }
      }
    }
    & > div {
      height: 100%;
      display: flex;
      flex-direction: column;
      .notice {
        height: 36px;
        padding-left: 15px;
        align-items: center;
        display: flex;
        color: #aaaaaa;
        font-size: 11px;
      }
    }
  }
  .share {
    width: 265px;
    height: 400px;
    overflow: hidden;
    position: fixed;
    left: 50%;
    top: 10%;
    transform: translate(-50%, 0%);
    @media screen and (min-height: 800px) {
      top: 40%;
      transform: translate(-50%, -50%);
    }
  }
  .share-content {
    background: #f1f6f7;
    padding: 20px 0 27px 0;
    .handler-list {
      display: flex;
      padding: 0 8px;
      & > li {
        padding: 0 12px;
        & > img {
          width: 48px;
          height: 48px;
        }
        & > p {
          color: #333333;
          font-size: 12px;
          margin-top: 8px;
        }
      }
    }
    .cancel-btns {
      height: 40px;
      background: #ffffff;
      margin-top: 10px;
      color: #333;
      font-size: 14px;
    }
  }
  .team-detail-content {
    overflow-y: auto;
    flex: 1;
    .date {
      height: 36px;
      padding-left: 15px;
      align-items: center;
      display: flex;
      color: #aaaaaa;
      font-size: 11px;
    }
    li:last-child {
      margin-bottom: 10px;
    }
    
  }
}
</style>