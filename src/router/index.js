import Vue from "vue";
import Router from "vue-router";
import Layout from "@c/Layout";
import MatchDetail from "@/views/MatchDetail/index";
Vue.use(Router);
const router = new Router({
  // vue-router 默认是很丑的 hash 模式 , 我们可以用路由的 history 模式
  mode: "history",
  //base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/main/index", 
    },
    {
      path: "/login",
      component: () => import("@/views/Login/index"),
      name: "login",
      meta: {
        title: "登录",
      },
    },


    {
      //引导界面
      path: "/open-page",
      name: "open-page",
      component: () => import("@/views/OpenPage"),
    },
    {
      //首页
      path: "/main/index",
      name: "main",
      component: () => import("@c/Layout"),
      meta: {
        keepAlive: true
      },
      // children: [
      //   {
      //     path: "index",
      //     component:() => import("@/views/MatchList"),
      //     name: "matchList",
      //     meta: {
      //       title: "比赛",
      //        //keepAlive: true,
      //       _INDEX: 0,
      //     },
      //   },
      //   {
      //     path: "league",
      //     component:() => import("@/views/League"),

      //     name: "league",
      //     meta: {
      //       title: "联赛",
      //       //keepAlive: true,
      //       _INDEX: 1,
      //     },
      //   },
      //   {
      //     path: "team",
      //     component:() => import("@/views/Team"),
      //     name: "team",
      //     meta: {
      //       title: "战队",
      //       //keepAlive: true,
      //       _INDEX: 2,
      //     },
      //   },
      //   {
      //     path: "my",
      //     component:() => import("@/views/Me"),
      //     name: "my",
      //     meta: {
      //       title: "个人中心",
      //        keepAlive: true,
      //       _INDEX: 3,
      //     }
      //   },
      // ],
    },
    {
      //比赛详情
      path: "/match-detail",
      name: "matchDetail",
      component: MatchDetail,
      redirect: "/match-detail/Lol",
      children: [
        {
          path: "LOL",
          component: () => import("@/views/MatchDetail/Lol"),
          name: "LOL",
          meta: {
            title: "LOL",
            menuId: "detail_lol",
            game_id: "LOL",
          },
        },
        {
          path: "DOTA2",
          component: () => import("@/views/MatchDetail/Dota2"),
          name: "DOTA2",
          meta: {
            title: "DOTA2",
            menuId: "detail_dota2",
            game_id: "DOTA2",
          },
        },
        {
          path: "CSGO",
          component: () => import("@/views/MatchDetail/Csgo"),
          name: "CSGO",
          meta: {
            title: "CSGO",
            menuId: "detail_csgo",
            game_id: "CSGO",
          },
        },
      ],
    },

    {
      path: "/league-detail",
      component: () => import("@/views/League/detail"),
      name: "league-detail",
      meta: {
        title: "联赛详情",
        keepAlive: true,
      },
    },
    {
      path: "/team-detail",
      component: () => import("@/views/Team/detail"),
      name: "team-detail",
      meta: {
        title: "战队详情",
        keepAlive: true,
      },
    },
    {
      path: "/team-more",
      component: () => import("@/views/Team/more"),
      name: "team-more",
      meta: {
        title: "赛事荣誉",
      },
    },
    //队员详情
    {
      path: "/player-detail",
      component: () => import("@/views/Player"),
      name: "player-detail",
      meta: {
        title: "队员详情",
        keepAlive: true,
      },
    },
    //下载界面
    {
      path: "/download",
      component: () => import("@/views/DownLoadPage"),
    },
    //引导界面
    {
      path: "/guide",
      component: () => import("@/views/Yd"),
    },
    //服务条款
    {
      path: "/service-terms",
      component: () => import("@/views/File/serviceTerms"),
    },
    //隐私协议 详情版
    {
      path: "/privacy-agreement",
      component: () => import("@/views/File/privacyAgreement"),
    },
    //隐私协议 精简版
    {
      path: "/privacy-agreement-cut",
      component: () => import("@/views/File/index"),
    },

    //晋级图
    {
      path: "/league-promoted",
      component: () => import("@/views/File/leaguePromoted"),
      name: "league_promoted",
      meta: {
        title: "晋级图",
      },
    },
  ],
});
// router.onError((error) => {
//   const pattern = /Loading chunk (\d)+ failed/g;

//   const isChunkLoadFailed = error.message.match(pattern);
//   const targetPath = router.history.pending.fullPath;

//   if (isChunkLoadFailed) {
//     router.replace(targetPath);
//   }
// })
export default router
