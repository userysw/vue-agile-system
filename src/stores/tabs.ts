/* 打开的导航选项卡 */
import type { Tab } from '@/interface/nav'

export const useTabsStore = defineStore('tabs', () => {
  // 当前选中选项的val
  const tabVal = ref('')

  // 默认选项
  const tab = reactive<Tab>({
    name: '系统首页',
    val: 'home',
    path: '/admin/home'
  })

  // 当前打开的选项列表
  const tabs = reactive<Array<Tab>>([])

  // 添加导航标签
  function addTab({ name = '', id = '', path = '' }) {
    tabVal.value = id
    const tab = tabs.find(tab => tab.val === id)
    if (tab) {
      // 已存在，无需添加
    } else {
      tabs.push({
        name,
        val: id,
        path
      })
    }
  }

  // 删除导航标签
  function removeTab(val: string) {
    const index = tabs.findIndex(tab => tab.val === val)
    if (index > -1) {
      tabs.splice(index, 1)
    }
  }

  return {
    tabVal,
    tab,
    tabs,
    addTab,
    removeTab
  }
})