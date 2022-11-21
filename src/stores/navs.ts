/* 导航 */
import { listToTree } from '@/utils'
import type { Nav } from '@/interface/nav'


export const useNavsStore = defineStore('navs', () => {
  const navIndex = ref('')

  let navList = reactive<Nav[]>([
    {
      id: 'home',
      parentId: '0',
      name: '系统首页',
      icon: '',
      path: '/admin/home',
      children: []
    },
    {
      id: '2',
      parentId: '0',
      name: '基础管理',
      icon: '',
      path: '',
      children: []
    },
    {
      id: '3',
      parentId: '2',
      name: '角色管理',
      icon: '',
      path: '/admin/role',
      children: []
    },
    {
      id: '4',
      parentId: '2',
      name: '用户管理',
      icon: '',
      path: '/admin/user',
      children: []
    }
  ])

  // 导航
  let navTree = reactive([
    {
      id: 'home',
      parentId: '0',
      name: '系统首页',
      icon: '',
      path: '/admin/home',
      children: []
    },
    {
      id: '2',
      parentId: '0',
      name: '基础管理',
      icon: '',
      path: '',
      children: [
        {
          id: '3',
          parentId: '2',
          name: '角色管理',
          icon: '',
          path: '',
          children: []
        },
        {
          id: '4',
          parentId: '2',
          name: '用户管理',
          icon: 'Avatar',
          path: '/admin/user',
          children: []
        }
      ]
    }
  ])

  function updateMenus(navs: any[]) {
    navList = navs
    navTree = listToTree(navs, null, 'id', 'parentId')
  }

  return {
    navIndex,
    navList,
    navTree,
    updateMenus
  }
})