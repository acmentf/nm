<!--
 * @Author: FeikeQ
 * @Date: 2021-01-06 17:32:39
 * @LastEditTime: 2021-03-06 11:31:46
 * @LastEditors: Please set LastEditors
 * @FilePath: /ti-wap/src/views/League/components/Maps.vue
 * @Description: 
-->
<template>
  <div class="league-maps">
      <div class="tip">
          <div class="left">CT胜率</div>
          <div class="mid">使用场次</div>
          <div class="right">T胜率</div>
      </div>
      <template v-if="data && data.length">
      <div v-for="(item, index) in data" :key="index" class="mapbox" :style="{backgroundImage:`url(${item.mapimg})`}">
            <div class="mask"></div>
            <div class="tip" style="z-index:3">
                <div class="left">
                    <div class="tip-bottom">{{item.ct_win}}%</div>
                </div>
                <div class="mid">
                    <p class="mapname">{{item.mapname}}</p> 
                    <p class="session"><span>{{item.session}}场</span></p>
                </div>
                <div class="right">
                    <div class="tip-bottom yellow">{{item.t_win}}%</div>
                </div>
            </div>
      </div>
      </template>
      <Empty v-else EmptyType="2">暂无地图榜数据</Empty>
      
  </div>
</template>

<script>
import Empty from "@c/Empty";
export default {
    components: { Empty },
    props:{
        data:{
            type:Array,
            default:()=>[
                {
                    mapimg:"http://ti-img.inkr.xyz/storage/csgo_local/map/cm_c_1.png",
                    mapname:"De_dust2",
                    session:"22",
                    t_win:"78.81",
                    ct_win:"22.19",
                },
                {
                    mapimg:"http://ti-img.inkr.xyz/storage/csgo_local/map/cm_c_2.png",
                    mapname:"De_dust2",
                    session:"22",
                    t_win:"78.81",
                    ct_win:"22.19",
                },
                {
                    mapimg:"http://ti-img.inkr.xyz/storage/csgo_local/map/cm_c_3.png",
                    mapname:"De_dust2",
                    session:"22",
                    t_win:"78.81",
                    ct_win:"22.19",
                }
            ]
        }
    }

}
</script>

<style lang="less" >
.league-maps{
    margin-right: 15px;
    text-align: center;
    color: #fff;
    height: 100%;
    .tip{
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 10px;
        .mid{
            width: 100px;
        }
        .left{
            flex:1;
            text-align: left;
        }
        .right{
            flex:1;
            text-align: right;
        }
    }
    .mapbox{
        display: flex;
        align-items: center;
        height: 66px;
        position: relative;
        background-size:cover;
        background-repeat: no-repeat;
        background-position: center center; 
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        border-radius: 4px;
        margin: 10px 0;
        overflow: hidden;
        .mask{
            position:absolute;
            width: 100%;
            height: 100%;
            background:rgba(0, 0, 0, 0.6);
            z-index: 2;
        }
        .tip{
            .left{
                padding: 0 12px;
            }
            .right{
                padding: 0 12px;
            }
        }
    }
    .mapname{
        font-size: 12px;
        line-height: 17px;
        text-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.35);
    }
    .session{
        margin-top:10px;
        line-height: 10px;
        color: #BABABA;
        text-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.35);
        span{
            display:inline-block;
            width: 52px;
            height: 16px;
            line-height: 16px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 8px;
        }
        
    }

    .tip-bottom{
        display: inline-block;
        width: 64px;
        height: 22px;
        line-height: 22px;
        font-size: 12px;
        color: #fff;
        text-align: center;
        background: linear-gradient(90deg, #75D4FD 0%, #1A97E5 100%);
        border-radius: 12px;
        &.yellow{
            background: linear-gradient(90deg, #FDA975 0%, #FAA047 100%);
        }
    }
}
</style>