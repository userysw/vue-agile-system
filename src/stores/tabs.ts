/* 打开的导航选项卡 */
import type { Tab } from '@/interface/nav'

export const useTabsStore = defineStore('tabs', () => {
  const tabVal = ref('')

  const tabs = reactive<Array<Tab>>([])

  // 更新当前选中的导航标签值
  function updateVal(val: string) {
    tabVal.value = val
  }

  // 添加导航标签
  function addTab({ name = '', id = '', path = '' }) {
    updateVal(id)
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
    tabs,
    addTab,
    removeTab
  }
})