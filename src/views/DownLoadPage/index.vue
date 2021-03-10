
<template>
  <div class="download-page">
    <van-icon name="close"  class="close-pic" size="32" @click="$router.go(-1)"/>
    <img src="http://ti-img.inkr.xyz/storage/wap/download.png" alt width="100%" />
    <div class="btns">
      <div class="btn-android" @click="downLoad('android')">
        <img src="./images/android.png" alt />
        <span>安卓端APP下载</span>
      </div>
      <div class="btn-ios" @click="downLoad('ios')">
        <img src="./images/ios.png" alt />
        <span>IOS端桌面快捷</span>
      </div>
    </div>
  </div>
</template>

<script>
import {isAndroid} from '@/utils/utils'
export default {
  name: "Index",
  data() {
    return {
      isAndroid:isAndroid() //判断是否为安卓系统
    };
  },
  methods: {
    downLoad(type){
      //if(isAndroid && type=='ios') return false
      if(type=='ios') {
        this.$router.push('/guide');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.download-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #fff;
  .btns {
    flex: 1;
    padding: 20px 0;
    &>div {
      margin:0 auto;
      width:228px;
      height: 44px;
      background: linear-gradient(0deg, #dda35c 0%, #f29b46 100%);
      border-radius: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      & > span {
        color: #fff;
        padding-left:10px;
        font-size:16px;
      }
    }
    .btn-ios{
      margin-top:20px;
    }
  }
  .close-pic{
    position: fixed;
    top:10px;
    right:10px;
    color:#fff;
  }
}
</style>
