<template lang="html">
  <div class="candidateManage">
    <div v-for="user in _list">
      {{user.name}}
      {{user.money}}
      {{user.collects}}
    </div>

    <div>{{name}}</div>
    <input type="text" v-model="name">
  </div>
</template>

<script>
  import actions from '../../vuex/actions'

  export default {
    vuex: {
      getters: {
        _list: ({user})=> user.list,
        user: ()=> {
          return '张山的儿子'
        }
      },
      actions: {
        getPagination: actions.user.getAll
      }
    },
    computed: {
      name: {
        set (u) {
          console.log('u', u)
        }
      },
      get () {
        return this.user
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
