<!--
 * @Author: FeikeQ
 * @Date: 2020-11-21 18:20:54
 * @LastEditTime: 2021-01-06 13:59:23
 * @LastEditors: FeikeQ
 * @FilePath: /ti-wap/src/views/MatchDetail/Lol/components/Chat/index.vue
 * @Description: 
-->
<template>
  <div alt="聊天" :class="$options.name" v-bind:[$options.name]="$options.version">
      <!-- <TiTable title-bg-color="#7259BF" /> -->
      chat
  </div>
</template>

<script>
import TiTable from "@c/TiTable";
export default {
    name: "Chat",
    version: "1.309.20201117", // 自定义版本号属性
    components: { TiTable},
    methods: {},
    data() {
        return{ 
        }
    },
}
</script>

<style>

</style>