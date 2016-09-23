/**
 * Created by fuyuanwu on 2016/9/23.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user/user'

Vue.use(Vuex)
Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user
  },
  strict: debug
})
