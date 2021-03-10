<!--
  功能：TextInfut表单
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2021年01月04日 09:49:45
-->
<template>
  <div class="text-input">
    <input
      v-focus
      :type="type"
      class="input"
      :placeholder="placeholder"
      :value="value"
      :maxlength="maxlength"
      @blur="blur"
      @input="input"
      @focus="focus"
    />
    <i class="input-close" v-show="value" @click="deleteVal"></i>
    <div class="error" v-if="showError">
      <i class="error-icon"></i>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "text-input",
  props: {
    value: {
      type: String,
      default: "111111"
    },
    placeholder: {
      type: String,
      default: "请输入"
    },
    type: {
      type: String,
      default: "text"
    },
    error: {
      type: String,
      default: ""
    },
    maxlength: {
      type: Number,
      default: 1000
    },
    showError: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      inputVal: "",
      isShow: false,
      errorMsg: "",
      reg: {
        telphone: /^[1][3,4,5,7,8][0-9]{9}$/
      }
    };
  },
  computed: {},
  methods: {
    deleteVal() {
      this.$emit("input", "");
    },
    blur() {
      this.$emit("change", this.value);
    },
    focus() {
      this.isShow = false;
      this.errorMsg = "";
    },
    setValue(val) {
      this.$emit("input", val);
    },
    input(e) {
      let inputVal = e.target.value;
      switch (this.type) {
        case "code":
          inputVal = inputVal.replace(/[\W]/g, "");
          break;
        case "telphone":
          inputVal = inputVal.replace(/[^\d]/g, "");
          break;
        case "password":
          //inputVal = inputVal.replace(/[\W]/g, "");
          break;
        default:
      }
      this.setValue(inputVal);
    }
  },
  created() {},
  mounted() {
    //this.inputVal = this.value;
  }
};
</script>
<style lang='scss' scoped>
.text-input {
  height: 42px;
  display: flex;
  background: #fff;
  padding: 0 8px 0 25px;
  align-items: center;
 
  position: relative;
  .line{
    height:20px;
    position: abs;
  }
  & > .input {
    height: 42px;
    line-height: 42px;
    flex: 1;
    background: none;
    outline: none;
    border: none;
    font-size: 14px;
    color: #333333;
    &::-webkit-input-placeholder {
      color: #999;
    }
  }
  .input-close {
    width: 20px;
    height: 20px;
    background: url("../../assets/images/input-close.png") no-repeat 0 0;
    background-size: 100% 100%;
  }
  .error {
    position: absolute;
    font-size: 10px;
    color: #ff4e49;
    left: 0;
    top: 40px;
    display: flex;
    align-items: center;
    .error-icon {
      width: 12px;
      height: 12px;
      background: url("../../assets/images/error-icon.png") no-repeat 0 0;
      background-size: 100% 100%;
      margin-right: 4px;
    }
  }
}
</style>