<template>
  <div class="loading-box">
    <div class="box">
      <div class="loader-13"></div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.box {
  display: inline-block;
  border-radius: 3px;
  font-size: 12px;
  position: relative;
  margin-bottom: 0.25em;
  vertical-align: top;
  -webkit-transition: 0.3s color, 0.3s border, 0.3s transform, 0.3s opacity;
  transition: 0.3s color, 0.3s border, 0.3s transform, 0.3s opacity;
}

.box:hover {
  color: #fff;
  background-color: #f2f2f2;
  font-size: 0;
  padding: 0;
  border-width: 3px;
  opacity: 1;
  -webkit-transform: scale(1.2);
  transform: scale(1.2);
  z-index: 2;
}

.box:hover [class*="loader-"] {
  font-size: 70px;
  line-height: 200px;
}

[class*="loader-"] {
  display: inline-block;
  width: 1em;
  height: 1em;
  color: inherit;
  vertical-align: middle;
  pointer-events: none;
}

.loader-13:before,
.loader-13:after,
.loader-13 {
  border-radius: 50%;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: loader-13 1.8s infinite ease-in-out;
  animation: loader-13 1.8s infinite ease-in-out;
 
}

.loader-13 {
  color: currentcolor;
  position: relative;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
  top: -1em;
  color:#ddd;
}

.loader-13:before {
  right: 100%;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.loader-13:after {
  left: 100%;
}

.loader-13:before,
.loader-13:after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  width: inherit;
  height: inherit;
}

@-webkit-keyframes loader-13 {
  0%,
  80%,
  100% {
    box-shadow: 0 1em 0 -1em;
  }
  40% {
    box-shadow: 0 1em 0 -0.2em;
  }
}

@keyframes loader-13 {
  0%,
  80%,
  100% {
    box-shadow: 0 1em 0 -1em;
  }
  40% {
    box-shadow: 0 1em 0 -0.2em;
  }
}
</style>