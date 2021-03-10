<!--
  功能：出装与KD数据
  作者：feikeq
  邮箱：feikeq@gmail.com
  时间：2020年11月07日 14:30:00
-->
<template>
  <Module :alt="title">
    <div :class="$options.name" alt="出装与KD数据" v-bind:[$options.name]="$options.version" v-if="data">
      <!-- {{data}} -->
      <div class="blue">
        <div class="title" :team_id="data.role_attr_info_home.team_id">
          <MyImage class="logo" v-model="data.role_attr_info_home.team_img" :type="1" />
          <b>{{ data.role_attr_info_home.team_short_name || "[主队]" }}</b>
          <dd>
            <span>
              <img src="../../images/gold_home.png" />
              <i>{{ data.role_attr_info_home.total.money || 0 }}</i>
            </span>
            <span>
              <img src="../../images/kill_home.png" />
              <i>
                {{ data.role_attr_info_home.total.kill || 0 }}/{{
                data.role_attr_info_home.total.die || 0
                }}/{{ data.role_attr_info_home.total.assists || 0 }}
              </i>
            </span>
          </dd>
        </div>
        <div class="list">
          <div class="line" v-for="(item, index) in data.role_attr_info_home.player" :key="index">
            <div class="con">
              <div class="pic">
                <MyImage
                  v-model="item.play_info.role_img_url"
                  :type="3"
                  :role_id="item.play_info.role_id"
                />
                <b>{{ item.play_info.level || 0 }}</b>
              </div>
              <div class="bag">
                <h3 :player_id="item.play_info.player_id">{{ item.play_info.player_name || " " }}</h3>
                <div class="icon">
                  <MyImage
                    v-for="(e_item, e_index) in item.play_equip_imgs"
                    :key="e_index"
                    v-model="item.play_equip_imgs[e_index]"
                    :type="4"
                  />
                </div>
              </div>
              <div class="data">
                <div class="box">
                  <p>
                    <span class="up">
                      <img src="../../images/gold_home.png" />
                      <i>{{ item.play_info.money || 0 }}</i>
                    </span>
                    <span class="in">
                      XPM
                      <b>{{ item.play_info.xpm || "-" }}</b>
                    </span>
                  </p>
                  <p>
                    <span class="up">
                      <img src="../../images/kill_home.png" />
                      <i>
                        {{ item.play_info.kill || 0 }}/{{
                        item.play_info.die || 0
                        }}/{{ item.play_info.assists || 0 }}
                      </i>
                    </span>
                    <span class="in">
                      GPM
                      <b>{{ item.play_info.gpm || "-" }}</b>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <TiCollapseDOTA>
              <div class="collapsebox">
                <span>
                  <i>KDA：</i>
                  <b>{{ item.play_info.kda || "-" }}</b>
                </span>
                <span>
                  <i>正/反补：</i>
                  <b>{{item.play_info.last_hits || "-"}}/{{item.play_info.denies || "-"}}</b>
                </span>
                <span>
                  <i>参团率：</i>
                  <b>{{ item.play_info.group_rate || "-" }}</b>
                </span>
                <!-- <span>
                  <i>伤害：</i>
                  <b>{{ item.play_info.attack || "-" }}</b>
                </span>
                <span>
                  <i>承伤：</i>
                  <b>{{ item.play_info.bear || "-" }}</b>
                </span> -->
              </div>
            </TiCollapseDOTA>
          </div>
        </div>
      </div>

      <div style="height:25px"></div>

      <div class="red">
        <div class="title" :team_id="data.role_attr_info_away.team_id">
          <MyImage class="logo" v-model="data.role_attr_info_away.team_img" :type="1" />
          <b>{{ data.role_attr_info_away.team_short_name || "[客队]" }}</b>
          <dd>
            <span>
              <img src="../../images/gold_away.png" />
              <i>{{ data.role_attr_info_away.total.money || 0 }}</i>
            </span>
            <span>
              <img src="../../images/kill_away.png" />
              <i>
                {{ data.role_attr_info_away.total.kill || 0 }}/{{
                data.role_attr_info_away.total.die || 0
                }}/{{ data.role_attr_info_away.total.assists || 0 }}
              </i>
            </span>
          </dd>
        </div>
        <div class="list">
          <div class="line" v-for="(item, index) in data.role_attr_info_away.player" :key="index">
            <div class="con">
              <div class="pic">
                <MyImage
                  v-model="item.play_info.role_img_url"
                  :type="3"
                  :role_id="item.play_info.role_id"
                />
                <b>{{ item.play_info.level || 0 }}</b>
              </div>
              <div class="bag">
                <h3 :player_id="item.play_info.player_id">{{ item.play_info.player_name || " " }}</h3>
                <div class="icon">
                  <MyImage
                    v-for="(e_item, e_index) in item.play_equip_imgs"
                    :key="e_index"
                    v-model="item.play_equip_imgs[e_index]"
                    :type="4"
                  />
                </div>
              </div>
              <div class="data">
                <div class="box">
                  <p>
                    <span class="up">
                      <img src="../../images/gold_away.png" />
                      <i>{{ item.play_info.money || 0 }}</i>
                    </span>
                    <span class="in">
                      XPM
                      <b>{{ item.play_info.xpm || "-" }}</b>
                    </span>
                  </p>
                  <p>
                    <span class="up">
                      <img src="../../images/kill_away.png" />
                      <i>
                        {{ item.play_info.kill || 0 }}/{{
                        item.play_info.die || 0
                        }}/{{ item.play_info.assists || 0 }}
                      </i>
                    </span>
                    <span class="in">
                      GPM
                      <b>{{ item.play_info.gpm || "-" }}</b>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <TiCollapseDOTA>
              <div class="collapsebox">
                <span>
                  <i>KDA：</i>
                  <b>{{ item.play_info.kda || "-" }}</b>
                </span>
                <span>
                  <i>正/反补：</i>
                  <b>{{item.play_info.last_hits || "-"}}/{{item.play_info.denies || "-"}}</b>
                </span>
                <span>
                  <i>参团率：</i>
                  <b>{{ item.play_info.group_rate || "-" }}</b>
                </span>
                <!-- <span>
                  <i>伤害：</i>
                  <b>{{ item.play_info.attack || "-" }}</b>
                </span>
                <span>
                  <i>承伤：</i>
                  <b>{{ item.play_info.bear || "-" }}</b>
                </span> -->
              </div>
            </TiCollapseDOTA>
          </div>
        </div>
      </div>
    </div>
  </Module>
</template>

<script>
import Module from "@c/Module";
import TiCollapseDOTA from "./TiCollapseDOTA";
export default {
  name: "TiEquipDOTA",
  version: "1.30.20201107", // 版本号
  // 组件参数 接收来自父组件的数据
  props: ["title", "data"],
  // 局部注册的组件
  components: { Module, TiCollapseDOTA },
  data() {
    return {
      activeName: "1"
    };
  },
  methods: {
    // 收起展开
    collapse(obj) {
      console.log(obj);
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  -webkit-text-size-adjust: auto !important;
}
.TiEquipDOTA {
  padding: 10px;
  // margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  // width: 345px;
  // height: 570px; //要展开收缩数据不能固定
  background: #fff;

  .title {
    height: 30px;
    font-size: 15px;
    font-weight: bold;
    line-height: 30px;
    color: #333333;
    // background: red;
    .logo {
      width: 28px;
      vertical-align: middle;
      margin-right: 10px;
    }
    dd {
      float: right;
      font-size: 13px;
      img {
        width: 15px;
        vertical-align: middle;
        margin-left: 10px;
      }
      i {
        font-style: normal;
        margin-left: 5px;
      }
    }
  }
  .list {
    .con {
      display: flex;
      padding: 6px 0;
      position: relative;
      width: 100%;
      .pic {
        display: inline-block;
        position: relative;
        width: 40px;
        height: 40px;
        border-radius: 4px;
        // background: red;
        overflow: hidden;
        img {
          width: 100%;
        }
        b {
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          background-color: #050a19;
          text-align: center;
          width: 20px;
          border-radius: 0px 4px 0px 4px;
          font-weight: normal;
          opacity: 0.8;
        }
      }
      .bag {
        padding: 0 5px;
        height: 40px;
        width: 160px;
        display: inline-block;
        // background: yellow;
        h3 {
          height: 18px;
          font-weight: normal;
          // background: red;
          font-size: 13px;
          color: #666666;
        }
        .icon {
          // background: #696e7e;
          height: 22px;
          line-height: 22px;
          overflow: hidden;
          img {
            width: 18px;
            margin: 4px 1px 0 1px;
            vertical-align: top;
          }
          // background: beige;
        }
      }
      .data {
        position: absolute;
        right: 0;
        width: 140px;
        height: 40px;
        // background: red;
        .box {
          text-align: left;
          font-size: 11px;
          display: flex;
          color: #666;
          p {
            float: left;
            flex: 1;
            // background: blue;
            span {
              display: block;
            }
            .up {
              height: 18px;
              // background: green;
              img {
                width: 14px;
                vertical-align: middle;
                margin-left: 10px;
              }
              i {
                display: inline-block;
                font-style: normal;
                height: 20px;
                font-size: 11px;
                width: 40px;

                -webkit-transform-origin: 0% 100%;
                transform-origin: 0% 100%;
                // background: red;
                // vertical-align: top;
              }
              // background: red;
            }

            .in {
              text-align: left;
              color: #696e7e;
              line-height: 11px;
              font-size: 10px;
              padding-left: 10px;
              // background: blue;
              height: 22px;
              line-height: 22px;
              b {
                display: block;
                color: #adadb4;
                font-size: 17px;
                line-height: 18px;
                font-weight: normal;
              }
              img {
                margin: 0 2px;
                width: 18px;
                height: 18px;
              }
            }
          }
        }
      }
    }
  }

  .collapsebox {
    // background: rgb(127, 245, 31);
    text-align: left;
    padding-top: 10px;
    padding-bottom: 5px;
    span {
      display: inline-block;
      font-size: 11px;
      width: 105px;
      white-space: nowrap;
      overflow: hidden;
      -webkit-transform-origin: 0 100%;
      transform-origin: 0 100%;
      // border: 1px solid red;
      i {
        font-style: normal;
        color: #999;
        // __width: 50px;
        display: inline-block;
        text-align: right;
        // background: red;
      }
      b {
        color: #333333;
        text-align: left;
        width: 50px;
        display: inline-block;
        white-space: nowrap;
        // background: red;

        -webkit-transform-origin: 0% 50%;
        transform-origin: 0% 50%;
        font-weight: bold;
      }
    }
  }
}
</style>
