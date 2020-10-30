import Vue from 'vue'
import Router from 'vue-router'
import Ebook from '@/Ebook'
import HelloWorld from '@/components/HelloWorld'
import Excel from '@/Excel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/ebook',
      name: 'Ebook',
      component: Ebook
    },
    {
      path: '/excel',
      name: 'Excel',
      component: Excel
    }
  ]
})
