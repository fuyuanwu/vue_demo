<template>
  <div>
    <v-header></v-header>
    <div class="container clearfix">
      <v-left></v-left>
      <div class="main general float_left">
        <router-view keep-alive></router-view>
      </div>
    </div>
    <v-float-tool></v-float-tool>
  </div>
</template>

<script>
  import vHeader from './layout/header'
  import vLeft from './layout/left'
  import vFloatTool from './layout/floatTool'

  export default {
    components: {
      vHeader,
      vLeft,
      vFloatTool
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
