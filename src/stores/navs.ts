/* 导航 */
import { listToTree } from '@/utils'
import type { Nav } from '@/interface/nav'

export const useNavsStore = defineStore('navs', () => {
  const index = ref('')

  let list = reactive<Nav[]>([
    {
      id: 'home',
      parentId: '0',
      name: '系统首页',
      icon: 'el-icon-location',
      path: '/admin/home',
      children: []
    },
    {
      id: '2',
      parentId: '0',
      name: '基础管理',
      icon: 'el-icon-menu',
      path: '',
      children: []
    },
    {
      id: '3',
      parentId: '2',
      name: '角色管理',
      icon: 'el-icon-document',
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
  let tree = reactive([
    {
      id: 'home',
      parentId: '0',
      name: '系统首页',
      icon: 'el-icon-location',
      path: '/admin/home',
      children: []
    },
    {
      id: '2',
      parentId: '0',
      name: '基础管理',
      icon: 'el-icon-menu',
      path: '',
      children: [
        {
          id: '3',
          parentId: '2',
          name: '角色管理',
          icon: 'el-icon-document',
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
      ]
    }
  ])

  function updateIndex(val: string) {
    index.value = val || 'home'
  }

  function updateMenus(navs: any[]) {
    list = navs
    tree = listToTree(navs, null, 'id', 'parentId')
  }

  return {
    index,
    list,
    tree,
    updateIndex,
    updateMenus
  }
})