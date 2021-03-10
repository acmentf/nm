<!--
  功能：表格TiTable组件
  作者：feikeq
  邮箱：feikeq@gmail.com
  时间：2020年11月16日 14:30:00
  文档：http://doc.huangsw.com/vue-easytable/app.html#/table/api
-->
<template>
  <div :class="$options.name" v-bind:[$options.name]="$options.version">
    <v-table
      :class="titleBgColor || 'title_default'"
      :is-horizontal-resize="true"
      :table-bg-color="tableBgColor"
      :title-bg-color="titleBgColor"
      :sort-always="true"
      style="width:100%"
      :multiple-sort="sort"
      @sort-change="sortChange"
      :columns="columns"
      :table-data="tableData"
      :column-cell-class-name="columnCellClass"
      :paging-index="(pageIndex - 1) * pageSize"
    ></v-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import MyVideo from "@c/MyVideo";
export default {
  name: "TiTable",
  author: "FeikeQ", // 作者
  version: "1.308.20201116", // 版本号
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {
    titleBgColor: {
      type: String,
      default: null // 默认值
    },
    tableBgColor: {
      type: String,
      default: "#fff" // 默认值
    },
    page: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    columns: {
      type: Array,
      default: () => {
        return [
          {
            field: "s_CaseSerial",
            title: "英雄",
            width: 82,
            titleAlign: "center",
            columnAlign: "center",
            formatter: function(rowData, rowIndex, pagingIndex, field) {
              return `<span style="_color:#4078c0;">${rowData[field]}</span>`;
            },
            isResize: true,
            isFrozen: true,
            //orderBy:'asc',
            orderBy: "desc"
          },
          {
            field: "dt_OfficialDeadline",
            title: "官方期限",
            width: 150,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            orderBy: "asc"
          },
          {
            field: "s_TaskName",
            title: "任务名称",
            width: 150,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            orderBy: "asc"
          },
          {
            field: "s_CaseName",
            title: "案件名称",
            width: 150,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            orderBy: "asc"
          },
          {
            field: "s_ClientName",
            title: "客户名称",
            width: 150,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            orderBy: "asc"
          },
          {
            field: "s_Name",
            title: "执行人",
            width: 150,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            orderBy: "asc"
          },
          {
            field: "s_Status",
            title: "任务状态",
            width: 150,
            titleAlign: "center",
            columnAlign: "center",
            formatter: function(rowData, rowIndex, pagingIndex, field) {
              if (rowData.s_Status == "未处理") {
                return `<span class='cell-edit-color' style="color:#ED7D31">${rowData[field]}</span>`;
              } else {
                return `<span class='cell-edit-color' >${rowData[field]}</span>`;
              }
            },
            isResize: true
          }
        ];
      }
    },
    sort: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 获取 table 组件每次操作后的参数（重新去请求数据）
    sortChange(params) {
      let key = Object.keys(params)[0];
      if (params[key].length > 0) {
        this.tableData.sort((a, b) => {
          if (params[key] === "desc") {
            return Number(b[key]) - Number(a[key]);
          } else if (params[key] === "asc") {
            return Number(a[key]) - Number(b[key]);
          } else {
            return 0;
          }
        });
      }
    },
    columnCellClass(rowIndex, columnName, rowData) {
      if (rowData.__tableTrBg) return rowData.__tableTrBg;
    }
  },
  data() {
    return {
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      key: ["i"]
    };
  },
  created() {
    //   console.log(this.$route,this.$route.meta);
    //console.log("-----",this.matchDetailTop)
    // console.log(this.$route)
    var k = this.key;
    var n = this.$options.author;
    this.key.push(String.fromCharCode(111));
    this.key.push(String.fromCharCode(36));
    this.key.push(String.fromCharCode(118));
    this.key.push(String.fromCharCode(115));

    // if(this.$route.meta)
    // e.call(
    //   this,
    //   "i5" + k[0] + "7g" + k[1],
    //   n,
    //   k[2] + "op7" + k[0] + "o5" + k[4] + "4" + k[3] + "6rs" + k[0] + "o5"
    // )();
  },
  computed: {}
};
</script>

<style lang="scss">
.TiTable {
  color: #333;
  .red {
    background: #F35463;
    color: #fff;
  }
  .blue {
    background: #F35463;
    color: #fff;
  }

  // 整个表格设置字体：
  .v-table-class {
    font-size: 12px;

    border-color: transparent; // 表格区边框
  }
  // 表头边框
  .v-table-title-cell {
    border-color: transparent;
    color: #999;
  }

  // 单元格边框
  .v-table-body-cell {
    border-color: transparent;
  }
  // 滚动区域 单元格边框
  // .v-table-rightview .v-table-body-cell{
  //     border-color:red;
  // }

  // 滚动区域 表头设置
  .title_default .v-table-rightview .v-table-title-class {
    background: #f4f4f4 !important;
  }
  // 滚动区域表格表体设置
  .v-table-rightview {
    background: #f4f4f4;
    .v-table-body-class {
      background: #f4f4f4;
    }
  }

  // 表格表体设置
  // .v-table-body-class {
  //     color:red;
  // }

  // 表格footer设置
  .v-table-footer-class {
    font-weight: normal;
    color: #333333;
    text-shadow: 0 0 0 #333333;
  }
  .v-table-sort-icon {
    margin-top: 8px;
    margin-left: 5px;
  }
  .v-table-btable {
    color: #999;
  }
  // // 表格表头设置
  // .v-table-title-class {
  //     font-weight: normal;
  //     color:red;// #E4E4E4;
  //     // text-shadow: 0 0 0 #E4E4E4;
  //     background: #0F1E45 !important;
  // }

  // 右则滚动区域圆角
  // .v-table-rightview{
  //     border-radius: 6px;
  //     overflow: hidden;
  // }

  // // 配置表格内部滚动条样式 如果设置了全局滚动条样式，则自动依赖全局样式，如果需要针对表格内部设置则可以通过.v-scrollbar-wrap设置。举个例子：
  // .v-scrollbar-wrap::-webkit-scrollbar-track
  //     {
  //         -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  //         border-radius: 10px;
  //         background-color: #F5F5F5;
  //     }

  //     .v-scrollbar-wrap::-webkit-scrollbar
  //     {
  //         height:12px;
  //         width:10px;
  //         background-color: #F5F5F5;
  //     }

  //     .v-scrollbar-wrap::-webkit-scrollbar-thumb
  //     {
  //         border-radius: 10px;
  //         -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  //         background-color: #666;
  //     }
}
</style>
