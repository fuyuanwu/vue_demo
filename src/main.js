import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routerMap from './routers'
import App from './App'
import Element from 'element-ui'

Vue.use(Element)
Vue.use(VueRouter)
Vue.use(VueResource)


const router = new VueRouter({
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    transitionOnLoad: false
})

routerMap(router)

router.start(App, '#app')
