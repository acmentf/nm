<template>
  <div style="width:100%;height:100%;background-color:#000;">
    <video-player
      class="video-player vjs-custom-skin"
      ref="videoPlayer"
      :playsinline="true"
      :options="playerOptions"
    ></video-player>
  </div>
</template>

<script>
import "videojs-contrib-hls";
export default {
  name: "Index",
  props: {
    url: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      playerOptions: {
        volume: 5,
        playbackRates: [], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "http://www.flashls.org/playlists/test_001/stream_1000k_48k_640x360.m3u8"//url地址
          }
        ],
        //poster: "../../static/images/test.jpg", //你的封面地址
        width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: "此比赛暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  methods: {}
};
</script>

<style lang="scss">
.vjs-custom-skin > .video-js .vjs-big-play-button {
  background-color: rgba(0, 0, 0, 0.45);
  font-size: 3.5em;
  border-radius: 50%;
  height: 2em !important;
  line-height: 2em !important;
  margin-top: -1em !important;
  margin-left: -1em !important;
  width: 2em !important;
  outline: none;
}

.video-js .vjs-big-play-button .vjs-icon-placeholder:before {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
}

/*control-bar布局时flex，通过order调整剩余时间的位置到进度条右边*/
.vjs-custom-skin > .video-js .vjs-control-bar .vjs-remaining-time {
  order: 3 !important;
}

/*进度条背景轨道*/
.video-js .vjs-slider {
  border-radius: 1em;
}

/*进度条进度*/
.vjs-custom-skin > .video-js .vjs-play-progress,
.vjs-custom-skin > .video-js .vjs-volume-level {
  border-radius: 1em;
}

/*鼠标进入播放器后，播放按钮颜色会变*/
.video-js:hover .vjs-big-play-button,
.vjs-custom-skin > .video-js .vjs-big-play-button:active,
.vjs-custom-skin > .video-js .vjs-big-play-button:focus {
  background-color: rgba(0, 0, 0, 0.4) !important;
}

/*control bar*/
.video-js .vjs-control-bar {
  background-color: rgba(0, 0, 0, 0.2) !important;
}

/*点击按钮时不显示蓝色边框*/
.video-js .vjs-control-bar button {
  outline: none;
}
.vjs-error .vjs-error-display:before{
  content:'' !important;
}
</style>
