/**
 * Created by fuyuanwu on 2016/9/23.
 */
'use strict'
const _users = [
  {"id": 1, "name": "张三", "money": 500.01, "collects": 2},
  {"id": 2, "name": "李四", "money": 10.99, "collects": 10},
  {"id": 3, "name": "王五", "money": 19.99, "collects": 5}
]

export default {
  getPagination(cb) {
    setTimeout(() => cb(_users), 100)
  }
}
