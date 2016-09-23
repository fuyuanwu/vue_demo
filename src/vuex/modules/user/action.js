/**
 * Created by fuyuanwu on 2016/9/23.
 */
'use strict'
import userApi from '../../../api/user'
import mt from '../../mutation-types'

export default {
  getAll: ({dispatcher})=> {
    userApi.getPagination((users)=> dispatcher(mt.RECEIVE_USERS, users))
  }
}
