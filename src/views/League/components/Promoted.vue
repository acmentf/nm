<!--
 * @Author: FeikeQ
 * @Date: 2021-01-04 16:51:42
 * @LastEditTime: 2021-01-50 18:30:50
 * @LastEditors: FeikeQ
 * @FilePath: /ti-wap/src/views/League/components/Promoted.vue
 * @Description: 
-->
<template>
  <div class="league-promoted">
    <span v-show="pvp.pmp_map&&pvp.pmp_map.length">
      <div class="league-promoted-box">
        <div id="leaguePromotedBox"></div>
      </div>
      <div class="zoom">
        <!-- <button @click="call_device">&#10019;Android通讯</button> -->
        <a @click="zoom('+')" title="放大">
          <img src="../images/enlarge.png" />
        </a>
        <a @click="zoom('-')" title="缩小">
          <img src="../images/reduce.png" />
        </a>
      </div>
    </span>
    <Empty EmptyType="2" v-show="!pvp.pmp_map.length" style="padding-top:50px">暂无数据</Empty>
  </div>
</template>

<script>
import go from "gojs";
import Empty from "@c/Empty";
import { mapGetters, mapState } from "vuex";
export default {
  name: "league-promoted",
  components: { Empty },
  props: {
    game: {
      type: [Number, String],
      default: null
    },
    id: {
      type: [Number, String],
      default: null
    }
  },
  data() {
    return {
      live: 10,
      elePosition: {
        start: { x: 0, y: 0 },
        end: { x: 0, y: 0 }
      },
      myDiagram: null,
      pvp: { pmp_map: [] }
    };
  },
  methods: {
    goInit(data, list, count) {
      let _that = this;
      if (window.goSamples) goSamples(); // init for these samples -- you don't need to call this
      var $ = go.GraphObject.make; // for conciseness in defining templates
      this.myDiagram = $(
        go.Diagram,
        "leaguePromotedBox", // create a Diagram for the DIV HTML element
        {
          initialContentAlignment: go.Spot.Center,
          initialPosition: new go.Point(10, -36),
          "textEditingTool.starting": go.TextEditingTool.SingleClick,
          "toolManager.mouseWheelBehavior": go.ToolManager.WheelNone,
          layout: $(go.TreeLayout, { angle: 180 }),
          "undoManager.isEnabled": true,
          allowHorizontalScroll: true,
          allowVerticalScroll: true,
          "dragSelectingTool.isEnabled": true,
          //autoScale: go.Diagram.Uniform,
          padding: 15,
          scale: 1,
          minScale: 0.4,
          maxScale: 2.0
        }
      );

      // 定义简单节点模板
      this.myDiagram.nodeTemplate = $(
        go.Node,
        "Auto",
        { selectable: false },
        $(
          go.Shape,
          "Rectangle",
          { fill: "#F4F4F4", stroke: null, width: 136 },
          // Shape.fill is bound to Node.data.color
          new go.Binding("fill", "color"),
          {
            click: function(e, obj) {
              // 双击事件
              if (window.jsInterface) {
                window.jsInterface.goDetail(obj.part.data.match_id);
              } else {
                _that.goMatchDetail(obj.part.data.match_id);
              }
            }
          }
        ),
        $(
          go.Panel,
          "Table",
          $(go.RowColumnDefinition, { column: 0, separatorStroke: "#0F1E45" }),
          // $(go.RowColumnDefinition, {
          //   column: 1,
          //   separatorStroke: "#0F1E45",
          //   background: "#BABABA"
          // }),
          // $(go.RowColumnDefinition, { row: 0, separatorStroke: "#0F1E45" }),
          // $(go.RowColumnDefinition, { row: 1, separatorStroke: "#0F1E45" }),
          $(
            go.Picture,
            {
              column: 0,
              row: 0,
              margin: new go.Margin(0, 4, 0, 10),
              width: 26,
              height: 26
            },
            // Picture.source is data bound to the "source" attribute of the model data
            new go.Binding("source", "teama_logo")
          ),
          $(
            go.Picture,
            // Pictures should normally have an explicit width and height.
            // This picture has a red background, only visible when there is no source set
            // or when the image is partially transparent.
            {
              column: 0,
              row: 1,
              margin: new go.Margin(0, 4, 0, 10),
              width: 26,
              height: 26
            },
            // Picture.source is data bound to the "source" attribute of the model data
            new go.Binding("source", "teamb_logo")
          ),
          $(
            go.TextBlock,
            "",
            {
              row: 0,
              column: 1,
              wrap: go.TextBlock.None,
              margin: 0,
              width: 60,
              isMultiline: false,
              textAlign: "left",
              font: "bold 9px  Segoe UI,sans-serif",
              stroke: "#333"
            },
            new go.Binding("text", "teama_name").makeTwoWay()
          ),
          $(
            go.TextBlock,
            "",
            {
              row: 1,
              wrap: go.TextBlock.None,
              column: 1,
              margin: 0,
              width: 60,
              isMultiline: false,
              textAlign: "left",
              font: "bold 9px  Segoe UI,sans-serif",
              stroke: "#333"
              // shadowColor: "#8B65FF",
            },
            new go.Binding("text", "teamb_name").makeTwoWay()
          ),
          $(
            go.TextBlock,
            "",
            {
              column: 2,
              row: 0,
              wrap: go.TextBlock.None,
              margin: 8,
              width: 30,
              isMultiline: false,
              editable: false,
              textAlign: "left",
              font: "bold 16px  Segoe UI,sans-serif",
              stroke: "#2AB7CA"
            },
            new go.Binding("text", "teama_score").makeTwoWay()
          ),
          $(
            go.TextBlock,
            "",
            {
              column: 2,
              row: 1,
              wrap: go.TextBlock.None,
              margin: 8,
              width: 30,
              isMultiline: false,
              editable: false,
              textAlign: "left",
              font: "bold 16px  Segoe UI,sans-serif ",
              stroke: "#F35463"
            },
            new go.Binding("text", "teamb_score").makeTwoWay()
          ),
          $(
            go.Panel,
            "Horizontal",
            {
              margin: 4,
              column: 0,
              row: 3,
              columnSpan: 3,
              height: 18,
              background: "#fff",
              width: 128
            },
            $(
              go.TextBlock,
              "",
              {
                margin: new go.Margin(0, 0, 0, 8),
                stroke: "#999999",
                font: "8px  Segoe UI,sans-serif "
              },
              new go.Binding("text", "start_time").makeTwoWay()
            ),
            $(
              go.TextBlock,
              "",
              {
                margin: new go.Margin(0, 0, 0, 36),
                stroke: "#999999",
                font: "8px  Segoe UI,sans-serif "
              },
              new go.Binding("text", "sz").makeTwoWay()
            )
          )
        )
      );

      this.myDiagram.linkTemplate = $(
        go.Link,
        {
          routing: go.Link.Orthogonal,
          selectable: false
        },
        $(go.Shape, { strokeWidth: 1, stroke: "#474c61" })
      );

      // 更具数据级级定义晋级图的提示信息显示面板
      //胜者组

      list.listW.forEach((item, index) => {
        this.myDiagram.add(
          $(
            go.Part,
            {
              // background: "lightgreen",
              location: new go.Point(190 * index, -20)
            },
            $(
              go.Panel,
              "Vertical",
              {
                margin: 0,
                width: 136
              },
              $(go.TextBlock, item.name, {
                margin: new go.Margin(0, 0, 0, 0),
                stroke: "#999",
                font: "11px  Segoe UI,sans-serif ",
                textAlign: "center",
                width: 136
              })
            )
          )
        );
      });
      list.listL.forEach((item, index) => {
        this.myDiagram.add(
          $(
            go.Part,
            {
              // background: "lightgreen",
              location: new go.Point(190 * index, count * 113)
            },
            $(
              go.Panel,
              "Vertical",
              {
                margin: 0,
                width: 136
              },
              $(go.TextBlock, item.name, {
                margin: new go.Margin(0, 0, 0, 0),
                stroke: "#999",
                font: "11px  Segoe UI,sans-serif ",
                textAlign: "center",
                width: 136
              })
            )
          )
        );
      });

      var myModel = $(go.TreeModel);
      //在模型数据中，每个节点由一个JavaScript对象表示：
      myModel.nodeDataArray = data;
      this.myDiagram.model = myModel;
    },
    zoom(act) {
      // var el = document.getElementById("leaguePromotedBox");
      if (act == "+") {
        this.myDiagram.scale += 0.2;
      } else {
        this.myDiagram.scale -= 0.2;
      }
    },
    async fetchData() {
      this.pvp = await this.$store.dispatch("leagueDetail/_getLeagueResult", {
        game_id: this.game,
        tournament_id: this.id * 1
      });
      if (this.pvp) {
        let { pmp_map, list, count } = this.pvp;
        this.goInit(pmp_map, list, count);
      }
    },
    goMatchDetail(match_id) {
      this.$router.push(`/match-detail/${this.game}?match_id=${this.id}`);
    }
  },
  created() {
    this.fetchData();
  },
  mounted() {
    //this.goInit(this.data);
  }
};
</script>
<style lang="less" >
.league-promoted {
  height: 100%;
  width: 375px;
  .zoom {
    position: fixed;
    bottom: 5px;
    right: 5px;
    z-index: 99;
    a {
      img {
        width: 35px;
        height: 35px;
        margin-right: 15px;
      }
    }
  }
  .league-promoted-box {
    height: 100%;
    width: 375px;
    position: relative;
    transform-origin: 0 0;
    #leaguePromotedBox {
      width: 375px;
      height: 100%;
      background: #fff;
      canvas {
        &:focus {
          outline: none;
        }
      }
    }
  }
}
</style>