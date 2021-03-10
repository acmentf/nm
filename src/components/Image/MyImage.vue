<!--
 * @Author: FeikeQ
 * @Date: 2020-11-27 11:08:39
 * @LastEditTime: 2021-02-01 15:16:30
 * @LastEditors: FeikeQ
 * @FilePath: /ti-wap/src/components/Image/MyImage.vue
 * @Description: 
-->
<template>
  <img v-if="display" :src="value.length?(value+params):default_null"   @error="onError" :width="size" :style="{borderRadius:round?'50%':'',opacity:((type==8)&&!value.length)?'0':''}"  />
</template>

<script>
const default_null = require("@/assets/images/null.png");
const default_team = require("@/assets/images/team.png");
const default_player = require("@/assets/images/player.png");
const default_hero = require("@/assets/images/hero.png");
const default_equip = require("@/assets/images/equip.png");
const default_country = require("@/assets/images/country.png");
const default_league = require("@/assets/images/league.png");
export default {
  name: "MyIMAGE",
  props: {
      // 强制占位显示
      placeholder:{
          type:Boolean,
          default:false,
      },
    value: {
      type: String,
      default: ""
    },
    //图片类型 0:默认 1:战队  2:选手  3:英雄  4:装备  5:国家  6:联赛 7:待定 8:透明
    type: {
      type: Number  | String,
      default: 1
    },
    //图片尺寸
    size: {
      type: String | Number,
      default: 24
    },
    // 图片参数 byFeikeQ
    params:{
        type: String,
        default: "" // "?x-oss-process=image/resize,m_fill,h_140,w_140,limit_0"
    },
    //是否为圆形
    round:{
      type: Boolean,
      default:false
    }
  },
  data() {
    return {
      default_null,
      default_team,
      default_player,
      default_hero,
      default_equip,
      default_country,
      default_league
    };
  },
  computed:{
      display(){
          if(this.placeholder){
              return true;
          }
          return this.value.length;
      }
  },
  methods: {
    onError() {
        this.params ="";
      switch (this.type) {
        case 1:
          this.$emit("input", default_team);
          break;
        case 2:
          this.$emit("input", default_player);
          break;
        case 3:
          this.$emit("input", default_hero);
          break;
        case 4:
          this.$emit("input", default_equip);
          break;
        case 5:
          this.$emit("input", default_country);
          break;
        case 6:
          this.$emit("input", default_league);
          break;
        case 7:
          this.$emit("input", default_league);
          break;
        default  :
          this.$emit("input", default_team);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
