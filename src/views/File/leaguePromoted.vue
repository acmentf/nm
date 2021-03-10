<!--
 * @Author: FeikeQ
 * @Date: 2021-01-11 15:47:52
 * @LastEditTime: 2021-01-18 14:46:39
 * @LastEditors: FeikeQ
 * @FilePath: /ti-wap/src/views/File/leaguePromoted.vue
 * @Description: 
-->
<template>
  <div class="league-detail-page">
      <league-promoted :id="this.$route.query.id" :game="this.$route.query.game" ></league-promoted>
  </div>
</template>

<script>

import LeaguePromoted from "@/views/League/components/Promoted";

export default {
    name: "league-detail-page",
    components: {LeaguePromoted},
    data() {
        console.log('联赛ID:',this.$route.query.id);
        return {}
    }
   
}

</script>


<style lang="less" >

.league-detail-page{
    width: 100%;
    height: 100vh;
}
</style>
