<template>
  <div id="app" class="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" :key="key"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
    };
  },
  components: {},
  created() {
    //获取系统时间
    this.$store.dispatch("common/_getSystemTime", { info_type: "matchtime" });
    this.$store.dispatch("common/_getPublicData");
    this.$store.dispatch("common/_getNavTabsList");
  },
  methods: {},
  mounted() {
    const script = document.createElement("script");
    script.src =
      "https://v1.cnzz.com/z_stat.php?id=1279722697&web_id=1279722697"; //友盟中的代码
    script.language = "JavaScript";
    document.body.appendChild(script);
  },
  watch: {
    $route: {
      handler(to, from) {
        setTimeout(() => {
          //避免首次获取不到window._czc
          if (window._czc) {
            let location = window.location;
            let contentUrl = location.pathname;
            let refererUrl = "/";
            // 用于获取某个URL的PV统计请求，
            window._czc.push(["_setAutoPageview", false]);
            window._czc.push(["_trackPageview", contentUrl, refererUrl]);
          }
        }, 300);
      },
      immediate: true // 首次进入页面即执行
    }
  },
  computed:{
    key () {
      return this.$route.fullPath
    },
  }
};
</script>

<style lang="scss" scoped>
.app {
  overflow-y: auto;
  background: #EEE;
}

* {
  font-size: 11px;
  -webkit-overflow-scrolling: touch;
}
</style>
