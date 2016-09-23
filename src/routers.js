export default function (router) {
  router.map({
    '/index': {
      name: 'index',
      component: function index(resolve) {
        require(['./views/index.vue'], resolve);
      },
    },
    '/modules': {
      component: function index(resolve) {
        require(['./views/component.vue'], resolve);
      },
      subRoutes: {
        '/home': {
          name: 'home',
          component: function index(resolve) {
            require(['./views/modules/home.vue'], resolve);
          },
        },
        '/candidateManage': {
          name: 'candidateManage',
          component: function index(resolve) {
            require(['./views/modules/candidateManage.vue'], resolve);
          },
        }
      }
    },
    // 404路由
    '*': {
      component: function (resolve) {
        require(['./views/error/404.vue'], resolve);
      }
    }
  });

  router.redirect({
    '/': '/index'
  });

  router.afterEach(function ({from, to}) {
    setTimeout(()=> {
      // hljs.initHighlighting();
    })
  });

}
