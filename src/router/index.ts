import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/login/index.vue'
import Admin from '@/layout/admin/index.vue'
import View from '@/layout/view/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 首页
      path: '/',
      redirect: '/admin',
      children: []
    },
    {
      // 登录
      path: '/login',
      name: 'login',
      component: Login,
      children: []
    },
    {
      // 大屏
      path: '/view',
      name: 'view',
      component: View,
      children: []
    },
    {
      // 管理
      path: '/admin',
      name: 'admin',
      redirect: '/admin/home',
      component: Admin,
      children: [
        {
          // 首页
          path: 'home',
          name: 'home',
          component: () => import('@/views/home/index.vue'),
          children: []
        },
        {
          // 用户管理
          path: 'user',
          name: 'user',
          component: () => import('@/views/user/index.vue'),
          children: []
        },
        {
          // 角色管理
          path: 'role',
          name: 'role',
          component: () => import('@/views/role/index.vue'),
          children: []
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/error/404.vue')
    }
  ]
})

export default router
