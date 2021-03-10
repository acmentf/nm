/*
 * @Author: TangFen
 * @Date: 2020-12-09 10:03:48
 * @LastEditTime: 2021-03-05 14:53:39
 * @LastEditors: FeikeQ
 * @FilePath: /nami-wap/vue.config.js
 * @Description: 
 */
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "${path.resolve(
            __dirname,
            "src/styles/theme.less"
          )}";`,
          "@toast-background-color": "#6521d7",
          "@toast-font-size": "12px",
          "@toast-text-color": "#fff",
          "@dialog-background-color": "#fff",
          "@dialog-border-radius": "6px",
          "@dialog-has-title-message-text-color": "#999",
        },
      },
    },
  },
  publicPath: process.env.PUBLIC_PATH, // 基本路径
  outputDir: "../nami_wap_deploy/dist", // 输出文件目录
  lintOnSave: false,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.mode = "production";
    }
    Object.assign(config, {
      externals: {

      },
      // 开发生产共同配置
      resolve: {
        extensions: [".js", ".vue", ".json"],
        alias: {
          "@": path.resolve(__dirname, "./src"),
          "@c": path.resolve(__dirname, "./src/components"),
          "@p": path.resolve(__dirname, "./src/pages"),
        }, // 别名配置
      },
    });
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  // css相关配置
  // webpack-dev-server 相关配置
  // 第三方插件配置
  pluginOptions: {},
  devServer: {
    open: true, //是否自动弹出浏览器页面
    // host: "192.168.1.34",
    port: "8099",
    https: false,
    hotOnly: false,
    proxy: {
      "/api/": {
        target: "http://192.168.1.17:8080/", //API服务器的地址
        //target: "https://ti-api.inkr.xyz", 
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {
          "^/api": "",
        },
      },
    },
    //historyApiFallback: true
  },
  pwa: {
    name: "Ti电竞",
    themeColor: "#0A1331",
    msTileColor: "#0A1331",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    iconPaths: {
      favicon32: "favicon.ico",
      favicon16: "favicon.ico",
      appleTouchIcon: "apple-touch-icon.png",
      maskIcon: "favicon.ico",
      msTileImage: "apple-touch-icon.png",
    },
  },
  transpileDependencies: [
    "webpack-dev-server/client", // 将可能不会被编译的依赖写到该数组
    "vant",
  ],
  chainWebpack: (config) => {
    config.entry.app = ["babel-polyfill", "./src/main.js"];
  },
};
