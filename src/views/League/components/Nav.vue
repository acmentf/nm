<!--
 * @Author: FeikeQ
 * @Date: 2021-01-04 15:14:42
 * @LastEditTime: 2021-01-13 17:53:47
 * @LastEditors: FeikeQ
 * @FilePath: /ti-wap/src/views/League/components/Nav.vue
 * @Description: 
-->
<template>
    <div class="nav-component" :alt="match_id">
        <i class="back-icon" @click="$router.go(-1)"></i>
        <div class="team-name">{{ title }}</div>
        <Star v-model="focus" :parmars="{game_id:game,type:'0',id_list:match_id}" />
    </div>
</template>

<script>
import Star from "@/components/Star";
export default {
    name: "nav-component",
    components: { Star },
    props: {
        is_focus:{
            type:Boolean
        },
        game:{
            type:String
        },
        title:{
            type:String
        },
        match_id:{
            type:[String,Number]
        }
    },
    data() {
        return {
            focus: this.is_focus
        };
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {},
};
</script>
<style lang="scss" scoped>
.nav-component {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 24px;
    padding: 0 10px;
    .team-name {
        font-size: 17px;
        color: #fff;
    }
    .back-icon {
        width: 18px;
        height: 18px;
        background: url("../images/arrow-left.png") no-repeat 0 0;
        background-size: 100% 100%;
    }
}
</style>
