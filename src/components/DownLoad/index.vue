<template>
  <div class="download" v-show="$store.state.common.download_show" :class="!isShow?'animated fadeOut':''">
    <div class="left-session" @click="close">
      <img src="../../assets/images/close.png" alt class="close"/>
    </div>
    <div class="btn" @click="download"></div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      isShow: true
    };
  },
  methods: {
    close(){
      this.isShow = false;
      setTimeout(()=>{
        this.$store.state.common.download_show = false
      },500)
    },
    download(){
      //this.$router.push('/download')
      window.location.href = "https://dl.t1play.com/index.html";
    }
  }
};
</script>
<style lang="scss" scoped>
.download {
  position: fixed;
  height: 60px;
  width: 100%;
  background: url("../../assets/images/download.png") 0 0 no-repeat;
  background-size: 100% 100%;
  bottom: 0;
  left: 0;
  z-index: 999999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-session {
    padding: 0 15px;
    height: 100%;
    display: flex;
    align-items: center;
    .close {
      width: 20px;
      height: 20px;
    }
  }
  .btn{
    width:150px;
    height:100%;
  }
 
}
</style>
