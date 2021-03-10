<!--
  功能：下拉选择
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2020年12月21日 15:25:51
-->
<template>
  <div class="my-select" tabindex="0" @blur="blur" v-if="options.length">
    <ul class="wrapper">
      <li class="select-value" @click="toggle">
        <span style="position:relative">
          <span
            v-if="currentValue.id !=='null' ||  currentValue.id !==''"
            class="lable"
          >{{currentValue.lable}}</span>
          <span v-else class="lable">{{placeholder}}</span>
          <i class="arrow" :class="isShow?'actived':''"></i>
        </span>
      </li>
      <ul class="options" v-show="isShow">
        <li
          v-for="(item,index) in options"
          :key="item.id"
          @click="selectOption(index)"
          :class="index===INDEX?'actived':''"
        >{{ item.lable}}</li>
      </ul>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MySelect",
  components: {},
  data() {
    return {
      isShow: false,
      INDEX: "",
      currentValue: {}
    };
  },
  props: {
    value: {
      // 必须要使用value
      type: String | Number,
      default: "",
      required: true
    },
    options: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: "请选择"
    }
  },
  computed: {},
  watch: {
    options: {
      handler(list) {
        this.initValue(this.value);
      },
      deep: true
    }
  },
  methods: {
    initValue(val) {
      if (val === "null" || val === "") {
        this.currentValue = {};
      } else {
        let _index = 0;
        this.options.forEach((item, index) => {
          if (val == item.id) {
            _index = index;
          }
        });
        this.currentValue = this.options[_index];
        this.INDEX = _index;
      }
    },
    toggle(e) {
      this.isShow = !this.isShow;
    },
    selectOption(index) {
      if (this.INDEX !== index) {
        this.INDEX = index;
        this.currentValue = this.options[index];
        this.$emit("input", this.currentValue.id);
        this.$emit("change", this.currentValue.lable, this.currentValue.id);
      }
      this.isShow = false;
    },
    blur() {
      this.isShow = false;
    }
  },
  created() {},
  mounted() {
    this.initValue(this.value);
  }
};
</script>
<style lang='scss' scoped>
.my-select {

  transition: height 2s;
  min-height: 24px;
  position: relative;
  z-index: 999999;
  &:focus {
    outline: none;
  }
  input {
    background: none;
    outline: none;
    border: none;
    width: 100%;
    text-align: center;
    color: #333333;
  }
  ul.wrapper {
    text-align: center;
    background: #fff;
    overflow: auto;
   
border: 1px solid #EEEEEE;
    border-radius: 12px;
    position: absolute;
    width: 100%;
    .options {
      max-height: 300px;
      overflow-y: auto;
    }
  }
  li {
    height: 24px;
    line-height: 24px;
    color: #878fa2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 10px;
    font-size: 10px;
    &.actived {
      color: #6521D7;
    }
  }
  .select-value {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    i {
      position: absolute;
      width: 8px;
      height: 8px;
      background: url("./images/arrow-bottom.png") no-repeat 0 0;
      background-size: 100% 100%;
      margin-left: 5px;
      transition: all 0.15s;
      right: -10px;
      top: 40%;
      &.actived {
        transform: rotate(180deg);
      }
    }
  }
  ul.options {
    min-height: 24px;
    max-height: 200px;
    & > li:last-child {
      margin-bottom: 5px;
    }
  }
  .lable {
    font-size: 11px;
  }
}
</style>