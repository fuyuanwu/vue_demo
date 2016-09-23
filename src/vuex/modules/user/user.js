import mt from '../../mutation-types'

const state = {
  list: []
}

const mutations = {
  [mt.RECEIVE_USERS] (state, users) {
    state.list = users
  }
}

export default {
  state,
  mutations
}
