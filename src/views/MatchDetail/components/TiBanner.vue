<!--
  功能：比赛详细情banner组件
  作者：feikeq
  邮箱：feikeq@gmail.com
  时间：2020年12月02日 16:16:45
-->
<template>
  <div
    :class="$options.name"
    alt="比赛详细情banner组件"
    v-bind:[$options.name]="$options.version"
    ref="banner"
  >
    <img v-if="game==='LOL'" class="pic" src="../images/banner_LOL.png" />
    <img v-if="game==='CSGO'" class="pic" src="../images/banner_CSGO.png" />
    <img v-if="game==='DOTA2'" class="pic" src="../images/banner_DOTA2.png" />
    <div class="mask" v-if="!video_show && !image_show">
      <div class="top">
        <div class="button">
          <a href="javascript:;" style="float: left;" title="返回">
            <img style="width:10px;" src="../images/back.png" @click="$router.go(-1)" />
          </a>
        </div>
        <h3
          v-if="matchDetailTop && matchDetailTop.mnl"
        >{{ matchDetailTop.mnl.tournament_name_zh || "[赛事]" }}</h3>
        <p v-if="matchDetailTop && matchDetailTop.mnl">
          {{
          matchDetailTop.mnl.match_time
          ? this.$format(
          matchDetailTop.mnl.match_time,
          "yyyy年MM月dd日 hh:mm"
          )
          : "00-00-00 00:00"
          }}
        </p>
      </div>

      <div class="score" v-if="matchDetailTop && matchDetailTop.mnl">
        <div class="blue">
          <MyImage
            v-model="matchDetailTop.mnl.team_home.team_img"
            :type="1"
            :teamID="matchDetailTop.mnl.team_home.team_id"
          />
          <p>
            {{
            matchDetailTop.mnl.team_home.team_short_name ||
            "[蓝队]"
            }}
          </p>
        </div>
        <div class="result">
          <span v-if="matchDetailTop.mnl.status_id===1">VS</span>
          <span v-else>{{ matchDetailTop.mnl.score }}</span>
        </div>
        <div class="red">
          <MyImage
            v-model="matchDetailTop.mnl.team_away.team_img"
            :type="1"
            :teamID="matchDetailTop.mnl.team_away.team_id"
          />
          <p>
            {{
            matchDetailTop.mnl.team_away.team_short_name ||
            "[红队]"
            }}
          </p>
        </div>
      </div>

      <div class="live" v-if="matchDetailTop && matchDetailTop.lvs">
        <div class="compbtn">
          <a href="javascript:;" @click="playVideo" v-if="matchDetailTop.lvs.video_addr">
            <img src="../images/video.png" />视频直播
          </a>
          <a href="javascript:;" @click="playImage" v-if="matchDetailTop.lvs.aimation_addr">
            <img src="../images/image.png" />动画直播
          </a>
        </div>
      </div>
    </div>
    <div class="newlayer video" v-if="video_show">
      <MyVideo v-if="matchDetailTop && matchDetailTop.lvs" :url="matchDetailTop.lvs.video_addr" />
      <div class="top">
        <div class="button">
          <a href="javascript:;" @click="playVideo(1)" style="float: left;" title="返回">
            <img style="width:10px;" src="../images/back.png" />
          </a>
        </div>
      </div>
    </div>
    <div class="newlayer image" v-if="image_show">
      <TiIframe
        :url="matchDetailTop.lvs.aimation_addr || 'https://m.esports8.com/de/live/dota?matchId=l8xsyuqtr76pqap'"
      />
      <div class="top">
        <div class="button">
          <a href="javascript:;" @click="playImage(1)" style="float: left;" title="返回">
            <img style="width:10px;" src="../images/back.png" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MyVideo from "@c/MyVideo";
import TiIframe from "@c/TiIframe";
export default {
  name: "TiBanner",
  author: "FeikeQ", // 作者
  version: "1.308.20201219", // 版本号
  components: { MyVideo, TiIframe },
  // 组件参数 接收来自父组件的数据
  props: ['game'],
  methods: {
    initgo(game_id, match_id) {
      let routeRound = this.$route.query.round;
      this.$store.dispatch(this.apiUrl, {
        routeRound
      });
    },
    playVideo(e, status) {
      if (status) {
        this.video_show = !status;
      } else {
        this.video_show = !this.video_show;
      }
    },
    playImage(e, status) {
      if (status) {
        this.image_show = !status;
      } else {
        this.image_show = !this.image_show;
      }
    }
  },
  data() {
    return {
      video_show: false,
      image_show: false,
      apiUrl: "matchDetail/_matchDetailTop"
    };
  },
  created() {
    if (this.$route.meta) this.initgo();
  },
  computed: {
    ...mapState({
      matchDetailTop: state => state.matchDetail.matchDetailTop,
      match_id: state => state.matchDetail.match_id
    })
  },
  mounted() {
    this.$store.state.common.bannerHeight = this.$refs["banner"].clientHeight;
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.TiBanner {
  width: 100%;
  position: relative;
  color: #fff;
  text-align: center;
  //   width: 376px;
  height: 210px;
  overflow: hidden;
  & > img.pic {
    width: 100%;
    height: 100%;
  }
  & > .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #00000050;
    & > .top {
      margin-top: 15px;
      & > h3,
      & p {
        font-size: 15px;
        font-weight: 400;
        line-height: 21px;
        padding: 0 60px;
      }
      & > .button {
        position: absolute;
        width: 100%;
        padding: 0 25px;
        text-align: right;
        & > a > img {
          width: 14px;
        }
      }
    }
    & > .score {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      font-size: 15px;
      font-weight: 400;
      line-height: 21px;
      text-align: center;
      margin-top: 10px;
      & > .blue,
      & > .red {
        flex: 2;
        // background-color: red;
        & > img {
          width: 50px;
          height: 50px;
          object-fit: contain;
        }
        & > p {
          display: inline-block;
          // background: blue;
          text-align: center;
          width: 90%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      & > .result {
        flex: 1;
        position: relative;
        & > span {
          display: block;
          white-space: nowrap;
          font-size: 30px;
          color: #fff;
          line-height: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    & > .live {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translate(-50%, -50%);
      & > .compbtn {
        & > a {
          color: #fff;
          background-color: #091026;
          border: 1px solid #0e1e4b;
          border-right: none;
          padding: 6px 8px;
          height: 17px;
          line-height: 17px;
          font-size: 12px;
          font-weight: normal;
          & > img {
            width: 12px;
            margin: -2px 5px 0 5px;
            margin-right: 5px;
            vertical-align: middle;
          }
        }

        & > a:first-child {
          border-top-left-radius: 15px;
          border-bottom-left-radius: 15px;
        }
        & > a:last-child {
          border-right: 1px solid #0e1e4b;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
        }
      }
    }
  }

  & > .newlayer {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #00000050;
    & > .top {
      position: absolute;
      z-index: 9999;
      top: 15px;
      height: 42px;
      width: 100%;
      & > h3,
      & p {
        font-size: 15px;
        font-weight: 400;
        line-height: 21px;
        padding: 0 60px;
      }
      & > .button {
        position: absolute;
        width: 100%;
        padding: 0 25px;
        text-align: right;
        & > a > img {
          width: 14px;
        }
      }
    }
  }
}
</style>
