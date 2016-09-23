<template>
  <div>
    <router-view keep-alive></router-view>
  </div>
</template>

<script>
  import store from './vuex/store'

  export default {
    store,
    components: {}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/pub/main.scss";
  @import "../style/fragment/header_footer.scss";
</style>
