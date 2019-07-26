import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'action-list',
      component: require('@/components/ActionList').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
