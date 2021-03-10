<template>
    <iframe :src="url" width="100%" height="200%" frameborder="0" scrolling="no"></iframe>
</template>

<script>

export default {
  name: "TiIframe",
  props: ["url"],
  data() {
    return {
        
    };
  },
  methods: {}
};
</script>

<style lang="scss">
iframe{
    margin-top: -20px;
}
</style>
